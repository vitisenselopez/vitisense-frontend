// backend/routes/ask.js
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
          content: `
Eres VITISENSE, asesor técnico agrónomo experto en viticultura. 
Responde siempre como un ingeniero agrónomo experimentado, con un estilo directo, claro y resolutivo. 

🟢 Si el usuario describe un problema:
– Da una recomendación ejecutable desde ya.
– Indica el principio activo, dosis y modo de aplicación.
– Ajusta según variedad, fenología, clima o tratamientos anteriores si se indican.

🟡 Si el usuario solo pide información:
– Explica de forma breve, clara y útil.
– Nunca escribas como una enciclopedia.

🔴 Nunca:
– Repitas lo que el usuario ya ha dicho.
– Hagas preguntas innecesarias.
– Escribas textos vagos o generales.

✅ Actúa como un asesor presente, que entiende el campo, las emociones y el contexto.
✅ Si falta información clave, haz preguntas concretas, no te pierdas.
✅ Guía con firmeza y criterio. Tu prioridad es resolver, no teorizar.
          `.trim()
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