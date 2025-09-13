import { useSearchParams } from "react-router";
import BetButtons from "../../components/bet/BetButtons"
import BetModal from "../../components/BetModal";

import { useBetSectionState } from "./hooks/useBetSectionState";
import { useEffect, useRef } from 'react';
import { useGetBet } from '../../hooks/useGetBet';
import { useCountdownStore } from '../../../stores/countdownStore';
import { useBetStatusStore } from '../../../stores/betStatusStore';
import { showWinToast, showLoseToast, showInfoToast } from '../../components/Toast';
import StraightUpButton from "../../components/bet/StraightUpBetButton";
import { GameType } from "../../../graphql/generated/types";
import { chartTypes } from "../../../types/types";
// import { useSubscription } from "../../../hooks/useSubscription";

interface BetData {
  id: string;
  status: string;
  value: string;
  amount: number;
  gameType: string;
  createdAt: string;
}


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
  // const { canBet, isFreeTrial } = useSubscription();
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
  const { clearActiveBets } = useBetStatusStore();




  const betIdsFromStorage = localStorage.getItem('betId');
  let betIdsArray: string[] = [];

  if (betIdsFromStorage) {
    try {
      betIdsArray = JSON.parse(betIdsFromStorage);
    } catch {

      if (betIdsFromStorage) {
        betIdsArray = [betIdsFromStorage];
      }
    }
  }

  const { data: betData } = useGetBet(betIdsArray, { skip: betIdsArray.length === 0 });
  const { setBetResult } = useBetStatusStore();
  const processedBetsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (countdown === 29 && betIdsArray.length > 0 && betData && betData.GetBetsBatch) {
      const completedBets: string[] = [];

      betData.GetBetsBatch.forEach((bet: BetData) => {
        const status = bet.status;
        const value = bet.value;
        const betId = bet.id;


        if (processedBetsRef.current.has(betId)) {
          return;
        }

        if (status === 'Won') {
          setBetResult({ status: 'Won', value });
          showWinToast(value, `win-${betId}`);
          completedBets.push(betId);
          processedBetsRef.current.add(betId);
        } else if (status === 'Lost') {
          setBetResult({ status: 'Lost', value });
          showLoseToast(value, `lose-${betId}`);
          completedBets.push(betId);
          processedBetsRef.current.add(betId);
        } else if (status === 'Placed') {
          setBetResult({ status: 'Placed', value });
          showInfoToast('Apuesta en proceso...', `placed-${betId}`);
        } else {
          showInfoToast('Resultado pendiente', `pending-${betId}`);
          completedBets.push(betId);
          processedBetsRef.current.add(betId);
        }
      });


      if (completedBets.length > 0) {
        const remainingBets = betIdsArray.filter(id => !completedBets.includes(id));
        if (remainingBets.length > 0) {
          localStorage.setItem('betId', JSON.stringify(remainingBets));
        } else {
          localStorage.removeItem('betId');
        }
      }
    }
  }, [countdown, betData, setBetResult]);


  useEffect(() => {
    if (countdown === 29) {
      clearActiveBets();
    }
  }, [countdown, clearActiveBets]);


  useEffect(() => {
    if (countdown === 0) {
      processedBetsRef.current.clear();
    }
  }, [countdown]);


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
