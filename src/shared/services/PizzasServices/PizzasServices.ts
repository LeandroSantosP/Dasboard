import { Api } from "../axios-config"
import { handleSubmitProps } from '../typy'


export interface IPizzasWithTotalCount {
   data: handleSubmitProps[];
   totalCount: number;
}

export const MAX_LIMIT = 9


const getAll = async (page = 1, filter = ''): Promise<IPizzasWithTotalCount | Error> => {
   try {
      const RealativeUrl = `/pizzas?_page=${page}&_limit=${MAX_LIMIT}&title_like=${filter}`;
      const { data, headers } = await Api.get(RealativeUrl);

      if (data) {
         return {
            data,
            totalCount: Number(headers[`x-total-count`] || MAX_LIMIT)
         }
      }

      return new Error('Error ao consultar o regristro');
   } catch (err) {
      console.log(err);
      return new Error((err as { message: string }).message || 'Error ao consultar o regristro');
   }
};

const getById = async (id: number): Promise<handleSubmitProps | Error> => {
   try {
      const { data } = await Api.get(`/pizzas/${id}`);

      if (data) {
         return data;
      }

      return new Error('Erro ao consultar o regristro')
   } catch (err) {
      return new Error((err as { message: string }).message || 'Erro ao consultar o regristro')
   }
};

const create = async (dados: Omit<handleSubmitProps, 'id'>): Promise<number | Error> => {
   try {
      const { data } = await Api.post(`/pizzas/`, dados);

      if (data) {
         return data.id;
      }

      return new Error('Erro ao consultar o regristro')
   } catch (err) {
      return new Error((err as { message: string }).message || 'Erro ao consultar o regristro');
   }
}

const deleteById = async (id: number): Promise<void | Error> => {
   try {
      await Api.delete(`/pizzas/${id}`);

   } catch (err) {
      console.log(err);
      return new Error((err as { message: string }).message || 'Erro ao deletar o regristro')
   }
}


const updatdById = async (id: number, dados: handleSubmitProps): Promise<void | Error> => {
   try {
      await Api.put(`/pizzas/${id}`, dados);

   } catch (err) {
      console.log(err);
      return new Error((err as { message: string }).message || 'Erro ao deletar o regristro')
   }
}


export const PizzasServices = {
   getAll,
   getById,
   create,
   deleteById,
   updatdById
}