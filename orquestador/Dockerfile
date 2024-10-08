FROM node:10.8.3
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8084
CMD ["node", "index.js"]
