FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8003
CMD ["node", "src/index.js"]
RUN apt-get update && apt-get install -y dnsutils