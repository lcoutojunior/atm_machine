FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install -D nodemon
RUN npm install

COPY . .

CMD ["npx", "nodemon","src/server.js"]