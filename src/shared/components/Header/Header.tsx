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
import {
   GiHamburgerMenu
} from 'react-icons/gi'
import { BiLogOut } from 'react-icons/bi'
import { Navigation } from "../SideMenu/Navigation/Navigation";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
   const { logout } = useAuthContext();
   const navigation = useNavigate()


   return (
      <Flex p="20px"
         align="center"
         gap="1rem"
         fontSize="16px"
         bgColor="gray.300"
      >
         <Heading fontSize="4rem">
            <CiBurger onClick={() => navigation("/")} cursor="pointer" />
         </Heading>
         <Flex
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            direction="column"
            flex="1"
         // display={["none", "block"]}
         >
            <Text
               overflow="hidden"
               whiteSpace="nowrap"
               textOverflow="ellipsis"
               fontSize=".7rem">E-cormmece name!</Text>
            <Text
               overflow="hidden"
               whiteSpace="nowrap"
               textOverflow="ellipsis"
               fontWeight="bold">O melho e-comerce que voce irar conhecer!</Text>
         </Flex>
         <Box
            onClick={logout}
            display={["none", "none", "flex"]}
            border="1px solid #111"
            justifyContent="space-evenly"
            alignItems="center"
            borderRadius=".3rem"
            padding=".5rem 1rem"
            cursor="pointer"
            transition=".3s"
            title="Sair"
            _hover={{ backgroundColor: "gray.200" }}
         >
            <Text fontSize="1rem" padding="0px">Logout</Text>
            <BiLogOut />

         </Box>

         <Flex display={["block", "block", "none"]} marginRight="15px">
            <Menu>
               <MenuButton as={Button}>
                  <GiHamburgerMenu />
               </MenuButton>

               <MenuList minH='38px'>
                  <Navigation />
                  <Box
                     onClick={logout}
                     border={["transparent", "transparent", "1px solid #111"]}
                     display="flex"
                     justifyContent="space-evenly"
                     alignItems="center"
                     borderRadius=".3rem"
                     maxW="180px"
                     marginTop="1rem"
                     padding=".3rem"
                     backgroundColor="gray.300"
                     cursor="pointer"
                     transition=".3s"
                     title="Sair"
                     _hover={{ backgroundColor: ["#111", "#111", "gray.200"], color: "#fff" }}
                  >

                     <Box>
                        <Text>Sair</Text>
                     </Box>

                  </Box>
               </MenuList>

            </Menu>
         </Flex>
      </Flex >
   );
}