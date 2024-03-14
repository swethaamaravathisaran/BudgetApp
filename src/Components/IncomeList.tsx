import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type Income = {
    income_id: number;
    user_id: number;
    amount: number;
    date: string;
    created_at: string;
};

export default function IncomeDetails() {
    const { id } = useParams();
    const [income, setIncome] = useState<Income[]>([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(null);

    useEffect(() => {
        fetch('/api/getincome/sql', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => setIncome(data.results))
            .catch((error) => console.error('Error fetching income:', error))
            .finally(() => console.log('Income fetched'));
    }, [id]);

    const handleDelete = async (incomeId: number) => {
        try {
            const response = await fetch(`/api/delete/SQL/${incomeId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete income');
            }
            setIncome(income.filter(item => item.income_id !== incomeId));
            console.log('Income deleted successfully');
            // Add code here to delete associated expenses based on income ID
        } catch (error) {
            console.error('Error deleting income:', error);
        } finally {
            setDeleteConfirmation(null); // Reset delete confirmation after deletion
        }
    };

    return (
        <div className='flex justify-center items-center w-full h-full bg-hero-pattern'>
            <div className='max-w-md w-full'>
                <h1 className='text-black text-2xl font-bold flex items-center justify-center'>Income List</h1>
                <div className='flex flex-col gap-4'>
                    <ul>
                        {income.length > 0 ? (
                            income.map((item: Income) => (
                                <li key={item.income_id}>
                                    <div className='bg-white shadow-md rounded-md p-4 hover:bg-gray-100 transition duration-300 ease-in-out mb-10'>
                                        <Link to={`/income/${item.income_id}`} className='font-bold text-xl py-2 block'>Income ID: {item.income_id}</Link>
                                        <p>User ID: {item.user_id}</p>
                                        <p>Amount: {item.amount}</p>
                                        <p>Date: {item.date}</p>
                                        <p>Created At: {item.created_at}</p>
                                        {deleteConfirmation === item.income_id ? (
                                            <div>
                                                <button onClick={() => handleDelete(item.income_id)} className='bg-red-600 text-white py-2 px-4 rounded-md mt-2'>Confirm Delete</button>
                                                <button onClick={() => setDeleteConfirmation(null)} className='bg-gray-600 text-white py-2 px-4 rounded-md mt-2 ml-2'>Cancel</button>
                                            </div>
                                        ) : (
                                            <button onClick={() => setDeleteConfirmation(item.income_id)} className='bg-black text-white py-2 px-4 rounded-md mt-2'>Delete</button>
                                        )}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className=' text-2xl mb-5 text-black'>No income data available</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
