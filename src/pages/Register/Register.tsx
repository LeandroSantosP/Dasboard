import { Box, Flex, Heading } from "@chakra-ui/react";
import { Form } from "@unform/web";
import { customScrollball } from '../../shared/styles/hellpes'
import { VInput } from "../../shared/components/Forms";
import { useAuthContext } from "../../shared/context/AuthContext";
import { RegisterServicesProps } from "../../shared/services/LoginAndRegister";

interface RegisterProps {
   handleLogin: () => void;
}

export const Resgister = ({ handleLogin }: RegisterProps) => {
   const { register } = useAuthContext()

   const handleSubmit = async (dados: RegisterServicesProps) => {

      register?.(dados)
   }

   return (
      <>
         <Flex >

            <Box width="full" maxW="1000px" p="1rem" css={customScrollball} borderRadius=".4rem" bgColor="#111" color="#fff" marginY="2rem" overflow="auto">

               <Form onSubmit={handleSubmit}>
                  <Heading marginY=".5rem">Cadastro</Heading>
                  <VInput name="email" title="E-mail" padding=".5rem" placeholder="Digiter o seu email..." />
                  <VInput name="password" title="Senha" padding=".5rem" placeholder="Digite sua senha..." />
                  <VInput name="password" title="Comfirme a senha" padding=".5rem" placeholder="Confirme seu senha..." />

                  <VInput name="telephone" title="Telefone" padding=".5rem" placeholder="Digite seu telefone..." />
                  <VInput name="address.city" title="Cidade" padding=".5rem" placeholder="Digite sua cidade..." />
                  <VInput name="address.state" title="Estado" padding=".5rem" placeholder="Digite seu Estado..." />
                  <VInput name="address.country" title="Pais" padding=".5rem" placeholder="Digite seu pais..." />
                  <button type="submit">Crair</button>
               </Form>
               <Box backgroundColor="red" onClick={() => handleLogin()}>login</Box>
            </Box>

         </Flex>
      </>
   );
}