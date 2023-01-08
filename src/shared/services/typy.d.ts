export interface handleSubmitProps {
   id: number
   title: string;
   description: string;
   image: {
      alt: string
      src: string;
   },
   available: string;
};


export interface handleSubmitSimpleProps {
   title: string;
   description: string;
   image: {
      alt: string
      src: string;
   },
   available: string;
};