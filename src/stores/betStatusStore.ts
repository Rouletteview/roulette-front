import { create } from 'zustand';

interface BetResult {
    status: string;
    value?: string;
}

interface ActiveBet {
    id: string;
    tag: string;
    gameType: string;
    amount: number;
}

interface BetStatusState {
    betResult: BetResult | null;
    activeBets: ActiveBet[];
    setBetResult: (result: BetResult | null) => void;
    clearBetResult: () => void;
    addActiveBet: (bet: ActiveBet) => void;
    removeActiveBet: (betId: string) => void;
    clearActiveBets: () => void;
    getActiveBetsByGameType: (gameType: string) => ActiveBet[];
    canPlaceBet: (gameType: string, tag: string) => boolean;
}

export const useBetStatusStore = create<BetStatusState>((set, get) => ({
    betResult: null,
    activeBets: [],
    setBetResult: (result) => set({ betResult: result }),
    clearBetResult: () => set({ betResult: null }),
    addActiveBet: (bet) => set((state) => ({
        activeBets: [...state.activeBets, bet]
    })),
    removeActiveBet: (betId) => set((state) => ({
        activeBets: state.activeBets.filter(bet => bet.id !== betId)
    })),
    clearActiveBets: () => set({ activeBets: [] }),
    getActiveBetsByGameType: (gameType) => {
        const state = get();
        return state.activeBets.filter(bet => bet.gameType === gameType);
    },
    canPlaceBet: (gameType, tag) => {
        const state = get();
        const activeBetsForGameType = state.activeBets.filter(bet => bet.gameType === gameType);

        // Para Columna y Docena, limitar a máximo 2 apuestas
        if (gameType === 'Column' || gameType === 'Dozen') {
            if (activeBetsForGameType.length >= 2) {
                return false;
            }
            // Verificar si ya existe una apuesta con el mismo tag
            const existingBet = activeBetsForGameType.find(bet => bet.tag === tag);
            return !existingBet;
        }

        // Para otros tipos de juego, permitir múltiples apuestas
        return true;
    }
})); 