import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BetRecord {
    id: string;
    amount: number;
    gameType: string;
    status: 'Placed' | 'Won' | 'Lost' | 'Cancelled';
}

interface BalanceState {
    initialBalance: number;
    bets: BetRecord[];

    
    setInitialBalance: (balance: number) => void;
    addFunds: (amount: number) => void;
    addBet: (bet: BetRecord) => void;
    updateBetStatus: (betId: string, status: 'Placed' | 'Won' | 'Lost' | 'Cancelled') => void;
    getAvailableBalance: () => number;
    getFinalBalance: () => number;
    getUtility: () => number;
    getBenefitRatio: () => string;
    reset: () => void;

   
    getPayoutMultiplier: (gameType: string) => number;
}

const getPayoutMultiplier = (gameType: string): number => {
   
    switch (gameType) {
        case 'RedAndBlack':
        case 'OddAndEven':
        case 'HighAndLow':
            return 1; 
        case 'Column':
        case 'Dozen':
            return 2; 
        case 'StraightUp':
            return 35; 
        default:
            return 1; 
    }
};

export const useBalanceStore = create<BalanceState>()(
    persist(
        (set, get) => ({
            initialBalance: 0,
            bets: [],

            setInitialBalance: (balance) => {
                set({ initialBalance: balance });
            },

            addFunds: (amount) => {
                if (amount <= 0) return;
                set((state) => ({ initialBalance: state.initialBalance + amount }));
            },

            addBet: (bet) => {
                set((state) => ({
                    bets: [...state.bets, bet]
                }));
            },

            updateBetStatus: (betId, status) => {
                set((state) => ({
                    bets: state.bets.map(bet =>
                        bet.id === betId ? { ...bet, status } : bet
                    )
                }));
            },

            getAvailableBalance: () => {
                const state = get();
                let balance = state.initialBalance;

             
                state.bets.forEach(bet => {
                    if (bet.status === 'Placed') {
                       
                        balance -= bet.amount;
                    } else if (bet.status === 'Won') {
                        
                        const multiplier = getPayoutMultiplier(bet.gameType);
                        balance += bet.amount * multiplier;
                    } else if (bet.status === 'Lost') {
                        // 
                    } else if (bet.status === 'Cancelled') {
                       
                        balance += bet.amount;
                    }
                });

                return balance;
            },

            getFinalBalance: () => {
                const state = get();
                let balance = state.initialBalance;

               
                state.bets.forEach(bet => {
                    if (bet.status === 'Placed') {
                       
                        balance -= bet.amount;
                    } else if (bet.status === 'Won') {
                       
                        balance -= bet.amount; 
                        const multiplier = getPayoutMultiplier(bet.gameType);
                        balance += bet.amount * (1 + multiplier); 
                    } else if (bet.status === 'Lost') {
                     
                        balance -= bet.amount;
                    } else if (bet.status === 'Cancelled') {
                       
                        balance += bet.amount;
                    }
                });

                return balance;
            },

            getUtility: () => {
                const state = get();
                const finalBalance = state.getFinalBalance();
                return finalBalance - state.initialBalance;
            },

            getBenefitRatio: () => {
                const state = get();
                if (state.initialBalance === 0) return '0%';

                const utility = state.getUtility();
                const ratio = (utility / state.initialBalance) * 100;
                return `${ratio >= 0 ? '+' : ''}${ratio.toFixed(2)}%`;
            },

            reset: () => {
                set({ initialBalance: 0, bets: [] });
            },

            getPayoutMultiplier: (gameType: string) => {
                return getPayoutMultiplier(gameType);
            }
        }),
        {
            name: 'balance-storage',
            storage: {
                getItem: (name) => {
                    const str = localStorage.getItem(name);
                    if (!str) return null;
                    try {
                        return JSON.parse(str);
                    } catch {
                        return null;
                    }
                },
                setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
                removeItem: (name) => localStorage.removeItem(name),
            },
        }
    )
);
