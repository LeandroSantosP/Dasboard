import { useState } from "react";
import { CardCustom } from "../shared/components/Card";
import { DashBoard } from "../shared/components/DashModal/DashModal";
import { DeahBoard } from '../shared/DashBoard/'

import { LayoutDefault } from "../shared/layout"
const test = {
   title: "Test Title",
   description: "TestDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription",
   image: {
      alt: "dsaassda",
      src: "https://i0.wp.com/mercadoeconsumo.com.br/wp-content/uploads/2019/04/Que-comida-saud%C3%A1vel-que-nada-brasileiro-gosta-de-fast-food.jpg?fit=1600%2C1067&ssl=1"
   }
}

export const HomePage = () => {
   const [showModal, setShowModal] = useState<boolean>(false)
   const handleClick = () => {
      setShowModal(last => !last)
   }


   return (
      <LayoutDefault title="Pagina inicial" toolbar={<DeahBoard text="Painel de Controle" handleOpenDashboard={handleClick} />}>
         <CardCustom card={test} />
         <CardCustom card={test} />
         <CardCustom card={test} />
         <CardCustom card={test} />
         <CardCustom card={test} />
         {showModal && <DashBoard />}
      </LayoutDefault >
   )
}