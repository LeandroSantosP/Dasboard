import { Route, Routes } from "react-router-dom"
import { HomePage } from "../pages"

export const AppRoutes = () => {


   return (
      <Routes>
         <Route path="/home" element={<HomePage />} />
         <Route path="*" element={<HomePage />} />
      </Routes>
   )
} 