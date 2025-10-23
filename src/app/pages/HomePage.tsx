import HeroSection from "../../sections/HeroSection"
import WelcomeModal from "../components/Modal/welcome-modal/WelcomeModal"
import AppLayout from "../layouts/AppLayout"
import ChartSection from "../sections/ChartSection/ChartSection"
import { useMutation, useQuery } from "@apollo/client"
import LoadingOverlay from "../../components/LoadingOverlay"
import { showErrorToast } from '../components/Toast';
import { GET_CURRENT_USER_SUBSCRIPTION_QUERY } from "../../graphql/query/subscription/getCurrentUserSubscription"
import { START_FREE_SUBSCRIPTION_MUTATION } from "../../graphql/mutations/subscription/startFreeSubscription"
import { useUserInfo } from "../../hooks/useUserInfo"
import { getGraphQLErrorMessage } from "../../utils/errorMessages";
import { useNavigate } from "react-router"
import { useEffect, useCallback, useState } from "react"
import { useSubscription } from "../../hooks/useSubscription"





const HomePage = () => {

  const navigate = useNavigate();
  const [hasTriedToActivateSubscription, setHasTriedToActivateSubscription] = useState(false);



  const [startFreeSubscription, { loading }] = useMutation(START_FREE_SUBSCRIPTION_MUTATION, {
    refetchQueries: [{ query: GET_CURRENT_USER_SUBSCRIPTION_QUERY }],
  });


  const { data: subscriptionData, loading: getCurrentUserSubscriptionLoading } = useQuery(GET_CURRENT_USER_SUBSCRIPTION_QUERY);
  const { data: userData, loading: userDataLoading } = useUserInfo();


  const isAdmin = userData?.GetUserInfo.IsAdmin

  const hasLoggedIn = userData?.GetUserInfo.LastLogin

  const { isFreeTrial, hasPremium } = useSubscription();




  const handleStartFreeSubscription = useCallback(async () => {
    try {
      setHasTriedToActivateSubscription(true);
      await startFreeSubscription({
        variables: {
          input: {
            rouletteTableId: "67fd3865f3b913ee91c31526",
          }
        }
      })
    } catch (error: unknown) {
      const errorMessage = getGraphQLErrorMessage(error);
      if (!errorMessage.includes("ya tiene una suscripción") &&
        !errorMessage.includes("subscription already exists")) {
        showErrorToast(errorMessage);
      }
    }
  }, [startFreeSubscription]);

  useEffect(() => {

    const shouldCreateSubscription = !isAdmin &&
      !subscriptionData?.GetCurrentUserSubscription &&
      !loading &&
      !getCurrentUserSubscriptionLoading &&
      !hasTriedToActivateSubscription &&
      userData?.GetUserInfo;


    if (shouldCreateSubscription) {
      handleStartFreeSubscription();
    }
  }, [isAdmin, subscriptionData, loading, getCurrentUserSubscriptionLoading, hasTriedToActivateSubscription, handleStartFreeSubscription, userData]);

  if (getCurrentUserSubscriptionLoading || userDataLoading) return <LoadingOverlay />



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

        <ChartSection
          subscriptionData={subscriptionData}
        // handleStartFreeSubscription={handleStartFreeSubscription}
        />
      </AppLayout>

    </>

  )
}

export default HomePage
