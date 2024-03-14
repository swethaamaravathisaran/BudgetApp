import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type Income = {
    income_id: number,
    user_id: number,
    amount: number,
    date: string,
    created_at: string
}

export default function GetIncome() {
    const [userIdInput, setUserIdInput] = useState<string>('');
    const [user_id, setUser_id] = useState<string>('');
    const [income, setIncome] = useState<Income[]>([]);

    useEffect(() => {
        if (user_id) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`/api/income-sql-get/${user_id}`, { method: 'GET' });
                    if (!response.ok) {
                        throw new Error('Failed to fetch income');
                    }
                    const data = await response.json();
                    setIncome(data.results);
                    console.log('Income fetched');
                } catch (error) {
                    console.error('Error fetching income:', error);
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
            <h1 className='text-black text-2xl font-bold flex items-center justify-center mt-10'>Income List</h1>
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
                    {income.length > 0 ? (
                        income.map((income: Income) => (
                            <li key={income.income_id}>
                                <div className='bg-white shadow-md rounded-md p-4 hover:bg-gray-100 transition duration-300 ease-in-out mb-10 '>
                                   <p className='font-bold text-xl py-2 block'>User ID: {income.user_id}</p>
                                    <Link to={`/income/${income.income_id}`}>Income ID: {income.income_id}</Link>
                                   
                                    <p>Amount: {income.amount}</p>
                                    <p>Date: {income.date}</p>
                                    <p>Created At: {income.created_at}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className='mb-10'>No income data available</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
