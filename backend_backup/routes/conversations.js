const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

const conversationsDir = path.join(__dirname, '../conversations');
if (!fs.existsSync(conversationsDir)) {
  fs.mkdirSync(conversationsDir);
}

// Listar conversaciones
router.get('/', verifyToken, (req, res) => {
  const email = req.user.email;
  const userFile = path.join(conversationsDir, `${email}.json`);

  if (!fs.existsSync(userFile)) {
    return res.json({ conversations: [] });
  }

  const data = JSON.parse(fs.readFileSync(userFile));
  res.json({ conversations: data.conversations || [] });
});

// ✅ Ruta nueva: Crear conversación rápida (para el botón +)
router.post('/', verifyToken, (req, res) => {
  const email = req.user.email;
  const userFile = path.join(conversationsDir, `${email}.json`);

  let data = { conversations: [] };
  if (fs.existsSync(userFile)) {
    data = JSON.parse(fs.readFileSync(userFile));
  }

  const id = uuidv4();
  const now = new Date().toISOString();
  const conversation = {
    id,
    title: 'Nueva conversación',
    messages: [],
    createdAt: now,
    updatedAt: now,
  };

  data.conversations.push(conversation);
  fs.writeFileSync(userFile, JSON.stringify(data, null, 2));

  res.json({ message: 'Conversación creada', conversation });
});

// Crear nueva conversación (guardar con título y mensajes)
router.post('/save', verifyToken, (req, res) => {
  const { title, messages } = req.body;
  const email = req.user.email;
  const userFile = path.join(conversationsDir, `${email}.json`);

  let data = { conversations: [] };
  if (fs.existsSync(userFile)) {
    data = JSON.parse(fs.readFileSync(userFile));
  }

  const id = uuidv4();
  const now = new Date().toISOString();
  const conversation = {
    id,
    title,
    messages,
    createdAt: now,
    updatedAt: now,
  };

  data.conversations.push(conversation);
  fs.writeFileSync(userFile, JSON.stringify(data, null, 2));

  res.json({ message: 'Conversación creada', conversation });
});

// Actualizar mensajes de una conversación existente
router.put('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { messages } = req.body;
  const email = req.user.email;
  const userFile = path.join(conversationsDir, `${email}.json`);

  if (!fs.existsSync(userFile)) {
    return res.status(404).json({ message: 'No hay conversaciones guardadas' });
  }

  const data = JSON.parse(fs.readFileSync(userFile));
  const convIndex = data.conversations.findIndex((c) => c.id === id);

  if (convIndex === -1) {
    return res.status(404).json({ message: 'Conversación no encontrada' });
  }

  data.conversations[convIndex].messages = messages;
  data.conversations[convIndex].updatedAt = new Date().toISOString();

  fs.writeFileSync(userFile, JSON.stringify(data, null, 2));

  res.json({ message: 'Conversación actualizada', conversation: data.conversations[convIndex] });
});

// Renombrar conversación
router.put('/:id/rename', verifyToken, (req, res) => {
  const { id } = req.params;
  const { newTitle } = req.body;
  const email = req.user.email;
  const userFile = path.join(conversationsDir, `${email}.json`);

  if (!fs.existsSync(userFile)) {
    return res.status(404).json({ message: 'No hay conversaciones guardadas' });
  }

  const data = JSON.parse(fs.readFileSync(userFile));
  const convIndex = data.conversations.findIndex((c) => c.id === id);

  if (convIndex === -1) {
    return res.status(404).json({ message: 'Conversación no encontrada' });
  }

  data.conversations[convIndex].title = newTitle;
  data.conversations[convIndex].updatedAt = new Date().toISOString();

  fs.writeFileSync(userFile, JSON.stringify(data, null, 2));

  res.json({ message: 'Título actualizado', conversation: data.conversations[convIndex] });
});

// Eliminar conversación
router.delete('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const email = req.user.email;
  const userFile = path.join(conversationsDir, `${email}.json`);

  if (!fs.existsSync(userFile)) {
    return res.status(404).json({ message: 'No hay conversaciones guardadas' });
  }

  const data = JSON.parse(fs.readFileSync(userFile));
  const updatedConversations = data.conversations.filter((c) => c.id !== id);

  fs.writeFileSync(userFile, JSON.stringify({ conversations: updatedConversations }, null, 2));

  res.json({ message: 'Conversación eliminada' });
});

module.exports = router;