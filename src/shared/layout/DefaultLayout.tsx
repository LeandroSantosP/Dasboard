import { Box, Button, Flex, Grid, Heading } from "@chakra-ui/react"
import React, { useState } from "react"

interface LayoutDefault {
   children: React.ReactNode;
   title: string;

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
            bgColor="green.200"
         >
            <Heading flex="1" size="3xl" fontSize="2rem">{title}</Heading>
            {toolbar && (
               (toolbar)
            )}
         </Box>


         <Flex direction="column" gap={6}>
            {children}
         </Flex>
      </Box >
   )
}