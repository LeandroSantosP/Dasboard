import { generateAccessToken } from "../../shared/services/TokenGenerator/TokenGenerator";
import { IFormErros } from "../../shared/components/DashModal/typeError";
import { useAuthContext } from "../../shared/context/AuthContext";
import { customScrollball } from '../../shared/styles/hellpes'
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { VInput } from "../../shared/components/Forms";
import { FormHandles } from "@unform/core";
import { RegisterProps, RegisterServicesForms } from "./registerType";
import { Form } from "@unform/web";
import { useRef } from "react";
import { RegisterFotmSchema } from "./yupSchema";
import * as yup from 'yup'

export const Resgister = ({ handleLogin }: RegisterProps) => {
   const { register } = useAuthContext();
   const FormRef = useRef<FormHandles>(null);

   const handleSubmit = async (dados: RegisterServicesForms, { reset }: any) => {

      RegisterFotmSchema.validate(dados, { abortEarly: false })
         .then(async (validatedDados) => {
            const result = await register?.({ access_token: generateAccessToken(), ...validatedDados });
            if (result.resultMessage == "Not Create account") {
               FormRef.current?.setFieldError('email', 'Email ja existente!');
               return;
            } else {
               alert("Conta criada com sucesso")
               handleLogin();
            }

         }).catch((err) => {
            if (err instanceof yup.ValidationError) {
               const erroMessage: IFormErros = {};
               err.inner.forEach(err => {
                  if (!err.path) return;
                  erroMessage[err.path] = err.message
               });
               FormRef.current?.setErrors(erroMessage)
            }
         })
   }

   return (
      <>
         <Flex bgColor="#111" height="100vh" justify="center" alignItems="center">
            <Box width="600px" maxH="600px" p="1rem" css={customScrollball} border="1px solid #fff" borderRadius=".4rem" color="#fff" marginY="2rem" overflow="auto">
               <Form onSubmit={handleSubmit} ref={FormRef}>
                  <Heading marginY=".5rem">Cadastro</Heading>
                  <VInput name="email" title="E-mail" padding=".5rem" placeholder="Digiter o seu email..." />
                  <VInput name="password" title="Senha" padding=".5rem" placeholder="Digite sua senha..." />
                  {/* <VInput name="password" title="Comfirme a senha" padding=".5rem" placeholder="Confirme seu senha..." /> */}

                  <VInput name="telephone" title="Telefone" padding=".5rem" placeholder="Digite seu telefone..." type="number" />
                  <VInput name="address.city" title="Cidade" padding=".5rem" placeholder="Digite sua cidade..." />
                  <VInput name="address.state" title="Estado" padding=".5rem" placeholder="Digite seu Estado..." />
                  <VInput name="address.country" title="Pais" padding=".5rem" placeholder="Digite seu pais..." />
                  <Box marginY="1rem" display="flex" justifyContent="space-around" alignItems="center">

                     <Button
                        style={{
                           backgroundColor: "#fff",
                           padding: "0.5rem 2rem",
                           color: "#111",
                           fontSize: "1rem",
                           fontWeight: "bold",
                        }} type="submit">
                        Crair
                     </Button>
                     <Text _hover={{ cursor: "pointer" }} textDecoration="underline" onClick={() => handleLogin()}>Ja tem conta?</Text>
                  </Box>
               </Form>

            </Box>
         </Flex>
      </>
   );
}