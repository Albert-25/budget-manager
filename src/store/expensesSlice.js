import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: [],
  reducers: {
    addExpense: (state, action) => {
      state.push(action.payload);
    },
    editExpense: (state, action) => {
      const { id, updatedData } = action.payload;
      const expense = state.find(exp => exp.id === id);
      if (expense) {
        Object.assign(expense, updatedData);
      }
    },
    removeExpense: (state, action) => {
      return state.filter(expense => expense.id !== action.payload);
    },
  },
});

export const { addExpense, editExpense, removeExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
