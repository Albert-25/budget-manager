import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, TextField, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalDining, Flight, ElectricBolt, Movie, DirectionsCar } from '@mui/icons-material';
import { removeExpense, editExpense } from '../store/expensesSlice';

// Define icons for each category
const categoryIcons = {
  Food: <LocalDining color="primary" />,
  Travel: <Flight color="secondary" />,
  Utilities: <ElectricBolt color="action" />,
  Entertainment: <Movie color="warning" />,
  Transport: <DirectionsCar color="success" />,
};

const ExpenseList = () => {
  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();
  const [editId, setEditId] = React.useState(null);
  const [updatedExpense, setUpdatedExpense] = React.useState({ amount: '', description: '' });

  // Get today's date in yyyy-mm-dd format
  const today = new Date().toISOString().split('T')[0];

  // Filter expenses for today
  const todayExpenses = expenses.filter(expense => expense.date === today);

  const handleEdit = (id) => {
    setEditId(id);
    const expense = todayExpenses.find(exp => exp.id === id);
    if (expense) {
      setUpdatedExpense({ amount: expense.amount, description: expense.description });
    }
  };

  const handleSave = (id) => {
    dispatch(editExpense({ id, updatedData: updatedExpense }));
    setEditId(null);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ mb: 2, textAlign: 'center' }}
      >
        Today's Expenses
      </Typography>
      <List>
        {todayExpenses.length === 0 ? (
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
            No expenses for today
          </Typography>
        ) : (
          todayExpenses.map((expense) => (
            <ListItem key={expense.id} sx={{ mb: 1, backgroundColor: '#f5f5f5', borderRadius: 1, p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                {/* Category icon */}
                <Box sx={{ mr: 2 }}>{categoryIcons[expense.category] || <Box sx={{ width: 24, height: 24 }} />}</Box>
                <ListItemText
                  primary={
                    <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
                      {expense.category} - ${expense.amount}
                    </Typography>
                  }
                  secondary={`Date: ${expense.date} - ${expense.description}`}
                />
              </Box>
              <ListItemSecondaryAction>
                {editId === expense.id ? (
                  <>
                    <TextField
                      label="Amount"
                      type="number"
                      value={updatedExpense.amount}
                      onChange={(e) => setUpdatedExpense({ ...updatedExpense, amount: e.target.value })}
                      sx={{ mr: 2, width: 120 }}
                    />
                    <TextField
                      label="Description"
                      value={updatedExpense.description}
                      onChange={(e) => setUpdatedExpense({ ...updatedExpense, description: e.target.value })}
                      sx={{ mr: 2, width: 200 }}
                    />
                    <IconButton edge="end" color="primary" onClick={() => handleSave(expense.id)}>
                      Save
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton edge="end" color="primary" onClick={() => handleEdit(expense.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" color="secondary" onClick={() => dispatch(removeExpense(expense.id))}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default ExpenseList;
