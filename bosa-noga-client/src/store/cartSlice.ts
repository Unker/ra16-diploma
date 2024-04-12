import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICartItem } from '../components/types';

const getLocalStorageValue = (): ICartItem[] => {
  const savedValue = localStorage.getItem('cartItems');
  return savedValue ? JSON.parse(savedValue) : [];
};

const cartSlice = createSlice({
  name: 'cartItems',
  initialState: getLocalStorageValue(),
  reducers: {
    setCartItems(state, action: PayloadAction<ICartItem[]>) {
      // Обновляем и сохраняем значение в localStorage
      localStorage.setItem('cartItems', JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
