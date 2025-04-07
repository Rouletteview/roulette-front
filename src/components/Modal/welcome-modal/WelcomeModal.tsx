import { useState, useEffect } from 'react';
import closeModalIcon from '../../../assets/icon/close-modal.svg'

import { useAuthStore } from '../../../stores/authStore';
import WelcomeContent from './WelcomeContent';
import PricingContent from './PricingContent';





const WelcomeModal = () => {
  const token = useAuthStore((state) => state.token);
  const [showModal, setShowModal] = useState(false);

  const [activeContent, setActiveContent] = useState<'welcome' | 'pricing'>('welcome');

  const handleShowPricing = () => setActiveContent('pricing');

  useEffect(() => {
    if (!token) return;

    const hasShownModal = localStorage.getItem('hasShownModal');

    if (!hasShownModal) {
      setShowModal(true);
      localStorage.setItem('hasShownModal', 'true');
    }
  }, [token]);

  const closeModal = () => setShowModal(false);
  if (!showModal) return null;

  return (
    <div
      className="fixed w-screen h-screen flex items-center justify-center z-50 bg-[#000000CC] py-14"
      onClick={closeModal}
    >
      <div
        className="relative h-full lg:max-h-[590px] w-full max-w-[1000px] bg-[#121418F2] rounded-3xl p-9  lg:px-8 overflow-y-auto scrollbar-hidden my-16 mx-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-8 right-8">
          <button className="cursor-pointer" onClick={closeModal}>
            <img src={closeModalIcon} alt="Cerrar" />
          </button>
        </div>

        {activeContent === 'welcome' && <WelcomeContent onShowPricing={handleShowPricing} />}
        {activeContent === 'pricing' && <PricingContent />}
      </div>
    </div>
  );
};

export default WelcomeModal;