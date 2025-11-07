import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-4xl font-bold text-green-800 text-center mb-8">
          🌿 Cuaderno de campo
        </h2>

        <div className="bg-gray-50 border border-dashed border-green-300 rounded-xl p-6 mb-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Nueva entrada</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-4 text-sm resize-none focus:ring-2 focus:ring-green-400 focus:outline-none"
              rows="3"
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              placeholder="Ej: Tratamiento con azufre mojable el 21 de junio por mildiu"
            />
            <button
              onClick={handleAddEntry}
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg transition flex items-center justify-center"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Añadir entrada
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📋 Entradas registradas
          </h3>

          {cuaderno.length === 0 ? (
            <p className="text-gray-500">Aún no hay entradas registradas.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cuaderno.map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition"
                >
                  <p className="text-sm text-gray-500 mb-1">{item.fecha}</p>
                  <p className="text-gray-800 text-sm">{item.entrada}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}