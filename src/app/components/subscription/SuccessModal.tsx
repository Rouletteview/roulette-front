import React from 'react';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message = "¡Suscripción creada exitosamente!" }) => {
    if (!isOpen) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 bg-[#000000CC] bg-opacity-50 flex items-center justify-center z-50">
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">


                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    ¡Tu pago esta siendo procesado!
                </h1>


                <p className="text-gray-600 text-center mb-6">
                    {message}
                </p>


                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-[#D9A425] hover:bg-[#B3831D] text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 yellow-button-shadow"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal; 