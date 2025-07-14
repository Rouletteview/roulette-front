import { Toaster, toast } from 'react-hot-toast';

export const showSuccessToast = (message: string) => {
    toast.success(message, {
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
        duration: 2000,
    });
};

const Toast = () => <Toaster />;

export default Toast; 