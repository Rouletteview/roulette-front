import zoomIn from "../../assets/icon/zoom-in.svg";
import zoomOut from "../../assets/icon/zoom-out.svg";

const Controls = () => {
  return (
    <div className="flex gap-3.5 justify-end lg:justify-start items-center w-full mb-4">
    <button className="cursor-pointer w-6 h-auto">
      <img src={zoomIn} alt="Zoom In" />
    </button>
    <button className="cursor-pointer w-6 h-auto">
      <img src={zoomOut} alt="Zoom Out" />
    </button>
  </div>
  )
}

export default Controls
