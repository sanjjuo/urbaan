import React, { useContext } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../StoreContext/StoreContext';
import { useState } from 'react';
import { RxHeart } from 'react-icons/rx';

const categories = [
    'kurti', 'bottoms', 'Kurti Set', 'maternity wear', 'night wear',
    'running material', 'churidar material', 'Offer Zone',
    'home wear', 'duppatta', 'kids wear', 'footwear'
];

const AllCategory = () => {
    const navigate = useNavigate();
    const { setSelectedCategory, filteredByCategory, handleProductDetails, selectedCategory } = useContext(AppContext);

    // // Handle category selection
    const handleCategory = (category) => {
        setSelectedCategory(category)
    }

    return (
        <>
            <div className="bg-white z-20 shadow-md py-4 px-4 w-full sticky top-0">
                <h1
                    className="flex items-center gap-2 text-xl font-medium cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Back
                </h1>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-6">
                <div className="bg-white shadow-xl z-10 h-screen xl:h-full p-4">
                    <div className="mt-5">
                        <h1 className="font-semibold text-lg">All Categories</h1>
                        <ul className="space-y-2 mt-5">
                            {categories.map((category, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleCategory(category)}
                                    className={`text-sm capitalize font-medium text-gray-600 cursor-pointer
                                            ${selectedCategory === category ? "text-primary" : ""}`}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="bg-userBg h-screen p-2 xl:p-10 xl:col-span-5 lg:col-span-5">
                    <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-5 gap-2">
                        {filteredByCategory.length > 0 ? (
                            filteredByCategory.map((p) => (
                                <Link to='/product-details' onClick={() => handleProductDetails(p)} className="mt-5 group" key={p.id}>
                                    <div className="w-full h-24 xl:h-80 lg:h-80 relative rounded-xl overflow-hidden">
                                        <img src={p.img} alt="" className='w-full h-full object-cover rounded-xl shadow-md
                                            transition transform scale-100 duration-500 ease-in-out cursor-pointer group-hover:scale-105' />
                                        <RxHeart className='absolute top-2 right-2 bg-white text-gray-600 w-6 h-6 xl:w-7 xl:h-7 lg:w-7 lg:h-7 p-1 rounded-full shadow-md' />
                                    </div>
                                    <div className='mt-3'>
                                        <p className='font-medium text-sm xl:text-lg lg:text-lg truncate'>{p.title}</p>
                                        <p className='text-gray-600 font-normal text-xs xl:text-sm lg:text-sm truncate'>{p.description}</p>
                                        <p className='text-primary text-base xl:text-xl lg:text-xl font-semibold mt-2'>₹{p.price}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className='col-span-2 xl:col-span-5 lg:col-span-5 flex justify-center items-center h-screen'>
                                <p className="text-gray-500 text-xs">No products found for this category.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default AllCategory;
