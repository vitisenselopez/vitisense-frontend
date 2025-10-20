import { useState } from "react";
import { Send, Image } from "lucide-react";

export default function MessageInput({ onSend, disabled = false }) {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() && !image) return;

    const formData = new FormData();
    formData.append("text", input.trim());
    if (image) formData.append("image", image);

    onSend(formData);

    setInput("");
    setImage(null);
    e.target.reset(); // limpia input file
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 sm:gap-3 bg-white px-3 py-3 sm:px-4 sm:py-4 border-t border-gray-200"
      encType="multipart/form-data"
    >
      {/* Línea principal de entrada */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Icono imagen */}
        <label
          htmlFor="image-upload"
          className="cursor-pointer text-gray-500 hover:text-green-600"
          title="Adjuntar imagen"
        >
          <Image className="w-5 h-5 sm:w-6 sm:h-6" />
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          disabled={disabled}
        />

        {/* Campo de texto */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu consulta sobre la viña..."
          className="flex-grow px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900 text-sm sm:text-base"
          autoComplete="off"
          spellCheck={false}
          disabled={disabled}
        />

        {/* Botón enviar */}
        <button
          type="submit"
          className="p-2 sm:p-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Imagen previa */}
      {image && (
        <div className="flex items-center gap-4 mt-2">
          <img
            src={URL.createObjectURL(image)}
            alt="Vista previa"
            className="h-16 sm:h-20 rounded-lg border"
          />
          <button
            type="button"
            className="text-sm text-red-600 hover:underline"
            onClick={() => setImage(null)}
          >
            Quitar imagen
          </button>
        </div>
      )}
    </form>
  );
}