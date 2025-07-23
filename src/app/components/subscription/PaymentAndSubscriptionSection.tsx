import binanceIcon from '../../../assets/icon/binance-icon.svg';
import bankIcon from '../../../assets/icon/bank-icon.svg';
import { useUserInfo } from '../../../hooks/useUserInfo';
import LoadingOverlay from '../../../components/LoadingOverlay';
import { GET_CURRENT_USER_SUBSCRIPTION_QUERY } from '../../../graphql/query/subscription/getCurrentUserSubscription';
import { useQuery } from '@apollo/client';


interface Props {
    selectedMethod: string;
    setSelectedMethod: (method: string) => void;
    selectedPlan: string;
    setSelectedPlan: (plan: string) => void;
    setStep: (step: number) => void;
}

const paymentMethods = [
    { key: 'Crypto', label: 'USDT', icon: binanceIcon },
    { key: 'Phone', label: 'Pago móvil', icon: bankIcon },
];

const plans = [
    { key: 'Daily', label: 'Plan Diario', price: '1.5' },
    { key: 'Weekly', label: 'Plan Semanal', price: '3.0' },
    { key: 'Monthly', label: 'Plan Mensual', price: '5.0' },
    { key: 'Annual', label: 'Plan Anual', price: '25' },
];



const PaymentAndSubscriptionSection = ({ selectedMethod, setSelectedMethod, selectedPlan, setSelectedPlan, setStep }: Props) => {
    const { data: userInfo } = useUserInfo();
    const { data: currentUserSubscription, loading: getCurrentUserSubscriptionLoading } = useQuery(GET_CURRENT_USER_SUBSCRIPTION_QUERY);
  
    console.log('currentUserSubscription', currentUserSubscription)

    const country = userInfo?.GetUserInfo?.Country;

    if (!country || getCurrentUserSubscriptionLoading) return <LoadingOverlay />;

    const filteredPaymentMethods = paymentMethods.filter(method => {
        if (method.key === 'Phone') {
            return country === 'Dominican Republic';
        }
        return true;
    });


    return (
        <>

            <p className="mb-6 text-[#121418F2]">Elige tu método de pago y el plan de suscripción</p>

            <div className="grid grid-cols-2 text-start gap-6  max-w-4xl mb-10">
                {filteredPaymentMethods.map((method) => (
                    <button
                        key={method.key}
                        className={`h-[100px] w-full lg:h-[140px] lg:w-[400px] text-start flex-1 border border-[#CCCCCC] rounded-2xl p-6 flex flex-col gap-2 shadow-lg transition-all cursor-pointer ${selectedMethod === method.key
                            ? 'yellow-shadow'
                            : 'bg-white'
                            }`}
                        onClick={() => setSelectedMethod(method.key)}
                    >
                        <span className="text-2xl lg:text-4xl">{method.icon ? <img src={method.icon} alt="" className="h-8" /> : null}</span>
                        <span className="font-semibold text-sm lg:text-lg text-[#121418F2]">{method.label}</span>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 justify-items-center gap-3 lg:gap-14 ">
                {plans.map((plan) => (
                    <button
                        key={plan.key}
                        className={`rounded-4xl w-full h-[110px] lg:h-[210px] p-0 lg:p-3 flex flex-col items-center cursor-pointer  border transition-all pricing-card-shadow2 ${selectedPlan === plan.key
                            ? 'yellow-shadow'
                            : 'bg-white'
                            }`}
                        onClick={() => setSelectedPlan(plan.key)}
                    >
                        <div className="mx-0 lg:mx-5 mt-2 lg:mt-0">
                            <h1 className={`text-[18px] lg:text-[24px] text-[#121418F2] font-bold drop-shadow-[0px_4px_8px_#00000066] mb-2 lg:mb-7`}>Plan <span className="text-[#D9A425]">{plan.label.split(' ')[1]}</span></h1>
                            <div className="flex justify-center text-[#121418F2] text-center">
                                <span className="text-[18px] lg:text-3xl font-black">$</span>
                                <h1 className={`text-[40px] lg:text-[100px] font-black`}>{plan.price}</h1>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
            <div className='flex justify-center w-full mt-4' >
                {currentUserSubscription?.GetCurrentUserSubscription? (
                <button
                    className="bg-[#D9A425] hover:bg-[#B3831D] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg px-4 py-3 transition-all text-base cursor-pointer w-[300px] mx-auto mt-4 yellow-button-shadow"
                    disabled={!selectedMethod || !selectedPlan}
                    onClick={() => setStep(2)}
                >
                    Continuar
                </button>
                ) : null}
            </div>

        </>
    )
}

export default PaymentAndSubscriptionSection
