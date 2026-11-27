FROM node:20-alpine

WORKDIR /app

# Installation des dépendances (express, groq-sdk, tsx)
COPY package*.json ./
RUN npm install

COPY . .

# Ouverture du port 3001
EXPOSE 3001

# Lancement du serveur Express 
CMD ["npx", "tsx", "server.ts"]

