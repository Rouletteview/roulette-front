import React from 'react';
import { Modal } from 'antd';

interface User {
    id: string;
    name: string;
    email: string;
    planExpiration: string;
    paymentStatus: string;
    isActive: boolean;
}

interface UserActionModalProps {
    open: boolean;
    user: User | null;
    action: 'delete' | 'deactivate' | 'activate';
    onConfirm: () => void;
    onCancel: () => void;
}

const UserActionModal: React.FC<UserActionModalProps> = ({
    open,
    action,
    onConfirm,
    onCancel
}) => {
    const getActionText = () => {
        switch (action) {
            case 'delete':
                return 'Eliminar usuario';
            case 'deactivate':
                return 'Desactivar usuario';
            case 'activate':
                return 'Activar usuario';
            default:
                return 'Acción';
        }
    };

    const getActionDescription = () => {
        switch (action) {
            case 'delete':
                return '¿Está seguro que desea eliminar este usuario? Esta acción no se puede deshacer.';
            case 'deactivate':
                return '¿Está seguro que desea desactivar este usuario?';
            case 'activate':
                return '¿Está seguro que desea activar este usuario?';
            default:
                return '¿Está seguro que desea realizar esta acción?';
        }
    };

    const getButtonColor = () => {
        switch (action) {
            case 'delete':
                return '#FF0000';
            case 'deactivate':
                return '#FF6B35';
            case 'activate':
                return '#20B26C';
            default:
                return '#FF0000';
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            title={null}
            closable={false}
            footer={null}
            centered
            width={400}
            styles={{
                content: {
                    borderRadius: '20px',
                    padding: '24px',
                },
                mask: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
            }}
        >
            <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">{getActionText()}</h2>
                <p className="text-gray-600 mb-6">{getActionDescription()}</p>

                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors"
                        style={{ backgroundColor: getButtonColor() }}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default UserActionModal; 