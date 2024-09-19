import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addIncome } from '../redux/incomeSlice';
import { v4 as uuidv4 } from 'uuid';

const IncomeForm = () => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const { personId } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newIncome = { id: uuidv4(), source, amount: parseFloat(amount),  date: new Date().toISOString() };

    try {
      // Fetch the current person's data
      const personResponse = await fetch(`http://localhost:3001/persons/${personId}`);
      if (!personResponse.ok) {
        throw new Error('Failed to fetch person data');
      }
      const person = await personResponse.json();

      // Update the person's income
      const updatedIncome = [...(person.income || []), newIncome];
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

      // Dispatch the action to update Redux state
      dispatch(addIncome(newIncome));

      // Clear the form fields
      setSource('');
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
          placeholder="Income Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
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
      <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
        Add Income
      </button>
    </form>
  );
};

export default IncomeForm;





















// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addIncome } from '../redux/incomeSlice';
// import { v4 as uuidv4 } from 'uuid';

// const IncomeForm = () => {
//   const [source, setSource] = useState('');
//   const [amount, setAmount] = useState('');
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(addIncome({ id: uuidv4(), source, amount: parseFloat(amount), date: new Date() }));
//     setSource('');
//     setAmount('');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto mt-5">
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Income Source"
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <input
//           type="number"
//           placeholder="Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//           required
//         />
//       </div>
//       <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
//         Add Income
//       </button>
//     </form>
//   );
// };

// export default IncomeForm;
