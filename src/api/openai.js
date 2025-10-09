// src/api/openai.js
export async function askGPT(messages) {
  const token = localStorage.getItem("token");

  const response = await fetch("https://vitisense-backend.onrender.com/api/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al contactar con el backend");
  }

  const data = await response.json();
  return data.response;
}