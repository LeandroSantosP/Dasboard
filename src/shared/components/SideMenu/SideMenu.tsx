import React, { useState } from 'react';
import {
   Menu,
   Flex,
   HStack,
   IconButton,
   MenuButton,
   Button,
   MenuList,
   MenuItem,
} from '@chakra-ui/react'
import { MdMenu } from 'react-icons/md'
import { LogoSearch } from './LogoSearch/Logosearch';
import { Navigation } from './Navigation/Navigation';

interface SideMenuProps {
   children?: React.ReactNode
}

export const SideMenu: React.FC<SideMenuProps> = ({ children }) => {


   return (
      <HStack
         as="aside"
         w="full"
         maxW="100%"
         h="100vh"
         p={4}
         borderRadius="4px"
      >
         <Flex
            as="main"
            width={[200, 200, 400]}
            h="full"
            bg="gray.100"
            display={["none", "none", "block"]}
            direction="column"
            borderRadius="4px"
         >
            <Menu>
               <LogoSearch />
               <Navigation />
            </Menu>
         </Flex>

         <Flex w="100%" h="100%">
            {children}
         </Flex>
      </HStack>
   );
}