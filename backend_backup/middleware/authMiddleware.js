// ✅ backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET = 'mi_clave_secreta_segura'; // Usa la misma clave que en tu auth.js

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const user = jwt.verify(token, SECRET);
    req.user = user; // ✅ Guarda los datos del usuario en la request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
}

module.exports = verifyToken;