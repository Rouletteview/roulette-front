import { useEffect } from "react"
import { useLocation } from "react-router";
import { useCountdownStore } from "../../stores/countdownStore";

interface UpdateProps {
  selectedType?: string;
  gameType?: string;
  selectedTable?: string;
  loading?: boolean;
}

const Update = ({ selectedType, gameType, selectedTable, loading }: UpdateProps) => {
  const location = useLocation();
  const { countdown, setCountdown, setIsActive, resetCountdownIfInactive } = useCountdownStore();

  const allSelected = selectedType && gameType && selectedTable;

  useEffect(() => {
    if (!loading) {
      resetCountdownIfInactive();
    }
  }, [loading, resetCountdownIfInactive])

  useEffect(() => {
    if (allSelected) {
      resetCountdownIfInactive();
    }
  }, [location.search, allSelected, resetCountdownIfInactive])

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      const position = JSON.parse(savedScrollPosition);
      window.scrollTo(position.x, position.y);
      sessionStorage.removeItem('scrollPosition');
    }
  }, []);

  useEffect(() => {
    if (!allSelected) {
      setIsActive(false);
      return;
    }

    setIsActive(true);

    if (countdown === 0) {
      const scrollPosition = {
        x: window.scrollX,
        y: window.scrollY
      };
      sessionStorage.setItem('scrollPosition', JSON.stringify(scrollPosition));
      window.location.reload();
    }

    const timer = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, allSelected, loading, setCountdown, setIsActive]);

  return (
    <div className="flex items-center gap-4 w-full justify-end my-1">
      <div className="bg-black/30 text-white text-base px-3 py-1 rounded">
        <span>00</span><span> : </span><span>00</span><span> : </span><span>{allSelected ? countdown : '--'}s</span>
      </div>
    </div>
  )
}

export default Update
