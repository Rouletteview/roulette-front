import React, { useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import HeroSection from '../../sections/HeroSection';
import Stepper from './Stepper';

import PaymentAndSubscriptionSection from '../components/subscription/PaymentAndSubscriptionSection';
import SubscriptionCheckoutSection from '../components/subscription/SubscriptionCheckoutSection';
import { useSearchParams } from 'react-router';



const SubscriptionPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const price = searchParams.get('price');

    const priceToPlan: Record<string, string> = {
        "1.5": "Daily",
        "3.0": "Weekly",
        "5.0": "Monthly",
        "25": "Annual"
    };

    const [selectedMethod, setSelectedMethod] = useState('Crypto');
    const [selectedPlan, setSelectedPlan] = useState<string | null>(priceToPlan[price ?? ""] ?? null);
    const [step, setStep] = useState(1);
    const [holder, setHolder] = useState('');
    const [reference, setReference] = useState('');


    const steps = [
        <PaymentAndSubscriptionSection
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            selectedPlan={selectedPlan || ''}
            setSelectedPlan={setSelectedPlan}
            setStep={setStep}
        />
        ,

        <SubscriptionCheckoutSection
            holder={holder}
            setHolder={setHolder}
            reference={reference}
            setReference={setReference}
            setStep={setStep}
            setSelectedPlan={setSelectedPlan}
            selectedPlan={selectedPlan}
            selectedMethod={selectedMethod}
        />
    ];

    return (
        <AppLayout>
            <HeroSection className=' lg:px-20' heroBackground={false} backgroundColor='#FFF'>
                <div className='px-4 lg:px-0'>
                    <h1 className="text-xl lg:text-3xl text-[#121418F2] font-bold mb-2">Métodos de pago <span className='text-sm lg:text-xl font-semibold'>{step === 2 ? '| Transferencia bancaria' : ''}</span></h1>
                    <div className="flex gap-4  text-green-600 text-sm">
                        <span>✓ Transacciones seguras con nosotros</span>
                        <span>✓ Protegemos tus datos personales</span>
                    </div>
                </div>

                <div className="w-full px-4 lg:mx-auto py-10">
                    <Stepper step={step} steps={steps} />
                </div>
            </HeroSection>
        </AppLayout>
    );
};

export default SubscriptionPage;

