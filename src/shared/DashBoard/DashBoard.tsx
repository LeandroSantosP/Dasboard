import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";

interface DashBoardProps {
   text: string;
   showModal?: boolean;
   textSearch?: string;
   handleChangeSearch?: (newValue: string) => void;
   handleOpenDashboard?: () => void;
}

export const DeahBoard = ({
   text = "Novo",
   showModal = false,
   textSearch,

   handleOpenDashboard,
   handleChangeSearch,

}: DashBoardProps) => {

   return (
      <Flex
         align="center"
         justifyContent="center"
         alignItems="center"
         gap={10}
      >
         <Input
            maxW={["sm", "md", "lg"]}
            border="1px solid #111"
            backgroundColor="#fff"
            placeholder="Pesquise por algo"
            focusBorderColor="#111"
            size="sm"
            margin="0 auto"
            value={textSearch}
            onChange={(e) => handleChangeSearch?.(e.target.value)}
         />
         {showModal && (
            <Button
               colorScheme='gray'
               fontSize={"10px"}
               onClick={handleOpenDashboard}>
               {text}
            </Button>
         )}
      </Flex>
   )
}