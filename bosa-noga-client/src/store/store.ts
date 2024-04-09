import { configureStore } from '@reduxjs/toolkit';
import { itemsApi } from '../api/itemsApi';
import selectedCategoryReducer from './selectedCategorySlice';
import categoriesReducer from './categoriesSlice';
import searchReducr from './searchSlice';

export const store = configureStore({
  reducer: {
    [itemsApi.reducerPath]: itemsApi.reducer,
    selectedCategory: selectedCategoryReducer,
    categories: categoriesReducer,
    search: searchReducr,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itemsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
