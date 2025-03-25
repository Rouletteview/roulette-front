import { Navigate, Route, Routes } from "react-router";
import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import ResetPassword from "../pages/ResetPassword";
import NewPasswordPage from "../pages/NewPasswordPage";
import CheckEmailPasswordPage from "../pages/CheckEmailPasswordPage";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  const isAuthenticated = localStorage.getItem('token');
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/registrarse" element={<RegisterPage />} />
      <Route path="/iniciar-sesion" element={<LoginPage />} />
      <Route path="/confirmar-correo" element={<CheckEmailPage />} />
      <Route path="/recuperar-password" element={<ResetPassword />} />
      <Route path="/correo-enviado" element={<CheckEmailPasswordPage />} />
      <Route path="/resetPassword" element={<NewPasswordPage />} />


      <Route
        path="/home"
        element={isAuthenticated ? <HomePage /> : <Navigate to="/iniciar-sesion" />}
      />

      <Route path="/*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRouter;
