

import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { customScrollball } from '../../styles/hellpes';
import { CustomCardProps } from '../Card/CardCustom';


interface HomeCardProps {
   card: CustomCardProps;
}

export const HomeCard = ({ card }: HomeCardProps) => {

   return (
      <Box css={customScrollball} maxW="290px" maxH="350px" overflow="auto" p="5px" bgColor="#111" borderRadius="6px">
         <Image maxH="180px" borderRadius="6px" src={card.image.src} />
         <Box>
            <Heading
               size="md"
               color="#006400"
               paddingY=".3rem"
            >{card.title}</Heading>
            <Text

               minH="350px"
               flex="1"
               fontSize="1rem"
               color="whiteAlpha.600"
            >
               {card.description}
            </Text>
         </Box>
      </Box>
   )
}