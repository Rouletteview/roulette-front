import { Route, Routes } from "react-router"
import LandingPage from "../pages/LandingPage"
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage"
import CheckEmailPage from "../pages/CheckEmailPage"
import ResetPassword from "../pages/ResetPassword"
import NewPasswordPage from "../pages/NewPasswordPage"



const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/registrarse" element={<RegisterPage />} />
      <Route path="/iniciar-sesion" element={<LoginPage />} />


      <Route path="/activateUser" element={<CheckEmailPage />} />
      <Route path="/recuperar-contraseña" element={<ResetPassword />} />
      <Route path="/resetPassword" element={<NewPasswordPage />} />


    </Routes>
  )
}

export default AppRouter
