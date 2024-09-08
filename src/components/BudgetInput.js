import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBudget } from '../store/budgetSlice';
import { TextField, Button, Box } from '@mui/material';

const BudgetInput = () => {
  const [budget, setBudgetAmount] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setBudget(Number(budget)));
    setBudgetAmount('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        type="number"
        value={budget}
        onChange={(e) => setBudgetAmount(e.target.value)}
        label="Enter your budget"
        variant="outlined"
        sx={{ mr: 2 }}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Set Budget
      </Button>
    </Box>
  );
};

export default BudgetInput;
