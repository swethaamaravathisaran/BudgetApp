import React, { useState } from 'react';

type Income = {
  income_id: number;
  user_id: number;
  amount: number;
  date: string;
  created_at: string;
};

export default function AddIncome() {
  const [income, setIncome] = useState<Income>({
    income_id: 0,
    user_id: 0,
    amount: 0,
    date: '',
    created_at: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIncome({
      ...income,
      [name]: value,
    });
  };

  const onSubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/newincome/sql', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(income),
      });
      const data = await response.text();
      console.log(data);

      // Reset the input fields after successful submission
      setIncome({
        income_id: 0,
        user_id: 0,
        amount: 0,
        date: '',
        created_at: '',
      });

      // Set submitted state to true for showing success message or other UI changes
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000); // Reset submitted state after 3 seconds
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  return (
    <div className='h-screen w-full bg-hero-pattern'>
      <body>
        <div className="flex items-center justify-center min-h-screen">
          <div className="overlay w-full h-full flex items-center justify-center">
            <div className="m-auto p-10 bg-white bg-opacity-80 rounded-md">
              <h1 className="text-3xl font-bold mb-8 text-center">Income Management</h1>
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Add New Income</h2>
                <form onSubmit={onSubmitData} id="addIncomeForm">
                  <div className="mb-4">
                    <label htmlFor="income_id" className="block text-sm font-medium text-gray-700">Income ID:</label>
                    <input
                      type="number"
                      id="income_id"
                      name="income_id"
                      className="mt-1 p-2 w-full border-gray-300 rounded-md"
                      value={income.income_id}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">User ID:</label>
                    <input
                      type="number"
                      id="user_id"
                      name="user_id"
                      className="mt-1 p-2 w-full border-gray-300 rounded-md"
                      value={income.user_id}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount:</label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      className="mt-1 p-2 w-full border-gray-300 rounded-md"
                      value={income.amount}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="mt-1 p-2 w-full border-gray-300 rounded-md"
                      value={income.date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="created_at" className="block text-sm font-medium text-gray-700">Created At:</label>
                    <input
                      type="date"
                      id="created_at"
                      name="created_at"
                      className="mt-1 p-2 w-full border-gray-300 rounded-md"
                      value={income.created_at}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 w-full">Add Income</button>
                </form>
                {submitted && (
                  <p className="text-green-600 mt-8 text-center ">Income added successfully!</p>
                )}
              </div>
              <hr className="mb-8"/>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}
