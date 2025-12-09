# Stage 1: Builder
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json tsconfig*.json ./
RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

# Copy rest of the application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runner
FROM node:22-alpine AS runner

WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig*.json ./
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]