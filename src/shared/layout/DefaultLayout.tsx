import { Box, Button, Flex, Grid, Heading } from "@chakra-ui/react"
import React, { useState } from "react"

interface LayoutDefault {
   children: React.ReactNode;
   title: string | undefined;

   toolbar?: React.ReactNode;
}
export const LayoutDefault = ({ children, title, toolbar }: LayoutDefault) => {
   return (
      <Box display="flex" flexDirection="column" height="100%" w="full" >
         <Box
            display="flex"
            alignItems="center"
            p={4}
            borderRadius={3}
            marginBottom={30}
            width="full"
            bgColor="green.200"
         >
            <Heading flex="1" marginRight="1rem" fontSize={["10px", "16px", "20px"]} sx={{}}>{title?.toUpperCase()}</Heading>
            {toolbar && (
               (toolbar)
            )}
         </Box>


         <Flex direction="column" width="full">
            {children}
         </Flex>
      </Box >
   )
}