import { Api } from "../axios-config"
export interface ICardDetails {
   id: number;
   title: string;
   description: string;
   image: {
      alt: string
      src: string;
   }
}

export interface ICardWithTotalCount {
   data: ICardDetails[];
   totalCount: number;
}

export const MAX_LIMIT = 8


const getAll = async (page = 1, filter = ''): Promise<ICardWithTotalCount | Error> => {
   try {
      const RealativeUrl = `/cards?_page=${page}&_limit=${MAX_LIMIT}&title_like=${filter}`;
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

const getById = async (id: number): Promise<ICardDetails | Error> => {
   try {
      const { data } = await Api.get(`/cards/${id}`);

      if (data) {
         return data;
      }

      return new Error('Erro ao consultar o regristro')
   } catch (err) {
      return new Error((err as { message: string }).message || 'Erro ao consultar o regristro')
   }
};

const create = async (dados: Omit<ICardDetails, 'id'>): Promise<number | Error> => {
   try {
      const { data } = await Api.post(`/cards/`, dados);

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
      await Api.delete(`/cards/${id}`);

   } catch (err) {
      console.log(err);
      return new Error((err as { message: string }).message || 'Erro ao deletar o regristro')
   }
}


const updatdById = async (id: number, dados: ICardDetails): Promise<void | Error> => {
   try {
      await Api.put(`/cards/${id}`, dados);

   } catch (err) {
      console.log(err);
      return new Error((err as { message: string }).message || 'Erro ao deletar o regristro')
   }
}


export const CardsServices = {
   getAll,
   getById,
   create,
   deleteById,
   updatdById
}