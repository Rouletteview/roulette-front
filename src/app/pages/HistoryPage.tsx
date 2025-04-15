import HeroSection from "../../sections/HeroSection";
import AppLayout from "../layouts/AppLayout"




const data = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  mercado: 'Web de apuestas',
  subtitulo: 'Ruleta',
  ganancia: '$70.00',
  perdida: '-$270.00',
}));


const HistoryPage = () => {

  return (
    <>
      <AppLayout>
        <HeroSection heroBackground={false} backgroundColor="#121418F2">
          <div className="max-w-full overflow-x-auto mx-auto rounded-xl shadow-lg bg-white text-gray-800 py-8 mb-16">
            <table className="w-full text-sm text-left ">
              <thead className="bg-[#F9FAFC] uppercase text-xs text-gray-500 font-light">
                <tr>
                  <th className="px-4 md:px-16 py-3 hidden lg:flex">#</th>
                  <th className="px-4 md:px-8 py-3 ">Mercado Operado</th>
                  <th className="px-4 md:px-16 py-3">Ganancia</th>
                  <th className="px-4 md:px-16 py-3">Pérdida</th>
                </tr>
              </thead>
              <tbody>
                {data.map((fila) => (
                  <tr
                    key={fila.id}
                    className="hover:bg-gray-50 transition-colors odd:bg-white even:bg-[#F9FAFC]"
                  >
                    <td className="px-4 md:px-16 py-4 hidden lg:flex">{fila.id}</td>
                    <td className="px-4 md:px-8 py-4">
                      <div className="font-medium">{fila.mercado}</div>
                      <div className="text-xs text-gray-400">{fila.subtitulo}</div>
                    </td>
                    <td className="px-4 md:px-16 py-4 text-gray-700 font-light">{fila.ganancia}</td>
                    <td className="px-4 md:px-16 py-4 text-red-500 font-light">{fila.perdida}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between px-4 py-3 text-sm bg-[#F9FAFC] text-gray-500">
              <button className="hover:text-black">&lt;</button>
              <span>1/10</span>
              <button className="hover:text-black">&gt;</button>
            </div>
          </div>

        </HeroSection>
      </AppLayout>
    </>
  )
}

export default HistoryPage

