import { useState } from "react";
import userIcon from "../../assets/icon/user-icon.svg";
import { UserInfoResponse } from "../../graphql/generated/types";
import { useUserInfo } from "../../hooks/useUserInfo";
import PlusIcon from "./icon/PlusIcon";
import { useBalanceStore } from "../../stores/balanceStore";


const UserInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [balanceInput, setBalanceInput] = useState("");

  const { data: userInfo } = useUserInfo();
  const userInfoData: UserInfoResponse = userInfo?.GetUserInfo;
  const name = userInfoData?.Name || '';

  const {
    initialBalance,
    addFunds,
    getFinalBalance,
    getUtility,
    getBenefitRatio
  } = useBalanceStore();

  const saldoInicial = initialBalance;
  const saldoFinal = getFinalBalance();
  const utilidad = getUtility();
  const beneficio = getBenefitRatio();

  const handleSetBalance = () => {
    const balance = parseFloat(balanceInput);
    if (!isNaN(balance) && balance >= 0) {
      addFunds(balance);
      setBalanceInput("");
      setIsExpanded(false);
    } else {
      setBalanceInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSetBalance();
    }
  };

  return (
    <div className={` text-white text-sm rounded p-4  mt-4 lg:mt-0 w-full lg:w-[190px] self-center lg:self-start my-4 transition-all duration-300 lg:origin-bottom-right z-10 ${isExpanded ? 'lg:scale-[1.84] scale-[1.05] bg-black' : 'bg-[#1a1a1a]'}`}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-baseline gap-x-1.5">
          <img src={userIcon} alt="user icon" className="w-6 h-6" />
          <span className="font-medium">{name || ''}</span>
        </div>
        <button className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <PlusIcon />
        </button>
      </div>
      <div className="text-[#d4a727]">
        <div className="flex justify-between font-medium mb-1">
          <span>Saldo inicial</span>
          {isExpanded ? (
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={balanceInput}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value === '' || /^\d*\.?\d*$/.test(value)) {
                    setBalanceInput(value);
                  }
                }}
                onKeyPress={handleKeyPress}
                placeholder="0.00"
                className="w-20 px-2 py-0.5 text-right text-sm bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:border-[#d4a727]"
                min="0"
                step="0.01"
                autoFocus
              />

            </div>
          ) : (
            <span className="text-right">${saldoInicial.toFixed(2)}</span>
          )}
        </div>
        <div className="flex justify-between font-medium mb-1">
          <span>Saldo Final</span>
          <span className="text-right">${saldoFinal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium mb-1">
          <span>Utilidad</span>
          <span className={`text-right ${utilidad >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {utilidad >= 0 ? '+' : ''}${utilidad.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Beneficio 1:1</span>
          <span className={`text-right ${utilidad >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {saldoInicial > 0 ? beneficio : '--'}
          </span>
        </div>
      </div>
      {
        isExpanded && (
          <div className="flex justify-center font-medium my-2">
            <button className="text-xs text-white bg-[#d4a727] px-4 py-1 rounded-lg hover:bg-[#b8941f] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={balanceInput === "" || isNaN(parseFloat(balanceInput)) || parseFloat(balanceInput) < 0} onClick={handleSetBalance}>Guardar</button>
          </div>
        )
      }
    </div>
  )
}

export default UserInfo
