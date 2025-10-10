// src/api/sendMessage.js
export async function sendMessage({ text, image = null, history = [] }) {
  const token = localStorage.getItem("token");
  const API_BASE_URL = import.meta.env.VITE_API_URL;

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

  const response = await fetch(`${API_BASE_URL}/api/conversations/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // ❌ NO poner Content-Type manualmente cuando se usa FormData
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