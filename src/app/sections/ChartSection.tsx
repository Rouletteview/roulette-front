import UserInfo from "../components/UserInfo";
import Controls from "../components/Controls";
import Update from "../components/Update";
import NumbersDisplay from "../components/NumbersDisplay";
import { Suspense, useState, useEffect } from "react";
import LoadingOverlay from "../../components/LoadingOverlay";
import BetChips from "../components/BetChips";
import CandleChart from "../components/chart/CandleChart";
import AreaChart from "../components/chart/AreaChart";
import LineChart from '../components/chart/LineChart';
import HistogramChart from "../components/chart/HistogramChart";
import { ChartType, selectChartTypes, selectChartZoneTypes } from "../../types/chart/types";
import { useChartLogic } from "../hooks/chart/useChartLogic";
import HistoryIcon from "../components/icon/HistoryIcon";
import { useSearchParams } from "react-router";
import CustomDropdown from "../components/CustomDropdown";
import BetModal from "../components/Modal/bet-modal";
import ConfirmationModal from '../components/Modal/ConfirmationModal';
import type { Bet } from '../components/Modal/bet-modal';

const ChartPlaceholder = () => (
  <div className="flex items-center justify-center w-full h-[620px] bg-[#0d1b2a]">
    <div className="text-center">
      <h2 className="text-white text-xl font-medium mb-2">Selecciona un tipo de gráfico, una zona y un mercado</h2>
      <p className="text-gray-400">Por favor, elige un tipo de gráfico, una zona y un mercado para visualizar los datos</p>
    </div>
  </div>
);

const ChartSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gameType, setGameType] = useState("");
  const [openBetModal, setOpenBetModal] = useState<boolean>(false);
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [betsToConfirm, setBetsToConfirm] = useState<Bet[]>([]);
  const [bets, setBets] = useState<Bet[]>([]);

  const [selectedType, setSelectedType] = useState<ChartType | ''>('');


  const chartTypeOptions = selectChartTypes.map(type => ({
    label: type.label,
    value: type.type,
  }));


  const chartZoneOptions = selectChartZoneTypes.map(zone => ({
    label: zone.label,
    value: zone.zone
  }))




  useEffect(() => {
    const chartType = searchParams.get('chartType') as ChartType;
    const chartZone = searchParams.get('chartZone');
    if (chartType && selectChartTypes.some(type => type.type === chartType)) {
      setSelectedType(chartType);
    }
    if (chartZone) {
      setGameType(chartZone);
    }
  }, [searchParams]);



  const handleSelectChange = (value: string) => {
    setGameType(value);
    setSearchParams(prev => {
      prev.set('chartZone', value);
      return prev;
    });
  };

  const {
    loading,
    mockChartData,
    rouletteItems,
    redProbability,
    blackProbability,
    // candleChartData,
    // areaChartData,
    // histogramChartData,
    // lineChartData,
    //mock
    mockCandleChartData,
    mockLineChartData,
    mockAreaChartData,
    mockHistogramChartData
  } = useChartLogic(gameType, selectedType);



  if (loading) return <LoadingOverlay />;


  const handleTypeChange = (value: string) => {
    setSelectedType(value as ChartType);
    setSearchParams(prev => {
      prev.set('chartType', value);
      return prev;
    });
  };

  const handleChipSelect = (value: number) => {
    setSelectedChip(value);
  };

  const handleCloseBetModal = () => {
    setOpenBetModal(false);
  };

  const handleRequestConfirmation = (selectedBets: Bet[]) => {
    setBetsToConfirm(selectedBets);
    setOpenBetModal(false);
    setConfirmationModalOpen(true);
  };

  const handleConfirmBets = () => {
    // desde aquí se enviara la apuesta ya sea al backend o no se a donde
    setConfirmationModalOpen(false);
    setBetsToConfirm([]);
    setBets([]);
  };

  const handleCloseConfirmationModal = () => {
    //abrir modal otra vez.
    setOpenBetModal(true);
    setConfirmationModalOpen(false);
  };

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
            <h1 className="text-base lg:text-xl text-white font-medium inline-block border-x-1 border-white px-2">
              {!selectedType && !gameType ? (
                <span className="text-gray-400">Selecciona un tipo de gráfico y una zona para comenzar</span>
              ) : !selectedType ? (
                <span className="text-gray-400">Selecciona un tipo de gráfico para continuar</span>
              ) : !gameType ? (
                <span className="text-gray-400">Selecciona una zona para continuar</span>
              ) : (
                <>
                  <span className="text-[#D9A425]">{selectChartTypes.find(type => type.type === selectedType)?.label}</span>,
                  zona del grafico <span className="text-[#D9A425]">{selectChartZoneTypes.find(zone => zone.zone === gameType)?.label}</span>,
                  operando en el mercado de <span className="text-[#D9A425]">Micasino.com</span>
                </>
              )}
            </h1>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-1 text-start items-center">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-1">

                <CustomDropdown
                  defaultLabel="Tipo de gráfico"
                  options={chartTypeOptions}
                  value={selectedType}
                  onChange={handleTypeChange}
                  className="mr-2"
                />

                <CustomDropdown
                  defaultLabel="Zona de gráfico"
                  options={chartZoneOptions}
                  value={gameType}
                  onChange={handleSelectChange}
                  className="mr-2"
                />

                <CustomDropdown
                  defaultLabel="Mercado a operar"
                  options={[]}
                  value={''}
                  onChange={handleSelectChange}
                  className="mr-2"
                />
              </div>


              <div className="ml-4">
                <a href="/historial" className="flex items-baseline gap-x-1.5">
                  <HistoryIcon />
                  <span className="text-white text-sm font-medium underline underline-offset-1">ver historial</span>
                </a>
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
        <div className="order-2 lg:order-1 w-full lg:flex-1 lg:mx-2.5 flex flex-col">
          <div className="flex flex-col-reverse lg:flex-row w-full gap-4">
            <div className="flex flex-row w-full pr-8 lg:pr-0 ">
              <div className="flex flex-col w-full">
                <div className="relative flex-1 bg-[#0d1b2a] p-4 flex flex-col items-center lg:items-start w-full">
                  <Controls />

                  <BetModal
                    showModal={openBetModal}
                    onClose={handleCloseBetModal}
                    selectedChip={selectedChip}
                    onRequestConfirmation={handleRequestConfirmation}
                    bets={bets}
                    setBets={setBets}
                  />
                  <ConfirmationModal
                    show={confirmationModalOpen}
                    onClose={handleCloseConfirmationModal}
                    onConfirm={handleConfirmBets}
                    bets={betsToConfirm}

                  />
                  <Suspense fallback={<LoadingOverlay />}>
                    {/* || !searchParams.get('market') */}
                    {!selectedType || !gameType ? (
                      <ChartPlaceholder />
                    ) : (
                      <>
                        {selectedType === 'Candlestick' && mockChartData.length > 0 && (
                          <CandleChart
                            data={mockCandleChartData}
                            width={1000}
                            height={620}
                          />
                        )}
                        {selectedType === 'Area' && Array.isArray(mockChartData) && mockChartData.length > 0 && (
                          <AreaChart
                            data={mockAreaChartData}
                            width={1000}
                            height={620}
                          />
                        )}
                        {selectedType === 'Lineal' && Array.isArray(mockChartData) && mockChartData.length > 0 && (
                          <LineChart
                            data={mockLineChartData}
                            width={1000}
                            height={620}
                          />
                        )}
                        {selectedType === 'VerticalColumn' && Array.isArray(mockChartData) && mockChartData.length > 0 && (
                          <HistogramChart
                            data={mockHistogramChartData}
                            width={1000}
                            height={620}
                          />
                        )}
                      </>
                    )}
                  </Suspense>
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
                <BetChips
                  setOpenBetModal={setOpenBetModal}
                  selectedChip={selectedChip}
                  onChipSelect={handleChipSelect}
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 flex-col items-center lg:items-start gap-4">
              <UserInfo />
              <div className="hidden lg:flex">
                <BetChips
                  setOpenBetModal={setOpenBetModal}
                  selectedChip={selectedChip}
                  onChipSelect={handleChipSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ChartSection;


