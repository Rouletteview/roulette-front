import { useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { GET_ROULETTE_TABLES } from "../../../../graphql/query/getRouletteTables";
import { GET_ROULETTE_TABLES_PROBABILITIES } from "../../../../graphql/query/getRouletteTableProbabilities";
import {
    useFormattedChartData,
    GameType,
} from "../../../../hooks/useFormattedChartData";
import { chartTypes } from "../../../../types/types";
import { ChartType } from "../../../../types/chart/types";
import { ON_ROULETTE_NUMBER_UPDATE_SUBSCRIPTION } from "../../../../graphql/subscriptions/onRouletteNumberUpdate";
import { useRouletteNumbers } from "../../../../utils/formatters/rouletterNumbers";


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

    const startDate = new Date("2025-11-03T00:00:00.000Z");
    const endDate = new Date("2025-11-03T23:59:59.999Z");

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
                GameType: gameType || 'RedAndBlack',
                StartDate: startDate.toISOString(),
                EndDate: endDate.toISOString(),
                ProbabilitiesResultLimit: probabilitiesResultLimit,
            },
        },
        skip: !selectedTable,
        fetchPolicy: 'cache-and-network',
    });

    console.log('rouletteProbData', rouletteProbData);

    const { data: chartNumbersDataSubscription } =
        useSubscription(ON_ROULETTE_NUMBER_UPDATE_SUBSCRIPTION, {
            variables: {
                gameType: gameType || 'RedAndBlack',
                tableId: selectedTable || undefined,
                probabilitiesResultLimit: probabilitiesResultLimit,
            },
            skip: !selectedTable || !gameType,
            fetchPolicy: 'no-cache',
        });


    type ResultEntry = { Date: string; Tag: string; Number: number };
    const [liveResults, setLiveResults] = useState<ResultEntry[]>([]);
    type ProbabilityEntry = { Tag: string; Value: number; Count: number };
    const [lastValidProbabilities, setLastValidProbabilities] = useState<ProbabilityEntry[] | undefined>(undefined);


    useEffect(() => {
        if (rouletteProbData?.GetRouletteTableProbabilities?.Results) {
            setLiveResults(rouletteProbData.GetRouletteTableProbabilities.Results as ResultEntry[]);
        } else {
            setLiveResults([]);
        }
    }, [selectedTable, gameType, rouletteProbData?.GetRouletteTableProbabilities?.Results]);


    useEffect(() => {
        const payload = chartNumbersDataSubscription?.OnRouletteNumberUpdate;
        if (!payload) return;


        if (selectedTable && payload.TableId && payload.TableId !== selectedTable) return;

        const result = payload.Result as ResultEntry | undefined;
        if (!result) return;

        setLiveResults((prev) => {
            const next = [...prev, result];
            if (next.length > probabilitiesResultLimit) {
                next.splice(0, next.length - probabilitiesResultLimit);
            }
            return next;
        });
    }, [chartNumbersDataSubscription, selectedTable, probabilitiesResultLimit]);

 

    const tableOptions =
        tablesData?.GetRouletteTables?.Tables?.map((table: RouletteTable) => ({
            label: `${table.Name} - ${table.Provider.charAt(0).toUpperCase() + table.Provider.slice(1)
                }`,
            value: table.Id,
        })) || [];

    const sourceResults = (liveResults && liveResults.length > 0)
        ? liveResults
        : (rouletteProbData?.GetRouletteTableProbabilities.Results || []);

    const chartFormattedData = useFormattedChartData({
        data: sourceResults,
        chartType: selectedType
            ? chartTypes[selectedType as keyof typeof chartTypes]
            : chartTypes.Candlestick,
        gameType: gameType || 'RedAndBlack',
    });

  
    const selectedChartType = selectedType
        ? chartTypes[selectedType as keyof typeof chartTypes]
        : chartTypes.Candlestick;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const candleData = Array.isArray(chartFormattedData) && chartFormattedData[0]?.data ? (chartFormattedData[0].data as any[]) : [];
    const numbersFromCandles = candleData.map(c => ({ Number: typeof c.closeOriginal === 'number' ? c.closeOriginal : c.close }));

    const rouletteFromCandles = useRouletteNumbers(numbersFromCandles);
    const rouletteFromResults = useRouletteNumbers(sourceResults);
    const formattedNumbers = selectedChartType === chartTypes.Candlestick ? rouletteFromCandles : rouletteFromResults;


    const currentProbabilities =
        chartNumbersDataSubscription?.OnRouletteNumberUpdate?.Probabilities ??
        rouletteProbData?.GetRouletteTableProbabilities.Probabilities;


    useEffect(() => {
        if (currentProbabilities && currentProbabilities.length > 0) {
            setLastValidProbabilities(currentProbabilities);
        }
    }, [currentProbabilities]);


    useEffect(() => {
        setLastValidProbabilities(undefined);
    }, [selectedTable, gameType]);

    const probabilities = currentProbabilities && currentProbabilities.length > 0
        ? currentProbabilities
        : lastValidProbabilities;

    const totalCount = tablesData?.GetRouletteTables.Total || 0;
    const marketHasNextPage = totalCount > 0 && marketPage * limit < totalCount;
    const marketHasPrevPage = marketPage > 1;

    return {
        tableOptions,
        chartFormattedData,
        formattedNumbers,
        probabilities,
        marketLoading,
        chartLoading,
        errorTables,
        errorProbabilities,
        marketHasNextPage,
        marketHasPrevPage,
    };
};