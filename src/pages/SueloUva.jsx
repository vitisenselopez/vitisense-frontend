import React from "react";

const SueloUva = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        La importancia del suelo en la calidad de la uva
      </h1>

      <img
        src="/blog2.jpg"
        alt="Suelo y calidad de la uva"
        className="rounded-xl w-full mb-8"
      />

      <p className="text-gray-700 mb-6">
        El suelo es uno de los factores más determinantes en la calidad final de la uva y, por ende, del vino. Un suelo bien estructurado, con buen drenaje, rica microbiota y balanceado en nutrientes, favorece un desarrollo óptimo de la vid.
      </p>

      <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">
        ¿Qué factores edáficos influyen?
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li><strong>Textura:</strong> Arenosos, arcillosos o limosos; cada uno tiene ventajas y desventajas.</li>
        <li><strong>pH:</strong> Idealmente entre 6 y 7 para una correcta absorción de nutrientes.</li>
        <li><strong>Materia orgánica:</strong> Aporta nutrientes, mejora estructura y retención de agua.</li>
        <li><strong>Drenaje:</strong> Evita encharcamientos que perjudican la raíz.</li>
        <li><strong>Presencia de caliza activa:</strong> Puede afectar a la disponibilidad de hierro y causar clorosis férrica.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">
        Prácticas recomendadas
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Analizar el suelo antes de plantar o abonar.</li>
        <li>Corregir desequilibrios con enmiendas orgánicas o minerales.</li>
        <li>Favorecer la actividad microbiana con cubiertas vegetales o compost.</li>
        <li>Evitar compactaciones con laboreo adecuado.</li>
      </ul>

      <p className="text-sm text-gray-500 italic">
        Fuente: Manual de viticultura ecológica – Junta de Castilla-La Mancha (adaptado).
      </p>
    </div>
  );
};

export default SueloUva;