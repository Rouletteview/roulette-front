
import Header from "../../components/Header"
import { useLocation } from "react-router";
import Popup from "../components/PopUp";
import { useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import PhoneImage from "../../components/auth/PhoneImage";


const LoginPage = () => {
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
        <a
          href="/"
          className="bg-[#D9A425] hover:bg-[#B3831D] transition-all px-4 py-2 rounded-xl text-center text-white "
        >
          Ir al inicio
        </a>
      </Header>
      <section
        className="w-full  bg-center bg-cover flex items-center justify-center text-white relative"
        style={{ backgroundImage: "url('/background/view-roulette-casino.webp')" }}
      >
        <div className="w-full min-h-screen grid lg:grid-cols-3 justify-center items-center px-6 pt-11  ">

          <div className="   col-span-2 lg:px-28  xl:px-48">
            <div className="text-center my-8">
              <h1 className="text-[28px] md:text-[32px] text-white leading-8 md:leading-12 font-medium">
                Inicia sesión para acceder a los datos que necesitas para ganar
              </h1>
            </div>

            <div className="w-full">
              <LoginForm />
            </div>
          </div>

          <PhoneImage />
        </div>
        {showPopup && <Popup message={message || "Mensaje no disponible"} onClose={closePopup} />}
      </section>
    </>

  )
}

export default LoginPage
