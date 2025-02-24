import RegisterForm from "../components/forms/RegisterForm"
import Header from "../components/Header"
import img from "../assets/images/phone-auth.png"


const RegisterPage = () => {
  return (
    <>
      <Header>
        <a href="/" className="border bg-[#D9A425] hover:bg-[#B3831D] transition-all px-4 py-2 rounded-xl text-center">Ir al inicio</a>
      </Header>
      <main className="flex flex-col justify-center items-center h-screen mx-6 mt-27">
        <div className="text-center my-8">
          <h1 className="text-lg leading-6 font-bold"><span className="text-[#D9A425] font-medium">¡Únete a nuestra comunidad de jugadores inteligentes!</span> Crea tu cuenta ahora para acceder a las herramientas más avanzadas de análisis de la ruleta</h1>
        </div>
        <div className="w-full">
          <RegisterForm />
        </div>
        <div className="absolute bottom-0 right-0 ">
          <img src={img} alt="" className="w-[565px] h-auto hidden md:block" />
        </div>
      </main>
    </>
  )
}

export default RegisterPage
