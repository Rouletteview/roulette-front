import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useQuery } from "@apollo/client";
import { GET_USER_BETS_QUERY } from "../../../graphql/query/bet/getUserBets";
import { usePagination } from "../../../hooks/usePagination";
import Pagination from "../Pagination";
import ColumnIcon from '../../../assets/icon/column-icon.svg';
import closeIcon from '../../../assets/icon/close-modal.svg';
import './HistoryModal.css';
import { translateRouletteTag } from '../../../utils/formatters/rouletterNumbers';

interface UserBet {
    id: string;
    amount: number;
    gameType: string;
    value: string;
    status: string;
    createdAt: string;
    table: {
        Name: string;
        Provider: string;
    };
}

interface HistoryModalProps {
    open: boolean;
    onClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ open, onClose }) => {
    const {
        currentPage,
        limit,
        skip,
        handlePreviousPage,
        handleNextPage
    } = usePagination({
        defaultPage: 1,
        defaultLimit: 6,
        paramName: 'page'
    });

    const { data: bets, loading, error, refetch } = useQuery(GET_USER_BETS_QUERY, {
        variables: {
            request: {
                limit,
                skip
            }
        }
    });

    useEffect(() => {
        if (open) {
            refetch({
                request: {
                    limit,
                    skip
                }
            });
        }
    }, [open, currentPage, refetch, limit, skip]);

    const userBets = bets?.GetUserBets || [];
    const hasNextPage = userBets.length === limit;
    const hasPreviousPage = currentPage > 1;



    return (
        <Modal
            open={open}
            closeIcon={false}
            onCancel={onClose}

            footer={null}
            centered
            width="80%"
            style={{ maxWidth: '800px' }}
            styles={{
                content: {
                    borderRadius: '16px',
                    padding: '24px',
                },
                mask: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
            }}
        >
            <div className="space-y-4">
                <div className="w-full flex justify-between">
                    <h2 className="text-xl font-bold text-gray-800 m-0">
                        Historial de Apuestas
                    </h2>
                    <button onClick={onClose} className='cursor-pointer'>
                        <img src={closeIcon} alt="close" className='w-6 h-auto sm:w-8' />
                    </button>
                </div>
                {loading ? (
                    // Skeleton
                    <div className="space-y-4">
                        <div className="bg-white rounded-lg shadow-sm  overflow-hidden">

                            <div className="bg-[#F9FAFC] px-4 py-3 border-b border-gray-200">
                                <div className="flex space-x-4">
                                    <div className="w-16 h-4 bg-gray-200 rounded animate-pulse hidden lg:block"></div>
                                    <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className={`px-4 py-3 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFC]'}`}>
                                        <div className="flex space-x-4 items-center">
                                            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse hidden lg:block"></div>
                                            <div className="flex-1">
                                                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                                                <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                                            </div>
                                            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center py-8">
                        <span className="text-red-600">Error al cargar el historial</span>
                    </div>
                ) : (
                    <>
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-[#F9FAFC] uppercase text-xs text-gray-500 font-light">
                                <tr>
                                    <th className="px-4 sm:px-4 md:px-8 py-3 hidden lg:table-cell">
                                        <img src={ColumnIcon} alt="" />
                                    </th>
                                    <th className="px-4 sm:px-4 md:px-8 py-3">Mercado Operado</th>
                                    <th className="px-2 sm:px-4 md:px-8 py-3 hidden lg:table-cell">Tipo de apuesta</th>
                                    <th className="px-2 sm:px-4 md:px-8 py-3">Ganancia</th>
                                    <th className="px-2 sm:px-4 md:px-8 py-3">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userBets.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 sm:px-4 md:px-8 py-8 text-center text-gray-500">
                                            No hay apuestas en el historial
                                        </td>
                                    </tr>
                                ) : (
                                    userBets.map((bet: UserBet) => (
                                        <tr
                                            key={bet.id}
                                            className="hover:bg-gray-50 transition-colors odd:bg-white even:bg-[#F9FAFC]"
                                        >
                                            <td className="px-4 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 hidden lg:table-cell">
                                                {bet.id.slice(0, 4) + '...' + bet.id.slice(-4)}
                                            </td>
                                            <td className="px-4 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4">
                                                <div className="font-medium">{bet.table.Name}</div>
                                                <div className="text-xs text-gray-400 md:hidden table-cell">{bet.gameType}</div>
                                            </td>
                                            <td className="px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 hidden lg:table-cell">
                                                <div className="font-medium">{translateRouletteTag(bet.gameType)}</div>
                                            </td>
                                            <td className={`px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 ${bet.status === 'Won' ? 'text-green-600' : bet.status === 'Lost' ? 'text-red-600' : 'text-gray-600'} font-light`}>
                                                {bet.status === 'Won' ? '+' : bet.status === 'Lost' ? '-' : ''}${bet.amount}
                                            </td>
                                            <td className="px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4">
                                                {new Date(bet.createdAt).toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {userBets.length > 0 && (
                            <div className=" w-full">
                                <Pagination
                                    currentPage={currentPage}
                                    onPreviousPage={handlePreviousPage}
                                    onNextPage={handleNextPage}
                                    hasNextPage={hasNextPage}
                                    hasPreviousPage={hasPreviousPage}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </Modal>
    );
};

export default HistoryModal;
