import {
   Box,
   VStack,
   Button,
   Heading,
   Progress,
} from '@chakra-ui/react';

import React, { useEffect, useRef } from 'react';
import { handleSubmitSimpleProps } from '../../services/typy';
import { FormHandles } from '@unform/core';
import { requestSalgados } from './requests/';
import { requestPizza } from './requests/';
import { requestSanduiches } from './requests/';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx'
import { useParams } from 'react-router-dom';
import { VInput, VTextArea } from '../Forms';
import { Form } from '@unform/web';
import { IFormErros } from './typeError';
import { VSelect } from '../Forms/VSelect';
import * as yup from 'yup'

interface DashBoardProps {
   showDasBoard?: () => void;
}

export const DashBoard = ({ showDasBoard: showDashBoard }: DashBoardProps) => {
   const [results, setResults] = useState<string | number>('');
   const formRef = useRef<FormHandles>(null);
   const { id } = useParams();

   const formValidationSchema: yup.SchemaOf<handleSubmitSimpleProps> = yup.object().shape({
      title: yup.string().required('O campo e obrigratorio').min(3, 'O Campo deve Conter no minimo 3 letras!'),
      description: yup.string().required('O campo e obrigratorio').min(15, 'O Campo deve conter no minimo 15 letras!'),
      image: yup.object().shape({
         alt: yup.string().required('O campo e obrigratorio!'),
         src: yup.string().required('O campo e obrigratorio!')
      }),
      available: yup.string().required('O campo e obrigratorio!'),
   });

   const handleSubmit = (data: handleSubmitSimpleProps, { reset }: any) => {
      formValidationSchema.validate(data, { abortEarly: false })
         .then((validationForm) => {

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
               showDashBoard?.();

               reset()
               return
            }

            reset()
            return setResults('Rota nao encontrada');
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
               bgColor="gray.100"
               width={["300px", "400px", "600px"]}
               height="600px"
               position="relative"
            >
               <Heading size={['sm', 'lg']} width="ful">Novo Pedido</Heading>

               <VInput name='title' title='Titulo' placeholder='titulo' />

               <VTextArea name='description' title="Descricao" placeholder="Digite aqui uma descricao do produto..." />

               <VInput name='image.src' title='Url da imagem' placeholder='http://www.example.com/image1.jpg' />

               <VInput name='image.alt' title='Imagem alternativa' placeholder='Uma imagem de ...' />
               <Button onClick={() => showDashBoard?.()} position="absolute" top=".7rem" right="1rem"><RxCross2 /></Button>
               <Box width="full" display="flex" >
                  <Box>
                     <VSelect title='fsdfsdf' name="available" />
                  </Box>
                  <Box>
                     <Button type='submit' css={{ color: "#444", border: "1px solid #111", borderRadiu: "4px" }} height="50px" >Enviar</Button>
                  </Box>
               </Box>
            </VStack>
         </Form>
      </Box >
   );
}