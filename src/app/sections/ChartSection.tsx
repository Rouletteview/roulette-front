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
import HistoryIcon from "../components/icon/HistoryIcon";
import { useSearchParams } from "react-router";
import CustomDropdown from "../components/CustomDropdown";
import BetModal from "../components/Modal/bet-modal";
import ConfirmationModal from '../components/Modal/ConfirmationModal';
import type { Bet } from '../components/Modal/bet-modal';
import { useQuery } from "@apollo/client";
import { GET_ROULETTE_TABLES } from "../../graphql/query/getRouletteTables";
import { useFormattedChartData, GameType } from "../../hooks/useFormattedChartData";
import { GET_ROULETTE_TABLES_PROBABILITIES } from "../../graphql/query/getRouletteTableProbabilities";
import { chartTypes } from "../../types/types";
import { UTCTimestamp } from "lightweight-charts";
import { GET_LAST_ROULETTE_TABLE_NUMBERS } from "../../graphql/query/getLastRouletteTableNumbers";
import { useRouletteNumbers } from "../../utils/formatters/rouletterNumbers";

const ChartPlaceholder = () => (
  <div className="flex items-center justify-center w-full h-[620px] bg-[#0d1b2a]">
    <div className="text-center">
      <h2 className="text-white text-xl font-medium mb-2">Selecciona un tipo de gráfico, una zona y un mercado</h2>
      <p className="text-gray-400">Por favor, elige un tipo de gráfico, una zona y un mercado para visualizar los datos</p>
    </div>
  </div>
);


interface RouletteTable {
  Id: string;
  Name: string;
  Provider: string;
}

const ChartSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gameType, setGameType] = useState<GameType | ''>('');
  const [openBetModal, setOpenBetModal] = useState<boolean>(false);
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [betsToConfirm, setBetsToConfirm] = useState<Bet[]>([]);
  const [bets, setBets] = useState<Bet[]>([]);
  const [selectedType, setSelectedType] = useState<ChartType | ''>('');
  const [selectedTable, setSelectedTable] = useState('')
  const [selectedTableLabel, setSelectedTableLabel] = useState('')
  const [marketSearch, setMarketSearch] = useState("");
  const [marketPage, setMarketPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 10;

  // Debounce para la búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(marketSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [marketSearch]);




  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999)


  const { data, loading: marketLoading, error: errorTables } = useQuery(GET_ROULETTE_TABLES, {
    variables: {
      Query: debouncedSearch || "",
      Skip: (marketPage - 1) * 10,
      Limit: limit
    },

  });
  console.log(errorTables)


  const totalCount = data?.GetRouletteTables.Total || 0;
  const marketHasNextPage = totalCount > 0 && (marketPage * limit) < totalCount;
  const marketHasPrevPage = marketPage > 1;



  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tableOptions = data?.GetRouletteTables?.Tables?.map((table: RouletteTable) => ({
    label: `${table.Name} - ${table.Provider.charAt(0).toUpperCase() + table.Provider.slice(1)}`,
    value: table.Id
  })) || [];

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
    const chartZone = searchParams.get('chartZone') as GameType;
    const table = searchParams.get('table');
    if (chartType && selectChartTypes.some(type => type.type === chartType)) {
      setSelectedType(chartType);
    }
    if (chartZone && selectChartZoneTypes.some(zone => zone.zone === chartZone)) {
      setGameType(chartZone);
    }
    if (table) {
      setSelectedTable(table);

      const tableOption = tableOptions.find((option: { label: string; value: string }) => option.value === table);
      if (tableOption) {
        setSelectedTableLabel(tableOption.label);
      }
    }
  }, [searchParams, tableOptions]);

  const chartData = {
    TableId: selectedTable,
    GameType: gameType,
    StartDate: startDate.toISOString(),
    EndDate: endDate.toISOString()
  }
  const { data: rouletteProbData, loading: chartLoading, error: errorProbabilities } = useQuery(GET_ROULETTE_TABLES_PROBABILITIES, {
    variables: {
      TableId: chartData.TableId || "",
      GameType: chartData.GameType,
      StartDate: chartData.StartDate,
      EndDate: chartData.EndDate
    },
  });

  console.log(errorProbabilities)
  const { data: chartNumbersData } = useQuery(GET_LAST_ROULETTE_TABLE_NUMBERS, {
    variables: {
      TableId: chartData.TableId,
      Limit: 14
    }
  })

  const numeros = chartNumbersData?.GetLastRouletteTableNumbers;

  const formattedNumbers = useRouletteNumbers(numeros || [])

  const chartFormattedData = useFormattedChartData({
    data: rouletteProbData?.GetRouletteTableProbabilities || [],
    chartType: selectedType ? chartTypes[selectedType as keyof typeof chartTypes] : chartTypes.Candlestick
  });




  const handleSelectChange = (value: string) => {
    setGameType(value as GameType);
    setSearchParams(prev => {
      prev.set('chartZone', value);
      return prev;
    });
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value as ChartType);
    setSearchParams(prev => {
      prev.set('chartType', value);
      return prev;
    });
  };


  const handleTableChange = (value: string, label?: string) => {
    setSelectedTable(value);
    setSelectedTableLabel(label || '');
    setSearchParams(prev => {
      prev.set('table', value);
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
    setOpenBetModal(true);
    setConfirmationModalOpen(false);
  };


  const handleMarketSearch = (query: string) => {

    setMarketSearch(query)
    setMarketPage(1)
  };

  const handleMarketPageChange = (page: number) => {

    setMarketPage(page)
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
              {!selectedType && !gameType && !selectedTable ? (
                <span className="text-gray-400">Selecciona un tipo de gráfico, una zona y una mesa para comenzar</span>
              ) : !gameType && !selectedTable ? (
                <span className="text-gray-400">Selecciona un tipo de zona y una mesa para comenzar</span>
              ) : !selectedType && !gameType ? (
                <span className="text-gray-400">Selecciona un tipo de gráfico y una zona para continuar</span>
              ) : !selectedType && !selectedTable ? (
                <span className="text-gray-400">Selecciona un tipo de gráfico y una mesa para continuar</span>
              ) : !selectedType ? (
                <span className="text-gray-400">Selecciona un tipo de gráfico para continuar</span>
              ) : !selectedTable ? (
                <span className="text-gray-400">Selecciona una mesa para continuar</span>
              ) : !gameType ? (
                <span className="text-gray-400">Selecciona una zona para continuar</span>
              ) : (
                <>
                  <span className="text-[#D9A425]">{selectChartTypes.find(type => type.type === selectedType)?.label}</span>,
                  zona del grafico <span className="text-[#D9A425]">{selectChartZoneTypes.find(zone => zone.zone === gameType)?.label}</span>,
                  operando en el mercado de <span className="text-[#D9A425]">{selectedTableLabel}</span>
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
                  paginated
                  searchable
                  options={tableOptions}
                  value={selectedTable}
                  onChange={handleTableChange}
                  searchQuery={marketSearch}
                  onSearchQueryChange={handleMarketSearch}
                  page={marketPage}
                  onPageChange={handleMarketPageChange}
                  hasNextPage={marketHasNextPage}
                  hasPrevPage={marketHasPrevPage}
                  loading={marketLoading}
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
                    {!selectedType || !gameType || !selectedTable ? (
                      <ChartPlaceholder />
                    ) : (
                      <>
                        {selectedType === 'Candlestick' && (
                          chartFormattedData.length > 0 && chartFormattedData[0]?.data && chartFormattedData[0].data.length > 0 ? (
                            <CandleChart
                              data={chartFormattedData[0].data as unknown as { time: UTCTimestamp; open: number; high: number; low: number; close: number; }[]}
                              width={1000}
                              height={620}
                              loading={chartLoading}
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-[620px] bg-[#0d1b2a]">
                              <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9A425] mx-auto mb-4"></div>
                                <p className="text-white text-sm">Cargando datos del gráfico...</p>
                              </div>
                            </div>
                          )
                        )}
                        {selectedType === 'Area' && (
                          <AreaChart
                            data={chartFormattedData}
                            width={1000}
                            height={620}
                            loading={chartLoading}
                          />
                        )}
                        {selectedType === 'Lineal' && (
                          <LineChart
                            data={chartFormattedData}
                            width={1000}
                            height={620}
                            loading={chartLoading}
                          />
                        )}
                        {selectedType === 'VerticalColumn' && (
                          <HistogramChart
                            data={chartFormattedData}
                            width={1000}
                            height={620}
                            loading={chartLoading}
                          />
                        )}
                      </>
                    )}
                  </Suspense>
                  <Update
                    selectedType={selectedType}
                    gameType={gameType}
                    selectedTable={selectedTable}
                  />
                </div>
                <div className="w-full flex flex-col-reverse lg:flex-row justify-between items-center gap-6 mt-4">
                  <NumbersDisplay numbers={formattedNumbers} />
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


