import arrow from "../assets/icon/arrow-right-yellow.svg"
import zoomIn from "../assets/icon/zoom-in.svg";
import zoomOut from "../assets/icon/zoom-out.svg";
import pencil from "../assets/icon/pencil.svg"
import userIcon from "../assets/icon/user-icon.svg";
import Chart from "../components/Chart";
import { useRouletteNumbers } from "../utils/mock/mockRouletteNumbers";
import { generateMockCandlestickData } from "../utils/mock/mockData";


const ChartSection = () => {
  const numbers = useRouletteNumbers(15);

  const colorClasses = {
    red: "border-red-600 ",
    white: "border-white ",
    green: "border-green-600 ",
  };

  const mockData = generateMockCandlestickData(500);


  // pendiente a refactorización
  return (
    <section className="bg-[#121418F2] py-6 lg:py-24 px-6 lg:px-24">
      {/* alerta movil */}
      <div className="flex justify-end w-full">
        <div className="bg-[#121418F2] border-2 border-black px-6 py-2 rounded-2xl lg:hidden block mb-2">
          <h1 className="text-white text-[12px] font-medium">Tu periodo de prueba termina el: <span className="text-[#D9A425]">23/03/25</span></h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-x-6 items-baseline">
        <h1 className="text-xl lg:text-5xl text-white font-medium ">Sistema de <span className="font-bold">Gráficos</span> en vivo</h1>
        <a href="" className="text-sm lg:text-[18px] text-[#D9A425] underline font-medium">ver video tutorial de como operar en el gráfico</a>
      </div>
      <section className="my-10">
        <div className="flex flex-col gap-9 lg:gap-2">
          <div className="lg:mx-8">
            <h1 className="text-base lg:text-xl text-white font-medium inline-block border-x-1 border-white px-2"><span className="text-[#D9A425] ">Gráfico de velas</span>, zona del grafico <span className="text-[#D9A425] ">columna</span>, operando en el mercado de <span className="text-[#D9A425]">Micasino.com</span></h1>
          </div>
          <div className="flex justify-between">

            <div className="flex flex-wrap gap-1 text-start items-center">
              <div className="bg-[#121418F2] w-[150px] border-2 border-black py-1.5 px-2 rounded-lg whitespace-nowrap">
                <span className="text-white text-base">Gráfico de velas</span>
              </div>
              <div className="bg-[#121418F2] w-[150px] border-2 border-black py-1.5 px-2 rounded-lg whitespace-nowrap">
                <span className="text-white text-base">Columnas</span>
              </div>
              <div className="bg-[#121418F2] w-[150px] border-2 border-black py-1.5 px-2 rounded-lg whitespace-nowrap">
                <span className="text-white text-base">Micasino.com</span>
              </div>
              <div className="ml-4">
                <button className="flex gap-x-2 text-[#D9A425] text-base lg:text-xl font-semibold cursor-pointer">
                  Probar gráficos
                  <img src={arrow} alt="" />
                </button>
              </div>
            </div>
            {/* alerta desktop */}
            <div className="bg-[#121418F2] border-2 border-black px-6 py-2 rounded-2xl hidden lg:block">
              <h1 className="text-white text-lg font-medium">Tu periodo de prueba termina el: <span className="text-[#D9A425]">23/03/25</span></h1>
            </div>
          </div>
        </div>
      </section>
   
      <section className="flex flex-col-reverse justify-center items-center lg:flex-row gap-y-4">
        <div className="flex w-full justify-center">
          {/* controls */}
          <div className="flex flex-col gap-3.5 p-2 justify-start">
            <button className="cursor-pointer w-6 h-auto">
              <img src={zoomIn} alt="" />
            </button>
            <button className="cursor-pointer w-6 h-auto">
              <img src={zoomOut} alt="" />
            </button>
            <button className="cursor-pointer w-6 h-auto">
              <img src={pencil} alt="" />
            </button>
          </div>

          {/* ChartSection */}

          <div className="bg-[#0d1b2a] w-full lg:mx-2.5 ">
            <div className="p-4 flex flex-col items-center lg:items-start">
              <Chart type="candlestick" data={mockData} width={800} height={620} />

              <div className="flex flex-wrap gap-2 bg-[#0000004D] self-center lg:self-start w-auto p-2 rounded mt-4">
                {numbers.map((item, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full border-3 flex items-center justify-center font-medium text-white text-[10px] md:text-sm ${colorClasses[item.color]}`}
                  >
                    {item.value}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
  
        {/* userInfo */}
        <div className="bg-[#1a1a1a] text-white text-sm rounded p-4 mx-8 w-full lg:w-[190px] h-auto self-center lg:self-start mt-4 lg:mt-0 ">
          <div className="flex items-center gap-2 mb-3">
            <img src={userIcon} alt="user icon" className="w-6 h-6" />
            <span className="font-medium">Miguel Rojas</span>
          </div>
          <div className="text-[#d4a727]">
            <div className="flex justify-between font-medium mb-1">
              <span>Saldo inicial</span>
              <span className="text-right">0.00</span>
            </div>
            <div className="flex justify-between font-medium mb-1">
              <span>Saldo Final</span>
              <span className="text-right">0.00</span>
            </div>
            <div className="flex justify-between font-medium mb-1">
              <span>Utilidad</span>
              <span className="text-right">0.00</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Beneficio 1:1</span>
              <span className="text-right">100%</span>
            </div>
          </div>
        </div>
      </section>
    

    </section>
  )
}

export default ChartSection
