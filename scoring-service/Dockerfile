FROM node:19-slim

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

CMD ["node", "build/main.js"]
