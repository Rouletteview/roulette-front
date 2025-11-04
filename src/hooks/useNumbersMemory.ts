import { useSubscription } from "@apollo/client";
import { ON_ROULETTE_NUMBER_UPDATE_SUBSCRIPTION } from "../graphql/subscriptions/onRouletteNumberUpdate";
import { useRouletteNumbers } from "../utils/formatters/rouletterNumbers";
import { useBetStatusStore } from "../stores/betStatusStore";
import { useEffect, useState, useRef } from "react";

interface NumbersUpdateData {
    OnRouletteNumberUpdate: {
        TableId: string;
        Timestamp: string;
        Result: {
            Date: string;
            Tag: string;
            Number: number;
        };
        Probabilities: Array<{
            Tag: string;
            Value: number;
            Count: number;
        }>;
    };
}

export const useNumbersMemory = (
    tableId: string,
    gameType: string,
    httpNumbers: any[] = []
) => {
    const { realTimeUpdates } = useBetStatusStore();
    const [numbers, setNumbers] = useState<any[]>([]);
    const [probabilities, setProbabilities] = useState<any[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<any>(null);
    const [lastUpdate, setLastUpdate] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const numbersRef = useRef<any[]>([]);
    const processedNumbersRef = useRef<Set<string>>(new Set());
    const isInitializedRef = useRef(false);
    const lastTableIdRef = useRef<string | null>(null);
    const lastGameTypeRef = useRef<string | null>(null);

    useEffect(() => {
        if (!isInitializedRef.current && httpNumbers.length > 0) {
            numbersRef.current = httpNumbers;
            setNumbers(httpNumbers);
            setLoading(false);
            isInitializedRef.current = true;
        }
    }, [httpNumbers]);

    const { data: numbersUpdateData, error: subscriptionError } = useSubscription<NumbersUpdateData>(
        ON_ROULETTE_NUMBER_UPDATE_SUBSCRIPTION,
        {
            variables: {
                gameType: gameType as any,
                tableId: tableId || undefined,
                probabilitiesResultLimit: 250,
            },
            skip: !tableId || !gameType || !realTimeUpdates,
        }
    );

    // Resetear datos cuando cambian tableId o gameType
    useEffect(() => {
        const tableChanged = lastTableIdRef.current !== null && lastTableIdRef.current !== tableId;
        const gameTypeChanged = lastGameTypeRef.current !== null && lastGameTypeRef.current !== gameType;

        if (tableChanged || gameTypeChanged) {
            setNumbers([]);
            setProbabilities([]);
            numbersRef.current = [];
            processedNumbersRef.current.clear();
            isInitializedRef.current = false;
            setLoading(true);
        }

        lastTableIdRef.current = tableId;
        lastGameTypeRef.current = gameType;
    }, [tableId, gameType]);

    useEffect(() => {
        if (numbersUpdateData?.OnRouletteNumberUpdate) {
            const { Result, Probabilities, Timestamp, TableId } = numbersUpdateData.OnRouletteNumberUpdate;

            // Verificar que los datos corresponden al tableId actual
            if (tableId && TableId && TableId !== tableId) {
                return;
            }

            if (Result) {
                const numberKey = `${Result.Number}-${Result.Date}`;

                if (!processedNumbersRef.current.has(numberKey)) {
                    processedNumbersRef.current.add(numberKey);

                    setNumbers(prevNumbers => {
                        const existingNumber = prevNumbers.find(num =>
                            num.Number === Result.Number && num.Date === Result.Date
                        );

                        if (!existingNumber) {
                            const newNumbers = [Result, ...prevNumbers];
                            const limitedNumbers = newNumbers.slice(0, 100);
                            numbersRef.current = limitedNumbers;
                            return limitedNumbers;
                        }

                        return prevNumbers;
                    });
                }
            }

            if (Probabilities && Probabilities.length > 0) {
                setProbabilities(Probabilities);
            }

            setLastUpdate(Timestamp);
            setIsConnected(true);
            setError(null);
            setLoading(false);
        }
    }, [numbersUpdateData, tableId]);

    useEffect(() => {
        if (subscriptionError) {
            setError(subscriptionError);
            setIsConnected(false);
            setLoading(false);
        }
    }, [subscriptionError]);

    useEffect(() => {
        const interval = setInterval(() => {
            processedNumbersRef.current.clear();
        }, 300000);

        return () => clearInterval(interval);
    }, []);

    const formattedNumbers = useRouletteNumbers(numbers);

    return {
        numbers: formattedNumbers,
        probabilities,
        isConnected,
        error,
        lastUpdate,
        loading,
        realTimeUpdates,
    };
};
