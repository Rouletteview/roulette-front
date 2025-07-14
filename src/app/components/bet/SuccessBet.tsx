import successBet from '../../../assets/icon/win_icon.png'
import { translateRouletteTag } from '../../../utils/formatters/rouletterNumbers'

const SuccessBet = ({ value }: { value: string }) => {
  return (
    <div className="flex  items-center justify-center">
    <div className='flex flex-col items-center justify-center'>
        <h1 className="text-[#20B26C] text-[10px] font-bold">{translateRouletteTag(value)}</h1>
        <img className='w-16 h-16' src={successBet} alt="success bet" />
    </div>
    <h1 className="text-[#20B26C] text-[10px] font-bold">Ganaste</h1>
</div>
  )
}

export default SuccessBet
