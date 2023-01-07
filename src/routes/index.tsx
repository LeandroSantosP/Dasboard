import { useEffect } from "react";
import { Route, Routes } from "react-router-dom"
import { HomePage } from "../pages"
import { useSideBarContext } from "../shared/context";

import { MdOutlineDashboard } from 'react-icons/md'

export const AppRoutes = () => {
   const { setSideBarOptions } = useSideBarContext();
   useEffect(() => {
      setSideBarOptions([
         {
            label: "Home",
            path: "/home",
            type: "menu",
            icon: <MdOutlineDashboard />
         }
      ])
   }, []);

   return (
      <Routes>
         <Route path="/home" element={<HomePage />} />
         <Route path="*" element={<HomePage />} />
      </Routes>
   )
} 