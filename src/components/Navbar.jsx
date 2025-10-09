import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm px-4 py-3 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        <img src="/logo.png" alt="VITISENSE" className="h-10 w-auto" />
      </Link>

      <div className="flex items-center space-x-4 text-sm font-medium">
        <Link to="/" className="text-gray-700 hover:text-green-600">Inicio</Link>

        {isLoggedIn ? (
          <>
            <Link to="/chat">
              <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Chat</button>
            </Link>
            <Link to="/profile">
              <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Mi perfil</button>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-green-600 hover:underline">Iniciar sesión</Link>
            <Link to="/register" className="text-green-600 hover:underline">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}