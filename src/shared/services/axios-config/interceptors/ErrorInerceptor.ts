import { AxiosError } from "axios";

export const errorInterceptor = (err: AxiosError) => {
   if (err.message == "Network Error") {
      return Promise.reject(new Error('Error de conexão.'));
   }

   if (err.response?.status === 401) {
      return Promise.reject(new Error('Algo deu errado!'));
   }

   return Promise.reject(err);
}