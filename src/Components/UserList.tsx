import React, { useEffect, useState } from 'react';

type User = {
    user_id: number;
    user_name: string;
    email_id: string;
    password: string;
};

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch('/api/getusers/sql')
            .then((response) => response.json())
            .then((data) => setUsers(data.results))
            .catch((error) => console.error('Error fetching users:', error))
            .finally(() => console.log('Users fetched'));
    }, []);

    return (
        <div className='flex justify-center items-center w-full h-full bg-hero-pattern'>
            <div className='max-w-md w-full'>
                <h1 className='text-black text-2xl font-bold flex items-center justify-center'>User List</h1>
                <div className='flex flex-col gap-4'>
                    <ul>
                        {users.length > 0 ? (
                            users.map((user: User) => (
                                <li key={user.user_id}>
                                    <div className='bg-white shadow-md rounded-md p-4 hover:bg-gray-100 transition duration-300 ease-in-out mb-10'>
                                        <p className='font-bold text-xl border-b-2 border-black w-max'>User ID: {user.user_id}</p>
                                        <p className='font-semibold'>User Name: {user.user_name}</p>
                                        <p className='font-semibold'>Email ID: {user.email_id}</p>
                                        <p className='font-semibold'>Password: {user.password}</p>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li>No user data available</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
