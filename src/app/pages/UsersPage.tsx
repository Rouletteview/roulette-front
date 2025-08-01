import React, { useState } from 'react';
import UsersTable from '../components/UsersTable';
import AppLayout from '../layouts/AppLayout';
import HeroSection from '../../sections/HeroSection';
import CustomDropdown from '../components/CustomDropdown';
import searcIcon from '../../assets/icon/search-icon.svg'
import UsersAccordion from '../components/UsersAccordion';
import TableSkeleton from '../components/TableSkeleton';
import AccordionSkeleton from '../components/AccordionSkeleton';
import { GET_USERS } from '../../graphql/query/users/getUsers';
import { useQuery } from '@apollo/client';

interface UserFromAPI {
    Id: string;
    Name: string;
    Email: string;
    Country: string;
    BirthDate: string;
    PhoneNumber: string;
    Subscription?: {
        Id: string;
        UserId: string;
        IsActive: boolean;
        Frequency: string;
        EndDate: string;
        StartDate: string;
        LastPay: string;
        CreatedAt: string;
        Payments: Array<{
            Id: string;
            PhotoUrl: string;
            Reference: string;
            Status: string;
            PaymentMethod: string;
            CreatedAt: string;
        }>;
    };
}

interface TransformedUser {
    id: string;
    name: string;
    email: string;
    planExpiration: string;
    paymentStatus: 'Por verificar' | 'Rechazado' | 'Verificado' | '';
}

const UsersPage: React.FC = () => {
    const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('');
    const [nameFilter, setNameFilter] = useState<string>('');
    const [emailFilter, setEmailFilter] = useState<string>('');

    const { data, loading } = useQuery(GET_USERS, {
        variables: {
            request: {
                skip: 0,
                limit: 10,
                query: nameFilter || emailFilter || '',
                paymentStatus: paymentStatusFilter || undefined,
            }
        }
    });



    const users: TransformedUser[] = data?.GetUsers?.Users?.map((user: UserFromAPI) => {

        const mapPaymentStatus = (status: string): 'Por verificar' | 'Rechazado' | 'Verificado' | '' => {
            switch (status?.toLowerCase()) {
                case 'pending':
                case 'por verificar':
                    return 'Por verificar';
                case 'rejected':
                case 'rechazado':
                    return 'Rechazado';
                case 'approved':
                case 'verificado':
                    return 'Verificado';
                default:
                    return '';
            }
        };

        return {
            id: user.Id,
            name: user.Name,
            email: user.Email,
            planExpiration: user.Subscription?.EndDate ? new Date(user.Subscription.EndDate).toLocaleDateString() : '',
            paymentStatus: mapPaymentStatus(user.Subscription?.Payments?.[0]?.Status || '')
        };
    }) || [];





    const handleViewUser = (userId: string) => {
        console.log('View user:', userId);
    };

    const handleDeleteUser = (userId: string) => {
        console.log('Delete user:', userId);
    };

    const handlePaymentStatusChange = (value: string) => {
        setPaymentStatusFilter(value);
    };

    const paymentStatusOptions = [
        { label: 'Todos', value: '' },
        { label: 'Verificado', value: 'Approved' },
        { label: 'Rechazado', value: 'Rejected' },
        { label: 'Por verificar', value: 'Pending' },
    ];

    const paymentStatusOptionsDropdown = paymentStatusOptions.map(status => ({
        label: status.label,
        value: status.value,
    }));

    return (
        <AppLayout>
            <HeroSection className=' lg:px-20 mb-14' heroBackground={false} backgroundColor='#FFF'>
                <div className='flex flex-col sm:flex-row flex-wrap justify-center w-full gap-4 px-4 max-w-[320px] sm:max-w-none mx-auto'>
                    <div className='flex gap-4 w-full sm:w-auto'>
                        <CustomDropdown
                            options={paymentStatusOptionsDropdown}
                            value={paymentStatusFilter}
                            onChange={handlePaymentStatusChange}
                            defaultLabel='Estado de pago'
                            bgButton='bg-white'
                            borderButton='border-[#ACACAC]'
                            textColor='text-black'
                            bgDropdown='bg-white'
                            borderDropdown='border-[#ACACAC]'
                            bgOption='bg-white'
                            textOption='text-black hover:text-[#D9A425]'
                            className='w-[144px] sm:w-[200px] lg:w-[250px]'
                        />

                        <div className="relative w-[144px] sm:w-[200px] lg:w-[300px]">
                            <input
                                type="text"
                                placeholder='Nombre del usuario'
                                value={nameFilter}
                                onChange={(e) => setNameFilter(e.target.value)}
                                className='w-full px-2 md:px-4 py-2 rounded-lg border border-[#ACACAC] bg-white text-gray-900 text-xs md:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D9A425] focus:border-[#D9A425] transition-colors'
                            />
                            <div className="absolute inset-y-0 right-0 pr-1 md:pr-3 flex items-center pointer-events-none">
                                <img src={searcIcon} alt="search" className='w-3 h-3 md:w-5 md:h-5' />
                            </div>
                        </div>
                    </div>

                    <div className="relative w-[144px] sm:w-[200px] lg:w-[300px]">
                        <input
                            type="email"
                            placeholder='Correo del usuario'
                            value={emailFilter}
                            onChange={(e) => setEmailFilter(e.target.value)}
                            className='w-full px-4 py-2 rounded-lg border border-[#ACACAC] bg-white text-gray-900 text-xs md:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D9A425] focus:border-[#D9A425] transition-colors'
                        />
                        <div className="absolute inset-y-0 right-0 pr-2 md:pr-3 flex items-center pointer-events-none">
                            <img src={searcIcon} alt="search" className='w-3 h-3 md:w-5 md:h-5' />
                        </div>
                    </div>


                </div>

                <section className='mt-5'>
                    <div className='flex flex-col gap-4'>

                        <div className='hidden lg:block'>
                            {loading ? (
                                <TableSkeleton rows={10} />
                            ) : (
                                <UsersTable
                                    users={users}
                                    onViewUser={handleViewUser}
                                    onDeleteUser={handleDeleteUser} />
                            )}
                        </div>


                        <div className='block lg:hidden'>
                            {loading ? (
                                <AccordionSkeleton items={10} />
                            ) : (
                                <UsersAccordion
                                    users={users}
                                    onViewUser={handleViewUser}
                                    onDeleteUser={handleDeleteUser}
                                />
                            )}
                        </div>
                    </div>
                </section>
            </HeroSection>
        </AppLayout>
    );
};

export default UsersPage; 