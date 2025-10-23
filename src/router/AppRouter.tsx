import { Navigate, Route, Routes, useNavigate, } from "react-router";
import LandingPage from "../landing/pages/LandingPage";

import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import RegisterPage from "../landing/pages/RegisterPage";
import LoginPage from "../landing/pages/LoginPage";
import CheckEmailPage from "../landing/pages/CheckEmailPage";
import ResetPassword from "../landing/pages/ResetPassword";
import CheckEmailPasswordPage from "../landing/pages/CheckEmailPasswordPage";
import NewPasswordPage from "../landing/pages/NewPasswordPage";
import HomePage from "../app/pages/HomePage";
import NotFound from "../landing/pages/NotFound";
import HistoryPage from "../app/pages/HistoryPage";
import SubscriptionPage from '../app/pages/SubscriptionPage';
import UsersPage from '../app/pages/UsersPage';
import AdminRoute from '../app/components/AdminRoute';
import PremiumRoute from '../app/components/PremiumRoute';
import { useMutation } from "@apollo/client";
import { ACTIVATE_USER } from "../graphql/mutations/auth/activateUser";
import { getGraphQLErrorMessage } from "../utils/errorMessages";


const ActivateUserRedirect = () => {
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const navigate = useNavigate();
  const [ActivateUser] = useMutation(ACTIVATE_USER)


  useEffect(() => {
    if (token) {
      const activate = async () => {
        try {
          await ActivateUser({ variables: { user: { ValidationToken: token } } });
          navigate("/iniciar-sesion", {
            state: { message: "Email confirmado con éxito", ok: true },
          });
        } catch (error: unknown) {
          navigate("/iniciar-sesion", {
            state: { message: getGraphQLErrorMessage(error), ok: false },
          });
        }
      };
      activate();
    }
  }, [token, navigate, ActivateUser]);

  return null;
};

const AppRouter = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);


  return (

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/registrarse" element={<RegisterPage />} />

      <Route
        path="/iniciar-sesion"
        element={!isAuthenticated ? <LoginPage /> : <Navigate to='/home' />} />
      {/* página de mensaje para ir a confirmar correo */}
      <Route path="/confirmar-correo" element={<CheckEmailPage />} />
      <Route path="/recuperar-password" element={<ResetPassword />} />
      <Route path="/correo-enviado" element={<CheckEmailPasswordPage />} />
      <Route path="/resetPassword" element={<NewPasswordPage />} />
      <Route path="/subscription" element={<SubscriptionPage />} />

      <Route path="/activateUser" element={<ActivateUserRedirect />} />
      {/* App */}
      <Route
        path="/home"
        element={isAuthenticated ? <HomePage /> : <Navigate to="/iniciar-sesion" />}
      />
      <Route
        path="/historial"
        element={
          <PremiumRoute>
            <HistoryPage />
          </PremiumRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/usuarios"
        element={<AdminRoute><UsersPage /></AdminRoute>}
      />

      <Route path="/*" element={<NotFound />} />

    </Routes>


  );
};

export default AppRouter;
