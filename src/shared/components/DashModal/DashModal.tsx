import {
   FormControl,
   FormLabel,
   FormHelperText,
   Input,
   Box,
   VStack,
   Button,
   Heading,
   Image,
} from '@chakra-ui/react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx'
import { useNavigate, useParams } from 'react-router-dom';
import { VInput } from '../Forms';
import * as yup from 'yup'
import { CiYoutube } from 'react-icons/ci';
import { requestSalgados } from './requests/SalgadosRequest';
import { handleSubmitProps } from '../../services/typy';
import { errorInterceptor } from '../../services/axios-config/interceptors';
import { IFormErros } from './typeError';
import { requestPizza } from './requests/PizzarRequests';
import { requestSanduiches } from './requests/SanduichesRequest';

interface DashBoardProps {
   showDasBoard?: () => void;
}

export const DashBoard = ({ showDasBoard }: DashBoardProps) => {
   const formRef = useRef<FormHandles>(null)
   const { id } = useParams();
   const navigate = useNavigate()
   const [showDetailsOptions, setshowDetailsOptions] = useState();
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');
   const [results, setResults] = useState<string | number>();

   const formValidationSchema: yup.SchemaOf<handleSubmitProps> = yup.object().shape({
      title: yup.string().required('O campo e obrigratorio').min(3, 'O Campo deve Conter no minimo 3 letras!'),
      description: yup.string().required('O campo e obrigratorio').min(15, 'O Campo deve conter no minimo 15 letras!'),
      image: yup.object().shape({
         alt: yup.string().required('O campo e obrigratorio!'),
         src: yup.string().required('O campo e obrigratorio!')
      }),
      available: yup.boolean(),
   })

   const handleSubmit = (data: handleSubmitProps) => {
      formValidationSchema.validate(data, { abortEarly: false })
         .then((validationForm) => {
            setIsLoading(true)
            if (id === 'salgados') {
               requestSalgados(validationForm).then(res => setResults(res));
            } else if (id === 'pizzas') {
               requestPizza(validationForm).then(res => setResults(res));
            } else if (id === 'sanduiches') {
               requestSanduiches(validationForm).then(res => setResults(res));
            }

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
               width="600px"
               height="600px"
               position="relative"
            >
               <FormLabel>titulo</FormLabel>
               <VInput name='title' />

               <FormLabel>descricao</FormLabel>
               <VInput name='description' />

               <FormLabel>UrlImage</FormLabel>
               <VInput name='image.src' />

               <FormLabel>Text Alternativo</FormLabel>
               <VInput name='image.alt' />

               <Button onClick={showDasBoard} position="absolute" top=".7rem" right="1rem"><RxCross2 /></Button>
               <Button type='submit'>Enviar</Button>
            </VStack>

         </Form>
      </Box >
   );
}