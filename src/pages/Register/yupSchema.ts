import * as yup from 'yup'
import { RegisterServicesForms } from './registerType'

export const RegisterFotmSchema: yup.SchemaOf<RegisterServicesForms> = yup.object().shape({
   email: yup.string().email('Digite um email valido!').required('Obrigatorio!'),
   password: yup.string().required('Obrigatorio!'),
   telephone: yup.number().required('Obrigatorio!'),
   address: yup.object().shape({
      city: yup.string().required('Obrigatorio!'),
      state: yup.string().required('Obrigatorio!'),
      country: yup.string().required('Obrigatorio!')
   })
})