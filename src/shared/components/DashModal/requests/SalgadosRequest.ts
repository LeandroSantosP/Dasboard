import { SalgadosServices } from "../../../services/SalgadosServices/SalgadosServics"
import { handleSubmitProps } from "../../../services/typy";


export const requestSalgados = async (dados: handleSubmitProps) => {
   return SalgadosServices.create(dados).then(result => {
      if (result instanceof Error) {
         return result.message;
      } else {
         return result;
      }
   })
}