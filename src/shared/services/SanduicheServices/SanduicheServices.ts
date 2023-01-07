import { Api } from "../axios-config"

export interface ISanduicheDetails {
   id: number;
   title: string;
   description: string;
   image: {
      alt: string
      src: string;
   }
}

export interface ISanduicheWithTotalCount {
   data: ISanduicheDetails[];
   totalCount: number;
}

export const MAX_LIMIT = 8


const getAll = async (page = 1, filter = ''): Promise<ISanduicheWithTotalCount | Error> => {
   try {
      const RealativeUrl = `/sanduiches?_page=${page}&_limit=${MAX_LIMIT}&title_like=${filter}`;
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

const getById = async (id: number): Promise<ISanduicheDetails | Error> => {
   try {
      const { data } = await Api.get(`/sanduiches/${id}`);

      if (data) {
         return data;
      }

      return new Error('Erro ao consultar o regristro')
   } catch (err) {
      return new Error((err as { message: string }).message || 'Erro ao consultar o regristro')
   }
};

const create = async (dados: Omit<ISanduicheDetails, 'id'>): Promise<number | Error> => {
   try {
      const { data } = await Api.post(`/sanduiches/`, dados);

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
      await Api.delete(`/sanduiches/${id}`);

   } catch (err) {
      console.log(err);
      return new Error((err as { message: string }).message || 'Erro ao deletar o regristro')
   }
}


const updatdById = async (id: number, dados: ISanduicheDetails): Promise<void | Error> => {
   try {
      await Api.put(`/sanduiches/${id}`, dados);

   } catch (err) {
      console.log(err);
      return new Error((err as { message: string }).message || 'Erro ao deletar o regristro')
   }
}


export const SanduichesServices = {
   getAll,
   getById,
   create,
   deleteById,
   updatdById
}