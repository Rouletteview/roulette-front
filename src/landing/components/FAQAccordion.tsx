import { useState } from "react";
import clsx from "clsx";
import arrowDown from '../../assets/icon/arrow-down.svg'
import arrowUp from '../../assets/icon/arrow-up.svg'

const faqs = [
    {
        question: "¿Cómo funcionan los gráficos en tiempo real?",
        answer: "Los gráficos se actualizan en vivo con cada resultado de la ruleta, permitiéndote realizar análisis técnico en el momento.",
    },
    {
        question: "¿La plataforma es apta para principiantes?",
        answer: "¡Por supuesto! Está diseñada para ser intuitiva y fácil de usar, sin importar tu nivel de experiencia",
    },
    // {
    //     question: "¿Cómo puedo cancelar mi suscripción?",
    //     answer: "Puedes hacerlo en cualquier momento desde la configuración de tu cuenta, sin complicaciones.",
    // },
];


const FAQAccordion = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full mx-auto space-y-[25px] mt-9 leading-[20px] text-left">
            {faqs.map((faq, index) => (
                <div key={index} className="bg-white text-black rounded-[20px] mx-8 lg:mx-72">
            
                    <button
                        onClick={() => toggleFAQ(index)}
                        className={clsx(
                            "w-full  px-4 py-4 text-left flex justify-between items-center transition-all duration-300 cursor-pointer",
                            openIndex === index ? "bg-white text-black border-4 border-white rounded-t-[20px]" : "bg-black text-white border-4 border-white rounded-[20px]"
                        )}
                    >
                        <span className="font-extrabold md:text-3xl">{faq.question}</span>
                        <span className="transition-transform duration-300">
                            {openIndex === index ? <img src={arrowUp}/> : <img src={arrowDown}/>}
                        </span>
                    </button>

                 
                    <div
                        className={clsx(
                            "overflow-hidden transition-all duration-300",
                            openIndex === index ? "max-h-[500px] opacity-100 py-2 md:px-4" : "max-h-0 opacity-0"
                        )}
                    >
                        <div className="px-4 pb-2 text-[14px] md:text-[24px] md:font-normal">{faq.answer}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FAQAccordion
