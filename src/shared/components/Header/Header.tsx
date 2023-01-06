import { Flex, Heading, Text } from "@chakra-ui/react";
import { CiBurger } from 'react-icons/ci'

export const Header = () => {

   return (
      <Flex p="20px"
         align="center"
         gap="1rem"
         fontSize="16px"
         bgColor="gray.300"
      >
         <Heading fontSize="4rem">
            <CiBurger />
         </Heading>
         <Flex direction="column">
            <Text fontSize=".7rem">E-cormmece name!</Text>
            <Text fontWeight="bold">O melho e-comerce que voce irar conhecer!</Text>
         </Flex>
      </Flex>
   );
}