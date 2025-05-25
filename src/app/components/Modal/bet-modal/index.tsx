import RouletteTable from "../../RouletteTable"
import closeModalIcon from "../../../../assets/icon/close-modal.svg"
import { useState } from "react";


const BetModal = () => {
    const [showModal, setShowModal] = useState(true);

    const closeModal = () => setShowModal(false);
    if (!showModal) return null;
    return (
        <div className="absolute w-7xl top-20 left-1/2 text-center transform -translate-x-1/2 z-50 bg-black p-4 rounded shadow-lg">
            <div className="absolute top-8 right-8">
                <button className="cursor-pointer" onClick={closeModal}>
                    <img src={closeModalIcon} alt="Cerrar" />
                </button>
            </div>
            <div className="my-8">
                <h1 className="text-white text-[28px] font-medium">Coloca la ficha para la apuesta y visualiza el <span className="text-[#D9A425]">resultado en la grafica</span></h1>
                <RouletteTable />
                <button style={{ boxShadow: 'inset 0px -6px 8px 0px #00000040' }} className="text-white text-lg font-bold bg-[#D9A425] hover:bg-[#B3831D] px-56 py-4 rounded-xl transition-all cursor-pointer">
                    Apostar
                </button>
            </div>

        </div>
    );
};

export default BetModal

