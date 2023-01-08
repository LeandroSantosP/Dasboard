import { Box, Button, Heading, Progress, VStack } from "@chakra-ui/react"
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web"
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { PizzasServices } from "../../services/PizzasServices/PizzasServices";
import { SalgadosServices } from "../../services/SalgadosServices/SalgadosServics";
import { SanduichesServices } from "../../services/SanduicheServices/SanduicheServices";
import { VInput } from "../Forms"
import { VSelect } from "../Forms/";
import { VTextArea } from "../Forms/";
import { resquestGetAll } from "./requestsUpateModal/SalgadosServicesResquest";

interface UpdateModalProps {
   id: number;
   handleUpdateCard: () => void;
}

export const UpdataModal = ({ handleUpdateCard, id }: UpdateModalProps) => {
   const [newData, setNewData] = useState();
   const formRef = useRef<FormHandles>(null);
   const { id: categoryId } = useParams();

   const oldValue = resquestGetAll(id, categoryId);
   console.log(oldValue);

   const handleSubmit = (data: any) => {
      switch (categoryId) {
         case 'salgados':
            SalgadosServices.updatdById(id, data).then(res => console.log(res));
            break;

         case 'pizzas':
            PizzasServices.updatdById(id, data).then(res => console.log(res));
            break;

         case 'sanduiches':
            SanduichesServices.updatdById(id, data).then(res => console.log(res));
            break;
      }
   };

   return (
      <Box
         position="fixed"
         top="0"
         left="0"
         zIndex="9"
         width="full"
         height="100vh"
         backgroundColor="red"
         bgColor="rgba(0, 0, 0, .4)"
      >
         <Form initialData={oldValue.data} ref={formRef} onSubmit={handleSubmit}>
            <VStack
               borderRadius="1rem"
               p="2rem"
               bgColor="#fff"
               width={["300px", "400px", "600px"]}
               height="600px"
               display="flex"
               margin="0 auto"
            >
               <Progress />
               <Heading>Atulizar Pedido</Heading>

               <VInput name='title' placeholder="Editar Titulo" />

               <VInput name='description' placeholder="Editar Descricao" />

               <VInput name='image.src' placeholder="Editar Url da imagem" />

               <VTextArea name="description" />

               <VInput name='image.alt' placeholder="Editar texto alternativo do imagem" />
               <Button onClick={handleUpdateCard} position="absolute" top=".7rem" right="1rem">ddd</Button>
               <Box width="full" display="flex" justifyContent="space-evenly" paddingRight="2rem">
                  <VSelect title='fsdfsdf' name="available" />
                  <Button type='submit' height="50px" border="2px solid #111" _hover={{ bgColor: "green.200", transition: ".3s" }}>Enviar</Button>
               </Box>
            </VStack>
         </Form>
      </Box>
   )
}