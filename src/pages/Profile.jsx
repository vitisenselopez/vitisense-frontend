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
        if (Array.isArray(data)) setCuaderno(data);
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 shadow-2xl rounded-2xl p-10">
        <h2 className="text-4xl font-bold text-green-800 text-center mb-10">
          🌿 Cuaderno de campo
        </h2>

        {/* NUEVA ENTRADA */}
        <div className="mb-12">
          <div className="bg-gray-100 border-l-4 border-green-500 rounded-lg p-6 shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Añadir nueva entrada
            </h3>
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
              <textarea
                className="w-full border border-gray-300 rounded-lg p-4 text-sm resize-none focus:ring-2 focus:ring-green-500 focus:outline-none"
                rows="3"
                value={entrada}
                onChange={(e) => setEntrada(e.target.value)}
                placeholder="Ej: Tratamiento con azufre mojable el 21 de junio por mildiu"
              />
              <button
                onClick={handleAddEntry}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow flex items-center gap-2 transition"
              >
                <PlusCircle className="w-5 h-5" />
                Añadir entrada
              </button>
            </div>
          </div>
        </div>

        {/* ENTRADAS REGISTRADAS */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📋 Registro de actuaciones
          </h3>

          {cuaderno.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No hay entradas registradas por el momento.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {cuaderno.map((item, i) => (
                <div
                  key={i}
                  className="border border-gray-300 bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-all duration-200"
                >
                  <div className="text-xs text-gray-500 font-semibold mb-2">
                    Fecha de registro: {item.fecha}
                  </div>
                  <div className="text-sm text-gray-800 leading-snug">
                    {item.entrada}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}