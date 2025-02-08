FROM node:20.11.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6001

CMD ["node", "index.js"]
