import { Box, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

interface FlashMessageProps {
   message: string;
   bgColor?: string
}

export const FlashMessage = ({ message, bgColor = "green.100" }: FlashMessageProps) => {

   return (
      <>
         <Box
            position="absolute"
            bgColor={bgColor}
            borderY="1px solid #111"
            borderRadius=".5rem"
            width="200px"
            height="70px"
            left="47rem"
            top=".5rem"
            display="flex"
            justifyContent="center"
            alignItems="center">
            <Text
               color="#111"
               fontSize=".8rem"
               textAlign="center"
            >
               {message}
            </Text>
         </Box>
      </>
   )
}