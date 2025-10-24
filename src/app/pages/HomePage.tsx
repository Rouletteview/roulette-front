import HeroSection from "../../sections/HeroSection"
import WelcomeModal from "../components/Modal/welcome-modal/WelcomeModal"
import AppLayout from "../layouts/AppLayout"
import ChartSection from "../sections/ChartSection/ChartSection"
import { useMutation, useQuery } from "@apollo/client"
import LoadingOverlay from "../../components/LoadingOverlay"
import { showErrorToast } from '../components/Toast';
import { GET_CURRENT_USER_SUBSCRIPTION_QUERY } from "../../graphql/query/subscription/getCurrentUserSubscription"
import { GET_ROULETTE_TABLES } from "../../graphql/query/getRouletteTables"
import { START_FREE_SUBSCRIPTION_MUTATION } from "../../graphql/mutations/subscription/startFreeSubscription"
import { UPDATE_FREE_SUBSCRIPTION_TABLE_MUTATION } from "../../graphql/mutations/subscription/updateFreeSubscriptionTable"
import { useUserInfo } from "../../hooks/useUserInfo"
import { getGraphQLErrorMessage } from "../../utils/errorMessages";
import { useNavigate } from "react-router"
import { useEffect, useCallback, useRef } from "react"
import { useSubscription } from "../../hooks/useSubscription"

const HomePage = () => {
  const navigate = useNavigate();
  const hasUpdatedSubscription = useRef(false);

  const { data: rouletteTablesData, loading: rouletteTablesLoading } = useQuery(GET_ROULETTE_TABLES, {
    variables: {
      request: {
        IsOnline: true,
        Limit: 10,
        Providers: ["evolution", "pragmatic", "ezugi"],
        Query: "",
        Skip: 0,
      },
    },
  });

  const [startFreeSubscription, { loading: startLoading }] = useMutation(START_FREE_SUBSCRIPTION_MUTATION, {
    refetchQueries: [{ query: GET_CURRENT_USER_SUBSCRIPTION_QUERY }],
  });

  const [updateFreeSubscriptionTable, { loading: updateLoading }] = useMutation(UPDATE_FREE_SUBSCRIPTION_TABLE_MUTATION, {
    refetchQueries: [{ query: GET_CURRENT_USER_SUBSCRIPTION_QUERY }],
  });

  const { data: subscriptionData, loading: getCurrentUserSubscriptionLoading } = useQuery(GET_CURRENT_USER_SUBSCRIPTION_QUERY);
  const { data: userData, loading: userDataLoading } = useUserInfo();

  const isAdmin = userData?.GetUserInfo.IsAdmin;
  const hasLoggedIn = userData?.GetUserInfo.LastLogin;
  const { isFreeTrial, hasPremium } = useSubscription();

  const firstAvailableTableId = rouletteTablesData?.GetRouletteTables?.Tables?.[0]?.Id;
  const hasSubscription = !!subscriptionData?.GetCurrentUserSubscription;

  const handleSubscriptionUpdate = useCallback(async () => {
    if (!firstAvailableTableId) {
      showErrorToast("No hay mesas de ruleta disponibles");
      return;
    }

    try {
      if (hasSubscription) {
        await updateFreeSubscriptionTable({
          variables: {
            input: {
              rouletteTableId: firstAvailableTableId,
            }
          }
        });
      } else {
        await startFreeSubscription({
          variables: {
            input: {
              rouletteTableId: firstAvailableTableId,
            }
          }
        });
      }
    } catch (error: unknown) {
      const errorMessage = getGraphQLErrorMessage(error);
      if (!errorMessage.includes("ya tiene una suscripción") &&
        !errorMessage.includes("subscription already exists")) {
        console.error("Error en suscripción:", errorMessage);
      }
    }
  }, [startFreeSubscription, updateFreeSubscriptionTable, firstAvailableTableId, hasSubscription]);

  useEffect(() => {
    if (userData?.GetUserInfo?.Id) {
      hasUpdatedSubscription.current = false;
    }
  }, [userData?.GetUserInfo?.Id]);

  useEffect(() => {
    const shouldUpdateSubscription = isFreeTrial &&
      !startLoading &&
      !updateLoading &&
      !getCurrentUserSubscriptionLoading &&
      !rouletteTablesLoading &&
      userData?.GetUserInfo &&
      firstAvailableTableId &&
      !hasUpdatedSubscription.current;

    if (shouldUpdateSubscription) {
      hasUpdatedSubscription.current = true;
      handleSubscriptionUpdate();
    }
  }, [isFreeTrial, startLoading, updateLoading, getCurrentUserSubscriptionLoading, rouletteTablesLoading, handleSubscriptionUpdate, userData, firstAvailableTableId]);

  if (getCurrentUserSubscriptionLoading || userDataLoading || rouletteTablesLoading || startLoading || updateLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      {!hasLoggedIn ? <WelcomeModal /> : null}

      <AppLayout>
        <HeroSection height='min-h-[60vh] md:min-h-[80vh]' imageURL='/background/home-background.webp'>
          <div className='text-start mx-7 lg:mx-24'>
            <div className='flex flex-col justify-between gap-y-8 h-full'>
              <div className='max-w-4xl'>
                <h1 className='text-xl lg:text-7xl font-semibold leading-7 lg:leading-20'><span className='text-[#D9A425]'>¡Analiza y gana! </span>con nuestros gráficos en tiempo real del juego de la <span className='text-[#D9A425]'>ruleta de casino</span> </h1>

              </div>

              {!isAdmin && !hasPremium && isFreeTrial ? (
                <button
                  onClick={() => navigate('/subscription')}
                  className="w-full lg:w-[390px]   bg-[#D9A425] hover:bg-[#B3831D] 
                    disabled:bg-[#4D4D51]
                    text-center font-bold rounded-xl inset-shadow-2xs transition-all
                    text-sm sm:text-base md:text-lg lg:text-xl
                    px-4 sm:px-6 md:px-8 
                    py-3 sm:py-4 
                  yellow-button-shadow
                  cursor-pointer
                  disabled:cursor-not-allowed">
                  Obtener mas ruletas
                </button>
              ) : null}

            </div>
          </div>
        </HeroSection>

        <ChartSection subscriptionData={subscriptionData} />
      </AppLayout>

    </>

  )
}

export default HomePage
