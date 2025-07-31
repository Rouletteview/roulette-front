import { useUserInfo } from './useUserInfo';
import { useAuthStore } from '../stores/authStore';

export const useIsAdmin = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const { data: userInfo, loading } = useUserInfo();

    const isAdmin = userInfo?.GetUserInfo?.IsAdmin || false;

    return {
        isAdmin,
        loading,
        isAuthenticated
    };
}; 