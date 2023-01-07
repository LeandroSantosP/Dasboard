export interface handleSubmitProps {
   title: string;
   description: string;
   image: {
      alt: string
      src: string;
   },
   available?: boolean;
};