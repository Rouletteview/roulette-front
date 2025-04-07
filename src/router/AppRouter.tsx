import { Navigate, Route, Routes, useNavigate, } from "react-router";
import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import ResetPassword from "../pages/ResetPassword";
import NewPasswordPage from "../pages/NewPasswordPage";
import CheckEmailPasswordPage from "../pages/CheckEmailPasswordPage";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

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

      <Route
        path="/home"
        element={isAuthenticated ? <HomePage /> : <Navigate to="/iniciar-sesion" />}
      />

      <Route path="/*" element={<NotFound />} />

    </Routes>
   
   
  );
};

export default AppRouter;
