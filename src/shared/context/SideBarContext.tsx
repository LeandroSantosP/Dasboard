import React, { useCallback, useContext, useMemo, useState } from "react";
import { createContext } from "react";

interface SidBarOptions {
   type: string;
   label: string;
   path: string,
   icon: React.ReactNode
}

interface SideBarContextProps {
   isSideBarOpen: boolean;
   setIsSideBarOpen: () => void
   sidebarOptions: SidBarOptions[];
   setSideBarOptions: (newOptions: SidBarOptions[]) => void;
};

interface SideBarProviderProps {
   children: React.ReactNode
};

export const useSideBarContext = () => {
   const result = useContext(SideBarContext);
   return result;
}

const SideBarContext = createContext({} as SideBarContextProps);

export const SideBarProvider = ({ children }: SideBarProviderProps) => {
   const [sidebarOptions, setSideBarOptions] = useState<SidBarOptions[]>([]);
   const [isSideBarOpen, setIsSideBarOpen] = useState(false);

   const handleSetSideBarOptions = useCallback((newSideBarOptions: SidBarOptions[]) => {
      setSideBarOptions(newSideBarOptions);
   }, []);

   const handleOpenSideBar = useCallback(() => {
      setIsSideBarOpen(toggleOldValue => !toggleOldValue)
   }, [])

   return (
      <SideBarContext.Provider value={{
         setSideBarOptions: handleSetSideBarOptions,
         sidebarOptions, isSideBarOpen,
         setIsSideBarOpen: handleOpenSideBar
      }}>
         {children}
      </SideBarContext.Provider>
   );
}