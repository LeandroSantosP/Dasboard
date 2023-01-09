import React, { useState } from "react";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { customScrollball } from "../../styles/hellpes";
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs'
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
   handledelete?: () => void | string;
};

export const CardCustom = ({ card, handledelete }: CardCustomProps) => {
   const { description, image, title, publishDate, id } = card;
   const [showEditModal, setShowEditModal] = useState(false);

   const handleOpenAndCloseUpdateCard = () => {
      setShowEditModal(old => !old);
   }

   return (
      <>
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
               onClick={() => handleOpenAndCloseUpdateCard()}
               display="flex"
               justifyContent="center"
               height="30px"
               width="30px"
               flexDirection="column"
               backgroundColor="whiteAlpha.400"
               borderRadius=".3rem"
               fontSize={"sm"}
               position="absolute"
               left="17.5rem"
               cursor="pointer"
               transition=".3s"
               _hover={{
                  backgroundColor: "whiteAlpha.600",
               }}
            >
               <AiFillEdit />
            </Flex>
            <Flex
               onClick={handledelete}
               display="flex"
               justifyContent="center"
               flexDirection="column"
               alignItems="center"
               height="30px"
               width="30px"
               backgroundColor="whiteAlpha.400"
               borderRadius=".3rem"
               fontSize={"sm"}
               position="absolute"
               left="17.5rem"
               top="3rem"
               gap={".5rem"}
               cursor="pointer"
               transition=".3s"
               _hover={{
                  backgroundColor: "whiteAlpha.600",
               }}
            >
               <BsFillTrashFill />
            </Flex>
            <Box position="absolute" bgColor={card.available === 'Disponinvel' ? "green.100" : 'red.200'} p="0.1rem" borderRadius=".2rem" left="15px" top="15px">
               {card.available}
            </Box>
            <Text fontSize=".7rem" color="gray.600">{publishDate}</Text>

         </Flex>
      </>
   );
}