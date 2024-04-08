import { createSlice } from '@reduxjs/toolkit';

const selectedCategorySlice = createSlice({
  name: 'selectedCategory',
  initialState: 0, // начальное значение - 0 ("Все")
  reducers: {
    setSelectedCategory(state, action) {
      return action.payload;
    },
  },
});

export const { setSelectedCategory } = selectedCategorySlice.actions;
export default selectedCategorySlice.reducer;
