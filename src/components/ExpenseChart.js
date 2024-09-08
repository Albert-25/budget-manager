import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { summarizeExpenses } from '../utils/summarizeExpenses';
import { format } from 'date-fns';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ExpenseChart = () => {
  const expenses = useSelector((state) => state.expenses);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const { daily } = summarizeExpenses(expenses, selectedYear, selectedMonth);

  const data = {
    labels: Object.keys(daily),
    datasets: [
      {
        label: 'Daily Expenses',
        data: Object.values(daily),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: $${typeof context.raw === 'number' ? context.raw.toFixed(2) : 'N/A'}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          maxRotation: 90,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount ($)',
        },
      },
    },
  };

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Summary {format(new Date(selectedYear, selectedMonth - 1), 'MMMM yyyy')}
      </h2>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
        <div>
          <label htmlFor="month" style={{ marginRight: '10px' }}>Month:</label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          >
            {months.map(month => (
              <option key={month} value={month}>
                {format(new Date(2000, month - 1), 'MMMM')}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year" style={{ marginRight: '10px' }}>Year:</label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;
