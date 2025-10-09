import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cancel() {
  const navigate = useNavigate();

  useEffect(() => {
    // Espera 1 segundo y redirige al inicio
    const timer = setTimeout(() => {
      navigate("/");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-[80vh] text-center">
      <div>
        <h1 className="text-2xl font-bold text-red-600 mb-4">Suscripción cancelada</h1>
        <p className="text-gray-700">Redirigiendo a la página principal...</p>
      </div>
    </div>
  );
}