import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import BudgetInput from './components/BudgetInput';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import CategoryManager from './components/CategoryManager';
import AllExpensesList from './components/AllExpensesList';
import { Container, Typography, Paper, Box, Button } from '@mui/material';

const App = () => {
  return (
    <Router>
      <Container>
        <Header />
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
            <Button component={Link} to="/" variant="contained" sx={{ mr: 1 }}>Home</Button>
            <Button component={Link} to="/all" variant="contained">All Expenses</Button>
          </Box>
          <Routes>
            <Route path="/" element={
              <>
                <ExpenseForm />
                <ExpenseList />
                <ExpenseChart />
              </>
            } />
            <Route path="/all" element={<AllExpensesList />} />
          </Routes>
        </Paper>
      </Container>
    </Router>
  );
};

export default App;
