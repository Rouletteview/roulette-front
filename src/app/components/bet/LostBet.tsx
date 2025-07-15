import lostBet from '../../../assets/icon/lost_icon.png'
import { translateRouletteTag } from '../../../utils/formatters/rouletterNumbers'

const LostBet = ({ value }: { value: string }) => {
    return (
        <div className="flex  items-center justify-center z-50">
            <div className='flex flex-col items-center justify-center'>
                <h1 className="text-[#FF0000] text-[10px] font-bold">{translateRouletteTag(value)}</h1>
                <img className='w-16 h-16' src={lostBet} alt="lost bet" />
            </div>
            <h1 className="text-[#FF0000] text-[10px] font-bold">Perdiste</h1>
        </div>
    )
}

export default LostBet
