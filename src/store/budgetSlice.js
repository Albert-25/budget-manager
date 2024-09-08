import { createSlice } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
  name: 'budget',
  initialState: 0, // Default budget
  reducers: {
    setBudget: (state, action) => action.payload,
  },
});

export const { setBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
