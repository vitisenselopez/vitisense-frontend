const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = 3010;

// ✅ Configurar CORS para Vite
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(bodyParser.json());

// ✅ Importar rutas backend
const authRoutes = require('./routes/auth');
const conversationsRoutes = require('./routes/conversations');
const stripeRoutes = require('./routes/stripe');  // Ruta Stripe conectada correctamente

app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationsRoutes);
app.use('/api/stripe', stripeRoutes);  // Aquí se activa la ruta: /api/stripe/create-checkout-session

// ✅ Ruta de Chat IA con OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = {
  role: "system",
  content:
    "Eres VITISENSE, asesor técnico experto en viticultura. Debes responder como si fueras un ingeniero agrónomo experimentado, dando soluciones claras, firmes y aplicables, como en una consulta real de campo. Si el usuario describe un problema, da la mejor recomendación concreta y justificada, sin rodeos ni largas explicaciones, priorizando fitosanitarios con principio activo, dosis y modo de uso habituales según la práctica agronómica, adaptando según la variedad, fase fenológica, clima y tratamientos previos si se indican. Si el usuario solo pide información, responde con explicaciones breves, claras y prácticas, sin extenderte ni escribir como una enciclopedia. Sé siempre directo y natural, como un asesor real que guía con criterio técnico, sin rodeos. Tu función es resolver y guiar, no dar clases teóricas. Si falta información, pregunta con precisión, sin divagar. Responde como si hablaras cara a cara con el agricultor en la cooperativa.",
};

app.post('/api/ask', async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'No se ha recibido un historial de mensajes válido.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [systemPrompt, ...messages],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const answer = completion.choices[0].message.content;
    res.json({ response: answer });
  } catch (err) {
    console.error('Error al generar la respuesta:', err);
    res.status(500).json({ error: 'Error al generar la respuesta con GPT-4o' });
  }
});

// ✅ Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
});