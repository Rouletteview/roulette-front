import { useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";
import Header from "../../components/Header";
import NewPasswordForm from "../components/forms/NewPasswordForm";
import PhoneImage from "../../components/auth/PhoneImage";



const NewPasswordPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  useEffect(() => {


    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);


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
        <div className="w-full min-h-screen grid lg:grid-cols-3 justify-center items-center px-6 pt-11 ">

          <div className="   col-span-2 lg:px-28  xl:px-48">
            <div className="text-center my-8 mx-6">
              <h1 className="text-[28px] md:text-[38px] text-white leading-8 md:leading-12 font-medium">
                Crea tu nueva contraseña aquí
              </h1>
            </div>

            <div className="w-full">
              <NewPasswordForm token={token ?? ""} />
            </div>
          </div>

          <PhoneImage />
        </div>
      </section>
    </>
  )
}

export default NewPasswordPage
