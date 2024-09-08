import { parseISO, format, eachDayOfInterval, startOfMonth, endOfMonth, setYear, setMonth } from 'date-fns';

export const summarizeExpenses = (expenses, year, month) => {
  const selectedDate = setYear(setMonth(new Date(), month - 1), year);
  const startOfSelectedMonth = startOfMonth(selectedDate);
  const endOfSelectedMonth = endOfMonth(selectedDate);

  const dailySummary = {};

  // Generate all days in the selected month
  const allDays = eachDayOfInterval({
    start: startOfSelectedMonth,
    end: endOfSelectedMonth,
  });

  // Initialize each day of the selected month with 0 expenses
  allDays.forEach(day => {
    const formattedDay = format(day, 'yyyy-MM-dd');
    dailySummary[formattedDay] = 0;
  });

  // Add the actual expenses to the daily summary
  expenses.forEach(exp => {
    const expenseDate = format(parseISO(exp.date), 'yyyy-MM-dd');
    if (dailySummary[expenseDate] !== undefined) {
      dailySummary[expenseDate] += exp.amount;
    }
  });

  return {
    daily: dailySummary,
  };
};
