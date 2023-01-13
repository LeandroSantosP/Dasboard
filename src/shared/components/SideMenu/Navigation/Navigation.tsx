import { List, ListIcon as ListItem } from "@chakra-ui/react";
import { useSideBarContext } from "../../../context";
import { NavItem } from "../NavItem/NavItem";
import React from "react";
export const Navigation = () => {
   const { sidebarOptions } = useSideBarContext();

   return (
      <List display="flex" h="100%" w="100%" alignItems="center" flexDirection="column" overflow="auto">
         <NavItem data={sidebarOptions} />
      </List>
   );
}