import { SalgadosServices } from "../../../services/SalgadosServices/SalgadosServics"
import { handleSubmitSimpleProps } from "../../../services/typy";


export const requestSalgados = async (dados: handleSubmitSimpleProps) => {
   return SalgadosServices.create(dados).then(result => {
      if (result instanceof Error) {
         return result.message;
      } else {
         return result;
      }
   })
}