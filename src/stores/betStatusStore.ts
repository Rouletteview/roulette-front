import { create } from 'zustand';

interface BetResult {
    status: string;
    value?: string;
}

interface BetStatusState {
    betResult: BetResult | null;
    setBetResult: (result: BetResult | null) => void;
    clearBetResult: () => void;
}

export const useBetStatusStore = create<BetStatusState>((set) => ({
    betResult: null,
    setBetResult: (result) => set({ betResult: result }),
    clearBetResult: () => set({ betResult: null }),
})); 