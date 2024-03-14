import React, { useState } from 'react';

export default function CategoryList() {
  const [category, setCategory] = useState({
    category_id: 0,
    name: '',
    user_id: 0,
    created_at: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const onSubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/newecategory/sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });
      const data = await response.text();
      console.log(data);

      // Reset the input fields after successful submission
      setCategory({
        category_id: 0,
        name: '',
        user_id: 0,
        created_at: '',
      });

      // Set submitted state to true for showing success message
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000); // Reset submitted state after 3 seconds
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="max-h-full bg-hero-pattern w-full">
      <div className="overlay w-full h-full flex items-center justify-center">
        <div className="m-auto p-10 bg-white bg-opacity-80 rounded-md mt-10 mb-10">
          <h1 className="text-3xl font-bold mb-8 text-center">Category Management</h1>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
            <form onSubmit={onSubmitData} id="addExpenseForm">
              <div className="flex flex-col space-y-4">
                <div className="mb-4">
                  <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category id</label>
                  <input
                    type="number"
                    id="categoryId"
                    name="categoryId"
                    className="mt-1 p-2 w-full border-gray-300 rounded-md"
                    value={category.category_id}
                    onChange={(e) => setCategory({ ...category, category_id: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category name</label>
                  <input
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    className="mt-1 p-2 w-full border-gray-300 rounded-md"
                    value={category.name}
                    onChange={(e) => setCategory({ ...category, name: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User id</label>
                  <input
                    type="number"
                    id="userId"
                    name="userId"
                    className="mt-1 p-2 w-full border-gray-300 rounded-md"
                    value={category.user_id}
                    onChange={(e) => setCategory({ ...category, user_id: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">Created at</label>
                  <input
                    type="date"
                    id="createdAt"
                    name="createdAt"
                    className="mt-1 p-2 w-full border-gray-300 rounded-md"
                    value={category.created_at}
                    onChange={(e) => setCategory({ ...category, created_at: e.target.value })}
                  />
                </div>
              </div>
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full mt-6">Add Category</button>
            </form>
            {submitted && (
              <p className="text-green-600 mt-8 text-center ">Category added successfully!</p>
            )}
          </div>
          <hr className="mb-8" />
        </div>
      </div>
    </div>
  );
}
