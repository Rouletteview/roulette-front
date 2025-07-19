import BankTransferSection from "./BankTransferSection";
import USDTTransferSection from "./USDTTransferSection";
import { translateRouletteTag } from "../../../utils/formatters/rouletterNumbers";

interface Props {
    holder: string;
    setHolder: (holder: string) => void;
    reference: string;
    setReference: (reference: string) => void;
    setStep: (step: number) => void;
    setSelectedPlan: (plan: string | null) => void;
    selectedPlan: string | null;
    selectedMethod: string;
}


const SubscriptionCheckoutSection = ({    selectedPlan, selectedMethod }: Props) => {



    console.log(selectedPlan);
    
    return (
        <>
            <section className="w-full  mx-auto text-[#121418F2] px-4 lg:px-0">
                <h1 className="text-[16px] font-light mb-4">
                    Plan {translateRouletteTag(selectedPlan || '')} de <span className="text-[#D9A425]">${selectedPlan === 'Daily' ? '1.5' : selectedPlan === 'Weekly' ? '3.0' : selectedPlan === 'Monthly' ? '5.0' : '25.'}</span>
                </h1>
                {
                    selectedMethod === 'Phone' ? <BankTransferSection /> : <USDTTransferSection />
                }

                {/* <button
                    className="ml-4 px-6 py-2 bg-gray-300 text-gray-700 rounded"
                    onClick={() => {
                        setStep(1);
                        setSelectedPlan(null);
                    }}
                >
                    Volver
                </button> */}
            </section>
        </>
    )
}

export default SubscriptionCheckoutSection
