import Footer from "../../components/Footer"
import Header from "../../components/Header"


const NotFound = () => {
    return (
        <>
            <Header />
            <main className="w-full bg-center bg-cover flex items-center justify-center text-white"
                style={{ backgroundImage: "url('/background/close-up-roulette-wheel-1.png')" }}
            >

                <div className="hero-background w-full min-h-screen flex flex-col  justify-center items-center">
                    <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
                        <h1 className="block text-7xl font-bold text-[#D9A425] sm:text-9xl">404</h1>
                        <p className="text-2xl md:text-3xl mt-3 text-white font-extrabold">Oops, algo salió mal.</p>
                        <p className="text-lg md:text-2xl text-white">Lo sentimos, no pudimos encontrar tu página.</p>
                        <div className="mt-5 flex  justify-center items-center gap-2 sm:flex-row sm:gap-3">
                            <a className="bg-[#D9A425] hover:bg-[#B3831D] transition-all px-4 py-2 rounded-xl text-center text-xl flex items-center gap-x-2" href="/">
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                               Volver
                            </a>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </>
    )
}

export default NotFound
