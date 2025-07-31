import { Collapse } from "antd"
import arrowIcon from '../../assets/icon/accordion-arrow.svg'
const { Panel } = Collapse;


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


const UsersAccordion: React.FC<UsersTableProps> = ({ users }) => {

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
        <section className="mx-6">
            <div className="bg-[#D9A425] p-4 ">
                <h1 className="text-xs text-white font-bold">Nombre del usuario</h1>
            </div>
            <Collapse
                expandIconPosition="right"
                accordion
                ghost
                expandIcon={({ isActive }) => (
                    <img
                        src={arrowIcon}
                        alt="arrow"
                        className={`w-5 h-5 transition-transform duration-300 ease-in-out ${isActive ? "transform rotate-180" : "transform rotate-0"}`}
                    />
                )}
            >


                {
                    users.map((user) => (
                        <Panel key={user.id} header={user.name} className="border-y border-[#EBEBEB]">
                            <section className="flex flex-col bg-[#EBEBEB] p-4 rounded-[20px]">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col border-b border-white pb-2">
                                        <h1 className="text-[#444444] font-light text-xs">Correo electronico</h1>
                                        <h1 className="text-[#000000] text-sm font-light">{user.email}</h1>
                                    </div>
                                    <div className="flex flex-col border-b border-white pb-2">
                                        <h1 className="text-[#444444] font-light text-xs">Fecha de vencimiento del plan</h1>
                                        <h1 className="text-[#000000] text-sm font-light">{user.planExpiration}</h1>
                                    </div>
                                    <div className="flex flex-col border-b border-white pb-2">
                                        <h1 className="text-[#444444] font-light text-xs">Estado de pago</h1>
                                        <h1 className={`text-[#000000] text-sm font-light ${getPaymentStatusColor(user.paymentStatus)}`}>{user.paymentStatus}</h1>
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="text-[#444444] font-light text-xs">Acciones</h1>
                                        <div className="flex flex-row justify-between gap-4 mt-2">
                                            <button className="text-white text-xs font-bold bg-[#20B26C] rounded-[10px] py-4 px-4  yellow-button-shadow">Ver información </button>
                                            <button className="text-white text-xs font-bold bg-[#FF0000] rounded-[10px] py-4 px-4  yellow-button-shadow">Eliminar usuario</button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Panel>
                    ))
                }
            </Collapse>
        </section>

    )
}

export default UsersAccordion
