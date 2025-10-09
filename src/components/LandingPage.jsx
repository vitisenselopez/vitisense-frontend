import { useNavigate } from 'react-router-dom';
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { Brain, Sparkles, ShieldCheck, MessageSquareQuote } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const stripeContainerRef = useRef(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (!document.querySelector('script[src="https://js.stripe.com/v3/pricing-table.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/pricing-table.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (stripeContainerRef.current) {
      stripeContainerRef.current.innerHTML = `
        <stripe-pricing-table
          pricing-table-id="prctbl_1RjMEHKijM02cX22jUIgBbTt"
          publishable-key="pk_live_51Rih0MKijM02cX22Vh1IAdZ7yO9703ysQa7Dwj8hMLb5VkHFjlIxgKLBz73SGixPhK9lts0mAW8Imd9zBvpVgpOI00BJhnCDF5">
        </stripe-pricing-table>`;
    }
  }, []);

  const handleStart = () => {
    navigate(isLoggedIn ? '/chat' : '/register');
  };

  return (
    <div>
      {/* HERO */}
      <section
        className="relative bg-cover bg-center h-[75vh] flex items-center justify-center text-white pt-[64px]"
        style={{ backgroundImage: 'url(/viñedo.jpg)' }}
      >
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tu técnico agrónomo, en el bolsillo
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Con VITISENSE, obtienes recomendaciones agronómicas precisas al instante, sin sensores ni complicaciones.
          </p>
          <button
            onClick={handleStart}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
          >
            Empezar prueba gratuita
          </button>
        </div>
      </section>

      {/* AGRICULTORES QUE CONFÍAN */}
<section className="py-7 bg-green-50 border-t">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
      Más de 1.000 viticultores ya han dado el paso
    </h2>
    <p className="text-lg text-gray-700 mb-12">
      Únete a quienes han dejado de depender del “ojímetro” y toman decisiones con seguridad y respaldo técnico.
    </p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div className="flex flex-col items-center">
        <p className="text-5xl font-extrabold text-green-700">+1.000</p>
        <p className="text-gray-600 mt-2">Usuarios activos</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-5xl font-extrabold text-green-700">98%</p>
        <p className="text-gray-600 mt-2">Satisfacción</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-5xl font-extrabold text-green-700">24h</p>
        <p className="text-gray-600 mt-2">Tiempo medio de respuesta</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-5xl font-extrabold text-green-700">+15</p>
        <p className="text-gray-600 mt-2">Zonas vitícolas cubiertas</p>
      </div>
    </div>
    <div className="mt-12">
      <p className="text-md text-gray-600 italic">
        Cada día, más profesionales del campo se suman a la revolución del asesoramiento inteligente.
      </p>
    </div>
  </div>
</section>

      {/* POR QUÉ USAR VITISENSE */}
<section className="py-20 bg-white border-t">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-12">
      ¿Por qué elegir VITISENSE?
    </h2>
    <div className="grid md:grid-cols-3 gap-10">
      <div className="bg-green-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
        <div className="flex justify-center mb-4">
          <Brain className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-green-800">Detecta problemas al instante</h3>
        <p className="text-gray-600">
          Evita pérdidas actuando a tiempo con diagnósticos rápidos y claros.
        </p>
      </div>
      <div className="bg-green-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
        <div className="flex justify-center mb-4">
          <Sparkles className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-green-800">IA entrenada en viticultura</h3>
        <p className="text-gray-600">
          Recomendaciones basadas en conocimiento técnico y validadas por expertos reales.
        </p>
      </div>
      <div className="bg-green-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
        <div className="flex justify-center mb-4">
          <ShieldCheck className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-green-800">Asesoramiento personalizado</h3>
        <p className="text-gray-600">
          Adaptado a la fase fenológica, clima y necesidades concretas de tu explotación.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* PLANES Y PRECIOS */}
      <section className="py-16 border-t bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Planes y precios</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-green-600 rounded-2xl p-8 shadow-lg hover:shadow-xl transition relative">
              <span className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-2xl">
                Popular
              </span>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">PLAN INDIVIDUAL</h3>
              <p className="text-4xl font-extrabold text-green-600 mb-2">9,90€</p>
              <p className="text-sm text-gray-500 mb-6">al mes, IVA incluido</p>
              <ul className="text-left text-gray-700 mb-6 space-y-2">
                <li>✔ Soluciones claras sin esperar al técnico</li>
                <li>✔ Consultas ilimitados</li>
                <li>✔ Acceso inmediato desde el móvil</li>
              </ul>
              <button
                onClick={() => navigate("/register")}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
              >
                Empezar con el plan Básico
              </button>
            </div>

            <div className="border rounded-2xl p-8 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-gray-800"> PLAN COOPERATIVAS</h3>
              <p className="text-4xl font-extrabold text-green-600 mb-2">249,90€</p>
              <p className="text-sm text-gray-500 mb-6">al mes, IVA incluido</p>
              <ul className="text-left text-gray-700 mb-6 space-y-2">
                <li>✔ Acceso para varios socios</li>
                <li>✔ Diagnósticos ilimitados</li>
                <li>✔ Soporte prioritario</li>
              </ul>
              <button
                onClick={() => navigate("/register")}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
              >
                Empezar con Cooperativas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EJEMPLO DE CHAT */}
      <section className="py-16 border-t bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Así se ve VITISENSE por dentro</h2>
          <img
            src="/ejemplo-chat.png"
            alt="Ejemplo de conversación en VITISENSE"
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
      </section>

      {/* FAQ – PREGUNTAS FRECUENTES */}
