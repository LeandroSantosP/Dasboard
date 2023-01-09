import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useField } from '@unform/core';
import {
   FormLabel,
} from '@chakra-ui/react';

interface Props {
   name: string
   title?: string;
   padding?: string
}

type InputProps = JSX.IntrinsicElements['input'] & Props


export const VInput: React.FC<InputProps> = ({ name, title, padding = ".5rem", ...rest }) => {
   const inputRef = useRef<HTMLInputElement>(null);
   const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: inputRef.current,
         path: 'value'
      })

   }, [fieldName, registerField]);

   return (
      <>
         <FormLabel width="full" fontSize="1rem" textDecoration="underline">{title}</FormLabel>

         <input
            {...rest}
            ref={inputRef}
            onKeyDown={() => clearError()}
            defaultValue={defaultValue}
            style={{ color: "#111", borderRadius: ".3rem", width: "100%", padding: padding }}
         />
         {error && <span style={{ fontSize: "12px" }}>{error}</span>}
      </>
   )
}