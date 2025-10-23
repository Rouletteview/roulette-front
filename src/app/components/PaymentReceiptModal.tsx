import React from 'react';
import { Modal } from 'antd';
import backIcon from '../../assets/icon/back-icon.svg';

interface PaymentReceiptModalProps {
    isVisible: boolean;
    onClose: () => void;
    paymentReference?: string;
}

const PaymentReceiptModal: React.FC<PaymentReceiptModalProps> = ({
    isVisible,
    onClose,
    paymentReference,
}) => {
    return (
        <Modal
            open={isVisible}
            onCancel={onClose}
            footer={null}
            width="90vw"
            closable={false}
            className="payment-receipt-modal"
            styles={{
                body: {
                    padding: '16px 24px',
                    borderRadius: '0 0 20px 20px',
                },
                content: {
                    borderRadius: '20px',
                    overflow: 'hidden',
                    maxWidth: '800px',
                    margin: '0 auto',
                }
            }}
        >
            <div className="relative">
                {/* Header */}
                <div className='w-full sm:w-auto'>
                    <button onClick={onClose} className='cursor-pointer'>
                        <img src={backIcon} alt="close" />
                    </button>
                </div>

                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#D9A425] pb-4 mt-8 sm:mt-16 gap-4 sm:gap-0'>
                    <div>
                        <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold'>Historial de pago</h1>
                    </div>


                </div>

                {/* Image Display */}
                <div className='flex justify-center mt-8'>
                    {paymentReference && paymentReference.startsWith('http') ? (
                        <div className='w-64 h-64 rounded-lg overflow-hidden border border-gray-300'>
                            <img
                                src={paymentReference}
                                alt="Comprobante de pago"
                                className='w-full h-full object-contain'
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                            <div className='hidden w-full h-full bg-gray-300 flex items-center justify-center'>
                                <div className='text-gray-500 text-center'>
                                    <div className='w-16 h-16 bg-gray-400 rounded-lg mx-auto mb-2 flex items-center justify-center'>
                                        <div className='w-8 h-8 bg-gray-500 rounded-full'></div>
                                    </div>
                                    <p className='text-sm'>Error al cargar imagen</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='w-64 h-64 bg-gray-300 rounded-lg flex items-center justify-center'>
                            <div className='text-gray-500 text-center'>
                                <div className='w-16 h-16 bg-gray-400 rounded-lg mx-auto mb-2 flex items-center justify-center'>
                                    <div className='w-8 h-8 bg-gray-500 rounded-full'></div>
                                </div>
                                <p className='text-sm'>No hay imagen disponible</p>
                            </div>
                        </div>
                    )}
                </div>


            </div>
        </Modal>
    );
};

export default PaymentReceiptModal; 