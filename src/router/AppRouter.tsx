import { Route, Routes } from "react-router"
import LandingPage from "../pages/LandingPage"
import RegisterPage from "../pages/RegisterPage"



const AppRouter = () => {
  return (
   <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/registrarse" element={<RegisterPage />} />

   </Routes>
  )
}

export default AppRouter
