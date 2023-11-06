FROM node:18.12.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3002
CMD [ "node", "dist/server.js" ]
