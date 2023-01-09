import { FormLabel, Textarea } from "@chakra-ui/react";
import { useField } from "@unform/core";
import { useEffect, useRef } from "react";

interface VtextArea {
   name: string
   title?: string;
   placeholder?: string
}

export const VTextArea = ({ name, title, placeholder }: VtextArea) => {
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
         <FormLabel width="full" fontSize="1rem" textDecoration="underline">{title}</FormLabel>
         <textarea
            placeholder={placeholder}
            style={{ border: "1px solid #111", borderRadius: ".5rem", padding: "1rem", backgroundColor: "", width: "100%" }}
            rows={20}
            defaultValue={defaultValue}
            ref={refSelect}
            onKeyDown={() => clearError()}
            name="textarea"
         />
         {error && <span style={{ fontSize: "12px" }}>{error}</span>}
      </>
   )
}