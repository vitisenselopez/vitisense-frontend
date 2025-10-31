import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onRenameConversation,
  onDeleteConversation,
  onLogout,
}) {
  const [renameId, setRenameId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (renameId) {
      const conversation = conversations.find((c) => c.id === renameId);
      setNewTitle(conversation ? conversation.title : "");
    }
  }, [renameId, conversations]);

  return (
    <>
      {/* Botón hamburguesa toggle — siempre a la derecha del logo en móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-[68px] left-36 z-50 p-2 bg-white rounded-full shadow-md border border-gray-200"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isOpen ? <X className="text-gray-800" /> : <Menu className="text-gray-800" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-[102px] left-0 z-40 w-64 bg-white shadow-lg flex flex-col h-[calc(100vh-112px)] transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:flex`}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Mis conversaciones</h2>
          <button
            onClick={onNewConversation}
            className="text-green-600 font-bold hover:text-green-800"
            aria-label="Nueva conversación"
            title="Nueva conversación"
          >
            +
          </button>
        </header>

        <nav className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                onSelectConversation(c.id);
                setIsOpen(false);
              }}
              className={`cursor-pointer px-5 py-3 truncate border-b border-gray-100
                ${
                  c.id === activeConversationId
                    ? "bg-green-50 font-semibold text-green-800"
                    : "hover:bg-gray-100"
                }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onSelectConversation(c.id)}
            >
              <div className="flex justify-between items-center">
                <span className="truncate max-w-[70%]">{c.title}</span>
                <div className="flex space-x-4 text-sm">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRenameId(c.id);
                    }}
                    className="text-green-600 hover:underline"
                    aria-label={`Renombrar conversación ${c.title}`}
                    title="Renombrar"
                  >
                    Editar
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(c.id);
                    }}
                    className="text-red-500 hover:underline"
                    aria-label={`Eliminar conversación ${c.title}`}
                    title="Eliminar"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </nav>

        <footer className="p-5 border-t border-gray-200 space-y-4">
          <button
            onClick={onLogout}
            className="w-full py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </footer>
      </aside>

      {/* Modal renombrar */}
      {renameId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Renombrar conversación</h2>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
              aria-label="Nuevo título conversación"
            />
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                onClick={() => setRenameId(null)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
                onClick={() => {
                  onRenameConversation(renameId, newTitle.trim() || "Sin título");
                  setRenameId(null);
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}