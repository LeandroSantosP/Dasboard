import * as yup from 'yup'
import { RegisterServicesForms } from './registerType'

export const RegisterFotmSchema: yup.SchemaOf<RegisterServicesForms> = yup.object().shape({
   email: yup.string().email('Digite um email valido!').required('Obrigatorio!'),
   password: yup.string()
      .required('Senha Obrigatoria.')
      .min(8, 'Senha e muito curta! - Deve conter no minimo 8 caracteres!.')
      .matches(/[a-zA-Z]/, 'A senha só pode conter letras latinas!'),
   telephone: yup.number().min(11, 'Minimo de 11 digitos!').required('Obrigatorio!'),
   address: yup.object().shape({
      city: yup.string().required('Obrigatorio!'),
      state: yup.string().required('Obrigatorio!'),
      country: yup.string().required('Obrigatorio!')
   })
})