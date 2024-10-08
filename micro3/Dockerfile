FROM node:10.8.3
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8083
CMD ["node", "index.js"]