import { Route, Routes } from "react-router"
import LandingPage from "../pages/LandingPage"
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage"
import CheckEmailPage from "../pages/CheckEmailPage"



const AppRouter = () => {
  return (
   <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/registrarse" element={<RegisterPage />} />
      <Route path="/iniciar-sesion" element={<LoginPage />} />


      <Route path="/confirmacion-correo" element={<CheckEmailPage/>} />


   </Routes>
  )
}

export default AppRouter
