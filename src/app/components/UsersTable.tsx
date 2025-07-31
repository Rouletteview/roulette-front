import React from 'react';


interface User {
    id: string;
    name: string;
    email: string;
    planExpiration: string;
    paymentStatus: 'Por verificar' | 'Rechazado' | 'Verificado' | '';
}

interface UsersTableProps {
    users: User[];
    onViewUser: (userId: string) => void;
    onDeleteUser: (userId: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onViewUser, onDeleteUser }) => {
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
        <div className="bg-white shadow-sm overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="bg-[#D9A425] text-white">
                        <th className="px-6 py-4 text-left font-medium">Nombre del usuario</th>
                        <th className="px-6 py-4 text-left font-medium">Correo electronico</th>
                        <th className="px-6 py-4 text-left font-medium">Fecha de vencimiento del plan</th>
                        <th className="px-6 py-4 text-left font-medium">Pago</th>
                        <th className="px-6 py-4 text-left font-medium">Acciónes</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className={'bg-white '}>
                            <td className="px-6 py-4 text-gray-800 border-2 border-x-0 border-b border-gray-100">{user.name}</td>
                            <td className="px-6 py-4 text-gray-800 border-2 border-x-0 border-b border-gray-100">{user.email}</td>
                            <td className="px-6 py-4 text-gray-800 border-2 border-x-0 border-b border-gray-100">{user.planExpiration}</td>
                            <td className={`px-6 py-4 font-medium border-2 border-x-0 border-b border-gray-100 ${getPaymentStatusColor(user.paymentStatus)}`}>
                                {user.paymentStatus}
                            </td>
                            <td className="px-6 py-4 border-2 border-x-0 border-b border-gray-100">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => onViewUser(user.id)}
                                        className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                                    >
                                        {/* <EyeIcon className="w-5 h-5" /> */}
                                    </button>
                                    <button
                                        onClick={() => onDeleteUser(user.id)}
                                        className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                                    >
                                        {/* <TrashIcon className="w-5 h-5" /> */}
                                    </button>
                                </div>
                            </td>
                        </tr>
                        
                    ))}
                     
                </tbody>
               
            </table>
            
            <div className="flex items-center justify-center gap-2 px-4 py-3 text-sm bg-[#F4F7FCBF] text-gray-500">
              <button
                disabled
                className="bg-white disabled:bg-gray-200 text-gray-500 px-2 py-1 border border-gray-300 rounded-md font-semibold cursor-pointer disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              <span>1/10</span>
              <button
                className="bg-white disabled:bg-gray-200 text-gray-500 px-2 py-1 border border-gray-300 rounded-md font-semibold cursor-pointer disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
        </div>
    );
};

export default UsersTable; 