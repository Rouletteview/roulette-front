import { SubscriptionState } from "./SubscriptionCheckoutSection"
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { showErrorToast } from '../Toast'

interface FormData {
  phone: string
  documentId: string
  referenceNumber: string
}

const BankTransferSection = ({ setSubscriptionState, subscriptionState, handleCreateSubscription }: { setSubscriptionState: (state: SubscriptionState) => void, subscriptionState: SubscriptionState, handleCreateSubscription: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      phone: '',
      documentId: '',
      referenceNumber: ''
    }
  })



  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      console.log('Form data:', data)

      const { referenceNumber } = data
      setSubscriptionState({ ...subscriptionState, Reference: referenceNumber })
       handleCreateSubscription()
    } catch (error: unknown) {
      console.error('Error al enviar el pago:', error)

      let errorMessage = 'Error al procesar el pago'

      if (error instanceof Error) {
        errorMessage = error.message
      } else if (error && typeof error === 'object' && 'message' in error) {
        const errorWithMessage = error as { message: string }
        errorMessage = errorWithMessage.message
      }

      showErrorToast(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className='w-full mx-auto  text-[#121418F2]'>
      <div
        className={`h-[100px]  lg:h-[70px] w-[168px] p-3 text-start flex-1 border border-[#CCCCCC] rounded-2xl  flex flex-col justify-between  shadow-lg transition-all yellow-shadow`}
      >
        <span className='text-sm text-[#CCCCCC]'>Datos</span>
        <p className="font-semibold text-sm lg:text-lg text-[#121418F2]">Pago movil</p>
      </div>

      <div className="lg:mx-8 mt-8">
        <p className="font-light text-sm text-[#121418F2]">Datos para realizar el pago</p>
        <div className="flex gap-2 mt-4">
          <p className="text-sm font-medium text-[#121418F2]">+58 424 456 4789     J- 00000000000      Banco de Venezuela</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <p className="text-sm font-medium text-[#121418F2]">Datos para registrar el pago</p>
        <div className="flex flex-col gap-2 mt-8 lg:flex-row lg:items-start lg:gap-8">

          <div className="flex flex-col w-full lg:w-1/3">
            <label className="mb-2 text-[#121418F2] text-sm">Teléfono</label>
            <div className="flex flex-row gap-2">
              <input
                type="text"
                value={"+00"}
                readOnly
                className="w-20 p-2 rounded-xl border border-[#4B4B4B99] bg-[#ebebeb] text-center"
              />
              <input
                type="text"
                placeholder="Número de teléfono"
                {...register('phone', {
                  required: 'El teléfono es requerido',
                  pattern: {
                    value: /^\d{7,10}$/,
                    message: 'Ingresa un número de teléfono válido'
                  }
                })}
                className={`flex-1 p-2 rounded-xl border bg-[#ebebeb] ${errors.phone ? 'border-red-500' : 'border-[#4B4B4B99]'
                  }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full lg:w-1/3">
            <label className="mb-2 text-[#121418F2] text-sm">Cedula/DNI</label>
            <input
              type="text"
              placeholder="Número de documento"
              {...register('documentId', {
                required: 'El documento es requerido',
                pattern: {
                  value: /^[A-Z]-\d{7,10}$/,
                  message: 'Formato: V-12345678 o J-12345678'
                }
              })}
              className={`w-full p-2 rounded-xl border bg-[#ebebeb] ${errors.documentId ? 'border-red-500' : 'border-[#4B4B4B99]'
                }`}
            />
            {errors.documentId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.documentId.message}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full lg:w-1/3">
            <label className="mb-2 text-[#121418F2] text-sm">Numero de referencia</label>
            <input
              type="text"
              placeholder="Número de referencia"
              {...register('referenceNumber', {
                required: 'El número de referencia es requerido',
                minLength: {
                  value: 6,
                  message: 'Mínimo 6 caracteres'
                },
                maxLength: {
                  value: 20,
                  message: 'Máximo 20 caracteres'
                }
              })}
              onChange={(e) => setSubscriptionState({ ...subscriptionState, Reference: e.target.value })}
              className={`w-full p-2 rounded-xl border bg-[#ebebeb] ${errors.referenceNumber ? 'border-red-500' : 'border-[#4B4B4B99]'
                }`}
            />
            {errors.referenceNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.referenceNumber.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center w-full mt-12">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#D9A425] hover:bg-[#B3831D] disabled:opacity-50 disabled:cursor-not-allowed w-[500px] text-white font-bold rounded-lg px-4 py-3 transition-all text-base cursor-pointer yellow-button-shadow"
          >
            {isSubmitting ? 'Enviando...' : 'Pago realizado'}
          </button>
        </div>
      </form>

    </section>

  )
}

export default BankTransferSection
