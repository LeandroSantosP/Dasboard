import { background, extendTheme } from '@chakra-ui/react'

const customTheme = {
   components: {
      Text: {
         variants: {
            subtitle: {
               color: "gray.500",
               fontWeight: "simebold",
               fontSize: "14xp"
            }
         }
      }
   }
};


export const theme = extendTheme(customTheme);