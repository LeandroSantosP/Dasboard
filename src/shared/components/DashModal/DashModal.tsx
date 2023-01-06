import {
   FormControl,
   FormLabel,
   FormErrorMessage,
   FormHelperText,
   Input,
   Box,
   VStack,
} from '@chakra-ui/react'

export const DashBoard = () => {
   return (
      <Box
         display="flex"
         flexDirection="column"
         position="fixed"
         width="100vw"
         top="0px"
         left="0px"
         height="100vh"
         alignItems="center"
         bgColor="rgba(0, 0, 0, .4)"
         z-index="1000"
         padding="1rem">

         <VStack
            borderRadius="1rem"
            p="2rem"
            bgColor="#fff"
            width="600px"
            height="600px"
         >

            <FormControl>
               <FormLabel>Email address</FormLabel>
               <Input type='email' />
               <FormHelperText>We'll never share your email.</FormHelperText>

               <FormLabel>Email address</FormLabel>
               <Input type='email' />
               <FormHelperText>We'll never share your email.</FormHelperText>

               <FormLabel>Email address</FormLabel>
               <Input type='email' />
               <FormHelperText>We'll never share your email.</FormHelperText>

               <FormLabel>Email address</FormLabel>
               <Input type='email' />
               <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
         </VStack>
      </Box >
   );
}