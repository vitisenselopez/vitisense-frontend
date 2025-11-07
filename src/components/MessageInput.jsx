import { useState } from "react";
import { Send, Paperclip, X } from "lucide-react";

export default function MessageInput({ onSend, disabled = false }) {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() && !image) return;

    const formData = new FormData();
    formData.append("text", input.trim());
    if (image) formData.append("image", image);

    onSend(formData);
    setInput("");
    setImage(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full px-4 py-2 border-t border-gray-200 bg-transparent"
    >
      {/* Miniatura si hay imagen seleccionada */}
      {image && (
        <div className="mb-2 flex items-center justify-between bg-gray-100 border border-gray-300 rounded-lg p-2 text-sm text-gray-700">
          <span className="truncate">{image.name}</span>
          <button
            type="button"
            onClick={() => setImage(null)}
            className="text-gray-500 hover:text-red-600"
            title="Eliminar imagen"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="flex items-center w-full">
        {/* Botón de subir imagen */}
        <label className="mr-2 cursor-pointer text-gray-600 hover:text-green-600 transition">
          <Paperclip className="w-5 h-5" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
            disabled={disabled}
          />
        </label>

        {/* Input de texto */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu consulta"
          className="flex-grow px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900 text-base"
          autoComplete="off"
          spellCheck={false}
          disabled={disabled}
        />

        {/* Botón de enviar */}
        <button
          type="submit"
          className="ml-2 p-3 rounded-full bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
          title="Enviar"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}