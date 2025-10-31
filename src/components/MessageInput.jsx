import { useState } from "react";
import { Send } from "lucide-react";

export default function MessageInput({ onSend, disabled = false }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const formData = new FormData();
    formData.append("text", input.trim());

    onSend(formData);

    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white border-t border-gray-200 px-4 py-3 shadow-sm max-w-4xl mx-auto w-full gap-2"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu consulta"
        className="flex-grow px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900 text-sm"
        autoComplete="off"
        spellCheck={false}
        disabled={disabled}
      />
      <button
        type="submit"
        className="p-3 rounded-full bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled}
        title="Enviar"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}