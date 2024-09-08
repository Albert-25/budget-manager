import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';

const Header = () => {
  const budget = useSelector((state) => state.budget);
  const expenses = useSelector((state) => state.expenses);
  const today = new Date().toISOString().split('T')[0];
  const currentMonth = today.split('-')[1];

  const totalExpenses = expenses.filter(exp => exp.date.split('-')[1] === currentMonth).reduce((acc, expense) => acc + expense.amount, 0);
  const remainingBudget = budget - totalExpenses;

  return (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Budget Management
      </Typography>
      <Typography variant="h6">Total Budget: ${budget}</Typography>
      <Typography variant="h6">Remaining Budget: ${remainingBudget}</Typography>
    </Box>
  );
};

export default Header;