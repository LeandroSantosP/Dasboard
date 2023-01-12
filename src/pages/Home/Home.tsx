import { Center, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { CardCustom, CustomCardProps } from "../../shared/components/Card";
import { HomeCard } from "../../shared/components/Card/HomeCard";
import { Slide, Slider, SliderProps } from "../../shared/components/SliderCard"
import { LayoutDefault } from "../../shared/layout";
import { Api } from "../../shared/services/axios-config";

const getRandomCategory = (items: string[]) => {
   let randomIndex = Math.floor(Math.random() * items.length);
   return items[randomIndex]
}

export const Home: React.FC = () => {
   const [data, setData] = useState<CustomCardProps[]>([]);
   const [error, setError] = useState('');


   const settings: SliderProps = {
      breakpoints: {
         640: {
            slidesPerView: 3,
            spaceBetween: 20,
         },
         768: {
            slidesPerView: 3,
            spaceBetween: 40,
         },
         1024: {
            slidesPerView: 3,
            spaceBetween: 50,
         },
      },
      spaceBetween: 10,
      // slidesPerView: data.length < 3,
      navigation: data.length >= 3,
      draggable: data.length >= 3,
      loop: data.length >= 3,
      pagination: true
   };

   const items = ["sanduiches", "salgados", "pizzas"];
   const result = getRandomCategory(items);

   useEffect(() => {

      const getAllCategory = async (caty: string): Promise<any | Error> => {
         const result = Api.get(`/${caty}`)
         return result
      }

      getAllCategory(result).then(res => {
         if (res instanceof Error) {
            setError(res.message)
         } else {
            setData(res.data)
            return;
         }
      });
   }, []);

   if (data.length === 1) return <Center><HomeCard card={data[0]} /></Center>


   return (

      <Flex maxH="350px" maxW={["300px", "400px", "1000px"]} zIndex="-1">
         <Slider settings={settings}>
            {data.map(card => (
               <Slide key={card.id}>
                  <HomeCard card={card} />
               </Slide>
            ))}
         </Slider>
      </Flex >

   )
}