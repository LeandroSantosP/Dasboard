import React from "react";
import { Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { customScrollball } from "../../styles/hellpes";

interface CardProps {
   title: string;
   description: string;
   image: {
      src: string;
      alt: string;
   },
   handleAddToCard?: () => void;
   publishDate?: string
}

interface CardCustomProps {
   card: CardProps;
}

export const
   CardCustom = ({ card }: CardCustomProps) => {

      return (
         <Flex
            direction="column"
            p=".5rem"
            width="100%"
            minW="200px"
            borderRadius={4}
            maxH="300px"
            overflow="auto"
            css={customScrollball}
            bgColor="gray.300"
         >
            {card.image && <Image borderRadius={4} marginBottom={4} src={card.image.src} alt={card.image.alt} />}
            <Heading fontSize={"20px"} maxW={"100%"}>{card.title}</Heading>
            <Text flex="1" maxW={"100%"} fontSize={"12px"}>{card.description}</Text>
            <Text fontSize=".7rem" color="gray.600">{card.publishDate}</Text>
         </Flex >
      );
   }