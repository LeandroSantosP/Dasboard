import React, { useState } from "react";
import { Box, Button, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { customScrollball } from "../../styles/hellpes";
import { AiFillEdit } from 'react-icons/ai'
import { UpdataModal } from "../UpdatedModal/UpdateModal";

interface CardProps {
   id: number
   title: string;
   description: string;
   image: {
      src: string;
      alt: string;
   },
   handleAddToCard?: () => void;
   publishDate?: string,
   available?: string
}

interface CardCustomProps {
   card: CardProps;
}

export const CardCustom = ({ card }: CardCustomProps) => {
   const { description, image, title, publishDate, id } = card;
   const [showEditModal, setShowEditModal] = useState(false)
   const handleOpenAndCloseUpdateCard = () => {
      setShowEditModal(old => !old);
   }

   return (
      <Flex
         direction="column"
         borderRadius={4}
         p=".5rem"
         width="100%"
         maxW="320px"
         height="350px"
         overflow="auto"
         css={customScrollball}
         bgColor="gray.300"
         position="relative"
      >
         {showEditModal && <UpdataModal id={id} handleUpdateCard={handleOpenAndCloseUpdateCard} />}
         {image && <Image borderRadius={4} marginBottom={4} src={image.src} alt={image.alt} />}
         <Heading fontSize={"20px"} maxW={"100%"}>{title}</Heading>
         <Text flex="1" maxW={"100%"} fontSize={"12px"}>{description}</Text>
         <Flex
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            height="40px"
            width="40px"
            backgroundColor="whiteAlpha.400"
            p="7px"
            borderRadius=".3rem"
            fontSize={["1xl", "2xl"]}
            position="absolute"
            left="16.5rem"
            gap={".5rem"}
            cursor="pointer"
            transition=".3s"
            _hover={{
               backgroundColor: "whiteAlpha.600",
            }}
         >
            <AiFillEdit onClick={handleOpenAndCloseUpdateCard} />
         </Flex>
         <Box position="absolute" bgColor={card.available === 'Disponinvel' ? "green.100" : 'red.200'} p="0.1rem" borderRadius=".2rem" left="15px" top="15px">
            {card.available}
         </Box>
         <Text fontSize=".7rem" color="gray.600">{publishDate}</Text>

      </Flex >
   );
}