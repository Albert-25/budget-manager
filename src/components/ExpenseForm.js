import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '../store/expensesSlice';
import { addCustomCategory } from '../store/categorySlice';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Typography, Grid, Paper, Modal, ListItemIcon } from '@mui/material';
import { LocalDining, Flight, ElectricBolt, Movie, AddCircle, DirectionsCar } from '@mui/icons-material';

// Define icons for each category
const categoryIcons = {
  Food: <LocalDining color="primary" />,
  Travel: <Flight color="secondary" />,
  Utilities: <ElectricBolt color="action" />,
  Entertainment: <Movie color="warning" />,
  Transport: <DirectionsCar color="success" />, // Added Transport icon
  'New Category': <AddCircle color="action" />,
};

const ExpenseForm = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const dispatch = useDispatch();
  const defaultCategories = useSelector((state) => state.categories.defaultCategories);
  const customCategories = useSelector((state) => state.categories.customCategories);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount.trim() === '' || !Number(amount) || date.trim() === '') {
      return; // Add error handling if needed
    }
    const newExpense = {
      id: Date.now(),
      category,
      amount: Number(amount),
      date,
      description,
    };
    dispatch(addExpense(newExpense));
    setCategory('');
    setAmount('');
    setDescription('');
    // Set the date to the current date instead of clearing it
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'new') {
      setOpenModal(true);
    } else {
      setCategory(selectedValue);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewCategory('');
  };

  const handleSaveCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCustomCategory(newCategory));
      setCategory(newCategory);
      handleCloseModal();
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
          bgcolor: 'background.paper',
          maxWidth: 600,
          margin: 'auto',
          mt: 4,
        }}
      >
        <Typography variant="h6" gutterBottom align="center">
          Add New Expense
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={handleCategoryChange}
                label="Category"
                required
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {categoryIcons[selected] || categoryIcons['New Category']}
                    <Typography sx={{ ml: 1 }}>{selected}</Typography>
                  </Box>
                )}
              >
                {defaultCategories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    <ListItemIcon>{categoryIcons[cat]}</ListItemIcon>
                    {cat}
                  </MenuItem>
                ))}
                {customCategories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    <ListItemIcon>{categoryIcons[cat] || categoryIcons['New Category']}</ListItemIcon>
                    {cat}
                  </MenuItem>
                ))}
                <MenuItem value="new">
                  <ListItemIcon>{categoryIcons['New Category']}</ListItemIcon>
                  New Category
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
              sx={{ mt: 2, px: 3 }}
            >
              Add Expense
            </Button>
          </Grid>

        </Grid>
      </Box>

      {/* Modal for adding new category */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper
          sx={{
            p: 3,
            width: 400,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Category
          </Typography>
          <TextField
            label="Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              color="secondary"
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveCategory}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default ExpenseForm;
