import * as yup from 'yup';
import { loginFormProps } from './loginType';

export const LoginFormSchema: yup.SchemaOf<loginFormProps> = yup.object().shape({
   password: yup.string().required('A senha e obrigatorio'),
   email: yup.string().email('Degite um email valido').required('O email e obrigatorio'),
});