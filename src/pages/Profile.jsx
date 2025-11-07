// Nuevo diseño completo del cuaderno con edición y eliminación
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

export default function Profile() {
  const [cuaderno, setCuaderno] = useState([]);
  const [entrada, setEntrada] = useState("");
  const [editando, setEditando] = useState(null);
  const [entradaEditada, setEntradaEditada] = useState("");

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

  const handleDelete = async (index) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/api/cuaderno/${index}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCuaderno(data);
    } catch (err) {
      console.error("❌ Error al eliminar entrada:", err);
    }
  };

  const handleEdit = (index, current) => {
    setEditando(index);
    setEntradaEditada(current);
  };

  const handleSaveEdit = async (index) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/api/cuaderno/${index}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ entrada: entradaEditada }),
      });
      const data = await res.json();
      setCuaderno(data);
      setEditando(null);
    } catch (err) {
      console.error("❌ Error al editar entrada:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 shadow-2xl rounded-2xl p-10">
        <h2 className="text-4xl font-bold text-green-800 text-center mb-4">
  🌿 Cuaderno de campo
</h2>
<p className="text-center text-gray-600 text-sm max-w-2xl mx-auto mb-10">
  Las anotaciones que registres aquí son tenidas en cuenta por el sistema para ofrecerte recomendaciones más precisas, personalizadas y útiles en el chat. Cuanto más anotes, mejor te conocerá.
</p>

        <section className="mb-12">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6 shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Añadir nueva actuación</h3>
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
                <PlusCircle className="w-5 h-5" /> Añadir entrada
              </button>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📋 Registro de actuaciones
          </h3>

          {cuaderno.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No hay actuaciones registradas.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border rounded-xl">
                <thead className="bg-green-100 text-sm text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">Fecha</th>
                    <th className="px-4 py-3 text-left">Descripción</th>
                    <th className="px-4 py-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-sm divide-y divide-gray-200">
                  {cuaderno.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-600">
                        {item.fecha}
                      </td>
                      <td className="px-4 py-3">
                        {editando === i ? (
                          <textarea
                            className="w-full border rounded p-2 text-sm"
                            value={entradaEditada}
                            onChange={(e) => setEntradaEditada(e.target.value)}
                          />
                        ) : (
                          item.entrada
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {editando === i ? (
                          <button
                            onClick={() => handleSaveEdit(i)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                          >
                            Guardar
                          </button>
                        ) : (
                          <div className="flex justify-center gap-3">
                            <button
                              onClick={() => handleEdit(i, item.entrada)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(i)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}