import { useState } from "react";
import { Mail, Lock, User, MapPin, Globe } from "lucide-react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [plan, setPlan] = useState("pro");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("❌ Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3010/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, city, country }),
      });

      const data = await res.json();

      if (res.ok) {
        const stripeRes = await fetch("http://localhost:3010/api/stripe/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, plan }),
        });

        const stripeData = await stripeRes.json();
        if (stripeData.url) {
          window.location.href = stripeData.url;
        } else {
          setMessage("✅ Registro exitoso, pero error al iniciar Stripe.");
        }
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (err) {
      setMessage("❌ Error al conectar con el servidor.");
    }
  };

  return (
    <div className="h-[calc(100vh-112px)] w-full grid grid-cols-1 md:grid-cols-2">
      {/* Lado izquierdo mejorado */}
      <div className="hidden md:flex w-full flex-col justify-center items-start bg-gradient-to-br from-green-800 to-green-500 text-white p-12 relative overflow-hidden">
        <div className="z-10">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight animate-fade-in">
            Bienvenido a VITISENSE
          </h1>
          <p className="text-xl font-light mb-10 max-w-md">
            Transforma tu viñedo con inteligencia agronómica real. Diagnóstico inmediato. Sin sensores. Sin complicaciones.
          </p>
          <ul className="space-y-4 text-lg">
            <li className="flex items-center gap-3">
              <span className="text-pink-200 text-xl">🍇</span>
              Diagnóstico instantáneo y preciso
            </li>
            <li className="flex items-center gap-3">
              <span className="text-yellow-200 text-xl">📡</span>
              No requiere sensores ni hardware adicional
            </li>
            <li className="flex items-center gap-3">
              <span className="text-cyan-200 text-xl">🤖</span>
              IA entrenada por expertos reales en viñedo
            </li>
            <li className="flex items-center gap-3">
              <span className="text-purple-200 text-xl">🎁</span>
              Prueba gratuita de 7 días incluida
            </li>
          </ul>
        </div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl z-0"></div>
      </div>

      {/* Formulario */}
      <div className="flex flex-col justify-center items-center px-10 bg-gradient-to-br from-green-100 via-white to-green-200 overflow-y-auto">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Crear cuenta</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Localidad"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="País"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Confirmar contraseña"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Selector de plan */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Selecciona tu plan:
              </label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              >
                <option value="pro">
                  Suscripción VITISENSE INDIVIDUAL (9,99 €/mes)
                </option>
                <option value="coop">
                  Suscripción VITISENSE para COOPERATIVAS (249,99 €/mes)
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Registrarse
            </button>
          </form>

          {message && (
            <div className="mt-6 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm text-center">
              {message}
            </div>
          )}

          <p className="mt-6 text-sm text-center text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-green-600 hover:underline font-medium">
              Inicia sesión aquí
            </a>
          </p>
          <p className="mt-2 text-sm text-center">
            <a href="/" className="text-gray-500 hover:underline">
              Volver al inicio
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;