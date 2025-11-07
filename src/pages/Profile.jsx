import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
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

    fetchCuaderno();
  }, [navigate, API_BASE_URL]);

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

  return (
    <div className="min-h-screen bg-green-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          🌿 Cuaderno de campo
        </h2>

        <div className="flex flex-col gap-4 mb-8">
          <textarea
            className="w-full border border-gray-300 rounded-lg p-4 text-sm resize-none focus:ring-2 focus:ring-green-400 focus:outline-none"
            rows="3"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            placeholder="Ej: Tratamiento con azufre mojable el 21 de junio por mildiu"
          />
          <button
            onClick={handleAddEntry}
            className="self-start bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg transition"
          >
            Añadir entrada
          </button>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Entradas registradas
          </h3>
          <ul className="divide-y divide-gray-200">
            {cuaderno.map((item, i) => (
              <li key={i} className="py-3 text-sm text-gray-700">
                <span className="font-medium text-gray-600 mr-2">{item.fecha}:</span>
                {item.entrada}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}