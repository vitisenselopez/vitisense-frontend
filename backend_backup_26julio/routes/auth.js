// routes/auth.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();
const usersPath = path.join(__dirname, "..", "data", "users.json");
const JWT_SECRET = process.env.JWT_SECRET || "claveSecreta123";

// Función auxiliar: cargar usuarios desde el JSON
const loadUsers = () => {
    if (!fs.existsSync(usersPath)) return [];
    const data = fs.readFileSync(usersPath, "utf-8");
    return JSON.parse(data);
};

// Función auxiliar: guardar usuarios en el JSON
const saveUsers = (users) => {
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
};

// Registro de nuevo usuario
router.post("/register", (req, res) => {
    const { email, password } = req.body;
    const users = loadUsers();

    // Verificar si el email ya está registrado
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: "Ya existe ese usuario" });
    }

    // Hashear la contraseña antes de guardar
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
        email: email,
        password: hashedPassword,
        stripeCustomerId: null,
        isSubscribed: false
    };

    users.push(newUser);
    saveUsers(users);

    // Generar token JWT para el nuevo usuario
    const token = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, email });
});

// Login de usuario existente
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const users = loadUsers();

    const user = users.find(u => u.email === email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Credenciales válidas: generar token JWT
    const token = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, email });
});

// Verificación de token JWT y obtención de datos de usuario
router.get("/me", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Token requerido" });
    }
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const users = loadUsers();
        const user = users.find(u => u.email === decoded.email);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        // Devolver email e información de suscripción
        res.json({ email: user.email, isSubscribed: user.isSubscribed });
    } catch (err) {
        res.status(401).json({ error: "Token inválido" });
    }
});

module.exports = router;