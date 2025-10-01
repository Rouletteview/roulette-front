import { useQuery, useSubscription } from "@apollo/client";
import { useSearchParams } from "react-router";
import { GET_ROULETTE_TABLES } from "../../../../graphql/query/getRouletteTables";
import { GET_ROULETTE_TABLES_PROBABILITIES } from "../../../../graphql/query/getRouletteTableProbabilities";
import { GET_LAST_ROULETTE_TABLE_NUMBERS } from "../../../../graphql/query/getLastRouletteTableNumbers";
import {
  useFormattedChartData,
  GameType,
} from "../../../../hooks/useFormattedChartData";
import { useRouletteNumbers } from "../../../../utils/formatters/rouletterNumbers";
import { chartTypes } from "../../../../types/types";
import { ChartType } from "../../../../types/chart/types";
import { ON_ROULETTE_NUMBER_UPDATE_SUBSCRIPTION } from "../../../../graphql/subscriptions/onRouletteNumberUpdate";

interface RouletteTable {
  Id: string;
  Name: string;
  Provider: string;
}

export const useChartData = (
  selectedType: ChartType | "",
  gameType: GameType | "",
  selectedTable: string,
  marketSearch: string,
  marketPage: number
) => {
  const [searchParams] = useSearchParams();
  const limit = 10;

  const resultsParam = searchParams.get("results");
  const probabilitiesResultLimit = resultsParam ? parseInt(resultsParam) : 250;

  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  const {
    data: tablesData,
    loading: marketLoading,
    error: errorTables,
  } = useQuery(GET_ROULETTE_TABLES, {
    variables: {
      request: {
        IsOnline: true,
        Limit: limit,
        Providers: ["evolution", "pragmatic", "ezugi"],
        Query: marketSearch || "",
        Skip: (marketPage - 1) * 10,
      },
    },
  });

  const {
    data: rouletteProbData,
    loading: chartLoading,
    error: errorProbabilities,
  } = useQuery(GET_ROULETTE_TABLES_PROBABILITIES, {
    variables: {
      request: {
        TableId: selectedTable,
        GameType: gameType,
        StartDate: startDate.toISOString(),
        EndDate: endDate.toISOString(),
        ProbabilitiesResultLimit: probabilitiesResultLimit,
      },
    },
    skip: !selectedTable || !gameType,
  });

  const { data: chartNumbersDataSubscription, error: errorSubscription } =
    useSubscription(ON_ROULETTE_NUMBER_UPDATE_SUBSCRIPTION, {
      variables: {
        gameType: gameType,
        tableId: selectedTable || undefined,
        probabilitiesResultLimit: probabilitiesResultLimit,
      },
      skip: !gameType,
    });

  console.log("chartNumbersDataSubscription", chartNumbersDataSubscription);
  console.log("errorSubscription", errorSubscription);

  const { data: chartNumbersData } = useQuery(GET_LAST_ROULETTE_TABLE_NUMBERS, {
    variables: {
      TableId: selectedTable,
      Limit: 14,
    },
    skip: !selectedTable,
  });

  const tableOptions =
    tablesData?.GetRouletteTables?.Tables?.map((table: RouletteTable) => ({
      label: `${table.Name} - ${
        table.Provider.charAt(0).toUpperCase() + table.Provider.slice(1)
      }`,
      value: table.Id,
    })) || [];

  const chartFormattedData = useFormattedChartData({
    data: rouletteProbData?.GetRouletteTableProbabilities.Results || [],
    chartType: selectedType
      ? chartTypes[selectedType as keyof typeof chartTypes]
      : chartTypes.Candlestick,
    gameType: gameType || undefined,
  });

  const numeros = chartNumbersData?.GetLastRouletteTableNumbers;
  const formattedNumbers = useRouletteNumbers(numeros || []);

  const totalCount = tablesData?.GetRouletteTables.Total || 0;
  const marketHasNextPage = totalCount > 0 && marketPage * limit < totalCount;
  const marketHasPrevPage = marketPage > 1;

  return {
    // data
    tableOptions,
    chartFormattedData,
    formattedNumbers,
    probabilities:
      rouletteProbData?.GetRouletteTableProbabilities.Probabilities,

    // loading
    marketLoading,
    chartLoading,

    // errors
    errorTables,
    errorProbabilities,

    // pagination
    marketHasNextPage,
    marketHasPrevPage,
  };
};
