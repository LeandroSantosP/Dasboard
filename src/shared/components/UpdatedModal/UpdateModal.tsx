import { Box, Button, Heading, VStack } from "@chakra-ui/react"
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web"
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { RxCross2 } from 'react-icons/rx'
import { PizzasServices } from "../../services/PizzasServices/PizzasServices";
import { SalgadosServices } from "../../services/SalgadosServices/SalgadosServics";
import { SanduichesServices } from "../../services/SanduicheServices/SanduicheServices";
import { VInput } from "../Forms"
import { VSelect } from "../Forms/";
import { VTextArea } from "../Forms/";
import { resquestGetAll } from "./requestsUpateModal/";
import { FlashMessage } from "../FlashMessage/FlashMessage";
import { handleSubmitProps, handleSubmitSimpleProps } from "../../services/typy";
import * as yup from 'yup'
import { IFormErros } from "../DashModal/typeError";

interface UpdateModalProps {
   id: number;
   handleUpdateCard: () => void
}

export const UpdataModal = ({ handleUpdateCard, id }: UpdateModalProps) => {
   const [error, setError] = useState('');
   const formRef = useRef<FormHandles>(null);
   const { id: category } = useParams();
   const [showFlasMessage, setShowFlahMessage] = useState(false);
   console.log(id);


   const formValidationSchema: yup.SchemaOf<handleSubmitSimpleProps> = yup.object().shape({
      title: yup.string().required('O campo e obrigratorio').min(3, 'O Campo deve Conter no minimo 3 letras!'),
      description: yup.string().required('O campo e obrigratorio').min(15, 'O Campo deve conter no minimo 15 letras!'),
      image: yup.object().shape({
         alt: yup.string().required('O campo e obrigratorio!'),
         src: yup.string().required('O campo e obrigratorio!')
      }),
      available: yup.string().required('O campo e obrigratorio!'),
   })


   const flashMessageTimeout = () => {
      setShowFlahMessage(true)
      setTimeout(() => {
         setShowFlahMessage(false)
      }, 3000);
   }

   const oldValue = resquestGetAll(id, category);

   const handleSubmit = (data: handleSubmitProps) => {
      formValidationSchema.validate(data, { abortEarly: false })
         .then((validateData) => {
            switch (category) {
               case 'salgados':
                  SalgadosServices.updatdById(Number(id), { id: Number(id), ...validateData }).then(result => {
                     if (result instanceof Error) {
                        setError(result.message)
                     } else {
                        flashMessageTimeout()
                     }
                  });
                  break;

               case 'pizzas':
                  PizzasServices.updatdById(Number(id), { id: Number(id), ...validateData }).then(result => {
                     if (result instanceof Error) {
                        setError(result.message)
                     } else {
                        flashMessageTimeout()
                     }
                  });
                  break;

               case 'sanduiches':
                  SanduichesServices.updatdById(Number(id), { id: Number(id), ...validateData }).then(result => {
                     if (result instanceof Error) {
                        setError(result.message)
                     } else {
                        flashMessageTimeout()
                     }
                  });
                  break;
            }
         }).catch((errors) => {

            if (errors instanceof yup.ValidationError) {
               const errorMessage: IFormErros = {};

               errors.inner.forEach(err => {
                  if (!err.path) return;
                  errorMessage[err.path] = err.message;
               })
               formRef.current?.setErrors(errorMessage);
            }
         })
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
               marginTop="1rem"
               position="relative"
            >
               <Heading>Atualizar Card</Heading>

               <VInput name='title' placeholder="Editar Titulo" />

               <VInput name='image.src' placeholder="Editar Url da imagem" />
               {showFlasMessage && (
                  <FlashMessage message="Arquivo atualizado com Sucesso" />
               )}
               <VTextArea name="description" />
               <VInput name='image.alt' placeholder="Editar texto alternativo do imagem" />
               <Button onClick={() => handleUpdateCard()} top=".7rem" right="1rem" position="absolute" ><RxCross2 /></Button>

               <Box width="full" display="flex" justifyContent="space-evenly" paddingRight="2rem" >
                  <VSelect name="available" />
                  <Button type='submit' height="50px" border="2px solid #111" borderRadius="4px" _hover={{ bgColor: "green.200", transition: ".3s" }}>Salvar</Button>
               </Box>

            </VStack>
         </Form>

      </Box >
   )
}