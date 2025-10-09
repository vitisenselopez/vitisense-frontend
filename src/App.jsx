import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import TopBanner from "./components/TopBanner";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Chat from "./components/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Cancel from "./pages/Cancel";
import Success from "./pages/Success";

// Rutas legales
import Terminos from "./pages/Terminos";
import Privacidad from "./pages/Privacidad";
import Cookies from "./pages/Cookies";
import Formulario from "./pages/FormularioContacto";

// Artículos del blog
import EnfermedadesFungicas from "./pages/EnfermedadesFungicas";
import SueloUva from "./pages/SueloUva";
import FenologiaVid from "./pages/FenologiaVid";

// Scroll to top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <TopBanner />
        <Navbar />

        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/chat"
              element={
                <div className="h-full overflow-auto overscroll-contain flex">
                  <div className="w-full max-w-[1400px] mx-auto">
                    <Chat />
                  </div>
                </div>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/success" element={<Success />} />

            {/* Rutas legales */}
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/contacto" element={<Formulario />} />

            {/* Rutas a artículos del blog */}
<Route path="/blog/enfermedades-fungicas" element={<EnfermedadesFungicas />} />
<Route path="/blog/importancia-suelo-uva" element={<SueloUva />} />
<Route path="/blog/fenologia-vid" element={<FenologiaVid />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;