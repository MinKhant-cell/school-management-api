# Stage 1: Builder
FROM node:24-alpine AS builder

WORKDIR /app

RUN addgroup -g 1001 -S appgroup && adduser -u 1001 -S appuser -G appgroup

# Copy package files and install dependencies
COPY --chown=appuser:appgroup package*.json tsconfig*.json ./
RUN npm install

COPY --chown=appuser:appgroup prisma ./prisma

RUN npx prisma generate

# Copy rest of the application
COPY --chown=appuser:appgroup . .

# Build the application
RUN npm run build

# Stage 2: Runner
FROM node:24-alpine AS runner

WORKDIR /app

RUN addgroup -g 1001 -S appgroup && adduser -u 1001 -S appuser -G appgroup

# Copy only necessary files
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/package*.json ./
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/tsconfig*.json ./
COPY --from=builder --chown=appuser:appgroup /app/prisma ./prisma

USER appuser

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]