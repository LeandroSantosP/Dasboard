import { Box, Button } from "@chakra-ui/react";

interface DashBoardProps {
   text: string;
   handleOpenDashboard?: () => void;
}

export const DeahBoard = ({ text = "Novo", handleOpenDashboard }: DashBoardProps) => {

   return <Button
      colorScheme='gray'
      fontSize={10}
      onClick={handleOpenDashboard}>{text}</Button>
}