import { Box, Button, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { VInput } from "../../shared/components/Forms";
import { useAuthContext } from "../../shared/context/AuthContext";
import * as yup from 'yup'
import { IFormErros } from "../../shared/components/DashModal/typeError";
import { Resgister } from "../Register/Register";
import { loginFormProps, LoginProps } from "./loginType";
import { LoginFormSchema } from "./yupSchemaLogin";

export const LoginAuth = ({ children }: LoginProps) => {
   const [registerScreen, setRegisterScreen] = useState(false);
   const FormRef = useRef<FormHandles>(null);
   const { login, isAutorized } = useAuthContext();

   const handleLoginScreen = () => {
      setRegisterScreen(!registerScreen)
   }

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
         {!registerScreen ? (
            <Box display="flex" bgColor="gray.100" height="100vh">

               <Box flex="1" maxW="full" display={["none", "none", "block"]} >
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
                        <Box >
                           <VInput name="password" title="Senha:" padding="1.5rem 1rem" placeholder="Digite seu Senha..." />
                        </Box>
                        <Box display="flex" gap=".3rem" marginBottom="3rem" marginTop=".7rem">
                           <Text display="flex" >Ainda nao tem conta?</Text>

                           <Text
                              textDecoration="underline"
                              _hover={{ cursor: "pointer" }}
                              onClick={handleLoginScreen}
                           >
                              Register-se
                           </Text>

                        </Box>
                        <Button type="submit" color="#fff" width="full" transition=".4s" height="5rem" _hover={{ backgroundColor: "#111" }} backgroundColor="green.600">ENTRAR</Button>
                     </Form>
                  </Box>
               </Box>

            </Box>
         ) : (
            <>
               <Resgister handleLogin={handleLoginScreen} />
            </>
         )}

      </>
   )
}