import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AddIncome from './Components/AddIncome';
import AddExpenses from './Components/AddExpenses';
import ExpensesList from './Components/ExpensesList';
import IncomeList from './Components/IncomeList';
import Login from './Components/Login';
import Report from './Components/Report';
import AddCategory from './Components/AddCategory';
import CategoryList from './Components/CategoryList';
import GetExpenses from './Components/GetExpenses';
import GetIncome from './Components/GetIncome';
import UserList from './Components/UserList';

interface LinkContainerProps {
  to: string;
  title: string;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-col items-center justify-center min-h-screen bg-hero-pattern'>
        <h1 className='text-4xl font-bold text-gray-800 my-8'>BUDGET TRACKER APP</h1>
        <h2 className='text-3xl font-bold text-gray-700 py-2'>MANAGE YOUR INCOME AND EXPENSES EASILY !!!</h2>

        <div className="w-full flex  flex-row gap-2 justify-start pl-8">
          <Link to="/Login" className="font-bold text-2xl mt-10 bg-white px-6 py-2 rounded-md max-w-md">SIGNUP</Link>

          <p  className="font-bold text-2xl mt-10 bg-white px-6 py-2 rounded-md max-w-md">LOGIN</p>
        </div>

        <nav className="grid grid-cols-2 gap-4 w-full max-w-lg mt-8">
          <LinkContainer to="/newincome/sql" title="Add Income" />
          <LinkContainer to="/newexpenses/sql" title="Add Expenses" />
          <LinkContainer to="/newecategory/sql" title="Add New Category" />
          <LinkContainer to="/expense-sql-get/:user_id" title="Get Expenses Details"/>
          <LinkContainer to="/income-sql-get/:user_id" title="Get Income Details" />
          <LinkContainer to="/getincome/sql" title="Income List" />
          <LinkContainer to="/getexpenses/sql" title="Expense List" />
          <LinkContainer to="/getcategories/sql" title="Categories List" />
          <LinkContainer to="/getusers/sql" title="UserList" />
          <LinkContainer to="/gettotals/sql/:user_id" title="Report" />
          
        </nav>

        <Routes>
          <Route path='/newincome/sql' element={<AddIncome />} />
          <Route path='/newexpenses/sql' element={<AddExpenses />} />
          <Route path='/newecategory/sql' element={<AddCategory />} />
          <Route path='/expense-sql-get/:user_id' element={<GetExpenses />} />
          <Route path='/getexpenses/sql' element={<ExpensesList />} />
          <Route path='/getincome/sql' element={<IncomeList />} />
          <Route path='/income-sql-get/:user_id' element={<GetIncome/>} />
          <Route path='/Login' element={<Login />} />
          <Route path='/gettotals/sql/:user_id' element={<Report />} />
          <Route path='/getcategories/sql' element={<CategoryList />} />
          <Route path='/getusers/sql' element={<UserList />} />
          
          
        </Routes>
      </div>
    </BrowserRouter>
  )
}

const LinkContainer: React.FC<LinkContainerProps> = ({ to, title }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 hover:bg-gray-100 transition duration-300 ease-in-out">
      <Link to={to} className="text-lg font-semibold text-gray-800">{title}</Link>
    </div>
  );
};
