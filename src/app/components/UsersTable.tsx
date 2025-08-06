import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Modal } from 'antd';
import viewIcon from '../../assets/icon/view-icon.svg';
import deleteIcon from '../../assets/icon/trash-icon.svg';
import { UPDATE_USER_ACTIVATE_STATUS_MUTATION } from '../../graphql/mutations/users/updateUserActivateStatus';
import Pagination from './Pagination';



interface User {
    id: string;
    name: string;
    email: string;
    planExpiration: string;
    paymentStatus: 'Por verificar' | 'Rechazado' | 'Verificado' | '';
    isActive: boolean;
}

interface UsersTableProps {
    users: User[];
    onViewUser: (userId: string) => void;
    onDeleteUser: (userId: string) => void;
    currentPage: number;
    onPreviousPage: () => void;
    onNextPage: () => void;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({
    users,
    onViewUser,
    onDeleteUser,
    currentPage,
    onPreviousPage,
    onNextPage,
    hasNextPage = true,
    hasPreviousPage = true
}) => {
  

    const [updateUserStatus] = useMutation(UPDATE_USER_ACTIVATE_STATUS_MUTATION);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [userToToggle, setUserToToggle] = useState<User | null>(null);

    const handleToggleUserStatus = (userId: string) => {
        const currentUser = users.find(user => user.id === userId);
        if (!currentUser) {
            console.error('User not found');
            return;
        }

        setUserToToggle(currentUser);
        setShowConfirmModal(true);
    };

    const handleConfirmToggle = async () => {
        if (!userToToggle) return;

        try {
            const newIsActive = !userToToggle.isActive;

            await updateUserStatus({
                variables: {
                    userId: userToToggle.id,
                    isActive: newIsActive
                }
            });

            onDeleteUser(userToToggle.id);
            setShowConfirmModal(false);
            setUserToToggle(null);
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };

    const handleCancelToggle = () => {
        setShowConfirmModal(false);
        setUserToToggle(null);
    };

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'Por verificar':
                return 'text-green-600';
            case 'Rechazado':
                return 'text-red-600';
            case 'Verificado':
                return 'text-black';
            default:
                return 'text-gray-400';
        }
    };

    return (
        <>
            <div className="bg-white shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#D9A425] text-white">
                            <th className="px-6 py-3 text-left font-medium">Nombre del usuario</th>
                            <th className="px-6 py-3 text-left font-medium">Correo electronico</th>
                            <th className="px-6 py-3 text-left font-medium">Fecha de vencimiento del plan</th>
                            <th className="px-6 py-3 text-left font-medium">Pago</th>
                            <th className="px-6 py-3 text-left font-medium">Acciónes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className={'bg-white '}>
                                <td className="px-6  text-gray-800 border-2 border-x-0 border-b border-gray-100">{user.name}</td>
                                <td className="px-6  text-gray-800 border-2 border-x-0 border-b border-gray-100">{user.email}</td>
                                <td className="px-6  text-gray-800 border-2 border-x-0 border-b border-gray-100">{user.planExpiration ? new Date(user.planExpiration).toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}</td>
                                <td className={`px-6  font-medium border-2 border-x-0 border-b border-gray-100 ${getPaymentStatusColor(user.paymentStatus)}`}>
                                    {user.paymentStatus}
                                </td>
                                <td className="px-6  border-2 border-x-0 border-b border-gray-100">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => onViewUser(user.id)}
                                            className="p-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                                        >
                                            <img src={viewIcon} alt="view" className='w-6 h-6' />
                                        </button>
                                        <button
                                            onClick={() => handleToggleUserStatus(user.id)}
                                            className={`p-2 transition-colors cursor-pointer ${user.isActive
                                                ? 'text-gray-600 hover:text-red-600'
                                                : 'text-red-600 hover:text-green-600'
                                                }`}
                                            title={user.isActive ? "Desactivar usuario" : "Activar usuario"}
                                        >
                                            <img src={deleteIcon} alt={user.isActive ? "deactivate" : "activate"} className='w-10 h-10' />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4">
                    <Pagination
                        currentPage={currentPage}
                        onPreviousPage={onPreviousPage}
                        onNextPage={onNextPage}
                        hasNextPage={hasNextPage}
                        hasPreviousPage={hasPreviousPage}
                    />
                </div>
            </div>


            <Modal
                title={null}
                open={showConfirmModal}
                onOk={handleConfirmToggle}
                onCancel={handleCancelToggle}
                closable={false}
                okText={'Eliminar'}
                cancelText="Cancelar"
                okButtonProps={{
                    danger: userToToggle?.isActive,
                    style: {
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        backgroundColor: userToToggle?.isActive ? '#ff4d4f' : '#52c41a',
                        borderColor: userToToggle?.isActive ? '#ff4d4f' : '#52c41a'
                    }
                }}
                centered
                width={500}
            >
                {userToToggle && (
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">
                            ¿Seguro que desea eliminar el usuario?
                        </h2>
                        <div className="mb-4">
                            <p className="text-lg font-semibold text-gray-800">
                                {userToToggle.name}
                            </p>
                            <p className="text-gray-500">
                                {userToToggle.email}
                            </p>
                        </div>
                        <p className="text-gray-600">
                            Esta acción eliminará permanentemente el usuario del sistema.
                        </p>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default UsersTable;  