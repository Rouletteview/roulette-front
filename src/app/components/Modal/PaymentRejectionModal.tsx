import React, { useState } from 'react';
import { Modal } from 'antd';
import { useMutation } from '@apollo/client';
import backIcon from '../../../assets/icon/back-icon.svg';
import { UPDATE_PAYMENTS_STATUS_MUTATION } from '../../../graphql/mutations/subscription/updatePaymentsStatus';

interface PaymentRejectionModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (comment: string) => void;
    paymentId: string;
    subscriptionId: string;
}

const PaymentRejectionModal: React.FC<PaymentRejectionModalProps> = ({
    isVisible,
    onClose,
    onSubmit,
    paymentId,
    subscriptionId
}) => {
    const [comment, setComment] = useState('No encontramos tu pago con los datos que dejaste en el registro');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [updatePaymentStatus] = useMutation(UPDATE_PAYMENTS_STATUS_MUTATION);

    const handleSubmit = async () => {
        if (!paymentId || !subscriptionId) {
            console.error('Missing paymentId or subscriptionId');
            return;
        }

        setIsSubmitting(true);
        try {
            await updatePaymentStatus({
                variables: {
                    input: {
                        PaymentId: paymentId,
                        SubscriptionId: subscriptionId,
                        Status: 'Rejected',
                        ReviewComment: comment
                    }
                }
            });

            onSubmit(comment);
            onClose();
        } catch (error) {
            console.error('Error rejecting payment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            open={isVisible}
            onCancel={onClose}
            footer={null}
            width="90vw"
            closable={false}
            className="payment-rejection-modal"
            styles={{
                body: {
                    padding: '16px sm:24px',
                    borderRadius: '0 0 20px 20px',
                },
                content: {
                    borderRadius: '20px',
                    overflow: 'hidden',
                    maxWidth: '800px',
                    margin: '0 auto',
                },
                mask: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
            }}
        >
            <div className="relative p-4 sm:p-6">
                {/* Header */}
                <div className='w-full sm:w-auto'>
                    <button onClick={onClose} className='cursor-pointer'>
                        <img src={backIcon} alt="close" />
                    </button>
                </div>
                {/* Title */}
                <div className='flex flex-col sm:flex-row justify-center items-start sm:items-center border-b border-[#D9A425] pb-4 mt-8 sm:mt-16 gap-4 sm:gap-0'>
                    <div>
                        <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold'>Deja un comentario sobre el rechazo del pago</h1>
                    </div>


                </div>

                {/* Comment textarea */}
                <div className="mb-6 mt-14 max-w-md mx-auto">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 resize-none"
                        placeholder="Escribe tu comentario aquí..."
                    />
                </div>

                <div className='flex justify-center'>

                    {/* Submit button */}
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`px-12 bg-[#D9A425] hover:bg-[#B3831D] text-white font-bold py-3 rounded-xl transition-all cursor-pointer yellow-button-shadow ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default PaymentRejectionModal; 