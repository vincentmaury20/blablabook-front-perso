FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY uploads ./uploads

RUN npm run build

EXPOSE 8080
CMD ["node", "src/server.js"]
