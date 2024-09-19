import AddPerson from "./components/AddPerson"
import Dashboard from "./components/Dashboard"
import ExpenseTracker from "./components/ExpenseTracker"
import Navbar from "./components/Navbar"

import { BrowserRouter,Route,Router,Routes } from "react-router-dom"

const App =()=>{
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/add-person" element={<AddPerson/>}/>
          <Route path="/expense-tracker" element={<ExpenseTracker/>}/>

        </Routes>
    </BrowserRouter>
    
  )
}

export default App