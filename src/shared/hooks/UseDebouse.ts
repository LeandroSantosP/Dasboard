import { useCallback, useRef } from "react"

export const useDebouse = (deley = 300, notDelayInFrisTime = true) => {
   const deboucing = useRef<any>();
   const isFristTime = useRef<boolean>(notDelayInFrisTime);

   const debouse = useCallback((func: () => void) => {
      if (isFristTime.current) {
         isFristTime.current = false;
         func()
      } else {
         if (deboucing.current) {
            clearTimeout(deboucing.current);
         }
         deboucing.current = setTimeout(() => func(), deley);
      }

   }, [deley])

   return { debouse };
}