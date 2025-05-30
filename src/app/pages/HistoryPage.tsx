import HeroSection from "../../sections/HeroSection";
import AppLayout from "../layouts/AppLayout"
import ColumnIcon from '../../assets/icon/column-icon.svg'


const data = Array.from({ length: 9 }, (_, i) => {
  const randomAmount = Math.random() * 200 - 100;
  const formattedAmount = (randomAmount < 0 ? '-$' : '$') + Math.abs(randomAmount).toFixed(2);
  const amountColor = formattedAmount.startsWith('-') ? 'text-red-600' : 'text-green-600';

  return {
    id: i + 1,
    mercado: 'Web de apuestas',
    subtitulo: 'Ruleta',
    ganancia: formattedAmount,
    color: amountColor
  };
});

const HistoryPage = () => {



  return (
    <>
      <AppLayout>
        <HeroSection heroBackground={false} backgroundColor="#121418F2">
          <div className="w-auto sm:min-w-2xl lg:min-w-4xl mx-auto overflow-x-auto rounded-xl shadow-lg bg-white text-gray-800  py-4 sm:py-6 md:py-8 mb-8 sm:mb-12 md:mb-16">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#F9FAFC] uppercase text-xs text-gray-500 font-light">
                <tr>
                  <th className="px-4 sm:px-4 md:px-8 py-3 hidden lg:table-cell">
                    <img src={ColumnIcon} alt="" />
                  </th>
                  <th className="px-4 sm:px-4 md:px-8 py-3">Mercado Operado</th>
                  <th className="px-2 sm:px-4 md:px-8 py-3">Ganancia</th>
                </tr>
              </thead>
              <tbody>
                {data.map((fila) => (
                  <tr
                    key={fila.id}
                    className="hover:bg-gray-50 transition-colors odd:bg-white even:bg-[#F9FAFC]"
                  >
                    <td className="px-4 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 hidden lg:table-cell">
                      {fila.id}
                    </td>
                    <td className="px-4 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4">
                      <div className="font-medium">{fila.mercado}</div>
                      <div className="text-xs text-gray-400">{fila.subtitulo}</div>
                    </td>
                    <td className={`px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 ${fila.color} font-light`}>
                      {fila.ganancia}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-center gap-2 px-4 py-3 text-sm bg-[#F4F7FCBF] text-gray-500">
              <button
                disabled
                className="bg-white disabled:bg-gray-200 text-gray-500 px-2 py-1 border border-gray-300 rounded-md font-semibold cursor-pointer disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              <span>1/10</span>
              <button
                className="bg-white disabled:bg-gray-200 text-gray-500 px-2 py-1 border border-gray-300 rounded-md font-semibold cursor-pointer disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          </div>


        </HeroSection>
      </AppLayout>
    </>
  )
}

export default HistoryPage

