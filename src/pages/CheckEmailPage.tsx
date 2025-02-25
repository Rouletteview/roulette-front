import Header from "../components/Header"
import img from "../assets/images/phone-auth.png"


const CheckEmailPage = () => {
    return (
        <>
            <Header />

            <section
                className="w-full  bg-center bg-cover flex items-center justify-center text-white relative"
                style={{ backgroundImage: "url('/background/close-up-roulette-wheel-1.png')" }}
            >
                <div className="w-full min-h-screen grid lg:grid-cols-3 items-center px-6 pt-32 hero-background ">

                    <div className="flex flex-col gap-y-[92px] justify-center items-center lg:mx-20  col-span-2 text-center">
                        <div className=" my-8">
                            <h1 className="text-lg md:text-[50px] text-white leading-6 md:leading-14 font-bold mx-8 ">
                                <span className="text-[#D9A425]">¡Te hemos enviado un link a tu correo! </span>Accede a nuestra plataforma dándole click al link del correo, esto nos ayuda a verificar que tu correo es correcto
                            </h1>
                        </div>

                        <div className="flex flex-col text-3xl gap-y-4">
                            <span>¿No te llego el correo?</span>
                            <a href="" className="text-[#D9A425] underline">Volver a enviar link a mi correo</a>
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

export default CheckEmailPage
