import React, { useState } from 'react';
import { Modal } from 'antd';
import { useMutation } from '@apollo/client';
import CloseModal from '../../assets/icon/close-info-modal.svg'
import { GET_USER } from '../../graphql/query/users/getUser';
import { useQuery } from '@apollo/client';
import { useSearchParams } from 'react-router';
import PaymentHistoryModal from './PaymentHistoryModal';
import PaymentRejectionModal from './Modal/PaymentRejectionModal';
import UserActionModal from './Modal/UserActionModal';
import { UPDATE_PAYMENTS_STATUS_MUTATION } from '../../graphql/mutations/subscription/updatePaymentsStatus';
import { UPDATE_USER_ACTIVATE_STATUS_MUTATION } from '../../graphql/mutations/users/updateUserActivateStatus';

interface UserDetailsModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ isVisible, onClose }) => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');
    const [isPaymentHistoryVisible, setIsPaymentHistoryVisible] = useState(false);
    const [isRejectionModalVisible, setIsRejectionModalVisible] = useState(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

    const [updatePaymentStatus] = useMutation(UPDATE_PAYMENTS_STATUS_MUTATION);
    const [updateUserStatus] = useMutation(UPDATE_USER_ACTIVATE_STATUS_MUTATION);

    const { data, loading } = useQuery(GET_USER, {
        variables: {
            userId: userId
        },
        skip: !userId
    })

    const user = data?.GetUser;


    const handleApprovePayment = async () => {
        try {
            const payment = user?.Subscription?.Payments?.[0];
            const subscription = user?.Subscription;

            if (!payment || !subscription) {
                console.error('No payment or subscription found');
                return;
            }

            console.log(payment.Id, subscription.Id)
            await updatePaymentStatus({
                variables: {
                    input: {
                        PaymentId: payment.Id,
                        SubscriptionId: subscription.Id,
                        Status: 'Approved'
                    }
                }
            });

            console.log('Pago aprobado exitosamente');
            onClose();
        } catch (error) {
            console.error('Error approving payment:', error);
        }
    };

    const handleRejectPayment = () => {
        setIsRejectionModalVisible(true);
    };

    const handleCloseRejectionModal = () => {
        setIsRejectionModalVisible(false);
    };

    const handleSubmitRejection = (comment: string) => {
        console.log('Rechazar pago con comentario:', comment);
        onClose();
    };

    const handleDeleteUser = () => {
        setShowDeleteConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!user) return;

        try {
            await updateUserStatus({
                variables: {
                    userId: user.Id,
                    isActive: false
                }
            });

            console.log('Usuario eliminado exitosamente');
            setShowDeleteConfirmModal(false);
            onClose();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmModal(false);
    };

    const handleShowPaymentHistory = () => {
        setIsPaymentHistoryVisible(true);
    };

    const handleClosePaymentHistory = () => {
        setIsPaymentHistoryVisible(false);
    };


    return (
        <>
            <Modal
                open={isVisible}
                onCancel={onClose}
                footer={null}
                width="90vw"
                className="user-details-modal"
                closeIcon={<img src={CloseModal} alt="close" className='w-6 h-auto sm:w-8' />}
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
                    {loading ? (
                        // Loading skeleton
                        <div className="space-y-6">
                            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#D9A425] pb-4 mt-8 sm:mt-16 gap-4 sm:gap-0'>
                                <div className="h-8 bg-gray-200 rounded animate-pulse w-48"></div>
                                <div className="h-10 bg-gray-200 rounded animate-pulse w-32"></div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                                <div className="space-y-4">
                                    {[...Array(2)].map((_, index) => (
                                        <div key={index}>
                                            <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-2"></div>
                                            <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    {[...Array(2)].map((_, index) => (
                                        <div key={index}>
                                            <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-2"></div>
                                            <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full mt-3.5">
                                <div className="space-y-4">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-2"></div>
                                    <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
                                    <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>

                            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#D9A425] pb-4 mt-8 sm:mt-16 gap-4 sm:gap-0'>
                                <div>
                                    <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold'>Información del usuario</h1>
                                </div>
                                <div className='w-full sm:w-auto'>
                                    <button onClick={handleDeleteUser} className='w-full sm:w-auto text-white bg-[#FF0000] hover:bg-[#FF0000]/80 px-4 py-2 rounded-[10px] yellow-button-shadow cursor-pointer font-bold text-[14px] sm:text-[16px]'>Eliminar usuario</button>
                                </div>
                            </div>


                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            value={user?.Name || ''}
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-gray-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Correo electrónico
                                        </label>
                                        <input
                                            type="email"
                                            value={user?.Email || ''}
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-gray-50"
                                        />
                                    </div>

                                    {/* <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value="••••••••"
                                        readOnly
                                        className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-gray-50"
                                    />
                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                                        <button
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="p-1 hover:bg-gray-100 rounded"
                                        >
                                            <EyeIcon />
                                        </button>
                                        <button className="p-1 hover:bg-gray-100 rounded">
                                            <PlusIcon />
                                        </button>
                                    </div>
                                </div>
                            </div> */}




                                </div>


                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Cedula/DNI
                                        </label>
                                        <input
                                            type="text"
                                            value="12345678"
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-gray-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fecha de vencimiento
                                        </label>
                                        <input
                                            type="text"
                                            value={user?.Subscription?.EndDate ? new Date(user.Subscription.EndDate).toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-gray-50"
                                        />
                                    </div>

                                    {/* <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    País
                                </label>
                                <input
                                    type="text"
                                    value={user?.Country || ''}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-gray-50"
                                />
                            </div> */}

                                    {/* <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Teléfono
                                </label>
                                <input
                                    type="text"
                                    value={user?.PhoneNumber || ''}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-gray-50"
                                />
                            </div> */}
                                </div>
                            </div>
                            <section className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full mt-3.5'>

                                <div className='w-full'>
                                    <div className='flex flex-col sm:flex-row gap-2 w-full'>
                                        <label className="block text-base sm:text-lg font-medium text-gray-700 mb-1">
                                            Pago realizado
                                        </label>
                                        <button
                                            onClick={handleShowPaymentHistory}
                                            className="text-xs text-[#444444] hover:text-[#444444]/80 underline cursor-pointer self-start sm:self-center"
                                        >
                                            ver historial
                                        </button>
                                    </div>

                                    {
                                        user?.Subscription?.Payments?.[0]?.Status === 'Pending' && (
                                            <div className='w-full'>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Numero de referencia
                                                </label>
                                                <input
                                                    type="text"
                                                    value={user?.Subscription?.Payments?.[0]?.Reference || ''}
                                                    readOnly
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-gray-50"
                                                />
                                            </div>
                                        )}


                                </div>

                                {
                                    user?.Subscription?.Payments?.[0]?.Status === 'Pending' && (
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 w-full">
                                            <button
                                                onClick={handleApprovePayment}
                                                className="bg-[#20B26C] text-white text-[14px] sm:text-[16px] font-bold px-4 sm:px-6 py-2 rounded-[10px] hover:bg-[#20B26C]/80 transition-colors cursor-pointer yellow-button-shadow w-full"
                                            >
                                                Aprobar pago
                                            </button>

                                            <button
                                                onClick={handleRejectPayment}
                                                className="bg-[#FF0000] text-white text-[14px] sm:text-[16px] font-bold px-4 sm:px-6 py-2 rounded-[10px] hover:bg-[#FF0000]/80 transition-colors cursor-pointer yellow-button-shadow w-full"
                                            >
                                                Rechazar pago
                                            </button>
                                        </div>
                                    )}


                            </section>
                        </>
                    )}
                </div>
            </Modal>

            <PaymentHistoryModal
                isVisible={isPaymentHistoryVisible}
                onClose={handleClosePaymentHistory}
            />

            <PaymentRejectionModal
                isVisible={isRejectionModalVisible}
                onClose={handleCloseRejectionModal}
                onSubmit={handleSubmitRejection}
                paymentId={user?.Subscription?.Payments?.[0]?.Id || ''}
                subscriptionId={user?.Subscription?.Id || ''}
            />

            <UserActionModal
                open={showDeleteConfirmModal}
                user={user ? {
                    id: user.Id,
                    name: user.Name,
                    email: user.Email,
                    planExpiration: user.Subscription?.EndDate || '',
                    paymentStatus: user.Subscription?.Payments?.[0]?.Status === 'Pending' ? 'Por verificar' :
                        user.Subscription?.Payments?.[0]?.Status === 'Rejected' ? 'Rechazado' :
                            user.Subscription?.Payments?.[0]?.Status === 'Approved' ? 'Verificado' : '',
                    isActive: user.IsActive
                } : null}
                action="delete"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </>
    );
};

export default UserDetailsModal; 