FROM node:22-alpine

WORKDIR /usr/src

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build && ls -l 

EXPOSE 3000

COPY docker-entrypoint.sh ./

ENTRYPOINT ["sh", "./docker-entrypoint.sh"]
