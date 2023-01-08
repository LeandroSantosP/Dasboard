import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { CiBurger } from 'react-icons/ci'
import {
   Menu,
   HStack,
   IconButton,
   MenuButton,
   Button,
   MenuList,
   MenuItem,
} from '@chakra-ui/react'
import { Navigation } from "../SideMenu/Navigation/Navigation";
import { DashBoard } from "../DashModal/DashModal";
import { useState } from "react";

export const Header = () => {

   return (
      <Flex p="20px"
         align="center"
         gap="1rem"
         fontSize="16px"
         bgColor="gray.300"
         position="relative"
      >
         <Heading fontSize="4rem">
            <CiBurger />
         </Heading>
         <Flex direction="column" flex="1">
            <Text fontSize=".7rem">E-cormmece name!</Text>
            <Text fontWeight="bold">O melho e-comerce que voce irar conhecer!</Text>
         </Flex>
         <Flex position="absolute" left="20rem" display={["block", "none", "none"]}>

            <Menu>
               <MenuButton as={Button} rightIcon={<p>d</p>}>
                  Actions
               </MenuButton>

               <MenuList minH='38px'>
                  <Navigation />
               </MenuList>

            </Menu>
         </Flex>
      </Flex>
   );
}