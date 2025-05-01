import { ChartType } from "../../types/chart/types";
import { useRouletteNumbers } from "../../utils/formatters/rouletterNumbers";
import { useChartData } from "../../utils/mock/mockData";
import { useRouletteById } from "../useRouletteById";

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
  //real-data
  // const chartData = usePersistentCandleData(gameTypeData, latestNumber);
  //mockData
  const { chartData: mockChartData } = useChartData(selectedType);

  return {
    loading,
    rouletteItems,
    mockChartData,
    redProbability,
    blackProbability,
    latestNumber,
    gameTypeData
  };
}