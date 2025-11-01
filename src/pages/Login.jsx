import { useState, useEffect } from "react";
import { Mail, Lock } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setMessage("✅ Suscripción realizada con éxito. Inicia sesión para acceder.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setMessage("✅ Inicio de sesión exitoso.");
        window.location.href = "/chat";
      } else {
        setMessage(data.error || "❌ Credenciales inválidas");
      }
    } catch (err) {
      setMessage("❌ Error al conectar con el servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 px-4 sm:px-6 md:px-10">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white w-full max-w-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-6">
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200 text-sm sm:text-base"
            >
              Entrar
            </button>
          </form>

          {message && (
            <div className="mt-5 text-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 text-sm">
              {message}
            </div>
          )}

          <p className="mt-4 text-center text-sm">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-green-600 hover:underline">
              Regístrate aquí
            </a>
          </p>
          <p className="mt-2 text-center text-sm">
            <a href="/" className="text-gray-600 hover:underline">
              Volver al inicio
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;