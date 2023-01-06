import { Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";

import { AiFillThunderbolt, AiOutlineSearch } from 'react-icons/ai'

export const LogoSearch = () => {
   return (
      <Flex w="full" alignContent="center" marginTop={2} justifyContent="space-evenly" h={50} align="center" direction="row" gap={4} >
         <Box display="flex" gap={2} alignItems="center">
            <Icon as={AiFillThunderbolt} fontSize={30} />
            <Text fontWeight="bold" fontSize={16}>leandrosantos</Text>
            <IconButton aria-label="Search" variant="ghost" icon={<AiOutlineSearch />} />
         </Box>
      </Flex>
   )
}