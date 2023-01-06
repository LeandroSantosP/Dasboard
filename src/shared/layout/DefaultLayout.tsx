import { Box, Button, Grid, Heading } from "@chakra-ui/react"
import React from "react"

interface LayoutDefault {
   children: React.ReactNode;
   title: string;
   toolbar?: React.ReactNode;
}
export const LayoutDefault = ({ children, title, toolbar }: LayoutDefault) => {

   return (
      <Box display="flex" flexDirection="column" height="100%" w="full">
         <Box
            display="flex"
            alignItems="center"
            gap={1}
            p={4}
            borderRadius={3}
            marginBottom={30} bgColor="red.200" w="full">
            <Heading flex="1" size="3xl" fontSize="2rem">{title}</Heading>
            {toolbar && (
               (toolbar)
            )}
         </Box>


         <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            {children}
         </Grid>
      </Box >
   )
}