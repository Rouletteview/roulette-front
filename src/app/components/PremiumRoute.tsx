import React from 'react';
import { Navigate } from 'react-router';
import { useSubscription } from '../../hooks/useSubscription';
import LoadingOverlay from '../../components/LoadingOverlay';

interface PremiumRouteProps {
    children: React.ReactNode;
}

const PremiumRoute: React.FC<PremiumRouteProps> = ({ children }) => {
    const { canViewHistory, loading } = useSubscription();

    if (loading) {
        return <LoadingOverlay />;
    }

    if (!canViewHistory) {
        return <Navigate to="/home" replace />;
    }

    return <>{children}</>;
};

export default PremiumRoute;
