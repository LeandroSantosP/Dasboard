import { Box, Button, Grid, Progress, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CardCustom } from '../../shared/components/Card'
import { DeahBoard } from '../../shared/DashBoard'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import { LayoutDefault } from '../../shared/layout'
import { ISalgadoDetails, SalgadosServices } from '../../shared/services/SalgadosServices/SalgadosServics'
import { useDebouse } from '../../shared/hooks/UseDebouse'
import { ErroComponent } from '../../shared/components/Errorcompo/Error'
import { DashBoard } from '../../shared/components/DashModal/DashModal'
import { PizzasServices } from '../../shared/services/PizzasServices/PizzasServices'
import { SanduichesServices } from '../../shared/services/SanduicheServices/SanduicheServices'

export const CategoryOne = () => {
   const { id } = useParams();
   const [data, setData] = useState<ISalgadoDetails[] | null>([])
   const [showError, setShowError] = useState<boolean>(true);
   const [showModal, setShowModal] = useState<boolean>(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string>('');
   const [search, setSearch] = useState('');
   const { debouse } = useDebouse();


   useEffect(() => {
      switch (id) {
         case 'salgados':
            debouse(() => {
               setIsLoading(true)
               SalgadosServices.getAll(currentPage, search).then(result => {
                  setTimeout(() => {
                     setIsLoading(false)
                  }, 500);
                  if (result instanceof Error) {
                     setError(result.message)

                  } else {
                     setData(result.data)
                  }
               })
            })
            break

         case 'pizzas':
            debouse(() => {
               setIsLoading(true)
               PizzasServices.getAll(currentPage, search).then(result => {
                  setTimeout(() => {
                     setIsLoading(false)
                  }, 500);
                  if (result instanceof Error) {
                     setError(result.message)
                  } else {
                     setData(result.data)
                  }
               })
            })
            break

         case 'sanduiches':
            debouse(() => {
               setIsLoading(true)
               SanduichesServices.getAll(currentPage, search).then(result => {
                  setTimeout(() => {
                     setIsLoading(false)
                  }, 500);
                  if (result instanceof Error) {
                     setError(result.message)
                  } else {
                     setData(result.data)
                  }
               })
            })
            break

      }
   }, [currentPage, search]);

   function handleSearch(search: string) {
      setCurrentPage(1)
      setSearch(search);
   }

   function handleCloseModalError() {
      setShowError(close => !close)
   }

   function handleShowModalDashBoard() {
      setShowModal(close => !close)
   }

   return (
      <LayoutDefault title='Salgados' toolbar={
         <DeahBoard
            handleOpenDashboard={() => setShowModal(oldvalue => !oldvalue)}
            textSearch={search}
            showModal
            text={`DashBoard`}
            handleChangeSearch={text => handleSearch(text)}
         />

      }>
         {isLoading && <Progress isIndeterminate size='xs' colorScheme='#111' />}
         <Box display="flex" flexDirection="column">
            <Grid templateColumns='repeat(4, 2fr)' gap={5}>
               {data && data.map(item => (
                  <CardCustom key={item.id} card={item} />
               ))}

            </Grid>
            <Box
               marginY="2rem"
               display="flex"
               gap={10}
               alignItems="center"
               width="full"
               padding=".5rem"
               borderRadius={4}
               bgColor="green.200">
               <Button
                  size="sm"
                  border="1px solid #111"
                  color="#111"
                  disabled={currentPage === 1 ? true : false}
                  onClick={() => setCurrentPage(lastpage => lastpage - 1)}><AiOutlineArrowLeft /></Button>
               <Button
                  size="sm"
                  border="1px solid #111"
                  color="#111"
                  disabled={data?.length === 0 ? true : false}
                  onClick={() => setCurrentPage(lastpage => lastpage + 1)}><AiOutlineArrowRight /></Button>
               <Text>Pagina atual {currentPage}</Text>

               {error && showError && <ErroComponent error={error} showErrorMessage={handleCloseModalError} />}
            </Box>
            {showModal && <DashBoard showDasBoard={handleShowModalDashBoard} />}
         </Box>
      </LayoutDefault>
   )
}
