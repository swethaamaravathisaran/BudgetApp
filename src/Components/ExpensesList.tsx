import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type Expense = {
    expense_id: number;
    user_id: number;
    amount: number;
    date: string;
    category_id: number;
    created_at: string;
    description: string;
};

export default function ExpensesDetails() {
    const { id } = useParams();
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        fetch('/api/getexpenses/sql', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => setExpenses(data.results))
            .catch((error) => console.error('Error fetching expenses:', error))
            .finally(() => console.log('Expenses fetched'));
    }, [id]);

    const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(null);

    const handleDelete = async (expenseId: number) => {
        try {
            const response = await fetch(`/api/delete/expense/SQL/${expenseId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete expense');
            }
            setExpenses(expenses.filter(expense => expense.expense_id !== expenseId));
            console.log('Expense deleted successfully');
        } catch (error) {
            console.error('Error deleting expense:', error);
        } finally {
            setDeleteConfirmation(null); // Reset delete confirmation after deletion
        }
    };

    return (
        <div className='flex justify-center items-center w-full bg-hero-pattern'>
            <div className='max-w-lg w-full'>
                <h1 className='text-black text-2xl font-bold flex items-center justify-center mt-3'>Expense List</h1>
                <div>
                    <ul>
                        {expenses.length > 0 ? (
                            expenses.map((expense: Expense) => (
                                <li key={expense.expense_id}>
                                    <div className='bg-white shadow-md rounded-md p-4 hover:bg-gray-100 transition duration-300 ease-in-out mb-10'>
                                        <Link to={`/expense/${expense.expense_id}`} className='font-bold text-xl py-2 block'>Expense ID: {expense.expense_id}</Link>
                                        <p>User ID: {expense.user_id}</p>
                                        <p>Amount: {expense.amount}</p>
                                        <p>Date: {expense.date}</p>
                                        <p>Category ID: {expense.category_id}</p>
                                        <p>Created At: {expense.created_at}</p>
                                        <p>Description: {expense.description}</p>
                                        {deleteConfirmation === expense.expense_id ? (
                                            <div>
                                                <button onClick={() => handleDelete(expense.expense_id)} className='bg-red-600 text-white py-2 px-4 rounded-md mt-2'>Confirm Delete</button>
                                                <button onClick={() => setDeleteConfirmation(null)} className='bg-gray-600 text-white py-2 px-4 rounded-md mt-2 ml-2'>Cancel</button>
                                            </div>
                                        ) : (
                                            <button onClick={() => setDeleteConfirmation(expense.expense_id)} className='bg-black text-white py-2 px-4 rounded-md mt-2'>Delete</button>
                                        )}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li>No expense data available</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
