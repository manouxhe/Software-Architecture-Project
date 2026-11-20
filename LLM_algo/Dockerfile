# Base Node.js légère
FROM node:20-alpine

WORKDIR /app

# Installation des dépendances (groq-sdk et tsx)
COPY package*.json ./
RUN npm install

# Copie du script Filter_LLM.ts
COPY . .

# Lancement du script
CMD ["npx", "tsx", "Filter_LLM.ts"]