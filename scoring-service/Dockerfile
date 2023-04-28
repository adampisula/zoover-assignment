FROM node:19-slim

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

CMD ["node", "build/main.js"]
