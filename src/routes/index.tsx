import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom"
import { useSideBarContext } from "../shared/context";
import { CiPizza } from 'react-icons/ci'
import { MdFastfood } from 'react-icons/md'
import { MdOutlineDashboard } from 'react-icons/md'
import { CategoryOne, LoginAuth } from "../pages/";
import { useAuthContext } from "../shared/context/AuthContext";

export const AppRoutes = () => {
   const { setSideBarOptions } = useSideBarContext();

   const PrivateRoute = (Item: React.FC) => {
      const { isAutorized } = useAuthContext()
      return isAutorized ? <Item /> : <LoginAuth />
   }
   useEffect(() => {
      setSideBarOptions([
         {
            label: "Salgados",
            path: "/category/salgados",
            type: "menu",
            icon: <MdOutlineDashboard />
         },
         {
            label: "Pizzas",
            path: "/category/pizzas",
            type: "menu",
            icon: <CiPizza />
         },
         {
            label: "Sanduiches",
            path: "/category/sanduiches",
            type: "menu",
            icon: <MdFastfood />
         }
      ])
   }, []);

   return (
      <Routes>
         <Route path="/category/:id" element={PrivateRoute(CategoryOne)} />
         <Route path="*" element={PrivateRoute(CategoryOne)} />
      </Routes>
   )
} 