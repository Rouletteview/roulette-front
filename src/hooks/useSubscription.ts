import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER_SUBSCRIPTION_QUERY } from "../graphql/query/subscription/getCurrentUserSubscription";
import { useUserInfo } from "./useUserInfo";

export const useSubscription = () => {
    const { data: subscriptionData, loading: subscriptionLoading } = useQuery(GET_CURRENT_USER_SUBSCRIPTION_QUERY);
    const { data: userData, loading: userLoading } = useUserInfo();

    const subscription = subscriptionData?.GetCurrentUserSubscription;
    const isAdmin = userData?.GetUserInfo?.IsAdmin || false;


    const hasPremium = subscription?.Payments && subscription.Payments.length > 0 &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        subscription.Payments.some((payment: any) => payment.Status === 'Approved');

 
    const isFreeTrial = subscription?.FreeTrial ||
        (subscription?.Payments && subscription.Payments.length === 0);

 
    const canBet = hasPremium || isAdmin;

    
    const canViewHistory = hasPremium || isAdmin;

    
    const canAccessMultipleTables = hasPremium || isAdmin;

    return {
        subscription,
        isAdmin,
        hasPremium,
        isFreeTrial,
        canBet,
        canViewHistory,
        canAccessMultipleTables,
        loading: subscriptionLoading || userLoading
    };
};
