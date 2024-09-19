import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

const Navbar =()=>{
   const navigate = useNavigate();
   return (
    <div className='nav-bar-container'>
        <ul className='list-container'>
            <li>Dashboard</li>
            <li>ExpenseTracker</li>

        </ul>
        <button className='add-person-btn' onClick={()=>{navigate("/add-person")}}>Add Person</button>
    </div>
   )
}

export default Navbar