import { Button, Radio } from '@material-tailwind/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';

const CreateSubCategories = () => {
    const [createSubCategoryTitle, setCreateSubCategoryTitle] = useState('');
    const [createSubCategorySelect, setCreateSubCategorySelect] = useState('');
    const [createSubCategoryImage, setCreateSubCategoryImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [createSubCategoryStatus, setCreateSubCategoryStatus] = useState('enable'); // Default to 'enable'

    // Handle status change
    const handleStatusChange = (value) => {
        setCreateSubCategoryStatus(value);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Authorization is missing");
                    return;
                }

                const BASE_URL = import.meta.env.VITE_BASE_URL;
                const response = await axios.get(`${BASE_URL}/admin/category/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error.response || error.message);
                alert("Failed to load categories.");
            }
        };

        fetchCategories();
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCreateSubCategoryImage(file);
        }
    };

    const handleSubCategorySubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Authorization is missing");
                return;
            }

            const subCategoryFormData = new FormData();
            subCategoryFormData.append('title', createSubCategoryTitle);
            subCategoryFormData.append('category', createSubCategorySelect);
            subCategoryFormData.append('image', createSubCategoryImage);
            subCategoryFormData.append('status', createSubCategoryStatus); // Add the status here

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            };

            const BASE_URL = import.meta.env.VITE_BASE_URL;
            const response = await axios.post(`${BASE_URL}/admin/Subcategory/create`, subCategoryFormData, { headers });
            console.log(response.data);
            alert("Subcategory is successfully created");
            setCreateSubCategoryTitle('');
            setCreateSubCategorySelect('');
            setCreateSubCategoryImage(null);
        } catch (error) {
            alert("Sub Category is not created");
            console.error("Error:", error.response || error.message);
            alert(`Error: ${error.response?.data?.message || "Something went wrong"}`);
        }
    };

    return (
        <>
            <div className='bg-white rounded-xl shadow-md sticky top-5 transition-all duration-300 ease-in-out'>
                <div className='p-5'>
                    <h2 className="text-xl font-medium mb-3 lg:mb-0 text-secondary">Create Sub Categories</h2>
                </div>
                <hr />
                <div className='p-5'>
                    <form onSubmit={handleSubCategorySubmit} className='space-y-5'>
                        {/* title */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="title" className='font-normal text-base'>Sub Category title</label>
                            <input
                                type="text"
                                name="title"
                                value={createSubCategoryTitle}
                                onChange={(e) => setCreateSubCategoryTitle(e.target.value)}
                                placeholder='Sub category title'
                                className='border-[1px] bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500 focus:outline-none'
                            />
                        </div>

                        {/* category */}
                        <div className='flex flex-col gap-1 w-full'>
                            <label className='font-normal text-base'>Category</label>
                            <select
                                name="selectField"
                                value={createSubCategorySelect}
                                onChange={(e) => setCreateSubCategorySelect(e.target.value)}
                                className="w-full text-sm text-gray-500 font-light bg-gray-100/50 border p-2 rounded focus:outline-none focus:cursor-pointer"
                            >
                                <option value="">Select Category</option>
                                {categories?.length > 0 &&
                                    categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* status type */}

                        <div className='flex flex-col gap-1 w-full'>
                            <label className='font-normal text-base'>Status type</label>
                            <div className="flex gap-10">
                                <Radio
                                    name="type"
                                    color='green'
                                    label="Enable"
                                    checked={createSubCategoryStatus === 'enable'}
                                    onChange={() => handleStatusChange('enable')}
                                />
                                <Radio
                                    name="type"
                                    color='pink'
                                    label="Disable"
                                    checked={createSubCategoryStatus === 'disable'}
                                    onChange={() => handleStatusChange('disable')}
                                />
                            </div>
                        </div>


                        {/* image upload */}
                        <div>
                            <div className='flex items-center justify-between'>
                                <label htmlFor="image" className='font-normal text-base'>Image</label>
                                <RiDeleteBin5Line onClick={() => setCreateSubCategoryImage(null)} className='text-deleteBg text-xl hover:text-primary cursor-pointer' />
                            </div>
                            <div className='w-full h-48 flex justify-center items-center border-2 rounded-xl mt-2'>
                                {createSubCategoryImage ? (
                                    <img src={URL.createObjectURL(createSubCategoryImage)} alt="Uploaded" className="w-full h-full rounded-lg" />
                                ) : (
                                    <label htmlFor="file" className="flex flex-col items-center cursor-pointer">
                                        <img src="/imgupload.png" alt="" className='w-16' />
                                        <p className="text-secondary text-xs">Browse files to upload</p>
                                    </label>
                                )}
                                <input
                                    type="file"
                                    id="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>
                        </div>

                        {/* button */}
                        <div className='flex justify-end'>
                            <Button type='submit' className='bg-buttonBg font-normal tracking-wider font-custom text-sm'>Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateSubCategories;
