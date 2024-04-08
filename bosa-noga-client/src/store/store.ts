import { configureStore } from '@reduxjs/toolkit';
import { itemsApi } from '../api/itemsApi';

export const store = configureStore({
  reducer: {
    [itemsApi.reducerPath]: itemsApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itemsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
