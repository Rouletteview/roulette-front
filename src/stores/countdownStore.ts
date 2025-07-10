import { create } from 'zustand';

interface CountdownState {
    countdown: number;
    isActive: boolean;
    setCountdown: (countdown: number) => void;
    setIsActive: (isActive: boolean) => void;
    resetCountdown: () => void;
    resetCountdownIfInactive: () => void;
}

export const useCountdownStore = create<CountdownState>((set, get) => ({
    countdown: 30,
    isActive: false,
    setCountdown: (countdown: number) => set({ countdown }),
    setIsActive: (isActive: boolean) => set({ isActive }),
    resetCountdown: () => set({ countdown: 30 }),
    resetCountdownIfInactive: () => {
        const { isActive } = get();
        if (!isActive) {
            set({ countdown: 30 });
        }
    },
})); 