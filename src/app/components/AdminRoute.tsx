import React from 'react';
import { Navigate } from 'react-router';
import { useUserInfo } from '../../hooks/useUserInfo';
import { useAuthStore } from '../../stores/authStore';
import AccessDenied from './AccessDenied';
import LoadingOverlay from '../../components/LoadingOverlay';


interface AdminRouteProps {
    children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const { data: userInfo, loading } = useUserInfo();

    if (!isAuthenticated) {
        return <Navigate to="/iniciar-sesion" replace />;
    }

    if (loading) return <LoadingOverlay />;


    if (!userInfo?.GetUserInfo?.IsAdmin) {
        return <AccessDenied />;
    }


    return <>{children}</>;
};

export default AdminRoute; 