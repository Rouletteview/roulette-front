import { useState } from "react";

interface BetSectionState {
    isOpen: boolean;
    selectedChip: string | null;
    counter: number;
    betId: string;
    betStatus: string | null;
}

export const useBetSectionState = () => {
    const [state, setState] = useState<BetSectionState>({
        isOpen: false,
        selectedChip: null,
        counter: 1,
        betId: '',
        betStatus: null,
    });


    const handleToggle = (tag: string) => {
        localStorage.setItem('betValue', tag);
        setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
    }

    const updateState = (updates: Partial<BetSectionState>) => {
        setState(prev => ({ ...prev, ...updates }));
    }

    const setSelectedChip = (chip: string) => {
        updateState({ selectedChip: chip });
    }

    const setCounter = (counter: number) => {
        updateState({ counter });
    }

    const setBetId = (betId: string) => {
        updateState({ betId });
    }

    const setBetStatus = (betStatus: string) => {
        updateState({ betStatus });
    }

    
    const amount = state.selectedChip ? parseFloat(state.selectedChip) * state.counter : 0;

    return {
        state,
        setState,
        handleToggle,
        setSelectedChip,
        setBetStatus,
        setBetId,
        setCounter,
        amount,
    }
}