import userIcon from "../../assets/icon/user-icon.svg";
import { UserInfoResponse } from "../../graphql/generated/types";
import { useUserInfo } from "../../hooks/useUserInfo";
import PlusIcon from "./icon/PlusIcon";


const UserInfo = () => {

  const { data: userInfo } = useUserInfo();
const userInfoData: UserInfoResponse = userInfo?.GetUserInfo;
const name = userInfoData.Name || '';


  const user = {
    name,
    saldoInicial: 0.0,
    saldoFinal: 0.0,
    utilidad: 0.0,
    beneficio: "100%"
  };


  return (
    <div className=" bg-[#1a1a1a] text-white text-sm rounded p-4  mt-4 lg:mt-0 w-full lg:w-[190px] self-center lg:self-start my-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-baseline gap-x-1.5">
        <img src={userIcon} alt="user icon" className="w-6 h-6" />
        <span className="font-medium">{user.name || ''}</span>
        </div>
        <button className="cursor-pointer" onClick={() => {}}>
          <PlusIcon />
        </button>
      </div>
      <div className="text-[#d4a727]">
        <div className="flex justify-between font-medium mb-1">
          <span>Saldo inicial</span>
          <span className="text-right">{user.saldoInicial.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium mb-1">
          <span>Saldo Final</span>
          <span className="text-right">{user.saldoFinal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium mb-1">
          <span>Utilidad</span>
          <span className="text-right">{user.utilidad.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Beneficio 1:1</span>
          <span className="text-right">{user.beneficio}</span>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
