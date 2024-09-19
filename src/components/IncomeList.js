import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeIncome } from '../redux/incomeSlice';
import { useLocation } from 'react-router-dom';

const IncomeList = () => {
  const location = useLocation();
  const { personId } = location.state || {};

  const income = useSelector((state) => state.income.income);
  const dispatch = useDispatch();
  
  const handleRemove = async (incomeId) => {
    try {
      // Fetch the current person's data
      const personResponse = await fetch(`http://localhost:3001/persons/${personId}`);
      if (!personResponse.ok) {
        throw new Error('Failed to fetch person data');
      }
      const person = await personResponse.json();
  
      // Filter out the income to be removed
      const updatedIncome = person.income.filter((item) => item.id !== incomeId);
  
      // Update the person's income in the backend
      const updateResponse = await fetch(`http://localhost:3001/persons/${personId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ income: updatedIncome }),
      });
  
      if (!updateResponse.ok) {
        throw new Error('Failed to update person data');
      }
  
      // Dispatch action to remove income from Redux state
      dispatch(removeIncome(incomeId));
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <ul className="w-full max-w-sm mx-auto mt-5">
      {income.map((item) => (
        <li
          key={item.id}
          className="flex justify-between p-2 border-b border-gray-200"
        >
          <span>{item.source}</span>
          <span>${item.amount.toFixed(2)}</span>
          <button
            onClick={() => handleRemove(item.id)}
            className="text-red-500"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default IncomeList;
