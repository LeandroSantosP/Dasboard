import { Box } from '@chakra-ui/react';
import { useField } from '@unform/core'
import { useEffect, useRef } from 'react';

interface Props {
   name: string;
   title?: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props


export const VSelect = ({ name, title }: InputProps) => {
   const { error, defaultValue, clearError, fieldName, registerField } = useField(name);
   const refSelect = useRef(null)

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: refSelect.current,
         path: 'value'
      })
   }, [fieldName, registerField]);


   return (
      <>
         <select
            defaultValue={defaultValue}
            ref={refSelect}
            onKeyDown={() => clearError()}
            name="select">
            <option style={{ color: "#111" }}> Disponinvel</option>
            <option defaultChecked>Esgotado</option>
         </select>
         {error && <span style={{ fontSize: "12px" }}>{error}</span>}
      </ >
   )
}