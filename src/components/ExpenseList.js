import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeExpense } from '../redux/expensesSlice';
import { useLocation } from 'react-router-dom';

const ExpenseList = () => {
  const location = useLocation();
  const { personId } = location.state || {};  // Get the personId from route state

  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();

  const handleRemove = async (expenseId) => {
    try {
      // Fetch the current person's data
      const personResponse = await fetch(`http://localhost:3001/persons/${personId}`);
      if (!personResponse.ok) {
        throw new Error('Failed to fetch person data');
      }
      const person = await personResponse.json();

      // Filter out the expense to be removed
      const updatedExpenses = person.expenses.filter((item) => item.id !== expenseId);

      // Update the person's expenses in the backend
      const updateResponse = await fetch(`http://localhost:3001/persons/${personId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expenses: updatedExpenses }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update person data');
      }

      // Dispatch action to remove expense from Redux state
      dispatch(removeExpense(expenseId));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ul className="w-full max-w-sm mx-auto mt-5">
      {expenses.map((expense) => (
        <li
          key={expense.id}
          className="flex justify-between p-2 border-b border-gray-200"
        >
          <span>{expense.name}</span>
          <span>${expense.amount.toFixed(2)}</span>
          <button
            onClick={() => handleRemove(expense.id)}
            className="text-red-500"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
