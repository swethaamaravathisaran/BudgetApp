import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type Category = {
    category_id: number;
    name: string;
    user_id: number;
    created_at: string;
};

export default function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([]); // Initialize as empty array
    const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(null); // To store category id for deletion confirmation

    useEffect(() => {
        fetch('/api/getcategories/sql', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => setCategories(data.results))
            .catch((error) => console.error('Error fetching categories:', error))
            .finally(() => console.log('Categories fetched'));
    }, []);

    const handleDelete = async (categoryId: number) => {
        try {
            const response = await fetch(`/api/delete/category/SQL/${categoryId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete category');
            }
            setCategories(categories.filter(category => category.category_id !== categoryId));
            console.log('Category deleted successfully');
            // Add code here to delete associated expenses
        } catch (error) {
            console.error('Error deleting category:', error);
        } finally {
            setDeleteConfirmation(null); // Reset delete confirmation after deletion
        }
    };

    return (
        <div className='flex justify-center items-center w-full bg-hero-pattern max-h-full'>
            <div className="max-w-md w-full">
                <h1 className='text-black text-2xl font-bold flex items-center justify-center mb-8 mt-4'>Category List</h1>
                <div>
                    <ul>
                        {categories.length > 0 ? (
                            categories.map((category: Category) => (
                                <li key={category.category_id}>
                                    <div className='bg-white shadow-md rounded-md p-4 hover:bg-gray-100 transition duration-300 ease-in-out mb-10'>
                                        <Link to={`/category/${category.category_id}`} className='font-bold text-xl py-2 block'>Category ID: {category.category_id}</Link>
                                        <p>Name: {category.name}</p>
                                        <p>User ID: {category.user_id}</p>
                                        <p>Created At: {category.created_at}</p>
                                        {deleteConfirmation === category.category_id ? (
                                            <div>
                                                <button onClick={() => handleDelete(category.category_id)} className='bg-red-600 text-white py-2 px-4 rounded-md mt-2'>Confirm Delete</button>
                                                <button onClick={() => setDeleteConfirmation(null)} className='bg-gray-600 text-white py-2 px-4 rounded-md mt-2 ml-2'>Cancel</button>
                                            </div>
                                        ) : (
                                            <button onClick={() => setDeleteConfirmation(category.category_id)} className='bg-black text-white py-2 px-4 rounded-md mt-2'>Delete</button>
                                        )}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className='mb-10 font-extrabold px-6'>No Category data available</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
