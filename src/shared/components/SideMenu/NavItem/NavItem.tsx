import { Link as LinkChakra, Box, Text } from '@chakra-ui/react'

export interface NavigationItem {
   type: string;
   label: string;
   path: string,
   icon: React.ReactNode
}

interface NavItemProps {
   data: NavigationItem[];
}

export const NavItem = (navOptions: NavItemProps) => {

   return (
      <Box display="flex" flexDirection="column" gap={5} w="full" mt={3}>
         {navOptions && navOptions.data.map(item => (
            <LinkChakra
               key={item.label}
               display="flex"
               alignItems="center"
               justifyContent="flex-start"
               bg="gray.300"
               marginX={5}
               borderRadius={5}
               padding={[2, 7, 7]}
               fontSize={15}
               transition=".4s"
               gap={5}
               _hover={{
                  background: "white",
                  color: "#111   ",
               }}
               href={item.path}>
               <Text fontSize={20}>
                  {item.icon}
               </Text>

               <Text>
                  {item.label}
               </Text>
            </LinkChakra>
         ))
         }
      </Box >
   )
}