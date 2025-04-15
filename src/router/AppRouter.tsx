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

const ActivateUserRedirect = () => {
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/iniciar-sesion", {
        state: { message: "Email confirmado con éxito", ok: true },
      });
    }
  }, [token, navigate]);

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

      <Route path="/activateUser" element={<ActivateUserRedirect />} />
      {/* App */}
      <Route
        path="/home"
        element={isAuthenticated ? <HomePage /> : <Navigate to="/iniciar-sesion" />}
      />
      <Route path="/historial" element={<HistoryPage />} />

      <Route path="/*" element={<NotFound />} />

    </Routes>


  );
};

export default AppRouter;
