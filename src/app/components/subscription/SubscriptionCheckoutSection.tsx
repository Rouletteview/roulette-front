import BankTransferSection from "./BankTransferSection";
import USDTTransferSection from "./USDTTransferSection";
import { translateRouletteTag } from "../../../utils/formatters/rouletterNumbers";
import { CREATE_SUBSCRIPTION_MUTATION } from "../../../graphql/mutations/subscription/createSubscription";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import SuccessModal from "./SuccessModal";
import { showErrorToast } from "../Toast";
import { getGraphQLErrorMessage } from "../../../utils/errorMessages";


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

export interface SubscriptionState {
    Frequency: string;
    PaymentMethod: string;
    Reference: string;
    PhotoFile: File | null;
}


const SubscriptionCheckoutSection = ({ selectedPlan, selectedMethod }: Props) => {

    const [subscriptionState, setSubscriptionState] = useState<SubscriptionState>({
        Frequency: selectedPlan || '',
        PaymentMethod: selectedMethod,
        Reference: '00',
        PhotoFile: null
    })


    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [createSubscription] = useMutation(CREATE_SUBSCRIPTION_MUTATION);

    const handleCreateSubscription = async () => {
        const subscriptionData = {
            Frequency: subscriptionState.Frequency,
            PaymentMethod: subscriptionState.PaymentMethod,
            Reference: subscriptionState.Reference,
            PhotoFile: subscriptionState.PhotoFile
        };

        try {
            await createSubscription({
                variables: { input: subscriptionData }
            });
            setShowSuccessModal(true);
        } catch (error) {
            showErrorToast(getGraphQLErrorMessage(error));
        }
    }

    return (
        <>
            <section className="w-full  mx-auto text-[#121418F2] px-4 lg:px-0">
                <h1 className="text-[16px] font-light mb-4">
                    Plan {translateRouletteTag(selectedPlan || '')} de <span className="text-[#D9A425]">${selectedPlan === 'Daily' ? '1.5' : selectedPlan === 'Weekly' ? '3.0' : selectedPlan === 'Monthly' ? '5.0' : '25.'}</span>
                </h1>
                {
                    selectedMethod === 'Phone' ? <BankTransferSection
                        setSubscriptionState={setSubscriptionState}
                        subscriptionState={subscriptionState}
                        handleCreateSubscription={handleCreateSubscription}
                    /> : <USDTTransferSection
                        setSubscriptionState={setSubscriptionState}
                        subscriptionState={subscriptionState}
                        handleCreateSubscription={handleCreateSubscription}
                    />
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

            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                message="Un plazo de 48 horas para darte acceso a la plataforma, podría ser antes"
            />
        </>
    )
}

export default SubscriptionCheckoutSection
