# Versão do Node
FROM node:alpine

WORKDIR /app/backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5569

CMD ["prisma", "generate"]