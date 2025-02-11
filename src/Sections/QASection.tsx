import FAQAccordion from "../components/pre-footer/FAQAccordion"


const QASection = () => {
  return (
    <section className="mt-9 md:mt-40 leading-[56px] text-center text-white">
        <h1 className="text-[28px] md:text-[70px] font-extrabold">Preguntas frecuentes</h1>
        <h2 className="leading-[20px] md:leading-[56px] md:text-[35px] mx-14 md:mt-8">Acá te respondemos las <span className="text-[#D9A425]">preguntas más frecuentes sobre nuestra plataforma</span> </h2>

        <FAQAccordion/>
    </section>
  )
}

export default QASection
