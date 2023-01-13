import axios from "axios";
import { errorInterceptor, ResponseInterceptor } from "./interceptors";

const BASE_URL = "http://localhost:3000"

export const Api = axios.create({
   baseURL: BASE_URL
});


Api.interceptors.response.use(
   (response) => ResponseInterceptor(response),
   (errr) => errorInterceptor(errr)
);
