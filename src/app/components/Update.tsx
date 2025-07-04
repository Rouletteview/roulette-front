import { useEffect, useState } from "react"
import { useLocation } from "react-router";

interface UpdateProps {
  selectedType?: string;
  gameType?: string;
  selectedTable?: string;
}

const Update = ({ selectedType, gameType, selectedTable }: UpdateProps) => {
  const location = useLocation();
  const [countdown, setCountdown] = useState(30);


  const allSelected = selectedType && gameType && selectedTable;


  useEffect(() => {
    if (allSelected) {
      setCountdown(30)
    }
  }, [location.search, allSelected])

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
      return;
    }

    if (countdown === 0) {
   
      const scrollPosition = {
        x: window.scrollX,
        y: window.scrollY
      };
      sessionStorage.setItem('scrollPosition', JSON.stringify(scrollPosition));

      window.location.reload();
    }

    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, allSelected]);

  return (
    <div className="flex items-center gap-4 w-full justify-end my-1">
      <div className="bg-black/30 text-white text-base px-3 py-1 rounded">
        <span>00</span><span> : </span><span>00</span><span> : </span><span>{allSelected ? countdown : '--'}s</span>
      </div>
    </div>
  )
}

export default Update
