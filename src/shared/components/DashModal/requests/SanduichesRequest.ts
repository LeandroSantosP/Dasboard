import { SanduichesServices } from "../../../services/SanduicheServices/SanduicheServices";
import { handleSubmitSimpleProps } from "../../../services/typy";


export const requestSanduiches = async (data: handleSubmitSimpleProps) => {
   return SanduichesServices.create(data).then(result => {
      if (result instanceof Error) {
         return result.message;
      } else {
         return result;
      }
   })
}