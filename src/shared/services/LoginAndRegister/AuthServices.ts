import { Api } from "../axios-config";


export interface address {
   city: string;
   state: string;
   country: string;
}

export interface RegisterServicesProps {
   email: string;
   password: string;
   telephone: number;
   access_token: string;
   address: address;
};

const RegisterServices = async (dados: RegisterServicesProps): Promise<string | Error> => {
   try {
      const { data } = await Api.post(`/users/`, dados);

      if (data) {
         return "Conta criada com successo";
      };

      return new Error('Erro ao criar o usuario!');
   } catch (err) {
      return new Error('Erro ao criar o usuario!');
   }
}
const getAllUserInfos = async (email: string): Promise<RegisterServicesProps[] | Error> => {

   try {
      const { data } = await Api.get(`/users?email_like=${email}`);

      if (data) {
         return data;
      }

      return new Error('Email ou senha incorretos!');
   } catch (err) {
      return new Error('Email ou senha incorretos!');
   }
}

const LoginServices = async (email: string, password: string): Promise<RegisterServicesProps[] | Error> => {

   try {
      const { data } = await Api.get(`/users?email_like=${email}&password=${password}`);

      if (data) {
         console.log(data);

         return data;
      }

      return new Error('Email ou senha incorretos!');
   } catch (err) {
      return new Error('Email ou senha incorretos!');
   }
}


const Auth = async (access_token: string): Promise<RegisterServicesProps[] | null> => {
   try {
      const { data } = await Api.get(`/users?access_token_like=${access_token}`);

      if (data) {
         return data;
      }

      return null;
   } catch (err) {
      return null;
   }


}

export const AuthServices = {
   RegisterServices,
   LoginServices,
   getAllUserInfos,
   Auth
}