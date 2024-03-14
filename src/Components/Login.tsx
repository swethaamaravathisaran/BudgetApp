import React, { useState } from 'react';

export default function Login() {
  const [userDetails, setUserDetails] = useState({
    user_id: '',
    user_name: '',
    email_id: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('api/newuser/sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
      });
      
      if (response.ok) {
        console.log('User added successfully');
        // Clear input values
        setUserDetails({
          user_id: '',
          user_name: '',
          email_id: '',
          password: ''
        });
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.error('User not added');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-hero-pattern">
      <div className="bg-white bg-opacity-80 rounded-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome to Budget Tracker</h2>
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">Signup</h2>
          <div className="flex flex-col gap-4">
            <div className="mb-4">
              <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">User ID :</label>
              <input type="text" id="user_id" name="user_id" value={userDetails.user_id} className="mt-1 p-2 w-full border-gray-300 rounded-md" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username :</label>
              <input type="text" id="username" name="user_name" value={userDetails.user_name} className="mt-1 p-2 w-full border-gray-300 rounded-md" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email :</label>
              <input type="email" id="email" name="email_id" value={userDetails.email_id} className="mt-1 p-2 w-full border-gray-300 rounded-md" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password :</label>
              <input type="password" id="password" name="password" value={userDetails.password} className="mt-1 p-2 w-full border-gray-300 rounded-md" onChange={handleChange} />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