<section className="py-20 bg-gray-50 border-t">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Preguntas frecuentes</h2>
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h4 className="text-lg font-semibold text-green-800 mb-2">¿Necesito instalar sensores?</h4>
        <p className="text-gray-600">
          No. VITISENSE utiliza datos públicos y conocimiento técnico para darte asesoramiento agronómico sin necesidad de hardware adicional.
        </p>
      </div>
      <div className="bg-white shadow-md rounded-xl p-6">
        <h4 className="text-lg font-semibold text-green-800 mb-2">¿Puedo usarlo sin experiencia técnica?</h4>
        <p className="text-gray-600">
          Por supuesto. Ha sido diseñado para ser intuitivo y accesible a cualquier agricultor, sin importar su familiaridad con la tecnología.
        </p>
      </div>
      <div className="bg-white shadow-md rounded-xl p-6">
        <h4 className="text-lg font-semibold text-green-800 mb-2">¿Cómo accedo al chat inteligente?</h4>
        <p className="text-gray-600">
          Solo tienes que pulsar en <strong>“Empezar ahora”</strong>, crear tu cuenta y comenzar a conversar con tu asesor técnico.
        </p>
      </div>
      <div className="bg-white shadow-md rounded-xl p-6">
        <h4 className="text-lg font-semibold text-green-800 mb-2">¿Qué incluye la suscripción?</h4>
        <p className="text-gray-600">
          Acceso al chat agronómico, recomendaciones personalizadas y actualizaciones constantes del sistema. Sin permanencia.
        </p>
      </div>
    </div>
  </div>
</section>

{/* BLOG DESTACADO */}
<section className="py-20 bg-white border-t">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
      Artículos clave para sacar más rendimiento a tu explotación
    </h2>
    <p className="text-lg text-gray-700 mb-12">
      Artículos técnicos y consejos prácticos para sacar el máximo partido a tu viñedo.
    </p>

    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-green-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden">
        <img src="/blog1.jpg" alt="Artículo 1" className="w-full h-40 object-cover" />
        <div className="p-6 text-left">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Cómo prevenir enfermedades fúngicas en tu viñedo</h3>
          <p className="text-sm text-gray-600 mb-4">
            Consejos clave para proteger tu cultivo en momentos críticos. 
          </p>
          <a href="/blog/enfermedades-fungicas" className="text-green-600 hover:underline text-sm font-semibold">Leer artículo</a>
        </div>
      </div>

      <div className="bg-green-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden">
        <img src="/blog2.jpg" alt="Artículo 2" className="w-full h-40 object-cover" />
        <div className="p-6 text-left">
          <h3 className="text-lg font-semibold text-green-800 mb-2">La importancia del suelo en la calidad de la uva</h3>
          <p className="text-sm text-gray-600 mb-4">
            Un repaso a los factores edáficos más relevantes para lograr un vino excelente.
          </p>
          <a href="/blog/importancia-suelo-uva" className="text-green-600 hover:underline text-sm font-semibold">Leer artículo</a>
        </div>
      </div>

      <div className="bg-green-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden">
        <img src="/blog3.jpg" alt="Artículo 3" className="w-full h-40 object-cover" />
        <div className="p-6 text-left">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Fenología de la vid: claves para cada fase</h3>
          <p className="text-sm text-gray-600 mb-4">
            Qué observar y cómo actuar en cada momento del ciclo de la planta.
          </p>
          <a href="/blog/fenologia-vid" className="text-green-600 hover:underline text-sm font-semibold">Leer artículo</a>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* CTA FINAL */}
      <section className="py-16 border-t bg-green-50">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-6">Deja de adivinar qué le pasa a tu viña.</h2>
    <p className="mb-6">Empieza hoy con 7 días gratis y descubre lo fácil que es tener un técnico en tu bolsillo.</p>
    <button
      onClick={() => {
        const token = localStorage.getItem('token');
        const isLoggedIn = !!token;
        window.location.href = isLoggedIn ? '/chat' : '/register';
      }}
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
    >
      Empezar prueba gratuita
    </button>
  </div>
