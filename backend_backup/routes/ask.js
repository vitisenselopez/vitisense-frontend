// ✅ backend/routes/ask.js
const express = require('express');
const { OpenAI } = require('openai');
require('dotenv').config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'No se ha recibido un historial de mensajes válido.' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'Eres un asesor técnico agrónomo experto en viticultura. Debes responder con precisión, usando prácticas reales habituales y soluciones concretas y eficaces. Nunca ignores lo que el usuario ya ha dicho ni repitas preguntas innecesarias. Si el usuario escribe con errores o vaguedades, interpreta con criterio y corrige. Las respuestas deben ser útiles, realistas y prácticas para el agricultor. Si no se te da suficiente información, pide solo lo imprescindible y da una primera propuesta razonable.'
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const answer = response.choices[0].message.content;
    res.json({ response: answer });
  } catch (error) {
    console.error('Error al generar la respuesta:', error);
    res.status(500).json({ error: 'Error al generar la respuesta con GPT-4.' });
  }
});

module.exports = router;