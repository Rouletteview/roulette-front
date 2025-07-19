





const BankTransferSection = () => {
  return (
    <section className='w-full mx-auto  text-[#121418F2]'>
      <div
        className={`h-[100px]  lg:h-[70px] w-[168px] p-3 text-start flex-1 border border-[#CCCCCC] rounded-2xl  flex flex-col justify-between  shadow-lg transition-all yellow-shadow`}
      >
        <span className='text-sm text-[#CCCCCC]'>Datos</span>
        <p className="font-semibold text-sm lg:text-lg text-[#121418F2]">Pago movil</p>
      </div>

      <div className="lg:mx-8 mt-8">
        <p className="font-light text-sm text-[#121418F2]">Datos para realizar el pago</p>
        <div className="flex gap-2 mt-4">
          <p className="text-sm font-medium text-[#121418F2]">+58 424 456 4789     J- 00000000000      Banco de Venezuela</p>
        </div>
      </div>

      <form action="" className="mt-8">
        <p className="text-sm font-medium text-[#121418F2]">Datos para registrar el pago</p>
        <div className="flex flex-col gap-2 mt-8 lg:flex-row lg:items-start lg:gap-8">

          <div className="flex flex-col w-full lg:w-1/3">
            <label className="mb-2 text-[#121418F2] text-sm">Teléfono</label>
            <div className="flex flex-row gap-2">
              <input type="text" value={"+00"} readOnly className="w-20 p-2 rounded-xl border border-[#4B4B4B99] bg-[#ebebeb] text-center" />
              <input type="text" placeholder="" className="flex-1 p-2 rounded-xl border border-[#4B4B4B99] bg-[#ebebeb]" />
            </div>
          </div>

          <div className="flex flex-col w-full lg:w-1/3">
            <label className="mb-2 text-[#121418F2] text-sm">Cedula/DNI</label>
            <input type="text" placeholder="" className="w-full p-2 rounded-xl border border-[#4B4B4B99] bg-[#ebebeb]" />
          </div>

          <div className="flex flex-col w-full lg:w-1/3">
            <label className="mb-2 text-[#121418F2] text-sm">Numero de referencia</label>
            <input type="text" placeholder="" className="w-full p-2 rounded-xl border border-[#4B4B4B99] bg-[#ebebeb]" />
          </div>
        </div>
        <div className="flex justify-center w-full mt-12">
          <button

          className="bg-[#D9A425] hover:bg-[#B3831D] w-[500px] text-white font-bold rounded-lg px-4 py-3 transition-all text-base cursor-pointer yellow-button-shadow"
        >
            Pago realizado
          </button>
        </div>
      </form>

    </section>

  )
}

export default BankTransferSection
