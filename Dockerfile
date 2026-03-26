FROM node:22

WORKDIR /app

COPY package*.json ./
COPY .env* ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["node", "build"]