
import Header from "../../components/Header"
import img from "../../assets/images/phone-auth.png"
import { useLocation } from "react-router";
import Popup from "../components/PopUp";
import { useState } from "react";
import LoginForm from "../components/forms/LoginForm";


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

          <div className="absolute bottom-0 right-0 hidden lg:block ">
            <div className="relative z-10 drop-shadow-[0_0_25px_rgba(217, 164, 37, 1)]
      before:content-[''] before:absolute before:-left-14 before:top-12 before:w-[177px] md:before:w-[250px] before:h-[169px] md:before:h-[272px] before:bg-[#D9A425] before:blur-[100px]  before:rounded-full before:-z-10
      after:content-[''] after:absolute after:right-5 after:top-40 after:w-[210px] after:h-[200px] after:bg-[#D9A425] after:blur-[100px] after:rounded-full after:-z-10">
              <img
                src={img}
                alt="Ilustración"
                className="w-[250px] md:w-[350px] lg:w-[450px] xl:w-[500px] h-auto absolute bottom-0 right-0 lg:relative"
              />
            </div>

          </div>
        </div>
        {showPopup && <Popup message={message || "Mensaje no disponible"} onClose={closePopup} />}
      </section>
    </>

  )
}

export default LoginPage
