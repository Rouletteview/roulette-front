import updateIcon from '../../assets/icon/update-icon.svg';

const Update = () => {
  return (
    <div className="flex items-center gap-4 w-full justify-end my-1">
    <div className="bg-black/30 text-white text-base px-3 py-1 rounded">
      <span>00</span><span> : </span><span>00</span><span> : </span><span>00s</span>
    </div>
    <button className="cursor-pointer">
      <img src={updateIcon} alt="Update" className="w-6 h-auto" />
    </button>
  </div>
  )
}

export default Update
