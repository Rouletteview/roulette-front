import { Toaster, toast } from 'react-hot-toast';
import { translateRouletteTag } from '../../utils/formatters/rouletterNumbers';

export const showSuccessToast = (message: string, id?: string) => {
    toast.success(message, {
        id: id,
        style: {
            background: '#D9A425',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.1rem',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            padding: '16px 32px',
        },
        iconTheme: {
            primary: '#fff',
            secondary: '#D9A425',
        },
        position: 'top-center',
        duration: 3000,
    });
};

export const showErrorToast = (message: string) => {
    toast.error(message, {
      
        style: {
            background: '#FF0000',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.1rem',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            padding: '16px 32px',
        },
        iconTheme: {
            primary: '#fff',
            secondary: '#FF0000',
        },
        position: 'top-center',
        duration: 4000,
    });
};

export const showWinToast = (value: string, id?: string) => {
    toast.success(`¡Ganaste! ${translateRouletteTag(value)}`, {
        id: id,
        style: {
            background: '#20B26C',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.1rem',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            padding: '16px 32px',
        },
        iconTheme: {
            primary: '#fff',
            secondary: '#20B26C',
        },
        position: 'top-center',
        duration: 5000,
    });
};

export const showLoseToast = (value: string, id?: string) => {
    toast.error(`Perdiste. ${translateRouletteTag(value)}`, {
        id: id,
        style: {
            background: '#FF0000',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.1rem',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            padding: '16px 32px',
        },
        iconTheme: {
            primary: '#fff',
            secondary: '#FF0000',
        },
        position: 'top-center',
        duration: 4000,
    });
};

export const showPlacedToast = (value: string, id?: string) => {
    toast.success(`Apuesta colocada: ${translateRouletteTag(value)}`, {
        id: id,
        style: {
            background: '#D9A425',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.1rem',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            padding: '16px 32px',
        },
        iconTheme: {
            primary: '#fff',
            secondary: '#D9A425',
        },
        position: 'top-center',
        duration: 3000,
    });
};

export const showInfoToast = (message: string) => {
    toast(message, {
        style: {
            background: '#2962FF',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.1rem',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            padding: '16px 32px',
        },
        position: 'top-center',
        duration: 3000,
    });
};

const Toast = () => <Toaster />;

export default Toast; 