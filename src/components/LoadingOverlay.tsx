import img from '../assets/logo/logo.svg'




const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black  flex items-center justify-center z-50">
      <img src={img} alt="" className='w-56 h-auto animate-pulse' />
      {/* <div className="w-16 h-16 border-4 border-t-transparent border-[#D9A425] rounded-full animate-spin"></div> */}
    </div>
  );
};

export default LoadingOverlay;