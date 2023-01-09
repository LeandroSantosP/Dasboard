import React from 'react'
import { Box, Button, position, Text } from '@chakra-ui/react'
import { RxCross2 } from 'react-icons/rx'

interface ErrorComponentProps {
   error: string;
   showErrorMessage?: () => void;
}

export const ErroComponent = ({ error, showErrorMessage }: ErrorComponentProps) => {


   return (
      <Box
         width="130px"
         height="50px"
         position="fixed"
         top="2%"
         textAlign="center"
         left="80%"
         bgColor="blackAlpha.300"
         border="1px solid #111"
         zIndex="100"
         borderRadius=".5rem"
      >
         <Box transition=".3s"
            sx={{ cursor: "pointer", borderRadius: ".2rem", marginLeft: "100px" }}
            _hover={{ bgColor: "#blackAlpha.300", }}
            onClick={showErrorMessage}>
            <RxCross2 />
         </Box>
         <Text
            fontSize=".8rem"
            color="#111"
         >
            {error}
         </Text>
      </Box >
   )
}
