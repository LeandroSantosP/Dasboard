import axios from "axios";
import { errorInterceptor, ResponseInterceptor } from "./interceptors";

const BASE_URL = "https://json-server-ebon.vercel.app/"

export const Api = axios.create({
   baseURL: BASE_URL
});


Api.interceptors.response.use(
   (response) => ResponseInterceptor(response),
   (errr) => errorInterceptor(errr)
);
