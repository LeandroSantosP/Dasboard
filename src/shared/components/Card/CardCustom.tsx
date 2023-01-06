import React from "react";
import { Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";

interface CardProps {
   title: string;
   description: string;
   image: {
      src: string;
      alt: string;
   }
}

interface CardCustomProps {
   card: CardProps;
}

export const
   CardCustom = ({ card }: CardCustomProps) => {

      return (
         <Flex
            direction="column"
            p="1rem"
            width="100%"
            maxW="250px"
            objectFit="cover"
            borderRadius={4}
            bgColor="gray.300"
            maxH={"400px"}
         >
            {card.image && <Image borderRadius={4} marginBottom={4} src={card.image.src} alt={card.image.alt} />}
            <VStack
            >
               <Heading fontSize={"20px"} maxW={"100%"}>{card.title}</Heading>
               <Text maxW={"100%"} fontSize={"14px"}>{card.description}</Text>
            </VStack >
         </Flex >
      );
   }