export default function Benefits() {
  const features = [
    {
      title: "Recomendaciones fiables",
      description: "Recibe respuestas basadas en datos reales y buenas prácticas agronómicas.",
    },
    {
      title: "Asistencia inmediata",
      description: "Consulta al instante sin esperar a un técnico en campo.",
    },
    {
      title: "Ahorro de costes",
      description: "Evita errores costosos y mejora tu rendimiento con decisiones precisas.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">¿Por qué usar VITISENSE?</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-green-700 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}