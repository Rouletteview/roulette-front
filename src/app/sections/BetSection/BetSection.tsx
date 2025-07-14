import { useSearchParams } from "react-router";
import BetButtons from "../../components/bet/BetButtons"
import BetModal from "../../components/BetModal";

import { useBetSectionState } from "./hooks/useBetSectionState";
import { useEffect } from 'react';
import { useGetBet } from '../../hooks/useGetBet';
import { useCountdownStore } from '../../../stores/countdownStore';
import { useBetStatusStore } from '../../../stores/betStatusStore';


interface Props {
  gameType: string;
  probabilities: Array<{
    Tag: string
    Value: number
    Count: number
  }> | undefined
}

const BetSection: React.FC<Props> = ({ gameType, probabilities }) => {

  const [searchParams] = useSearchParams();
  const selectedTable = searchParams.get('table') || '';
  const betValue = localStorage.getItem('betValue') || '';


  const {
    handleToggle,
    state,
    setSelectedChip,
    setCounter,
    amount,
    setBetId
  } = useBetSectionState();

  const { selectedChip, counter } = state;
  const { countdown } = useCountdownStore();




  const betIdFromStorage = localStorage.getItem('betId') || '';
  const { data: betData } = useGetBet(betIdFromStorage, { skip: !betIdFromStorage });
  const { setBetResult } = useBetStatusStore();

  useEffect(() => {
    if (countdown === 30 && betIdFromStorage && betData && betData.GetBet) {
      const status = betData.GetBet.status;
      const value = betData.GetBet.value;

      console.log('Status de la apuesta:', status);
      if (status === 'Won') {
        setBetResult({ status: 'Won', value});
      } else if (status === 'Lost') {
        console.log('Perdiste la apuesta.');
        setBetResult({ status: 'Lost', value});
      } else if (status === 'Placed') {
        // No limpiar betId
        setBetResult({ status: 'Placed', value});
      } else {
        console.log('No hay resultado para la apuesta.');
      }
      if (status !== 'Placed') {
        localStorage.removeItem('betId');
      }
    }
  }, [countdown, betIdFromStorage, betData, setBetResult]);



  return (
    <>

      {
        state.isOpen && (
          <div className="w-full fixed inset-0 z-50 flex items-center justify-center">
            <BetModal
              open={state.isOpen}
              onClose={() => handleToggle("")}
              selectedChip={selectedChip || ""}
              setSelectedChip={setSelectedChip}
              setCounter={setCounter}
              counter={counter}
              selectedTable={selectedTable}
              amount={amount}
              gameType={gameType}
              betValue={betValue}
              setBetId={setBetId}
            />
          </div>
        )
      }
      <div className="w-full">
        <BetButtons
          gameType={gameType}
          probabilities={probabilities}
          handleToggle={handleToggle}
        />
      </div>
    </>

  )
}

export default BetSection 
