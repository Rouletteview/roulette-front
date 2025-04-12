import arrow from "../../assets/icon/arrow-right-yellow.svg"
import Chart from "../components/Chart";
import { useRouletteNumbers } from "../../utils/mock/mockRouletteNumbers";
import { generateMockCandlestickData } from "../../utils/mock/mockData";
import UserInfo from "../components/UserInfo";
import Controls from "../components/Controls";
import Update from "../components/Update";
import NumbersDisplay from "../components/NumbersDisplay";




const ChartSection = () => {
  const numbers = useRouletteNumbers(15);



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
      <section className="flex flex-col">
        <div className="flex flex-col lg:flex-row w-full justify-center">
          {/*  userInfo */}
          <UserInfo />
          <div className="order-1 lg:order-1 w-full lg:mx-2.5">
            <div className="bg-[#0d1b2a] p-4 flex flex-col items-center lg:items-start w-full">
              {/* controls */}
              <Controls />
              {/* chart */}
              <Chart type="candlestick" data={mockData} width={800} height={620} />
              {/* timer + update */}
              <Update />
            </div>
            <div className="w-full flex flex-col-reverse justify-between lg:flex-row items-center lg:items-start gap-6 mt-4">
              {/*  lista de numeros y probabilidades*/}
              <NumbersDisplay numbers={numbers} />

              <div className="flex flex-col items-center lg:flex-row gap-4">
                <div className="flex flex-col sm:flex-row justify-start lg:justify-center items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#FF0000] rounded-full w-4 h-4 lg:w-7 lg:h-7" />
                    <h2 className="text-white text-xs">00% de probabilidad al rojo</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-black rounded-full w-4 h-4 lg:w-7 lg:h-7" />
                    <h2 className="text-white text-xs">00% de probabilidad al negro</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default ChartSection
