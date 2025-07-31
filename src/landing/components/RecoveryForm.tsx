import { useForm } from "react-hook-form";

import { useSendResetPassword } from "../../hooks/useSendResetPasswordEmail";
import { useState } from "react";
import { useNavigate } from "react-router";
import LoadingOverlay from "../../components/LoadingOverlay";
import Input from "./forms/Input";
import { getGraphQLErrorMessage } from "../../utils/errorMessages";


interface FormInput {
  email: string;
}


const RecoveryForm = () => {

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();

  const { SendResetPasswordEmail, loading } = useSendResetPassword();

  if (loading) return <LoadingOverlay />

  const onSubmit = async (data: FormInput) => {
    setErrorMessage("");
    try {

      await SendResetPasswordEmail({
        variables: {
          email: data.email,
        },
      });

      navigate("/correo-enviado");

    } catch (error: unknown) {
      setErrorMessage(getGraphQLErrorMessage(error));
    }
  }


  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col ">
        <div className="flex flex-col ">
          <Input
            placeholder="Correo eléctronico"
            name="email"
            type="email"
            className="mb-7"
            register={register("email")}
            error={errors.email?.message}
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-center mt-2">{errorMessage}</p>
        )}
        <button
          type="submit"
          // disabled={!isValid}
          className='block bg-[#D9A425] hover:bg-[#B3831D] transition-all w-full  text-lg font-bold rounded-[10px] py-2 mt-5 mb-3 disabled:bg-[#B2B2B2] yellow-button-shadow cursor-pointer'>
          Enviarme link
        </button>


      </div>


    </form>
  )
}

export default RecoveryForm
