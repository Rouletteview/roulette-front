interface ControlsProps {
  setIsChartFullscreen: (isFullscreen: boolean) => void;
}

const Controls = ({ setIsChartFullscreen }: ControlsProps) => {
  return (
    <div className="flex gap-3.5 justify-end lg:justify-start items-center w-full mb-4 relative">


      <button
        type="button"
        className="ml-2 lg:hidden bg-[#D9A425] text-white p-1 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 flex items-center justify-center"
        onClick={() => setIsChartFullscreen(true)}
        aria-label="Maximizar gráfico"
        title="Maximizar gráfico"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}

export default Controls
