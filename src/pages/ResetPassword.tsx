import Header from "../components/Header"
import img from "../assets/images/phone-auth.png"
import RecoveryForm from "../components/forms/RecoveryForm"


const ResetPassword = () => {
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
      style={{ backgroundImage: "url('/background/close-up-roulette-wheel-1.png')" }}
    >
      <div className="w-full min-h-screen grid lg:grid-cols-3 justify-center items-center px-6 pt-11 hero-background ">
        
        <div className="   col-span-2 lg:px-28  xl:px-48">
          <div className="text-center my-8 flex flex-col gap-y-6">
            <h1 className="text-[28px] md:text-[32px] text-white leading-8 md:leading-12 font-medium">
            ¿Olvidaste tu contraseña?
            </h1>
            <h3 className="text-[18px] leading-[22px] font-medium">No te preocupes, te enviaremos un link al  correo asociado a tu cuenta para acceder</h3>
          </div>

          <div className="w-full">
           <RecoveryForm/>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 hidden lg:block">
          <img
            src={img}
            alt="Ilustración"
            className="w-[250px] md:w-[350px] lg:w-[450px] xl:w-[500px] h-auto absolute bottom-0 right-0 lg:relative"
          />
        </div>
      </div>
    </section>
  </>
  )
}

export default ResetPassword
