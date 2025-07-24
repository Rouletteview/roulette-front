import Logo from "../assets/logo/logo2.svg";
import MailIcon from '../assets/icon/mail-icon.svg'
import InstagramIcon from '../assets/icon/instagram-icon.svg'
import FacebookIcon from '../assets/icon/facebook-icon.svg'
import TikTokIcon from '../assets/icon/tiktok-icon.svg'
import TwitterIcon from '../assets/icon/twitter-icon.svg'

const Footer = () => {
    return (
        <footer className="bg-[#121418] flex flex-col justify-center lg:flex-row  px-2.5 md:px-28 py-14 text-white leading-5">
            <section className="flex gap-x-3 md:gap-x-24">
                <img src={Logo} alt="" className="w-[55px] md:w-[100px] h-auto" />
                <div className="flex flex-col md:gap-y-2">
                    <h2 className="text-[14px]  md:text-2xl font-semibold">Información general</h2>
                    <a href="/" className="text-[12px] md:text-lg font-normal">Términos y condiciones</a>
                </div>
                <div className="flex flex-col md:gap-y-2">
                    <h2 className="text-[14px] md:text-2xl font-semibold">Contáctanos</h2>
                    <div className="flex gap-2">
                        <img src={MailIcon} alt="" className="md:w-[24px] h-auto" />
                        <a href="/" className="text-[12px] md:text-lg font-normal">contacto@roulettesview.com</a>
                    </div>
                </div>
            </section>

            <section className="mt-8 lg:mt-0 mx-16 md:mx-24">
                <h2 className="text-[14px] md:text-2xl font-semibold mb-1">Síguenos</h2>
                <div className="flex gap-x-2">
                    <a href=""> <img src={InstagramIcon} alt="" /></a>
                    <a href=""> <img src={FacebookIcon} alt="" /></a>
                    <a href=""> <img src={TikTokIcon} alt="" /></a>
                    <a href=""> <img src={TwitterIcon} alt="" /></a>
                </div>
            </section>

        </footer>
    )
}

export default Footer
