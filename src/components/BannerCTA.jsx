export default function BannerCTA() {
  return (
    <section className="bg-green-50 py-12">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
          ¿Listo para mejorar tus decisiones agronómicas?
        </h2>
        <p className="text-lg md:text-xl text-green-700 mb-6">
          Comienza gratis con VITISENSE y transforma tu viñedo con ayuda de la inteligencia artificial.
        </p>
        <a
          href="/chat"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded"
        >
          Empezar ahora
        </a>
      </div>
    </section>
  );
}