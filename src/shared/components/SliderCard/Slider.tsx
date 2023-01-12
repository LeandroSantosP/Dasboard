import { Swiper, SwiperProps } from 'swiper/react';
import SwiperCore, { A11y, Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slider.css'

interface SliderProps {
   children: React.ReactNode
   settings: SwiperProps;
}

SwiperCore.use([Navigation]);

export const Slider = ({ children, settings }: SliderProps) => {
   return (
      <Swiper modules={[Navigation, Pagination, A11y]} {...settings}>
         {children}
      </Swiper >
   )
};