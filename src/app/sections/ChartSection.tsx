import arrow from "../../assets/icon/arrow-right-yellow.svg"
import Chart from "../components/Chart";
import { useRouletteNumbers } from "../../utils/mock/mockRouletteNumbers";
import UserInfo from "../components/UserInfo";
import Controls from "../components/Controls";
import Update from "../components/Update";
import NumbersDisplay from "../components/NumbersDisplay";



import { useRouletteById } from "../../hooks/useRouletteById";
import { useState } from "react";
import { usePersistentCandleData } from "../../hooks/usePersistentCandleData";
import LoadingOverlay from "../../components/LoadingOverlay";
import BetChips from "../components/BetChips";











const ChartSection = () => {

  const [gameType, setGameType] = useState("RedAndBlack");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGameType(event.target.value);
  };


  const { data = [], loading } = useRouletteById();

  const lastNumbersData = data?.SimulateBet?.LastNumbers;
  const latestNumber = lastNumbersData?.[0];

  const gameTypeData = data?.SimulateBet?.GameProbabilities?.find(
    (item: { GameType: string }) => item.GameType === `${gameType}`
  )?.Probabilities || [];

  const candleData = usePersistentCandleData(gameTypeData, latestNumber);





  const redAndBlackProbability = data?.SimulateBet?.GameProbabilities?.find(
    (item: { GameType: string; }) => item.GameType === 'RedAndBlack'
  )?.Probabilities || [];

  const blackProbability = redAndBlackProbability.find(
    (p: { Key: string }) => p.Key === 'Black'
  )?.Probability || 0;

  const redProbability = redAndBlackProbability.find(
    (p: { Key: string }) => p.Key === 'Red'
  )?.Probability || 0;



  const rouletteItems = useRouletteNumbers(lastNumbersData);
  if (loading) return <LoadingOverlay />



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
              <div className="bg-[#121418F2] w-[150px] border-2 border-black py-1.5 px-2 rounded-lg whitespace-nowrap text-white">
                <select name="select "
                  value={gameType}
                  onChange={handleSelectChange}
                  className="bg-transparent text-white text-base w-full outline-none">
                  <option value="RedAndBlack" selected>Red And Black</option>
                  <option value="OddAndEven">Odd And Even</option>
                  <option value="HighAndLow">High And Low</option>
                  <option value="Dozen">Dozen</option>
                  <option value="Column">Column</option>

                </select>
                {/* <span className="text-white text-base">Columnas</span> */}
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
      <section className="flex flex-col lg:flex-row w-full gap-4">
        {/* Contenido principal */}
        <div className="order-2 lg:order-1 w-full lg:flex-1 lg:mx-2.5 flex flex-col">

          {/* Chart + BetChips (uno al lado del otro en mobile, separados en desktop) */}
          <div className="flex flex-col-reverse lg:flex-row w-full gap-4">
            {/* Contenedor del chart y controles */}
            <div className="flex flex-row w-full pr-8 lg:pr-0">
              <div className="flex flex-col w-full">
              <div className="flex-1 bg-[#0d1b2a] p-4 flex flex-col items-center lg:items-start w-full">
                <Controls />
                <Chart type="candlestick" data={candleData} width={1000} height={620} />
                <Update />
              </div>
              <div className="w-full flex flex-col-reverse lg:flex-row justify-between items-center gap-6 mt-4">
            <NumbersDisplay numbers={rouletteItems} />

            <div className="flex flex-col items-center lg:flex-row gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-[#FF0000] rounded-full w-4 h-4 lg:w-7 lg:h-7" />
                  <h2 className="text-white text-xs lg:text-sm">
                    {Math.round(redProbability)}% de probabilidad al rojo
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-black rounded-full w-4 h-4 lg:w-7 lg:h-7" />
                  <h2 className="text-white text-xs lg:text-sm">
                    {Math.round(blackProbability)}% de probabilidad al negro
                  </h2>
                </div>
              </div>
            </div>
          </div>
              </div>
             
              <div className="block lg:hidden w-auto">
                <BetChips />
              </div>
            </div>

            <div className="order-1 lg:order-2 flex-col items-center lg:items-start gap-4">
              <UserInfo />
              <div className="hidden lg:flex">
                <BetChips />
              </div>
            </div>

            {/* BetChips solo visible en mobile/tablet */}

          </div>

          {/* Sección inferior con números y probabilidades */}
         
        </div>

        {/* Sidebar: solo visible en desktop */}


      </section>


    </section>
  )
}

export default ChartSection
