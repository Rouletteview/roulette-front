import React, { useState } from 'react';
import { Modal, Table, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { useSearchParams } from 'react-router';
import backIcon from '../../assets/icon/back-icon.svg'
import viewIcon from '../../assets/icon/view-icon.svg';
import type { ColumnsType } from 'antd/es/table';
import PaymentReceiptModal from './PaymentReceiptModal';
import { GET_USER_SUBSCRIPTION_PAYMENTS_HISTORY_QUERY } from '../../graphql/query/users/getUserSubscriptionPaymentsHistory';
import { UserSubscriptionPaymentHistory } from '../../graphql/generated/types';
import { usePagination } from '../../hooks/usePagination';
import { translateRouletteTag } from '../../utils/formatters/rouletterNumbers';

interface PaymentHistoryData {
    key: string;
    subscriptionType: string;
    paymentDate: string;
    paymentReference: string;
    status: string;
    frequency: string;
    paymentMethod: string;
    originalReference: string;
    photoUrl?: string;
}

interface PaymentHistoryModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const PaymentHistoryModal: React.FC<PaymentHistoryModalProps> = ({
    isVisible,
    onClose,
}) => {
    const [searchParams] = useSearchParams();
    const [isReceiptModalVisible, setIsReceiptModalVisible] = useState(false);
    const [selectedPaymentReference, setSelectedPaymentReference] = useState<string>('');

    const userId = searchParams.get('userId');
    const { data: paymentHistoryData, loading, error } = useQuery(GET_USER_SUBSCRIPTION_PAYMENTS_HISTORY_QUERY, {
        skip: !isVisible || !userId,
        variables: {
            userId: userId
        }
    });

    const {
        currentPage,
        limit,
        handlePreviousPage,
        handleNextPage
    } = usePagination({
        defaultPage: 1,
        defaultLimit: 6,
        paramName: 'paymentPage'
    });

    const handleViewReceipt = (paymentReference: string, paymentMethod: string, photoUrl?: string) => {

        console.log(paymentMethod, photoUrl);
        const referenceToPass = paymentMethod === 'Crypto' ? photoUrl : paymentReference;
        setSelectedPaymentReference(referenceToPass || paymentReference);
        setIsReceiptModalVisible(true);
    };

    const handleCloseReceiptModal = () => {
        setIsReceiptModalVisible(false);
        setSelectedPaymentReference('');
    };

    const allData: PaymentHistoryData[] = paymentHistoryData?.GetUserSubscriptionPaymentHistory?.map((payment: UserSubscriptionPaymentHistory, index: number) => ({
        key: String(index + 1),
        subscriptionType: translateRouletteTag(payment.Frequency) || 'N/A',
        paymentDate: payment.PaidAt ? new Date(payment.PaidAt).toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'N/A',
        // status: payment.Status || 'N/A',
        paymentReference: payment.PaymentMethod === 'Crypto' ? 'USDT' :
            payment.PaymentMethod === 'Phone' ? payment.Reference :
                payment.PaymentMethod || 'N/A',
        paymentMethod: payment.PaymentMethod,
        originalReference: payment.Reference,
        photoUrl: payment.PhotoUrl,
    })) || [];

    const totalItems = allData.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = allData.slice(startIndex, endIndex);

    const columns: ColumnsType<PaymentHistoryData> = [
        {
            title: 'Tipo de suscripción',
            dataIndex: 'subscriptionType',
            key: 'subscriptionType',
            className: 'text-sm font-medium',
        },
        {
            title: 'Fechas de pago',
            dataIndex: 'paymentDate',
            key: 'paymentDate',
            className: 'text-sm font-medium',
        },
        {
            title: 'Referencias del pago',
            dataIndex: 'paymentReference',
            key: 'paymentReference',
            className: 'text-sm font-medium',
            render: (text, record) => (
                <div className="flex items-center gap-2">
                    <span>{text}</span>
                    {record.paymentReference === 'USDT' && (
                        <button
                            className='cursor-pointer'
                            onClick={() => handleViewReceipt(record.paymentReference, record.paymentMethod, record.photoUrl)}
                        >
                            <img src={viewIcon} alt="view" />
                        </button>
                    )}
                </div>
            ),
        }
        // {
        //     title: 'Estado',
        //     dataIndex: 'status',
        //     key: 'status',
        //     className: 'text-sm font-medium',
        // },

    ];

    return (
        <Modal
            open={isVisible}
            onCancel={onClose}
            footer={null}
            width="90vw"
            closable={false}
            className="payment-history-modal"
            styles={{
                body: {
                    padding: '0px',
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
            <div className="relative px-0 sm:px-6 py-0 sm:py-4">
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

                {loading && (
                    <div className="flex justify-center items-center py-8">
                        <p className="text-gray-600">Cargando historial de pagos...</p>
                    </div>
                )}

                {error && (
                    <div className="flex justify-center items-center py-8">
                        <p className="text-red-600">Error al cargar el historial de pagos</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="border border-gray-200 rounded-lg overflow-hidden mt-6">
                        <Table
                            columns={columns}
                            dataSource={paginatedData}
                            pagination={false}
                            className="payment-history-table"
                            rowClassName="hover:bg-gray-50"
                            loading={loading}
                        />
                    </div>
                )}


                {!loading && !error && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <Button
                            type="text"
                            icon={<LeftOutlined />}
                            className="p-2 h-auto"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        />
                        <span className="text-sm text-gray-600">{currentPage}/{totalPages}</span>
                        <Button
                            type="text"
                            icon={<RightOutlined />}
                            className="p-2 h-auto"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        />
                    </div>
                )}


            </div>

            <PaymentReceiptModal
                isVisible={isReceiptModalVisible}
                onClose={handleCloseReceiptModal}
                paymentReference={selectedPaymentReference}
            />
        </Modal>
    );
};

export default PaymentHistoryModal; 