import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "34653613796"; // ✅ TU WHATSAPP BUSINESS
    const encodedMessage = encodeURIComponent(
      `Hola, soy ${name}.\nMi email es ${email}.\n\nMensaje:\n${message}`
    );
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-800">
        Contacto
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Nombre</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Mensaje</label>
          <textarea
            className="w-full border border-gray-300 rounded px-4 py-2 h-32"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded w-full"
        >
          Contactar por WhatsApp
        </button>
      </form>
    </div>
  );
}