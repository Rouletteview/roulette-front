import Input from "./Input"


const RecoveryForm = () => {
  return (
    <form >
    <div className="flex flex-col ">
        <div className="flex flex-col ">
            <Input
                placeholder="Correo eléctronico"
                name="email"
                type="email"
                className="mb-7"
                // register={register("email")}
                // error={errors.email?.message}
            />
        </div>


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
