import HeroSection from "../../sections/HeroSection";
import AppLayout from "../layouts/AppLayout"
import ColumnIcon from '../../assets/icon/column-icon.svg'
import { GET_USER_BETS_QUERY } from "../../graphql/query/bet/getUserBets";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import Pagination from "../components/Pagination";
import { usePagination } from "../../hooks/usePagination";
import HistorySkeleton from "../components/HistorySkeleton";
import { translateRouletteTag } from "../../utils/formatters/rouletterNumbers";

interface UserBet {
  id: string;
  amount: number;
  gameType: string;
  value: string;
  status: string;
  createdAt: string;
  table: {
    Name: string;
    Provider: string;
  };
}

const HistoryPage = () => {
  const {
    currentPage,
    limit,
    skip,
    handlePreviousPage,
    handleNextPage
  } = usePagination({
    defaultPage: 1,
    defaultLimit: 10,
    paramName: 'page'
  });

  const { data: bets, loading, error, refetch } = useQuery(GET_USER_BETS_QUERY, {
    variables: {
      request: {
        limit,
        skip
      }
    }
  });


  useEffect(() => {
    refetch({
      request: {
        limit,
        skip
      }
    });
  }, [currentPage, refetch, limit, skip]);


  const userBets = bets?.GetUserBets || [];
  const hasNextPage = userBets.length === limit;
  const hasPreviousPage = currentPage > 1;


  if (loading) {
    return (
      <AppLayout>
        <HeroSection heroBackground={false} backgroundColor="#121418F2">
          <div className="w-auto sm:min-w-2xl lg:min-w-4xl mx-auto overflow-x-auto rounded-xl shadow-lg bg-white text-gray-800 py-4 sm:py-6 md:py-8 mb-8 sm:mb-12 md:mb-16">
            <HistorySkeleton />
          </div>
        </HeroSection>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <HeroSection heroBackground={false} backgroundColor="#121418F2">
          <div className="w-auto sm:min-w-2xl lg:min-w-4xl mx-auto overflow-x-auto rounded-xl shadow-lg bg-white text-gray-800 py-4 sm:py-6 md:py-8 mb-8 sm:mb-12 md:mb-16">
            <div className="flex items-center justify-center py-8">
              <span className="text-red-600">Error al cargar el historial</span>
            </div>
          </div>
        </HeroSection>
      </AppLayout>
    );
  }

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
                  <th className="px-2 sm:px-4 md:px-8 py-3 hidden lg:table-cell">Tipo de apuesta</th>
                  <th className="px-2 sm:px-4 md:px-8 py-3">Ganancia</th>
                  <th className="px-2 sm:px-4 md:px-8 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {userBets.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 sm:px-4 md:px-8 py-8 text-center text-gray-500">
                      No hay apuestas en el historial
                    </td>
                  </tr>
                ) : (
                  userBets.map((bet: UserBet) => (
                    <tr
                      key={bet.id}
                      className="hover:bg-gray-50 transition-colors odd:bg-white even:bg-[#F9FAFC]"
                    >
                      <td className="px-4 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 hidden lg:table-cell">
                        {bet.id.slice(0, 4) + '...' + bet.id.slice(-4)}
                      </td>
                      <td className="px-4 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4">
                        <div className="font-medium">{bet.table.Name}</div>
                        <div className="text-xs text-gray-400 md:hidden table-cell">{bet.gameType}</div>
                      </td>
                      <td className="px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 hidden lg:table-cell">
                        <div className="font-medium">{translateRouletteTag(bet.gameType)}</div>
                      </td>
                      <td className={`px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 ${bet.status === 'Won' ? 'text-green-600' : bet.status === 'Lost' ? 'text-red-600' : 'text-gray-600'} font-light`}>
                        {bet.status === 'Won' ? '+' : bet.status === 'Lost' ? '-' : ''}${bet.amount}
                      </td>
                      <td className="px-2 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4">
                        {new Date(bet.createdAt).toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'  })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {userBets.length > 0 && (
              <Pagination
                currentPage={currentPage}
                onPreviousPage={handlePreviousPage}
                onNextPage={handleNextPage}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
              />
            )}
          </div>
        </HeroSection>
      </AppLayout>
    </>
  )
}

export default HistoryPage

