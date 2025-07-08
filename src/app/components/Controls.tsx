import zoomIn from "../../assets/icon/zoom-in.svg";
import zoomOut from "../../assets/icon/zoom-out.svg";

interface ControlsProps {
  setIsChartFullscreen: (isFullscreen: boolean) => void;
}

const Controls = ({ setIsChartFullscreen }: ControlsProps) => {
  return (
    <div className="flex gap-3.5 justify-end lg:justify-start items-center w-full mb-4 relative">
      <button className="cursor-pointer w-6 h-auto">
        <img src={zoomIn} alt="Zoom In" />
      </button>
      <button className="cursor-pointer w-6 h-auto">
        <img src={zoomOut} alt="Zoom Out" />
      </button>
      {/* Botón de maximizar solo en móvil, visualmente mejorado */}
      <button
        type="button"
        className="ml-2 lg:hidden bg-[#D9A425] text-white p-1 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 flex items-center justify-center"
        onClick={() => setIsChartFullscreen(true)}
        aria-label="Maximizar gráfico"
        title="Maximizar gráfico"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
      </button>
    </div>
  )
}

export default Controls
