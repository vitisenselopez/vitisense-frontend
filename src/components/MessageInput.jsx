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

    onSend(formData); // ← aquí se envía FormData al backend

    setInput("");
    setImage(null);
    e.target.reset(); // limpia input de tipo file
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center bg-white border-t border-gray-200 px-4 py-3 shadow-sm max-w-4xl mx-auto w-full gap-2"
      encType="multipart/form-data"
    >
      <div className="flex w-full items-center gap-2">
        <label
          htmlFor="image-upload"
          className="cursor-pointer text-gray-500 hover:text-green-600"
          title="Adjuntar imagen"
        >
          <Image className="w-6 h-6" />
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          disabled={disabled}
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu consulta sobre la viña..."
          className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900"
          autoComplete="off"
          spellCheck={false}
          disabled={disabled}
        />
        <button
          type="submit"
          className="px-4 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {image && (
        <div className="w-full mt-2 flex items-center gap-4">
          <img
            src={URL.createObjectURL(image)}
            alt="Vista previa"
            className="h-20 rounded-lg border"
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