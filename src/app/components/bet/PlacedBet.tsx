import { translateRouletteTag } from "../../../utils/formatters/rouletterNumbers";


const PlacedBet = ({ value }: { value: string }) => (
    <div className="flex  items-center justify-center">
        <div className='flex flex-col items-center justify-center'>
            <h1 className="text-[#D9A425] text-[10px] font-bold">{translateRouletteTag(value)}</h1>

            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff" /><path d="M12 6v6l4 2" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h1 className="text-[#D9A425] text-[10px] font-bold">Pendiente</h1>
    </div>
);

export default PlacedBet;



