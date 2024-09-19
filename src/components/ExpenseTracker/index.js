import React from 'react';
import ExpenseForm from '../ExpenseForm';
import ExpenseList from '../ExpenseList';
import IncomeForm from '../IncomeForm';
import IncomeList from '../IncomeList';
import Dashboard from '../Dashboard';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';

function ExpenseTracker() {
    const location = useLocation();
    const username = location.state?.username || 'Guest';
    const personId = location.state?.personId || 'null';
    const navigate = useNavigate();

    console.log('Person ID:', personId);
  return (
    <div className="App">
      <h1 className="text-2xl text-center mt-10">Expense Tracker for {username}!</h1>
      <div className="flex justify-center space-x-10">
        <div>
          <h2 className="text-xl text-center mt-5">Add Expense</h2>
          <ExpenseForm />
          <ExpenseList />
        </div>
        <div>
          <h2 className="text-xl text-center mt-5">Add Income</h2>
          <IncomeForm />
          <IncomeList />
        </div>
        
      </div>
      <div className='btn-container'>
      <button onClick={()=>navigate("/")} className='btn'>Visualize in Dashboard</button>
      </div>
      
    </div>
  );
}

export default ExpenseTracker;
