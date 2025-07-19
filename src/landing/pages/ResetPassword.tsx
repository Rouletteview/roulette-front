import Header from "../../components/Header"
import RecoveryForm from "../components/RecoveryForm"
import { Outlet } from "react-router"
import PhoneImage from "../../components/auth/PhoneImage"



const ResetPassword = () => {
  return (
    <>
    <Header>
      <a
        href="/"
        className="bg-[#D9A425] hover:bg-[#B3831D] transition-all px-4 py-2 rounded-xl text-center text-white yellow-button-shadow"
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
          <div className="text-center my-8 flex flex-col gap-y-6">
            <h1 className="text-[28px] md:text-[38px] text-white leading-8 md:leading-12 font-medium">
            ¿Olvidaste tu contraseña?
            </h1>
            <h3 className="text-[18px] md:text-[24px] leading-[22px] md:leading-10 font-medium">No te preocupes, te enviaremos un link al correo asociado a tu cuenta para acceder</h3>
          </div>

          <div className="w-full">
           <RecoveryForm/>
          </div>
        </div>

        <PhoneImage />
      </div>
      <Outlet />
    </section>
  </>
  )
}

export default ResetPassword
