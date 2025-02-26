import LoginForm from "../components/forms/LoginForm"
import Header from "../components/Header"
import img from "../assets/images/phone-auth.png"


const LoginPage = () => {
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
            <div className="text-center my-8">
              <h1 className="text-[28px] md:text-[32px] text-white leading-8 md:leading-12 font-medium">
              Inicia sesión para acceder a los datos que necesitas para ganar
              </h1>
            </div>

            <div className="w-full">
              <LoginForm />
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

export default LoginPage
