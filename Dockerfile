FROM node:22.2.0 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build --if-present