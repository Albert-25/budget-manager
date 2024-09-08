import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    defaultCategories: ['Food', 'Transport', 'Utilities', 'Entertainment'],
    customCategories: [],
  },
  reducers: {
    addCustomCategory: (state, action) => {
      state.customCategories.push(action.payload);
    },
  },
});

export const { addCustomCategory } = categorySlice.actions;
export default categorySlice.reducer;
