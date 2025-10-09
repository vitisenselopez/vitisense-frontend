import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import useAuth from "../hooks/useAuth";

const API_BASE_URL = import.meta.env.PROD ? "" : "http://localhost:3010";

export default function Chat() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem("token");

  useAuth(); // ✅ solo redirige si no hay token

  useEffect(() => {
    if (!token) return;

    const fetchEmail = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setEmail(data.email);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
        navigate("/login");
      }
    };

    fetchEmail();
  }, [token, navigate]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!email) return;
      try {
        const res = await fetch(`${API_BASE_URL}/api/conversations/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (Array.isArray(data.conversations)) {
          setConversations(data.conversations);
          if (data.conversations.length > 0) {
            setActiveConversationId(data.conversations[0].id);
            setMessages(data.conversations[0].messages);
          }
        }
      } catch (error) {
        console.error("Error al obtener conversaciones:", error);
      }
    };

    fetchConversations();
  }, [email, token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectConversation = (id) => {
    const conv = conversations.find((c) => c.id === id);
    if (conv) {
      setActiveConversationId(id);
      setMessages(conv.messages);
    }
  };

  const handleNewConversation = async () => {
    if (!email) return;

    const res = await fetch(`${API_BASE_URL}/api/conversations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setConversations((prev) => [data.conversation, ...prev]);
    setActiveConversationId(data.conversation.id);
    setMessages([]);
  };

  const handleRenameConversation = async (id, newTitle) => {
    if (!email) return;

    await fetch(`${API_BASE_URL}/api/conversations/${email}/${id}/title`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newTitle }),
    });

    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
    );
  };

  const handleDeleteConversation = async (id) => {
    if (!email) return;

    await fetch(`${API_BASE_URL}/api/conversations/${email}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const updated = conversations.filter((c) => c.id !== id);
    setConversations(updated);

    if (activeConversationId === id) {
      if (updated.length > 0) {
        setActiveConversationId(updated[0].id);
        setMessages(updated[0].messages);
      } else {
        setActiveConversationId(null);
        setMessages([]);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSend = async (formData) => {
    if (!email) return;

    const text = formData.get("text") || "";
    const imageFile = formData.get("image");
    formData.append("history", JSON.stringify(messages));

    const tempMessage = {
      sender: "user",
      text,
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : null,
    };

    const newMessages = [...messages, tempMessage];
    setMessages(newMessages);

    try {
      const res = await fetch(`${API_BASE_URL}/api/messages`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      const botMessage = {
        sender: "ai",
        text: data.response,
        imageUrl: null,
      };

      const updatedMessages = [...newMessages, botMessage];
      setMessages(updatedMessages);

      const payload = {
        messages: updatedMessages,
      };

      if (!activeConversationId) {
        const createRes = await fetch(`${API_BASE_URL}/api/conversations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email }),
        });

        const createData = await createRes.json();
        setActiveConversationId(createData.conversation.id);
        setConversations((prev) => [createData.conversation, ...prev]);

        // Guardar mensajes tras crear conversación
        await fetch(`${API_BASE_URL}/api/conversations/${email}/${createData.conversation.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API_BASE_URL}/api/conversations/${email}/${activeConversationId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  return (
    <div className="fixed top-[112px] left-0 right-0 bottom-0 flex overflow-hidden">
      <div className="w-64 h-full border-r border-gray-200">
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          onRenameConversation={handleRenameConversation}
          onDeleteConversation={handleDeleteConversation}
          onLogout={handleLogout}
        />
      </div>

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-600 space-y-2">
                <p className="text-xl font-semibold text-green-700">👋 Hola, soy VITISENSE</p>
                <p className="text-base text-gray-700">Tu asesor técnico experto en viticultura.</p>
                <p className="text-sm text-gray-500">Escribe tu consulta sobre la vid para que pueda ayudarte.</p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <Message
                  key={index}
                  sender={msg.sender}
                  text={msg.text}
                  imageUrl={msg.imageUrl}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <MessageInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}