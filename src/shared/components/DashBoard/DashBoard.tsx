import { border, Box, Button, Flex, Input } from "@chakra-ui/react";

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
            placeholder="Pesquise por algo"
            focusBorderColor="#111"
            outline="none"
            variant="solid"
            size="md"
            value={textSearch}
            onChange={(e) => handleChangeSearch?.(e.target.value)}
         />
         {showModal && (
            <Button
               size="md"
               fontSize="1rem"
               variant="solid"
               transition=".4s"
               onClick={handleOpenDashboard}>
               {text}
            </Button>
         )}
      </Flex>
   )
}