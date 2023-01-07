import { PizzasServices } from "../../../services/PizzasServices/PizzasServices"
import { handleSubmitProps } from "../../../services/typy"

export const requestPizza = async (data: handleSubmitProps) => {
   return PizzasServices.create(data).then(res => {
      if (res instanceof Error) {
         return res.message
      } else {
         return res;
      }
   })
}