import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type Expense = {
    expense_id: number,
    user_id: number,
    amount: number,
    date: string,
    category_id: number,
    created_at: string,
    description: string
}

export default function GetExpenses() {
    const [userIdInput, setUserIdInput] = useState<string>(''); // State to store user input
    const [user_id, setUser_id] = useState<string>(''); // State to store user_id
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        if (user_id) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`/api/expense-sql-get/${user_id}`, { method: 'GET' });
                    if (!response.ok) {
                        throw new Error('Failed to fetch expenses');
                    }
                    const data = await response.json();
                    setExpenses(data.results);
                    console.log('Expenses fetched');
                } catch (error) {
                    console.error('Error fetching expenses:', error);
                }
            };

            fetchData();
        }
    }, [user_id]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUser_id(userIdInput);
    };

    return (
        <div className='bg-hero-pattern max-h-full flex flex-col items-center justify-center w-full'>
            <h1 className='text-black text-2xl font-bold flex items-center justify-center mt-10'>Expense List</h1>
            <form className="flex justify-center mt-4" onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    className="px-4 py-2 border border-gray-400 rounded-md mr-2 mt-4 mb-4" 
                    placeholder="Enter User ID"
                    value={userIdInput}
                    onChange={(e) => setUserIdInput(e.target.value)}
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 mb-4">Submit</button>
            </form>
            <div>
                <ul>
                    {expenses.length > 0 ? (
                        expenses.map((expense: Expense) => (
                            <li key={expense.expense_id}>
                                <div className='bg-white shadow-md rounded-md p-4 hover:bg-gray-100 transition duration-300 ease-in-out mb-10 '>
                                    <p className='font-bold text-xl py-2 block'>User ID: {expense.user_id}</p>
                                    <Link to={`/expense/${expense.expense_id}`} >Expense ID: {expense.expense_id}</Link>
                                   
                                    <p>Amount: {expense.amount}</p>
                                    <p>Date: {expense.date}</p>
                                    <p>Category_id: {expense.category_id}</p>
                                    <p>Created At: {expense.created_at}</p>
                                    <p>Description: {expense.description}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className='mb-10'>No expense data available</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
