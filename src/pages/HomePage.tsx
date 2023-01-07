import { Box, Button, flatten, Grid, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { CardCustom } from "../shared/components/Card";
import { DashBoard } from "../shared/components/DashModal/DashModal";
import { DeahBoard } from '../shared/DashBoard/'
import { useDebouse } from "../shared/hooks/UseDebouse";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

import { LayoutDefault } from "../shared/layout"
import { CardsServices, ICardDetails } from "../shared/services/Cards/CardsServices";
import { ErroComponent } from "../shared/components/Errorcompo/Error";

export const HomePage = () => {
   const [data, setData] = useState<ICardDetails[] | null>([]);
   const [showModal, setShowModal] = useState<boolean>(false);
   const [totalCount, setTotalCount] = useState<number>();
   const [search, setSearch] = useState('');
   const [error, setError] = useState<string>('');
   const [currentPage, setCurrentPage] = useState(1);
   const [showError, setShowError] = useState<boolean>(true);
   const { debouse } = useDebouse();

   useEffect(() => {

      debouse(() => {
         CardsServices.getAll(currentPage, search)
            .then(response => {
               if (response instanceof Error) {

                  setError(response.message);
               } else {
                  setData(response.data);
                  setTotalCount(response.totalCount)
               }
            })
      })
   }, [search, currentPage]);


   function handleCloseModalError() {
      setShowError(close => !close)
   }

   function handleShowModalDashBoard() {
      setShowModal(close => !close)
   }

   return (
      <>
         <LayoutDefault title="Pagina inicial" toolbar={
            <DeahBoard
               handleOpenDashboard={() => setShowModal(oldvalue => !oldvalue)}
               textSearch={search}
               showModal
               text={`DashBoard`}
               handleChangeSearch={text => setSearch(text)}
            />}>
            <Box flex="flex" flexDirection="column">

               <Grid templateColumns='repeat(4, 2fr)' gap={5}>

                  {data && data.map(card => (
                     <CardCustom key={card.id} card={card} />
                  ))}
                  {showModal && <DashBoard showDasBoard={handleShowModalDashBoard} />}
               </Grid>
               <Box
                  marginY="2rem"
                  display="flex"
                  gap={10}
                  alignItems="center"
                  width="full"
                  padding=".5rem"
                  borderRadius={4}
                  bgColor="green.200"
               >

                  <Button
                     size="sm"
                     border="1px solid #111"
                     color="#111"
                     disabled={currentPage === 0 ? true : false}
                     onClick={() => setCurrentPage(lastpage => lastpage - 1)}><AiOutlineArrowLeft /></Button>
                  <Button
                     size="sm"
                     border="1px solid #111"
                     color="#111"
                     disabled={currentPage === 10 ? true : false}
                     onClick={() => setCurrentPage(lastpage => lastpage + 1)}><AiOutlineArrowRight /></Button>
                  <Text>Pagina atual {currentPage}</Text>

                  {error && showError && <ErroComponent error={error} showErrorMessage={handleCloseModalError} />}
               </Box>
            </Box>
         </LayoutDefault>
      </>
   )
}