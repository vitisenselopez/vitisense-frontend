import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige automáticamente a la página de inicio tras el pago
    navigate("/");
  }, [navigate]);

  return null; // No muestra nada en pantalla
}

export default Success;