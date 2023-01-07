import {
   FormControl,
   FormLabel,
   FormHelperText,
   Input,
   Box,
   VStack,
   Button,
} from '@chakra-ui/react'
import { RxCross2 } from 'react-icons/rx'

interface DashBoardProps {
   showDasBoard?: () => void;
}


export const DashBoard = ({ showDasBoard }: DashBoardProps) => {


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
            position="relative"
         >
            <Button onClick={showDasBoard} position="absolute" top=".7rem" right="1rem"><RxCross2 /></Button>
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