export default function Message({ sender, text, imageUrl }) {
  const isBot = sender === "ai";

  return (
    <div
      className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3 px-2 sm:px-4`}
    >
      <div className="max-w-[85%] sm:max-w-[70%] space-y-2">
        {imageUrl && (
          <img
            src={typeof imageUrl === "string" ? imageUrl : URL.createObjectURL(imageUrl)}
            alt="Adjunto del mensaje"
            className="rounded-lg border border-gray-300 max-w-full sm:max-w-xs"
          />
        )}
        <div
          className={`rounded-xl px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base whitespace-pre-wrap leading-relaxed break-words ${
            isBot
              ? "bg-green-100 text-green-900 border border-green-200"
              : "bg-gray-100 text-gray-800 border border-gray-300"
          }`}
        >
          {text}
        </div>
      </div>
    </div>
  );
}