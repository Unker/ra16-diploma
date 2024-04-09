// api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IItemShort, ICategory } from '../components/types';

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
      query: () => 'api/categories',
    }),
    getTopSales: builder.query<IItemShort[], void>({
      query: () => 'api/top-sales',
    }),
    getItems: builder.query<IItemShort[], IGetItemsArgs>({
      query: ({ categoryId = '', offset = 0, q = '' }) => {
        // url: `api/items?categoryId=${categoryId}&offset=${offset}&q=${q}`,
        const queryParams = new URLSearchParams();

        if (categoryId) queryParams.append('categoryId', categoryId.toString());
        if (offset) queryParams.append('offset', offset.toString());
        if (q) queryParams.append('q', q);

        const params = queryParams.toString();

        return {
          url: `api/items${params ? `?${params}` : ''}`,
        };
      },
    }),
    getItemById: builder.query<IItemShort, number>({
      query: (id) => `api/items/${id}`,
    }),
  }),
});

export const {
  useGetItemsQuery, useGetCategoriesQuery, useGetTopSalesQuery, useGetItemByIdQuery,
} = itemsApi;
