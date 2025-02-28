import Footer from "../components/Footer"
import Header from "../components/Header"
import HeroSection from "../Sections/HeroSection"
import PreFooter from "../Sections/PreFooter"
import SubHeroSection from "../Sections/SubHeroSection"


const LandingPage = () => {
    return (
        <>
            <Header>
                <a href="/iniciar-sesion" className="border border-[#D9A425] hover:border-[#B3831D] transition-all px-4 py-2 rounded-xl text-center">Iniciar sesión</a>
                <a href="/registrarse" className="bg-[#D9A425] hover:bg-[#B3831D] transition-all px-4 py-2 rounded-xl text-center">Registrarse</a>
            </Header>
            <HeroSection />
            <SubHeroSection />
            <PreFooter />
            <Footer />
        </>
    )
}

export default LandingPage
