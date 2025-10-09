// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const authRoutes = require("./routes/auth");
const askRoutes = require("./routes/ask");
const conversationRoutes = require("./routes/conversations");
const messageRoutes = require("./routes/message");
const stripeRoutes = require("./routes/stripe");

const app = express();
const PORT = process.env.PORT || 3010;

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/ask", askRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/stripe", stripeRoutes);

// Fallback para rutas inexistentes
app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

app.listen(PORT, () => {
  console.log(`✅ Backend VITISENSE corriendo en http://localhost:${PORT}`);
});