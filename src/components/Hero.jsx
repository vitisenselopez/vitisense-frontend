import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <header className="w-full bg-white shadow-sm px-6 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="VITISENSE Logo"
          className="h-10 w-auto"
        />
      </div>
      <nav className="flex items-center gap-6 text-sm font-medium">
        <Link to="/" className="text-gray-600 hover:text-black">
          Inicio
        </Link>
        <button
          onClick={() => {
            if (isLoggedIn) {
              navigate("/chat");
            } else {
              navigate("/register");
            }
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
        >
          Empezar ahora
        </button>
      </nav>
    </header>
  );
}