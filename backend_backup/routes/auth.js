const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const SECRET = 'mi_clave_secreta_segura';
const usersPath = path.join(__dirname, '../users.json');  // ← ruta absoluta, más segura

// Leer usuarios
const readUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(usersPath));
  } catch (err) {
    return [];
  }
};

// Guardar usuarios
const writeUsers = (users) => {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
};

// 📌 Registro
router.post('/register', (req, res) => {
  const { name, email, password, city, country } = req.body;
  const users = readUsers();

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({
    name,
    email,
    password: hashedPassword,
    city,
    country,
  });
  writeUsers(users);

  res.json({ message: 'Usuario registrado con éxito' });
});

// 📌 Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;