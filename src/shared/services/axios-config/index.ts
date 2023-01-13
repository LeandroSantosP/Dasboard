import axios from "axios";
import { errorInterceptor, ResponseInterceptor } from "./interceptors";
//https://json-server-3huybff4y-leandrosantosp.vercel.app
//https://localhost:3000
const BASE_URL = "https://json-server-ebon.vercel.app/"

export const Api = axios.create({
   baseURL: BASE_URL
});


Api.interceptors.response.use(
   (response) => ResponseInterceptor(response),
   (errr) => errorInterceptor(errr)
);
