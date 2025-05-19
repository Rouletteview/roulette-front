import { ChartType } from "../../../types/chart/types";
import { useRouletteNumbers } from "../../../utils/formatters/rouletterNumbers";

import { useChartData } from "../../../utils/mock/mockData";
import { useRouletteById } from "../../../hooks/useRouletteById";
import { useCandleData } from "./data/useCandleData";
import { useAreaChartData } from "./data/useAreaData";
import { useLineChartData } from "./data/useLineData";
import { useHistogramChartData } from "./data/useHistogramData";
import { useMockAreaData, useMockCandleData, useMockHistogramData, useMockLineData } from "./useMockChartData";

export function useChartLogic(gameType: string, selectedType: ChartType) {





  const { data = [], loading } = useRouletteById();

  const lastNumbersData = data?.SimulateBet?.LastNumbers;
  const latestNumber = lastNumbersData?.[0];

  const gameTypeData = data?.SimulateBet?.GameProbabilities?.find(
    (item: { GameType: string }) => item.GameType === gameType
  )?.Probabilities || [];



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
  const candleChartData = useCandleData(gameTypeData);
  const areaChartData = useAreaChartData(gameTypeData);
  const lineChartData = useLineChartData(gameTypeData);
  const histogramChartData = useHistogramChartData(gameTypeData);
  //mockData
  const mockCandleChartData = useMockCandleData();
  const mockLineChartData = useMockLineData();
  const mockAreaChartData = useMockAreaData();
  const mockHistogramChartData = useMockHistogramData();

  //real-data
  // const candleData = usePersistentCandleData(gameTypeData, latestNumber);
  //candleMockData

  //mockData
  const { chartData: mockChartData } = useChartData(selectedType);

  return {
    loading,
    rouletteItems,
    mockChartData,
    redProbability,
    blackProbability,
    latestNumber,
    gameTypeData,
    candleChartData,
    areaChartData,
    lineChartData,
    histogramChartData,
    //mockData
    mockCandleChartData,
    mockLineChartData,
    mockAreaChartData,
    mockHistogramChartData
    };
}