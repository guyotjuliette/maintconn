const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();
const port = 3000;
//je vais pleurer 
app.use(cors());
app.use(express.json());

// Connexion à la base de données
const db = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'maintconn',
  port: 3306,
  connectionLimit: 5,
  acquireTimeout: 30000,
});

// Test de connexion
const testConnection = async () => {
  try {
    const conn = await db.getConnection();
    console.log(' Connecté à MariaDB !');
    conn.release();
  } catch (err) {
    console.error(' Erreur de connexion à MariaDB :', err);
  }
};

testConnection();

// ======================== ALARME ========================
app.post('/alarme', async (req, res) => {
  const { date_heure, type_alarme, temp, seuil } = req.body;
  if (!date_heure || !type_alarme || temp === undefined || seuil === undefined) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }
  try {
    const conn = await db.getConnection();
    await conn.query(
      'INSERT INTO alarme (date_heure, type_alarme, temp, seuil) VALUES (?, ?, ?, ?)',
      [date_heure, type_alarme, temp, seuil]
    );
    conn.release();
    res.status(201).json({ message: 'Alarme ajoutée' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur insertion alarme' });
  }
});

app.get('/alarme', async (req, res) => {
  try {
    const conn = await db.getConnection();
    const result = await conn.query('SELECT * FROM alarme ORDER BY date_heure DESC');
    conn.release();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erreur récupération alarme' });
  }
});

// ======================== SEUILS ========================
app.post('/seuils', async (req, res) => {
  const { seuil_bas, seuil_haut, date, seuil_tres_bas, seuil_tres_haut } = req.body;
  if (!date || seuil_bas === undefined || seuil_haut === undefined) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }
  try {
    const conn = await db.getConnection();
    await conn.query(
      'INSERT INTO seuils (seuil_bas, seuil_haut, date, seuil_tres_bas, seuil_tres_haut) VALUES (?, ?, ?, ?, ?)',
      [seuil_bas, seuil_haut, date, seuil_tres_bas, seuil_tres_haut]
    );
    conn.release();
    res.status(201).json({ message: 'Seuils ajoutés' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur insertion seuils' });
  }
});

app.get('/seuils', async (req, res) => {
  try {
    const conn = await db.getConnection();
    const result = await conn.query('SELECT * FROM seuils ORDER BY date DESC');
    conn.release();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erreur récupération seuils' });
  }
});

// ======================== SEUIL HISTO ========================
app.post('/seuil_histo', async (req, res) => {
  const { old_seuil_bas, old_seuil_haut, new_seuil_bas, new_seuil_haut, date } = req.body;
  if (!date) {
    return res.status(400).json({ error: 'Date requise' });
  }
  try {
    const conn = await db.getConnection();
    await conn.query(
      'INSERT INTO seuil_histo (old_seuil_bas, old_seuil_haut, new_seuil_bas, new_seuil_haut, date) VALUES (?, ?, ?, ?, ?)',
      [old_seuil_bas, old_seuil_haut, new_seuil_bas, new_seuil_haut, date]
    );
    conn.release();
    res.status(201).json({ message: 'Historique seuil ajouté' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur insertion seuil_histo' });
  }
});

app.get('/seuil_histo', async (req, res) => {
  try {
    const conn = await db.getConnection();
    const result = await conn.query('SELECT * FROM seuil_histo ORDER BY date DESC');
    conn.release();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erreur récupération seuil_histo' });
  }
});

// ======================== USERS ========================
app.post('/users', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Identifiants manquants' });
  }
  try {
    const conn = await db.getConnection();
    await conn.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    );
    conn.release();
    res.status(201).json({ message: 'Utilisateur ajouté' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur insertion utilisateur' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const conn = await db.getConnection();
    const result = await conn.query('SELECT id_user, username FROM users');
    conn.release();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erreur récupération utilisateurs' });
  }
});

// ======================== VARIABLE ========================
app.post('/variable', async (req, res) => {
  const { date_heure, temp, cycle } = req.body;
  if (!date_heure || temp === undefined) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }
  try {
    const conn = await db.getConnection();
    await conn.query(
      'INSERT INTO variable (date_heure, temp, cycle) VALUES (?, ?, ?)',
      [date_heure, temp, cycle]
    );
    conn.release();
    res.status(201).json({ message: 'Donnée insérée dans variable' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur insertion variable' });
  }
});

app.get('/variable', async (req, res) => {
  try {
    const conn = await db.getConnection();
    const result = await conn.query('SELECT * FROM variable ORDER BY date_heure DESC');
    conn.release();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erreur récupération variable' });
  }
});

// ======================== SERVER ========================
app.listen(port, () => {
  console.log(` Serveur en ligne sur http://localhost:${port}`);
});
