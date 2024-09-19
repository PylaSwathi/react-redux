import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../redux/expensesSlice';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';

const ExpenseForm = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const { personId } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newExpense = {
      id: uuidv4(),
      name,
      amount: parseFloat(amount),
      date: new Date().toISOString(), // Ensure date is in ISO string format
    };

    try {
      // Fetch the current person's data
      const personResponse = await fetch(`http://localhost:3001/persons/${personId}`);
      if (!personResponse.ok) {
        throw new Error('Failed to fetch person data');
      }
      const person = await personResponse.json();

      // Update the person's expenses
      const updatedExpenses = [...(person.expenses || []), newExpense];
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

      // Dispatch the action to update Redux state
      dispatch(addExpense(newExpense));

      // Clear the form fields
      setName('');
      setAmount('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto mt-5">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Expense Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
