// src/components/SubscriptionButton.jsx
import { useState } from "react";

export default function SubscriptionButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://vitisense-backend.onrender.com/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Error al iniciar el pago.");
      }

      const data = await res.json();
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setError("No se pudo redirigir al pago. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-8">
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition duration-200"
      >
        {loading ? "Redirigiendo..." : "Suscribirse ahora con prueba gratis"}
      </button>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}