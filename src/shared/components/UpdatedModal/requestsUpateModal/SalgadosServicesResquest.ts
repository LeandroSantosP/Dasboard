import { useEffect, useState } from "react";
import { PizzasServices } from "../../../services/PizzasServices/PizzasServices";
import { SalgadosServices } from "../../../services/SalgadosServices/SalgadosServics";
import { SanduichesServices } from "../../../services/SanduicheServices/SanduicheServices";


export const resquestGetAll = (id: number, currengeCategory: string | undefined) => {
   const [data, setData] = useState<any>();
   const [error, setError] = useState('');

   useEffect(() => {
      switch (currengeCategory) {
         case 'salgados':
            SalgadosServices.getById(id).then(result => {
               if (result instanceof Error) {
                  setError(result.message);
               } else {
                  setData(result);
               }
            })
            break;

         case 'pizzas':
            PizzasServices.getById(id).then(result => {
               if (result instanceof Error) {
                  setError(result.message);
               } else {
                  setData(result);
               }
            });
            break;

         case 'sanduiches':
            SanduichesServices.getById(id).then(result => {
               if (result instanceof Error) {
                  setError(result.message);
               } else {
                  setData(result);
               }
            });
            break

         default: 'Nothing found';
      }
   }, [id]);

   return {
      data,
      error
   }
}