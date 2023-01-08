import {
   Box,
   VStack,
   Button,
   Heading,
   Progress,
} from '@chakra-ui/react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef } from 'react';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx'
import { useParams } from 'react-router-dom';
import { VInput } from '../Forms';
import * as yup from 'yup'
import { requestSalgados } from './requests/SalgadosRequest';
import { handleSubmitProps, handleSubmitSimpleProps } from '../../services/typy';
import { IFormErros } from './typeError';
import { requestPizza } from './requests/PizzarRequests';
import { requestSanduiches } from './requests/SanduichesRequest';
import { VSelect } from '../Forms/VSelect';

interface DashBoardProps {
   showDasBoard?: () => void;
}

export const DashBoard = ({ showDasBoard: showDashBoard }: DashBoardProps) => {
   const [results, setResults] = useState<string | number>();
   const [isLoading, setIsLoading] = useState(false);
   const formRef = useRef<FormHandles>(null)
   const [error, setError] = useState('');
   const { id } = useParams();

   const formValidationSchema: yup.SchemaOf<handleSubmitSimpleProps> = yup.object().shape({
      title: yup.string().required('O campo e obrigratorio').min(3, 'O Campo deve Conter no minimo 3 letras!'),
      description: yup.string().required('O campo e obrigratorio').min(15, 'O Campo deve conter no minimo 15 letras!'),
      image: yup.object().shape({
         alt: yup.string().required('O campo e obrigratorio!'),
         src: yup.string().required('O campo e obrigratorio!')
      }),
      available: yup.string().required('O campo e obrigratorio!'),
   })

   const handleSubmit = (data: handleSubmitSimpleProps, { reset }: any) => {
      console.log(data);

      formValidationSchema.validate(data, { abortEarly: false })
         .then((validationForm) => {
            setIsLoading(true)
            if (id === 'salgados') {
               requestSalgados(validationForm).then(res => setResults(res));
               showDashBoard?.()
               reset()
               return
            } else if (id === 'pizzas') {
               requestPizza(validationForm).then(res => setResults(res));
               showDashBoard?.()
               reset()
               return
            } else if (id === 'sanduiches') {
               requestSanduiches(validationForm).then(res => setResults(res));
               showDashBoard?.()
               reset()
               return
            }

            reset()
            return setError('Rota nao encontrada');
         })
         .catch((errors) => {
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
         display="flex"
         flexDirection="column"
         position="fixed"
         width="100vw"
         top="0px"
         left="0px"
         height="100vh"
         alignItems="center"
         bgColor="rgba(0, 0, 0, .4)"
         z-index="8"
         padding="1rem">

         <Form ref={formRef} onSubmit={handleSubmit}>
            <VStack
               borderRadius="1rem"
               p="2rem"
               bgColor="#fff"
               width={["300px", "400px", "600px"]}
               height="600px"
               position="relative"
            >
               {isLoading && <Progress />}
               <Heading>Novo Pedido</Heading>

               <VInput name='title' title='Titulo' />

               <VInput name='description' title='Descricao' />

               <VInput name='image.src' title='Url da imagem' />

               <VInput name='image.alt' title='Imagem alternativa' />
               <Button onClick={showDashBoard} position="absolute" top=".7rem" right="1rem"><RxCross2 /></Button>
               <Box width="full" display="flex" justifyContent="space-evenly" paddingRight="2rem">
                  <VSelect title='fsdfsdf' name="available" />
                  <Button type='submit' height="50px" border="2px solid #111" _hover={{ bgColor: "green.200", transition: ".3s" }}>Enviar</Button>
               </Box>
            </VStack>
         </Form>
      </Box >
   );
}