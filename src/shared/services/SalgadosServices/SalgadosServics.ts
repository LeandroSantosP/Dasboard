import { Api } from "../axios-config"

export interface ISalgadoDetails {
   id: number;
   title: string;
   description: string;
   image: {
      alt: string
      src: string;
   }
}

export interface ISalgadoWithTotalCount {
   data: ISalgadoDetails[];
   totalCount: number;
}

export const MAX_LIMIT = 8


const getAll = async (page = 1, filter = ''): Promise<ISalgadoWithTotalCount | Error> => {
   try {
      const RealativeUrl = `/salgados?_page=${page}&_limit=${MAX_LIMIT}&title_like=${filter}`;
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

const getById = async (id: number): Promise<ISalgadoDetails | Error> => {
   try {
      const { data } = await Api.get(`/salgados/${id}`);

      if (data) {
         return data;
      }

      return new Error('Erro ao consultar o regristro')
   } catch (err) {
      return new Error((err as { message: string }).message || 'Erro ao consultar o regristro')
   }
};

const create = async (dados: Omit<ISalgadoDetails, 'id'>): Promise<number | Error> => {
   try {
      const { data } = await Api.post(`/salgados/`, dados);

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
      await Api.delete(`/salgados/${id}`);

   } catch (err) {
      console.log(err);
      return new Error((err as { message: string }).message || 'Erro ao deletar o regristro')
   }
}


const updatdById = async (id: number, dados: ISalgadoDetails): Promise<void | Error> => {
   try {
      await Api.put(`/salgados/${id}`, dados);

   } catch (err) {
      console.log(err);
      return new Error((err as { message: string }).message || 'Erro ao deletar o regristro')
   }
}


export const SalgadosServices = {
   getAll,
   getById,
   create,
   deleteById,
   updatdById
}