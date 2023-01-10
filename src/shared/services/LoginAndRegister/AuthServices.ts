import { Api } from "../axios-config";


interface address {
   city: string;
   state: string;
   country: string;
}

interface RegisterServices {
   userId: number;
   email: string;
   password: string;
   telephone: number;
   access_token: string;
   address: address;
}

export const RegisterServices = async (dados: Omit<RegisterServices, 'userId'>): Promise<number | Error> => {
   try {
      const { data } = await Api.post(`/users/`, dados);

      if (data) {
         return data.userId;
      };

      return new Error('Erro ao criar o usuario!');
   } catch (err) {
      return new Error('Erro ao criar o usuario!');
   }
}


export const LoginServices = async (email: string, password: string): Promise<string | Error> => {

   try {
      const { data } = await Api.get(`/users?email_like=${email}&password=${password}`);

      if (data) {
         return data[0].access_token;
      }

      return new Error('Email ou senha incorretos!');
   } catch (err) {
      return new Error('Email ou senha incorretos!');
   }
}

export const getUserInfos = async (email: string, password: string): Promise<string | Error> => {

   try {
      const { data } = await Api.get(`/users?email_like=${email}&password=${password}`);

      if (data) {
         return data[0].access_token;
      }

      return new Error('Email ou senha incorretos!');
   } catch (err) {
      return new Error('Email ou senha incorretos!');
   }
}

export const Auth = async (access_token: string): Promise<boolean | null> => {
   try {
      const { data } = await Api.get(`/users?access_token_like=${access_token}`);

      if (data) {
         return true;
      }

      return false;
   } catch (err) {
      return false;
   }


}

export const AuthServices = {
   RegisterServices,
   LoginServices,
   Auth
}