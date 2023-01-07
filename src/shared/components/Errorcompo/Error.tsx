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
         width="400px"
         height="100px"
         position="fixed"
         top="2%"
         left="35%"
         bgColor="yellow.100"
         border="1px solid #111"
         display="flex"
         gap="2rem"
         flexDirection="row"
         alignItems="center"
         justifyContent="center"
         zIndex="100"
         borderRadius=".5rem"
      >
         <Box transition=".3s"
            sx={{ cursor: "pointer", border: "1px solid #111", fontSize: "2rem", position: "relative", borderRadius: ".2rem", top: "-1.7rem", left: "22rem" }}
            _hover={{ bgColor: "#ffff", }}
            onClick={showErrorMessage}>
            <RxCross2 />
         </Box>
         <Text
            padding="1rem"
            fontSize="1.5rem"
            width="full"
            marginLeft="1rem"
            color="#111"
         >
            {error}
         </Text>
      </Box >
   )
}
