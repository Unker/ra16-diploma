// api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IItemShort, ICategory, IItemFull, IOrder,
} from '../components/types';

interface IGetItemsArgs {
  categoryId?: number | string;
  offset?: number | string;
  q?: string | string
}

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({

    getCategories: builder.query<ICategory[], void>({
      query: () => '/categories',
    }),
    getTopSales: builder.query<IItemShort[], void>({
      query: () => '/top-sales',
    }),
    getItems: builder.query<IItemShort[], IGetItemsArgs>({
      query: ({ categoryId = '', offset = 0, q = '' }) => {
        // url: `/items?categoryId=${categoryId}&offset=${offset}&q=${q}`,
        const queryParams = new URLSearchParams();

        if (categoryId) queryParams.append('categoryId', categoryId.toString());
        if (offset) queryParams.append('offset', offset.toString());
        if (q) queryParams.append('q', q);

        const params = queryParams.toString();

        return {
          url: `/items${params ? `?${params}` : ''}`,
        };
      },
    }),
    getItemById: builder.query<IItemFull, number>({
      query: (id) => `/items/${id}`,
    }),
    createOrder: builder.mutation<IOrder, IOrder>({
      query: (order) => ({
        url: '/order',
        method: 'POST',
        body: order,
      }),
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const {
  useGetItemsQuery,
  useGetCategoriesQuery,
  useGetTopSalesQuery,
  useGetItemByIdQuery,
  useCreateOrderMutation,
} = itemsApi;
