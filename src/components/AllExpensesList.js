import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, TextField, Box, Typography, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalDining, Flight, ElectricBolt, Movie, DirectionsCar } from '@mui/icons-material';
import { removeExpense, editExpense } from '../store/expensesSlice';
import moment from 'moment';

const categoryIcons = {
  Food: <LocalDining color="primary" />,
  Travel: <Flight color="secondary" />,
  Utilities: <ElectricBolt color="action" />,
  Entertainment: <Movie color="warning" />,
  Transport: <DirectionsCar color="success" />,
};

const AllExpensesList = () => {
  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();
  const [editId, setEditId] = React.useState(null);
  const [updatedExpense, setUpdatedExpense] = React.useState({ amount: '', description: '' });

  const handleEdit = (id) => {
    setEditId(id);
    const expense = expenses.find(exp => exp.id === id);
    if (expense) {
      setUpdatedExpense({ amount: expense.amount, description: expense.description });
    }
  };

  const handleSave = (id) => {
    dispatch(editExpense({ id, updatedData: updatedExpense }));
    setEditId(null);
  };

  // Sort expenses by date
  const sortedExpenses = [...expenses].sort((a, b) => moment(b.date).diff(moment(a.date)));

  // Group expenses by month
  const groupedExpenses = sortedExpenses.reduce((acc, expense) => {
    const monthYear = moment(expense.date).format('MMMM YYYY');
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(expense);
    return acc;
  }, {});

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, textAlign: 'center' }}>
        All Expenses
      </Typography>
      <List>
        {Object.entries(groupedExpenses).map(([monthYear, monthExpenses]) => (
          <React.Fragment key={monthYear}>
            <Divider sx={{ my: 2 }}>
              <Typography variant="subtitle1" color="textSecondary">
                {monthYear}
              </Typography>
            </Divider>
            {monthExpenses.map((expense) => (
              <ListItem key={expense.id} sx={{ mb: 1, backgroundColor: '#f5f5f5', borderRadius: 1, p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <Box sx={{ mr: 2 }}>{categoryIcons[expense.category] || <Box sx={{ width: 24, height: 24 }} />}</Box>
                  <ListItemText
                    primary={
                      <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
                        {expense.category} - ${expense.amount}
                      </Typography>
                    }
                    secondary={`Date: ${moment(expense.date).format('D MMMM, YYYY')} - ${expense.description}`}
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
            ))}
          </React.Fragment>
        ))}
        {expenses.length === 0 && (
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
            No expenses recorded
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default AllExpensesList;
