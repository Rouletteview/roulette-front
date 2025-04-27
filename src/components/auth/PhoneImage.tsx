import img from '../../assets/images/phone-auth.png'

const PhoneImage = () => {
  return (
    <div className="">
      {/* Video encima del teléfono */}


      {/* Imagen del teléfono */}
      <div className="absolute bottom-0 right-0 hidden lg:block">
        <video
          src="https://s3-figma-videos-production-sig.figma.com/video/TEAM/1024046001654135541/4e6083b8dee0d3045bb386f004f7c63af06f5362?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=g3g842YsetBDCkgW96V-IBVc7pM6Ixvut6sISOfvEMDOkJdRuPtApYweeTb967T6kCaMGFgTipn2Ooq3eMzgetk3ZDg1eXcxX3woIQ8AET1hZ3eXgd6L0YKClxf6z-WewPKraSKZulvTNs2s2MHhmyFZrsbECfRdkkrsdcsTuPAlUGnslNas7SsfUn8bX4pWqjo91xqHqfTey484JruHrWb4L4P4BQ3ygRU7JjHgghvCKMZ5b96yWM7NfjKIlE6K6xiVjn5X8R4BNUBqC4ehlwjo-NUsPk11kl2CQKRmATfKpYWtLVxHTSSNywkYY1~jqfCPHg30ArMlCbmGd6ITRg__"
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
