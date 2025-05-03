
import Header from "../../components/Header"
import PhoneImage from "../../components/auth/PhoneImage"


const CheckEmailPasswordPage = () => {
    return (
        <>
            <Header />

            <section
                className="w-full  bg-center bg-cover flex items-center justify-center text-white relative"
                style={{ backgroundImage: "url('/background/view-roulette-casino.webp')" }}
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
                    <PhoneImage />
                </div>
            </section>
        </>
    )
}

export default CheckEmailPasswordPage
