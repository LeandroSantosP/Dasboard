import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useField } from '@unform/core';
import { Input } from '@chakra-ui/react';

interface Props {
   name: string
   label?: string
}

type InputProps = JSX.IntrinsicElements['input'] & Props


export const VInput: React.FC<InputProps> = ({ name, ...rest }) => {
   const inputRef = useRef<HTMLInputElement>(null);
   const { fieldName, registerField, defaultValue, error } = useField(name);

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: inputRef.current,
         path: 'value'
      })

   }, [fieldName, registerField]);

   return (
      <>
         <input
            {...rest}
            ref={inputRef}
            defaultValue={defaultValue}
         />
         <p>{error && <span style={{ color: "red" }}>{error}</span>}</p>
      </>
   )
}