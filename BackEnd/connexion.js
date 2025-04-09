
const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
const mysql = require("mysql2");


const db = mysql.createPool({
    host: "db", // Adresse de votre serveur MariaDB
    user: "root", // Votre utilisateur MariaDB
    password: "root", // Votre mot de passe MariaDB
    database: "deploiement", // Nom de votre base de données
    waitForConnections: true,
    connectionLimit: 10, // Limite des connexions simultanées
    queueLimit: 0
});


// Connecter au TCP
client.connectTCP("172.16.1.25", { port: 502 })
    .then(() => {
        console.log("Connexion TCP établie.");
        client.setID(1); // Définir l'ID de l'unité
    })
    .catch((error) => {
        console.error("Erreur lors de la connexion TCP :", error.message);
    });

// Lire les valeurs toutes les 1000ms
setInterval(async function () {
    try {
        const data = await client.readCoils(514, 1); // Lire 1 registre à partir de l'adresse 514
        console.log("Données reçues :", data.data);
        const valeur = data.data[0] ? 1 : 0;
        console.log("Valeur interprétée :", valeur);

        const sql = `
            INSERT INTO tableauvaleur (Valeur, ID_Variable, automate_ID) 
            VALUES (?, ?, ?)
        `;
        const values = [valeur, 1, 1]; // a changer en fonction de l'ID variabel que l'on cherche+ ID-automate

        // Exécuter la requête d'insertion
        db.query(sql, values, (err, results) => {
            if (err) {
                console.error("Erreur lors de l'insertion dans la BDD :", err.message);
            } else {
                console.log("Données insérées avec succès. ID :", results.insertId);
            }
        });

    } catch (error) {
        console.error("Erreur lors de la lecture des données :", error.message);
    }
}, 1000);
