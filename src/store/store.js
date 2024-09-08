import { configureStore } from '@reduxjs/toolkit';
import budgetReducer from './budgetSlice';
import expensesReducer from './expensesSlice';
import categoriesReducer from './categorySlice';

const store = configureStore({
  reducer: {
    budget: budgetReducer,
    expenses: expensesReducer,
    categories: categoriesReducer,
  },
});

export default store;
