FROM node:20-alpine

WORKDIR /app

# зависимости
COPY package*.json ./
RUN npm install

# код
COPY . .

# билд (vite + server bundle)
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
