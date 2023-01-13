import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react";
import { CardCustom, CustomCardProps } from "../../shared/components/Card";
import { HomeCard } from "../../shared/components/Card/HomeCard";
import { Slide, Slider, SliderProps } from "../../shared/components/SliderCard"
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import bannerUsed from './animation.json'

import { Api } from "../../shared/services/axios-config";

const getRandomCategory = (items: string[]) => {
   let randomIndex = Math.floor(Math.random() * items.length);
   return items[randomIndex]
}

const style = {
   height: 400,
};


export const Home: React.FC = () => {
   const lottieRef = useRef<LottieRefCurrentProps | null>(null);
   const [data, setData] = useState<CustomCardProps[]>([]);
   const [error, setError] = useState('');
   const items = ["sanduiches", "salgados", "pizzas"];
   const result = getRandomCategory(items);
   const settings: SliderProps = {
      breakpoints: {
         640: {
            slidesPerView: 2,
            spaceBetween: 20,
         },
         768: {
            slidesPerView: 1,
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

   const stopedAnimation = () => {
      lottieRef.current?.pause()
   }

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
      <Flex flexDirection="column" >
         < Box
            border="1px solid #111"
            display="flex"
            bgColor="#111"
            borderRadius="1rem"
            maxW="100$"
            minH="400px"
            width="full"
            position="relative"
            justifyContent="center"
            alignItems="center"
         >
            <Lottie animationData={bannerUsed} style={style} lottieRef={lottieRef} />
            <Text variant="subtitle" fontSize={["rem", "3rem"]} color="#ffff" position="absolute" top="1rem">
               Company Name
            </Text>
         </Box >
         <Box maxW={["300px", "300px", "630px", "760px", "1000px"]}>
            <Heading marginTop="32px" padding="1rem" bgColor="gray.300" borderRadius="7px">Sugestões</Heading>
            <Slider settings={settings} >
               {data.map(card => (
                  <Slide key={card.id}>
                     <HomeCard card={card} />
                  </Slide>
               ))}
            </Slider>
         </Box>
      </Flex >
   )
}