</section>

      <footer className="bg-green-700 text-white px-6 pt-14 pb-0 border-t border-green-800">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">
    
    {/* Contacto */}
    <div>
      <h4 className="text-white font-semibold mb-4">Contacto</h4>
      <ul className="space-y-2 text-white/80">
        <li>📍 Calle moro, 44 - 16220 Quintanar del Rey  (Cuenca)</li>
        <li>📞 (+34) 653 613 796</li>
        <li>
          📧{" "}
          <a href="mailto:soporte@vitisense.com" className="hover:underline">
            soporte@vitisense.com
          </a>
        </li>
      </ul>
      <div className="mt-4">
        <h5 className="font-semibold">Horario</h5>
        <p className="text-white/80">
          <strong>De lunes a viernes:</strong> 9:00–14:00 <br />
          <strong>Sábados:</strong> 10:00–13:30
        </p>
      </div>
    </div>

    {/* Atención al cliente */}
    <div>
      <h4 className="text-white font-semibold mb-4">Atención al cliente</h4>
      <ul className="space-y-2 text-white/80">
        <li>
          <a href="/contacto" className="hover:underline">
            Formulario de contacto
          </a>
        </li>
        <li>
          <a href="/terminos" className="hover:underline">
            Términos de servicio
          </a>
        </li>
        <li>
          <a href="/privacidad" className="hover:underline">
            Política de privacidad
          </a>
        </li>
        <li>
          <a href="/cookies" className="hover:underline">
            Política de cookies
          </a>
        </li>
      </ul>
    </div>

    {/* Boletín de novedades */}
    <div>
      <h4 className="text-white font-semibold mb-4">Boletín de novedades</h4>
      <p className="text-white/80 mb-2">
        Suscríbete y recibe consejos técnicos y avisos agronómicos.
      </p>
      <form className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Tu correo electrónico"
          className="px-3 py-2 rounded-md text-black placeholder-gray-500 text-sm"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 transition rounded-md py-2 text-sm font-semibold"
        >
          Suscribirse
        </button>
        <label className="text-xs flex items-center gap-2 mt-1">
          <input type="checkbox" required />
          <span>
            He leído y acepto la{" "}
            <a href="/privacidad" className="underline">
              Política de privacidad
            </a>
          </span>
        </label>
      </form>
    </div>

    {/* Redes sociales */}
    <div>
      <h4 className="text-white font-semibold mb-4">Síguenos en redes</h4>
      <div className="flex gap-4 items-center">
        {/* Facebook */}
        <a href="https://facebook.com/VITISENSE" target="_blank" rel="noreferrer">
          <svg className="h-5 fill-white/80 hover:fill-white transition" viewBox="0 0 24 24">
            <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H8v-2.88h2.5V9.85c0-2.48 1.5-3.85 3.78-3.85 1.09 0 2.24.2 2.24.2v2.46H15.8c-1.23 0-1.58.76-1.58 1.54v1.87h2.7l-.43 2.88h-2.27v6.99A10 10 0 0 0 22 12z" />
          </svg>
        </a>
        {/* Instagram */}
        <a href="https://instagram.com/VITISENSE" target="_blank" rel="noreferrer">
          <svg className="h-5 fill-white/80 hover:fill-white transition" viewBox="0 0 24 24">
            <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.6 0 3 1.4 3 3v10c0 1.6-1.4 3-3 3H7c-1.6 0-3-1.4-3-3V7c0-1.6 1.4-3 3-3h10zm-5 3a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7zm0 2a3 3 0 1 1 .001 6.001A3 3 0 0 1 12 9zm4.5-.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </a>
        {/* TikTok */}
        <a href="https://tiktok.com/@VITISENSE" target="_blank" rel="noreferrer">
          <svg className="h-5 fill-white/80 hover:fill-white transition" viewBox="0 0 24 24">
            <path d="M16.4 2h-3v14.1a3.3 3.3 0 1 1-3.3-3.3c.3 0 .6 0 .9.1V9.7c-.3 0-.6-.1-.9-.1a6.3 6.3 0 1 0 6.3 6.3V9.7c1 .6 2.2.9 3.4.9v-3a3.4 3.4 0 0 1-3.4-3.4z" />
          </svg>
        </a>
      </div>
    </div>
  </div>

   {/* Franja inferior SIN límite */}
  <div className="w-full bg-green-50 text-green-800 text-xs text-center py-4 border-t border-green-100 mt-10">
    &copy; {new Date().getFullYear()} VITISENSE. Todos los derechos reservados. CIF: B21945217 · Proyecto desarrollado por agrónomos en activo.
  </div>
</footer>
</div>
);
}