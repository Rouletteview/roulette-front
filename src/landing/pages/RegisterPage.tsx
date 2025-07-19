

import { Link, useLocation } from "react-router";
import { useState } from "react";
import Popup from "../components/PopUp";
import Header from "../../components/Header";
import RegisterForm from "../components/forms/RegisterForm";
import PhoneImage from "../../components/auth/PhoneImage";



const RegisterPage = () => {

  const location = useLocation();
  const message = location.state?.message;
  const ok = location.state?.ok;

  const [showPopup, setShowPopup] = useState(ok || false);

  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <>
      <Header>
        <Link to="/iniciar-sesion" className="border border-[#D9A425] hover:border-[#B3831D] transition-all px-4 py-2 rounded-xl text-center hidden md:block">Iniciar sesión</Link>
        <Link
          to="/"
          className="bg-[#D9A425] hover:bg-[#B3831D] transition-all px-4 py-2 rounded-xl text-center text-white yellow-button-shadow"
        >
          Ir al inicio
        </Link>
      </Header>

      <section
        className="w-full  bg-center bg-cover flex items-center justify-center text-white relative"
        style={{ backgroundImage: "url('/background/view-roulette-casino.webp')" }}
      >
        <div className="w-full min-h-screen grid lg:grid-cols-3 items-center px-6 pt-32 ">
          
          <div className="lg:mx-20  col-span-2">
            <div className="text-center my-8">
              <h1 className="text-lg md:text-[32px] text-white leading-6 md:leading-12 font-bold mx-8">
                <span className="text-[#D9A425] font-medium">
                  ¡Únete a nuestra comunidad de jugadores inteligentes!
                </span>{" "}
                Crea tu cuenta ahora para acceder a las herramientas más avanzadas de análisis de la
                ruleta.
              </h1>
            </div>

            <div className="w-full">
              <RegisterForm />
            </div>
          </div>

          <PhoneImage />
        </div>
        {showPopup && <Popup message={message || "Mensaje no disponible"} onClose={closePopup} />}
      </section>
    </>
  )
}

export default RegisterPage
