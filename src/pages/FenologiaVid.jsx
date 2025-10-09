// src/pages/Blog/FenologiaVid.jsx
import React from "react";

const FenologiaVid = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <img
        src="/blog3.jpg"
        alt="Fenología de la vid"
        className="w-full h-auto rounded-xl mb-10 shadow-lg"
      />

      <h1 className="text-4xl font-bold text-green-700 mb-6">
        Fenología de la vid: claves para cada fase
      </h1>

      <p className="text-lg mb-6 text-gray-700">
        Conocer las distintas fases fenológicas de la vid permite tomar decisiones agronómicas más acertadas en cada momento del ciclo. Desde la brotación hasta la maduración, cada etapa requiere un seguimiento técnico y actuaciones concretas que impactan directamente en la sanidad y calidad del cultivo.
      </p>

      <h2 className="text-2xl font-semibold text-green-700 mb-4 mt-10">Fases principales del ciclo fenológico</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>
          <strong>Brotación:</strong> Primeros signos de actividad tras la parada invernal. Momento clave para monitoreo de heladas y aplicación de tratamientos preventivos.
        </li>
        <li>
          <strong>Floración:</strong> Etapa crítica para la fecundación y cuajado del fruto. La planta es especialmente sensible al estrés hídrico y a condiciones climáticas adversas.
        </li>
        <li>
          <strong>Cuajado y envero:</strong> Formación y cambio de color del fruto. Es el momento de ajustar fertilización y monitorear enfermedades como mildiu o oídio.
        </li>
        <li>
          <strong>Maduración:</strong> Última fase antes de la vendimia. Se controla la carga, la calidad del mosto y se realizan ajustes de riego y nutrición.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-green-700 mb-4 mt-10">Importancia de un seguimiento técnico</h2>
      <p className="text-gray-700 mb-6">
        Cada fase fenológica es una oportunidad para actuar con precisión. Detectar síntomas, ajustar labores culturales y prevenir enfermedades requiere observación constante y conocimientos técnicos. Herramientas como VITISENSE permiten recibir asesoramiento personalizado en función de la fase del ciclo y las condiciones del entorno.
      </p>

      <h2 className="text-2xl font-semibold text-green-700 mb-4 mt-10">Conclusión</h2>
      <p className="text-gray-700 mb-6">
        La fenología no es solo una cuestión académica: es una hoja de ruta práctica para cuidar el viñedo. Saber en qué fase está tu planta es saber qué necesita.
      </p>

      <p className="text-sm text-gray-500 italic">
        Fuente: Manual de viticultura del Ministerio de Agricultura (MAPA) y elaboración propia.
      </p>
    </div>
  );
};

export default FenologiaVid;