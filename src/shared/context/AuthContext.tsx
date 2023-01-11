import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { address, AuthServices, RegisterServicesProps } from "../services/LoginAndRegister";

interface LoginProviderProps {
   children: React.ReactNode;
};

interface LoginContextProps {
   login: (email: string, password: string) => Promise<RegisterServicesProps[] | string>;
   logout: () => void;
   isAutorized: boolean;
   userData: RegisterServicesProps[] | null;


   register?: (dados: RegisterServicesProps) => Promise<any>;
}

export const useAuthContext = () => {
   return useContext(AuthContext);
}

const AuthContext = createContext({} as LoginContextProps)

export const AuthProvider = ({ children }: LoginProviderProps) => {

   const [IsAutorized, setIsAutorizes] = useState(false);
   const [userData, setUserData] = useState<RegisterServicesProps[] | null>(null);

   const handleLogin = useCallback(async (email: string, password: string) => {
      const result = await AuthServices.LoginServices(email, password);

      if (result instanceof Error) {
         setIsAutorizes(false)
         return result.message;
      } else {
         localStorage.setItem("access_token", JSON.stringify(result[0].access_token));
         setIsAutorizes(true);
         setUserData(result)
         return result;
      }
   }, []);

   useEffect(() => {
      const access_token = localStorage.getItem("access_token");

      if (access_token) {
         AuthServices.Auth(JSON.parse(access_token)).then(res => {
            if (res) {
               setUserData(res)
               setIsAutorizes(true);
            }
         })
         setIsAutorizes(false);
      }
      setIsAutorizes(false);
   }, []);

   const handleLogout = useCallback(() => {
      localStorage.removeItem("access_token");
      setIsAutorizes(false);
      setUserData(null);
   }, []);


   //Register Camp;


   interface RegisterServicesPropss {
      email: string;
      password: string;
      telephone: number;
      address: address;
   };


   const handleRegister = useCallback(async (dados: RegisterServicesProps) => {

      const FinalResult = await AuthServices.getAllUserInfos(dados.email).then(result => {
         let allUserResgisteted: any;

         if (result instanceof Error) {
            return;
         } else {
            allUserResgisteted = result.find(element => element.email === dados.email);
         }

         if (allUserResgisteted != undefined && allUserResgisteted != null) {
            return {
               resultMessage: "Not Create account"
            }
         } else {
            AuthServices.RegisterServices(dados);
            return {
               resultMessage: "Create Account"
            }
         }
      });

      return FinalResult;

   }, []);

   return (
      <AuthContext.Provider value={{
         login: handleLogin,
         isAutorized: IsAutorized,
         logout: handleLogout,
         userData: userData,
         register: handleRegister
      }}>
         {children}
      </AuthContext.Provider>
   )
}