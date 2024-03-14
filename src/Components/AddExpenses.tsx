import React, { useState } from 'react';

type Expense = {
  expense_id: number;
  user_id: number;
  amount: number;
  date: string;
  category_id: number;
  created_at: string;
  description: string;
};

export default function AddExpenses() {
  const [expense, setExpense] = useState<Expense>({
    expense_id: 0,
    user_id: 0,
    amount: 0,
    date: '',
    category_id: 0,
    created_at: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const onSubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/newexpenses/sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });
      const data = await response.text();
      console.log(data);

      // Reset the input fields after successful submission
      setExpense({
        expense_id: 0,
        user_id: 0,
        amount: 0,
        date: '',
        category_id: 0,
        created_at: '',
        description: '',
      });

      // Set submitted state to true for showing success message or other UI changes
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000); // Reset submitted state after 3 seconds
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className='max-h-full w-full bg-hero-pattern'>
      <div className="overlay w-full h-full flex items-center justify-center">
        <div className="m-auto p-10 bg-white bg-opacity-80 rounded-md max-w-lg mt-6 mb-10">
          <h1 className="text-3xl font-bold mb-8 text-center">Expense Management</h1>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
            <form onSubmit={onSubmitData} id="addExpenseForm">
              <div className="flex flex-col md:space-y-4">
                <div className="mb-4">
                  <label htmlFor="expenseid" className="block text-sm font-medium text-gray-700">Expense ID</label>
                  <input
                    type="text"
                    id="expenseid"
                    name="expenseid"
                    className="mt-1 p-2 w-full border-gray-300 rounded-md"
                    value={expense.expense_id}
                    onChange={(e) => setExpense({ ...expense, expense_id: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="userid" className="block text-sm font-medium text-gray-700">User ID</label>
                  <input
                    type="number"
                    id="userid"
                    name="userid"
                    className="mt-1 p-2 w-full border-gray-300 rounded-md"
                    value={expense.user_id}
                    onChange={(e) => setExpense({ ...expense, user_id: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    className="mt-1 p-2 w-full border-gray-300 rounded-md"
                    value={expense.amount}
                    onChange={(e) => setExpense({ ...expense, amount: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="mt-1 p-2 w-full border-gray-300 rounded-md"
                    value={expense.date}
                    onChange={(e) => setExpense({ ...expense, date: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="categoryid" className="block text-sm font-medium text-gray-700">Category ID</label>
                  <input
                    type="number"
                    id="categoryid"
                    name="categoryid"
                    className="mt-1 p-2 w-full border-gray-300 rounded-md"
                    value={expense.category_id}
                    onChange={(e) => setExpense({ ...expense, category_id: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="createdat" className="block text-sm font-medium text-gray-700">Created At</label>
                  <input
                    type="date"
                    id="createdat"
                    name="createdat"
                    className="mt-1 p-2 w-full border-gray-300 rounded-md"
                    value={expense.created_at}
                    onChange={(e) => setExpense({ ...expense, created_at: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    className="mt-1 p-2 w-full border-gray-300 rounded-md"
                    value={expense.description}
                    onChange={(e) => setExpense({ ...expense, description: e.target.value })}
                  />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full">Add Expense</button>
              </div>
            </form>
            {submitted && (
              <p className="text-green-600 mt-8 text-center">Expense added successfully!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
