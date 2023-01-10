import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { AuthServices } from "../services/LoginAndRegister";

interface LoginProviderProps {
   children: React.ReactNode;

}

interface LoginContextProps {
   login: (email: string, password: string) => Promise<string | void>;
   logout?: () => void;
   isAutorized?: boolean;
}

export const useLoginContext = () => {
   return useContext(LoginContext);
}

const LoginContext = createContext({} as LoginContextProps)

export const LoginProvider = ({ children }: LoginProviderProps) => {
   const [IsAutorized, setIsAutorizes] = useState(false);

   const handleLogin = useCallback(async (email: string, password: string) => {
      const result = await AuthServices.LoginServices(email, password);

      if (result instanceof Error) {
         setIsAutorizes(false)
         return result.message;
      } else {
         setIsAutorizes(true);
         localStorage.setItem("access_token", JSON.stringify(result));
         return result;
      }

   }, []);

   useEffect(() => {
      const access_token = localStorage.getItem("access_token");

      if (access_token) {
         AuthServices.Auth(JSON.parse(access_token)).then(res => {
            if (res === true)
               setIsAutorizes(true);
         })
      } else {
         setIsAutorizes(false);
      }

   }, []);


   const handleLogout = useCallback(() => {
      localStorage.removeItem("access_token");
      setIsAutorizes(false);
   }, [])

   return (
      <LoginContext.Provider value={{ login: handleLogin, isAutorized: IsAutorized, logout: handleLogout }}>
         {children}
      </LoginContext.Provider>
   )
}