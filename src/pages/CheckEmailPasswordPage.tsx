import Header from "../components/Header"
import img from "../assets/images/phone-auth.png"


const CheckEmailPasswordPage = () => {
    return (
        <>
            <Header />

            <section
                className="w-full  bg-center bg-cover flex items-center justify-center text-white relative"
                style={{ backgroundImage: "url('/background/view-roulette-casino.png')" }}
            >
                <div className="w-full min-h-screen grid lg:grid-cols-3 items-center px-6 pt-32 ">

                    <div className="flex flex-col gap-y-[92px] justify-center items-center lg:mx-20  col-span-2 text-center">
                        <div className=" my-8">
                            <h1 className="text-lg md:text-[50px] text-white leading-8 md:leading-14 font-bold lg:mx-8 ">
                                <span className="text-[#D9A425]">¡Te hemos enviado un enlace a tu correo!  </span>Haz clic en el enlace del correo para restablecer tu contraseña.
                            </h1>
                        </div>

                        <div className="flex flex-col lg:text-3xl gap-y-4">
                            <span className="text-xl">¿No te llego el correo?</span>
                            <a href="" className="text-[#D9A425] text-2xl underline">Volver a enviar enlace a mi correo</a>
                        </div>

                    </div>

                    <div className="absolute bottom-0 right-0 hidden lg:block">
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
            </section>
        </>
    )
}

export default CheckEmailPasswordPage
