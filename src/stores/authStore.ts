import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import CryptoJS from 'crypto-js';


type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      login: (token) => {
        set({ token: token, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('user');
        set({ token: null, isAuthenticated: false });
      },
    }),

    {
      name: 'auth-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            const state = JSON.parse(str);
            return state;
          } catch {
            return null;
          }
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);