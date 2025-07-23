import usdtQR from '../../../assets/images/usdt-qr.png'
import usdtUpload from '../../../assets/images/usdt-upload.png'
import { useState } from 'react'
import { SubscriptionState } from './SubscriptionCheckoutSection'
import { showErrorToast } from '../Toast';

interface Props {
    setSubscriptionState: (state: SubscriptionState) => void;
    subscriptionState: SubscriptionState;
    handleCreateSubscription: () => void;
}

const USDTTransferSection = ({ setSubscriptionState, subscriptionState, handleCreateSubscription }: Props) => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleFileUpload = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const base64String = e.target?.result as string
                setUploadedImage(base64String)
                setSubscriptionState({ ...subscriptionState, PhotoFile: base64String })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleFileUpload(file)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file) {
            handleFileUpload(file)
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleSubmit = async () => {
        if (!uploadedImage) return;

        setIsSubmitting(true);
        try {
            await handleCreateSubscription();
        } catch (error) {
            console.error('Error submitting:', error);
            showErrorToast(error as string)
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="w-full mx-auto text-[#121418F2]">
            <div
                className={`h-[100px]  lg:h-[70px] w-[168px] p-3 text-start flex-1 border border-[#CCCCCC] rounded-2xl  flex flex-col justify-between  shadow-lg transition-all yellow-shadow`}
            >
                <span className='text-sm text-[#CCCCCC]'>Datos</span>
                <p className="font-semibold text-sm lg:text-lg text-[#121418F2]">USDT</p>
            </div>

            <div className="flex flex-col gap-10">
                <div className="flex flex-col lg:flex-row gap-10 justify-center items-start w-full max-w-5xl mx-auto mt-8 lg:mt-0">
                    {/* QR Section */}
                    <div className="flex-1 flex flex-col items-center max-w-[350px] h-[300px]">
                        <p className="mb-3 text-sm font-light text-left w-full">Datos para realizar el pago</p>
                        <div className="border border-[#D9A425] rounded-2xl p-6 bg-white shadow-md flex flex-col items-center w-full max-h-[300px] max-w-sm">

                            <img src={usdtQR} alt="QR" className="w-64 h-64 object-contain" />
                        </div>
                        <div className="flex flex-row justify-between items-center w-full max-w-sm mt-4 px-2 text-sm font-light">
                            <span className="truncate">rouletteview@gmail.com</span>
                            <span className="text-right">ID-0000000</span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center max-w-[350px] h-[300px]">
                        <p className="mb-3 text-sm font-light text-left w-full">Subir comprobante de pago</p>
                        <div
                            className={`border border-[#D9A425] rounded-2xl p-6 bg-white shadow-md flex flex-col items-center justify-center w-full max-h-[300px]  transition-all cursor-pointer `}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                id="image-upload"
                            />
                            <label htmlFor="image-upload" className="flex-1 flex flex-col items-center cursor-pointer">
                                {uploadedImage ? (
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <img
                                            src={uploadedImage}
                                            alt="Uploaded"
                                            className="max-w-64 h-64 object-contain"
                                        />
                                        <p className="text-xs text-gray-500">Click para cambiar imagen</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <img src={usdtUpload} alt="Upload" className="w-64 h-64 object-contain" />
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>


                </div>
                <div className="flex justify-center w-full mt-4 lg:mt-12">
                    <button
                        disabled={!uploadedImage || isSubmitting}
                        onClick={handleSubmit}
                        className="bg-[#D9A425] hover:bg-[#B3831D] disabled:opacity-50 disabled:cursor-not-allowed w-[500px] text-white font-bold rounded-lg px-4 py-3 transition-all text-base cursor-pointer yellow-button-shadow"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Procesando...
                            </div>
                        ) : (
                            'Pago realizado'
                        )}
                    </button>
                </div>
            </div>

        </section>
    );
};

export default USDTTransferSection;
