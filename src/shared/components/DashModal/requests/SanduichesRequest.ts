import { SanduichesServices } from "../../../services/SanduicheServices/SanduicheServices";
import { handleSubmitProps } from "../../../services/typy";


export const requestSanduiches = async (data: handleSubmitProps) => {
   return SanduichesServices.create(data).then(result => {
      if (result instanceof Error) {
         return result.message;
      } else {
         return result;
      }
   })
}