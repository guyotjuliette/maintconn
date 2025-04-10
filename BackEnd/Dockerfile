# Utiliser une image officielle de Node.js
FROM node:16

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json ./

# Installer les dépendances globales
RUN npm install -g nodemon

# Copier tout le code source dans le conteneur
COPY . .

# Exposer le port 3000 pour l'application
EXPOSE 3000

# Exécuter le script wait-for-it.sh pour attendre que la base de données soit prête avant de démarrer le backend
CMD ["nodemon", "--legacy-watch", "server.js"]
