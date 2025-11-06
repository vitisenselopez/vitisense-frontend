import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [hasStripeCustomerId, setHasStripeCustomerId] = useState(false);
  const [cuaderno, setCuaderno] = useState([]);
  const [entrada, setEntrada] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.customerId) setHasStripeCustomerId(true);
      } catch (err) {
        console.error("❌ Error comprobando customerId:", err);
      }
    };

    const fetchCuaderno = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/cuaderno`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setCuaderno(data);
        }
      } catch (err) {
        console.error("❌ Error al cargar cuaderno:", err);
      }
    };

    fetchUserData();
    fetchCuaderno();
  }, [navigate, API_BASE_URL]);

  const handleOpenCustomerPortal = async () => {
    const token = localStorage.getItem("token");
    setLoadingPortal(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/stripe/customer-portal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No se recibió URL del portal");
      }
    } catch (err) {
      console.error("❌ Error al abrir el portal:", err);
      setError("❌ No se pudo abrir el portal de suscripción.");
      setLoadingPortal(false);
    }
  };

  const handleCancelRequest = async () => {
    const token = localStorage.getItem("token");
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        setSuccess("✅ Solicitud de cancelación enviada correctamente.");
        setMessage("");
      } else {
        throw new Error("Error al enviar la solicitud");
      }
    } catch (err) {
      console.error("❌ Error al enviar solicitud:", err);
      setError("❌ Error al enviar la solicitud. Intenta más tarde.");
    }
  };

  const handleAddEntry = async () => {
    if (!entrada.trim()) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/api/cuaderno`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ entrada }),
      });
      const data = await res.json();
      setCuaderno(data);
      setEntrada("");
    } catch (err) {
      console.error("❌ Error al guardar entrada:", err);
    }
  };

  const handleLogout = () => {
    if (!window.confirm("¿Seguro que quieres cerrar sesión?")) return;
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-green-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl font-bold text-green-800 mb-4">👤 Mi perfil</h2>
          <p className="text-lg text-gray-800 mb-1">
            Bienvenido, <strong>Agricultor</strong>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Gestiona tu cuenta y tu suscripción desde aquí.
          </p>

          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Gestión de suscripción</h3>
            {hasStripeCustomerId ? (
              <button
                onClick={handleOpenCustomerPortal}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition disabled:opacity-50"
                disabled={loadingPortal}
              >
                {loadingPortal ? "Cargando..." : "Gestionar suscripción en Stripe"}
              </button>
            ) : (
              <div>
                <label className="block text-gray-700 mb-2">¿Deseas cancelar tu suscripción?</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded mb-4 resize-none"
                  rows="3"
                  placeholder="Motivo de la cancelación..."
                />
                <button
                  onClick={handleCancelRequest}
                  className="bg-yellow-700 hover:bg-yellow-800 text-white px-5 py-2 rounded transition"
                >
                  Cancelar suscripción
                </button>
              </div>
            )}
            {success && <div className="p-4 bg-green-100 text-green-800 rounded mt-4">{success}</div>}
            {error && <div className="p-4 bg-red-100 text-red-800 rounded mt-4">{error}</div>}
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cuenta</h3>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center bg-white shadow rounded-xl p-8">
          <h3 className="text-3xl font-bold text-green-800 mb-4">🌿 Cuaderno de campo</h3>
          <textarea
            className="w-full border border-gray-300 rounded p-3 mb-4 resize-none"
            rows="3"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            placeholder="Ej: Tratamiento con azufre mojable el 21 de junio por mildiu"
          />
          <button
            onClick={handleAddEntry}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded mb-6"
          >
            Añadir entrada
          </button>

          <div className="w-full">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Entradas registradas:</h4>
            <ul className="list-disc pl-5 space-y-1 max-h-60 overflow-y-auto">
              {cuaderno.map((item, i) => (
                <li key={i} className="text-gray-700 text-sm">
                  {item.fecha}: {item.entrada}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}