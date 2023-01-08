import { Textarea } from "@chakra-ui/react";
import { useField } from "@unform/core";
import { useEffect, useRef } from "react";

interface VtextArea {
   name: string
}

export const VTextArea = ({ name }: VtextArea) => {
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
         <textarea
            rows={20}
            cols={50}
            defaultValue={defaultValue}
            ref={refSelect}
            onKeyDown={() => clearError()}
            name="textarea"
         />
         {error && <span style={{ fontSize: "12px" }}>{error}</span>}
      </>
   )
}