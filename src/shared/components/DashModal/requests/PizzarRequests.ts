import { PizzasServices } from "../../../services/PizzasServices/PizzasServices"
import { handleSubmitSimpleProps } from "../../../services/typy"

export const requestPizza = async (data: handleSubmitSimpleProps) => {
   return PizzasServices.create(data).then(res => {
      if (res instanceof Error) {
         return res.message
      } else {
         return res;
      }
   })
}