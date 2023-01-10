import { Box, Button, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { } from "../../assets/banner.jpg"
import { VInput } from "../../shared/components/Forms";
import { useLoginContext } from "../../shared/context/LoginContext";
import * as yup from 'yup'
import { IFormErros } from "../../shared/components/DashModal/typeError";

interface LoginProps {
   children?: React.ReactNode
}

const dados = {
   email: "leandro@gmail.com",
   password: "1231231313",
   telephone: 315315315,
   access_token: generateAccessToken(),
   address: {
      city: "alemanha",
      state: "CA",
      country: "russia",
   }
}


function generateAccessToken() {
   // Generate a random string of length 20
   const token = Math.random().toString(36).substring(2, 30);
   return token;
}

interface loginFormProps {
   email: string;
   password: string;
}

const LoginFormSchema: yup.SchemaOf<loginFormProps> = yup.object().shape({
   password: yup.string().required('A senha e obrigatorio'),
   email: yup.string().email('Degite um email valido').required('O email e obrigatorio'),
});

export const LoginAuth = ({ children }: LoginProps) => {
   const FormRef = useRef<FormHandles>(null);
   const { login, isAutorized } = useLoginContext();

   const handleSubmitLogin = (dados: loginFormProps, { reset }: any) => {
      LoginFormSchema.validate(dados, { abortEarly: false }).then(async (validatedData) => {
         const result = await login(validatedData.email, validatedData.password);
         if (result === 'Email ou senha incorretos!')
            alert(result);
      }).catch((erros) => {
         if (erros instanceof yup.ValidationError) {
            const errorMessage: IFormErros = {};
            erros.inner.forEach(err => {
               if (!err.path) return;
               errorMessage[err.path] = err.message;
            })
            FormRef.current?.setErrors(errorMessage);
         }
      })
      reset();
   }

   if (isAutorized) return (<>{children}</>);

   return (
      <>
         <Box display="flex" bgColor="gray.100" height="100vh">

            <Box bgColor="blue" flex="1" maxW="full" backgroundColor="red" display={["none", "none", "block"]} >
               <Image h="100%" objectFit="cover" w="full" src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1498&q=80" />
            </Box>

            <Box
               padding="1rem 3rem"
               height="full"
            >

               <Text margin="0 .4rem" fontSize="1.2rem">Seja muito bem vindo!</Text>
               <Heading marginBottom="2rem" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" fontSize={["2xl", "3xl", "4xl"]}>Faça login na sua conta</Heading>
               <Box
                  minW="full"
                  flex="1"
               >
                  <Form ref={FormRef} onSubmit={handleSubmitLogin}>
                     <Box marginBottom="2rem">
                        <VInput name="email" padding="1.5rem 1rem" title="E-email:" placeholder="Digite seu E-mail..." />
                     </Box>
                     <Box marginBottom="3rem">
                        <VInput name="password" title="Senha:" padding="1.5rem 1rem" placeholder="Digite seu Senha..." />
                     </Box>
                     <Button type="submit" color="#fff" width="full" transition=".4s" height="5rem" _hover={{ backgroundColor: "#111" }} backgroundColor="green.600">ENTRAR</Button>
                  </Form>
               </Box>
            </Box>

         </Box>
      </>
   )
}