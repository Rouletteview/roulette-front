import { useForm } from "react-hook-form";
import Input from "./Input"
import { useSendResetPassword } from "../../hooks/useSendResetPasswordEmail";
import { useState } from "react";
import { useNavigate } from "react-router";

interface FormInput {
  email: string;
}


const RecoveryForm = () => {

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();

  const { SendResetPasswordEmail } = useSendResetPassword()

  const onSubmit = async (data: FormInput) => {
    setErrorMessage("");
    try {

      const result = await SendResetPasswordEmail({
        variables: {
          email: data.email,
        },
      });

      navigate('/')
      console.log("Usuario logeado:", result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
    

      if (error.graphQLErrors?.length) {
        if (error.graphQLErrors[0].code === 'NOT_FOUND') {
          setErrorMessage('No existe una cuenta asociada a este correo electrónico.');

        }

    } else {
        setErrorMessage("Lo sentimos ha ocurrido un error. Revise los campos e intente más tarde");
    }
    }
  };


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
          className='block bg-[#D9A425] hover:bg-[#B3831D] transition-all w-full  text-lg font-bold rounded-[10px] py-2 mt-5 mb-3 disabled:bg-[#B2B2B2]'>
          Enviarme link
        </button>


      </div>


    </form>
  )
}

export default RecoveryForm
