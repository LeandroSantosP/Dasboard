import { Box, Button, Progress, Text, Wrap } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CardCustom } from '../../shared/components/Card'

import { DeahBoard } from '../../shared/components/DashBoard'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import { LayoutDefault } from '../../shared/layout'
import { SalgadosServices } from '../../shared/services/SalgadosServices/SalgadosServics'
import { useDebouse } from '../../shared/hooks/UseDebouse'
import { ErroComponent } from '../../shared/components/Errorcompo/Error'
import { PizzasServices } from '../../shared/services/PizzasServices/PizzasServices'
import { SanduichesServices } from '../../shared/services/SanduicheServices/SanduicheServices'
import { handleSubmitProps } from '../../shared/services/typy'
import { DashBoard } from '../../shared/components/DashModal/DashModal'

export const CategoryOne = () => {
   const { id: category } = useParams();
   const [data, setData] = useState<handleSubmitProps[] | null>([])
   const [showError, setShowError] = useState<boolean>(true);
   const [showModal, setShowModal] = useState<boolean>(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string>('');
   const [search, setSearch] = useState('');
   const { debouse } = useDebouse();

   useEffect(() => {
      switch (category) {
         case 'salgados':
            debouse(() => {
               setIsLoading(true)
               SalgadosServices.getAll(currentPage, search).then(result => {
                  setTimeout(() => {
                     setIsLoading(false)
                  }, 500);
                  if (result instanceof Error) {
                     return setError(result.message)

                  } else {
                     return setData(result.data)
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
                     return setData(result.data)
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
                     return setData(result.data)
                  }
               })
            })
            break

      }
   }, [currentPage, search, error, showModal]);

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

   const handledeletes = (id: number) => {
      if (confirm("Realment deseja Apagar?")) {
         switch (category) {
            case 'salgados':
               SalgadosServices.deleteById(id).then(result => {
                  if (result instanceof Error) {
                     alert(result.message);
                  } else {
                     setData(oldvalue => [...oldvalue!.filter(oldinfo => oldinfo.id !== id)]);
                     alert('Registro apagado com sucesso!');
                  }
               })
               break;

            case 'pizzas':
               PizzasServices.deleteById(id).then(result => {
                  if (result instanceof Error) {
                     alert(result.message)
                  } else {
                     setData(oldvalue => [...oldvalue!.filter(oldinfo => oldinfo.id !== id)])
                     alert('Registro apagado com sucesso!');
                  }
               })
               break;

            case 'sanduiches':
               SanduichesServices.deleteById(id).then(result => {
                  if (result instanceof Error) {
                     setError(result.message);
                  } else {
                     setData(oldvalue => [...oldvalue!.filter(oldinfo => oldinfo.id !== id)])
                     alert('Registro apagado com sucesso!');
                  }
               });
               break;
         }
      }
   };


   return (
      <LayoutDefault title={category?.toString()} toolbar={

         <DeahBoard
            handleOpenDashboard={() => handleShowModalDashBoard()}
            textSearch={search}
            showModal
            text={`+`}
            handleChangeSearch={text => handleSearch(text)}
         />


      }>
         <Progress value={80} isIndeterminate colorScheme='#ff0000' />
         <Box display="flex" flexDirection="column" w="full" >
            <Wrap spacing="20px">
               {data && data.map(item => (
                  <CardCustom handledelete={() => handledeletes(item.id)} key={item.title} card={item} />
               ))}

            </Wrap>

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
               {showModal && <DashBoard showDasBoard={() => handleShowModalDashBoard()} />}
               {error && showError && <ErroComponent error={error} showErrorMessage={handleCloseModalError} />}
            </Box>
         </Box>
      </LayoutDefault>
   )
}
