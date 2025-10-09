// Header.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="w-full h-16 bg-white shadow-md px-6 py-3 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center">
        <Link to="/">
          <img
            src="/logo.png"
            alt="VITISENSE Logo"
            className="h-10 w-auto"
          />
        </Link>
      </div>

      <nav className="flex items-center gap-4 text-sm font-medium">
        <Link
          to="/"
          className={`text-gray-700 hover:text-green-700 transition ${
            location.pathname === "/" ? "font-semibold" : ""
          }`}
        >
          Inicio
        </Link>

        {isLoggedIn && (
          <Link
            to="/chat"
            className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition ${
              location.pathname === "/chat" ? "bg-green-700" : ""
            }`}
          >
            Mis chats
          </Link>
        )}

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Registrarse
            </button>
          </>
        )}
      </nav>
    </header>
  );
}