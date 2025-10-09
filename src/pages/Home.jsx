import Header from "../components/Header";
import Hero from "../components/Hero";
import BannerCTA from "../components/BannerCTA";
import Benefits from "../components/Benefits";
import TopBanner from "../components/TopBanner";

export default function Home() {
  return (
    <div>
      {/* Cabecera con botón inteligente (detecta token) */}
      <Header />

      {/* Barra superior promocional */}
      <TopBanner />

      {/* Sección principal Hero */}
      <Hero />

      {/* CTA promocional */}
      <BannerCTA />

      {/* Beneficios / Características */}
      <Benefits />
      
      {/* Aquí puedes añadir más secciones si quieres */}
    </div>
  );
}