import { List, ListIcon as ListItem } from "@chakra-ui/react";
import React from "react";
import { NavItem } from "../NavItem/NavItem";
import { } from 'react-icons/ai'

import { AiFillThunderbolt, AiOutlineSearch } from 'react-icons/ai'

const item = [
   {
      type: "link",
      label: "Home",
      path: "/home",
      icon: <AiOutlineSearch />
   },
   {
      type: "header",
      label: "pagina 2t",
      path: "/",
      icon: <AiOutlineSearch />
   }
]

export const Navigation = () => {
   return (
      <List display="flex" h="100%" w="100%" alignItems="center" flexDirection="column" overflow="auto">
         <NavItem data={item} />
      </List>
   );
}