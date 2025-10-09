// src/api/sendMessage.js
export async function sendMessage({ text, image = null, history = [] }) {
  const token = localStorage.getItem("token");

  // Validación básica para evitar peticiones vacías
  const hasText = text && text.trim() !== "";
  const hasImage = image instanceof File;

  if (!hasText && !hasImage) {
    throw new Error("Debes escribir un mensaje o adjuntar una imagen.");
  }

  // Validación de historial
  const validHistory = Array.isArray(history) ? history : [];

  const formData = new FormData();
  if (hasText) formData.append("text", text.trim());
  if (hasImage) formData.append("image", image);
  formData.append("history", JSON.stringify(validHistory));

  // DEBUG OPCIONAL – imprime los datos que se envían
  // for (let [key, value] of formData.entries()) {
  //   console.log(`${key}:`, value);
  // }

  const response = await fetch("http://localhost:3010/api/messages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // ❌ NO PONGAS Content-Type cuando usas FormData
    },
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = "Error al contactar con el backend";
    try {
      const error = await response.json();
      errorMessage = error.message || errorMessage;
    } catch {
      // ignorar errores de parseo del JSON si el backend no devuelve JSON
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data.response;
}