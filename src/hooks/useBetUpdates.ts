import { useSubscription } from "@apollo/client";
import { ON_BET_UPDATE_SUBSCRIPTION } from "../graphql/subscriptions/onBetUpdate";
import { useBetStatusStore } from "../stores/betStatusStore";
import { useCountdownStore } from "../stores/countdownStore";
import { showWinToast, showLoseToast, showInfoToast } from "../app/components/Toast";
import { useEffect, useRef } from "react";

interface BetUpdateData {
    OnBetUpdate: {
        Bet: {
            id: string;
            amount: number;
            gameType: string;
            value: string;
            status: string;
            createdAt: string;
            table: {
                Id: string;
                Name: string;
                Provider: string;
                IsOnline: boolean;
            };
        };
        PreviousStatus: string;
        UpdatedAt: string;
    };
}

export const useBetUpdates = (tableId: string) => {
    const { setBetResult, removeActiveBet, realTimeUpdates } = useBetStatusStore();
    const { countdown } = useCountdownStore();
    const processedBetsRef = useRef<Set<string>>(new Set());

    const { data: betUpdateData, error } = useSubscription<BetUpdateData>(
        ON_BET_UPDATE_SUBSCRIPTION,
        {
            variables: { tableId },
            skip: !tableId || !realTimeUpdates,
        }
    );

    useEffect(() => {
        if (betUpdateData?.OnBetUpdate) {
            const { Bet } = betUpdateData.OnBetUpdate;
            const { id: betId, status, value } = Bet;

        
            if (processedBetsRef.current.has(betId)) {
                return;
            }

          
            processedBetsRef.current.add(betId);

      
            switch (status) {
                case 'Won':
                    setBetResult({ status: 'Won', value });
                    showWinToast(value, `win-${betId}`);
                    removeActiveBet(betId);
                    break;
                case 'Lost':
                    setBetResult({ status: 'Lost', value });
                    showLoseToast(value, `lose-${betId}`);
                    removeActiveBet(betId);
                    break;
                case 'Placed':
                    setBetResult({ status: 'Placed', value });
                    showInfoToast('Apuesta en proceso...', `placed-${betId}`);
                    break;
                case 'Cancelled':
                    setBetResult({ status: 'Cancelled', value });
                    showInfoToast('Apuesta cancelada', `cancelled-${betId}`);
                    removeActiveBet(betId);
                    break;
                default:
                    showInfoToast('Resultado pendiente', `pending-${betId}`);
            }

        
            if (status === 'Won' || status === 'Lost' || status === 'Cancelled') {
                const betIdsFromStorage = localStorage.getItem('betId');
                if (betIdsFromStorage) {
                    try {
                        const betIdsArray = JSON.parse(betIdsFromStorage);
                        const remainingBets = betIdsArray.filter((id: string) => id !== betId);

                        if (remainingBets.length > 0) {
                            localStorage.setItem('betId', JSON.stringify(remainingBets));
                        } else {
                            localStorage.removeItem('betId');
                        }
                    } catch (error) {
                        console.error('Error updating localStorage:', error);
                    }
                }
            }
        }
    }, [betUpdateData, setBetResult, removeActiveBet]);

    useEffect(() => {
        if (countdown === 0) {
            processedBetsRef.current.clear();
        }
    }, [countdown]);

    return {
        betUpdateData,
        error,
    };
};
