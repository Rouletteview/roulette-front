import { useSearchParams } from "react-router";
import BetButtons from "../../components/bet/BetButtons"
import BetModal from "../../components/BetModal";

import { useBetSectionState } from "./hooks/useBetSectionState";
import { useEffect } from 'react';
import { useGetBet } from '../../hooks/useGetBet';
import { useCountdownStore } from '../../../stores/countdownStore';
import { useBetStatusStore } from '../../../stores/betStatusStore';
import { showWinToast, showLoseToast, showInfoToast } from '../../components/Toast';
import StraightUpButton from "../../components/bet/StraightUpBetButton";
import { GameType } from "../../../graphql/generated/types";
import { chartTypes } from "../../../types/types";


interface Props {
  gameType: string;
  tableId: string;
  probabilities: Array<{
    Tag: string
    Value: number
    Count: number
  }> | undefined
}

const BetSection: React.FC<Props> = ({ gameType, probabilities, tableId }) => {

  const [searchParams] = useSearchParams();
  const selectedTable = searchParams.get('table') || '';
  const gameTypeParams = searchParams.get('chartZone') as GameType;
  const chartTypeParams = searchParams.get('chartType') as chartTypes;

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
    if (countdown === 29 && betIdFromStorage && betData && betData.GetBet) {
      const status = betData.GetBet.status;
      const value = betData.GetBet.value;

      if (status === 'Won') {
        setBetResult({ status: 'Won', value });
        showWinToast(value, `win-${betIdFromStorage}`);
      } else if (status === 'Lost') {
        setBetResult({ status: 'Lost', value });
        showLoseToast(value, `lose-${betIdFromStorage}`);
      } else if (status === 'Placed') {
        setBetResult({ status: 'Placed', value });
        showInfoToast('Apuesta en proceso...', `placed-${betIdFromStorage}`);
      } else {
        showInfoToast('Resultado pendiente', `pending-${betIdFromStorage}`);
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
          <div className="
          fixed z-[999999]
          inset-0
          flex items-center justify-center
          md:inset-auto md:bottom-0 md:right-0
          md:block md:w-auto
        ">
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
      <div className="w-full flex flex-col items-center">
        {
          tableId &&
          chartTypeParams &&
          gameTypeParams && (
            <BetButtons
              gameType={gameType}
              probabilities={probabilities}
              handleToggle={handleToggle}
            />
          )
        }
        {
          tableId &&
          chartTypeParams &&
          gameTypeParams !== 'StraightUp' && (
            <StraightUpButton
              TableId={tableId}
              handleToggle={handleToggle}
            />
          )
        }

      </div>
    </>

  )
}

export default BetSection 
