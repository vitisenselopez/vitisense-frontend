import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Asegúrate de tener lucide-react instalado

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src="/logo.png" alt="VITISENSE" className="h-10 w-auto" />
      </Link>

      {/* Botón Hamburguesa (solo en móvil) */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menú normal en desktop */}
      <div className="hidden md:flex items-center space-x-4 text-sm font-medium">
        <Link to="/" className="text-gray-700 hover:text-green-600">Inicio</Link>

        {isLoggedIn ? (
          <>
            <Link to="/chat">
              <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Chat</button>
            </Link>
            <Link to="/profile">
              <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Cuaderno de campo</button>
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

      {/* Menú desplegable en móvil */}
      {menuOpen && (
  <div className="absolute top-16 left-0 w-full bg-white shadow-md px-4 py-3 flex flex-col space-y-2 text-sm font-medium md:hidden z-50">
          <Link to="/" className="text-gray-700 hover:text-green-600" onClick={() => setMenuOpen(false)}>Inicio</Link>

          {isLoggedIn ? (
            <>
              <Link to="/chat" onClick={() => setMenuOpen(false)}>
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full">Chat</button>
              </Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full">Cuaderno de campo</button>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-green-600 hover:underline" onClick={() => setMenuOpen(false)}>Iniciar sesión</Link>
              <Link to="/register" className="text-green-600 hover:underline" onClick={() => setMenuOpen(false)}>Registrarse</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}