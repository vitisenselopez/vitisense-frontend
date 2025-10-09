import React from "react";

const EnfermedadesFungicas = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <img
        src="/blog1.jpg"
        alt="Racimos de uva afectados por hongos"
        className="rounded-xl w-full mb-6"
      />
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Enfermedades fúngicas en el viñedo: cómo identificarlas, prevenirlas y controlarlas
      </h1>

      <p className="text-gray-700 mb-4">
        Las enfermedades fúngicas constituyen uno de los mayores desafíos para los viticultores. Su aparición puede reducir drásticamente la producción, afectar la calidad del vino y comprometer la sanidad de las plantas si no se actúa a tiempo. Conocerlas en profundidad y anticiparse es clave.
      </p>

      <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">Principales enfermedades fúngicas de la vid</h2>
      <p className="text-gray-700 mb-4">
        Existen varias enfermedades causadas por hongos que afectan al cultivo de la vid, pero tres son especialmente relevantes en zonas mediterráneas:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li><strong>Mildiu (Plasmopara viticola):</strong> aparece tras lluvias y temperaturas suaves. Provoca manchas aceitosas en hojas y necrosis en racimos.</li>
        <li><strong>Oídio (Uncinula necator):</strong> conocido como "ceniza". Ataca brotes jóvenes y racimos, cubriéndolos con un polvo blanco y deteniendo su desarrollo.</li>
        <li><strong>Botrytis (Botrytis cinerea):</strong> afecta a racimos en maduración, especialmente si hay humedad persistente. Provoca podredumbre gris y pérdidas en vendimia.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">Prevención: la clave del éxito</h2>
      <p className="text-gray-700 mb-4">
        La prevención es el arma más eficaz. Estas medidas pueden marcar la diferencia:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li><strong>Vigilancia fenológica:</strong> conoce el estado del viñedo y anticipa momentos críticos (brotación, floración, cuajado...)</li>
        <li><strong>Manejo del suelo:</strong> evita encharcamientos y mejora el drenaje.</li>
        <li><strong>Poda en verde:</strong> facilita la aireación de racimos y reduce la humedad interna.</li>
        <li><strong>Tratamientos preventivos:</strong> aplica productos autorizados en momentos clave, según condiciones climáticas y fases del cultivo.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">Cómo actuar si ya hay síntomas</h2>
      <p className="text-gray-700 mb-4">
        Ante la aparición de síntomas, actúa con rapidez:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Identifica el hongo con precisión antes de aplicar tratamientos.</li>
        <li>Usa fungicidas específicos, alternando materias activas para evitar resistencias.</li>
        <li>Refuerza la poda para eliminar partes afectadas y mejorar la ventilación.</li>
        <li>Consulta con tu asesor técnico o utiliza herramientas como VITISENSE para obtener recomendaciones personalizadas.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">Conclusión</h2>
      <p className="text-gray-700 mb-6">
        Las enfermedades fúngicas son inevitables en viticultura, pero su impacto puede reducirse drásticamente con conocimiento, prevención y decisiones ágiles. Hoy más que nunca, apoyarse en herramientas tecnológicas permite ganar tiempo y proteger la rentabilidad del viñedo.
      </p>

      <p className="text-sm text-gray-500 italic">
        Fuente: Guía técnica de sanidad vegetal en vid (Junta de Castilla-La Mancha) y elaboración propia.
      </p>
    </div>
  );
};

export default EnfermedadesFungicas;