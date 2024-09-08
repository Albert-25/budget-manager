import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { addCustomCategory } from '../store/categorySlice';

const CategoryManager = () => {
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();
  const defaultCategories = useSelector((state) => state.categories.defaultCategories);
  const customCategories = useSelector((state) => state.categories.customCategories);

  const handleAddCategory = () => {
    if (newCategory && !customCategories.includes(newCategory)) {
      dispatch(addCustomCategory(newCategory));
      setNewCategory('');
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Category"
        >
          {defaultCategories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
          {customCategories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <TextField
        label="New Category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        sx={{ mr: 2 }}
      />
      <Button onClick={handleAddCategory} variant="contained" color="primary">
        Add Category
      </Button>
    </Box>
  );
};

export default CategoryManager;