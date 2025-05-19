import img from '../../assets/images/phone-auth.png'
import video from '../../assets/videos/phoneVideo.mp4'

const PhoneImage = () => {
  return (
    <div className="">
      <div className="absolute bottom-0 right-0 hidden lg:block">
        <video
         src={video}
          autoPlay
          loop
          muted
          className="absolute lg:bottom-[18%] xl:bottom-[20%] lg:right-[26%] xl:right-[30%] lg:w-[240px] xl:w-[240px] lg:h-[485px] xl:h-[520px] object-cover z-20 rounded-3xl"
        />
        <div className="relative z-10 drop-shadow-[0_0_25px_rgba(217,164,37,1)]
        before:content-[''] before:absolute before:-left-14 before:top-12 before:w-[177px] md:before:w-[250px] before:h-[169px] md:before:h-[272px] before:bg-[#D9A425] before:blur-[100px] before:rounded-full before:-z-10
        after:content-[''] after:absolute after:right-5 after:top-40 after:w-[210px] after:h-[200px] after:bg-[#D9A425] after:blur-[100px] after:rounded-full after:-z-10">
          <img
            src={img}
            alt="Ilustración"
            className="w-[250px] md:w-[350px] lg:w-[450px] xl:w-[500px] h-auto relative"
          />
        </div>
      </div>
    </div>
  )
}

export default PhoneImage
