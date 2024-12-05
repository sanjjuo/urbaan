import React, { useContext } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../StoreContext/StoreContext';
import { RxHeart } from 'react-icons/rx';
import FilterBySize from './FilterBySize';
import FilterByMaterial from './FilterByMaterial';
import FilterByCategory from './FilterByCategory';
import FilterByPrice from './FilterByPrice';


const AllCategory = () => {
    const navigate = useNavigate();
    const { filteredByCategory, handleProductDetails, selectedCategory } = useContext(AppContext);

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
            <div className='min-h-[calc(100vh-4rem)]'>
                <div className='w-full h-44 relative'>
                    <img src="/banner.jpeg" alt="" className='w-full h-full object-cover' />
                    <div className='absolute inset-0 bg-primary/70'></div>
                    <h1 className='absolute inset-0 flex items-end justify-center z-50 text-white text-4xl font-medium
                        mb-5 capitalize'>{selectedCategory}</h1>
                </div>
                <div className="px-4 py-10 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg">
                    <ul className='space-y-3 xl:flex xl:items-center xl:space-y-0 xl:gap-5 xl:justify-center
                        lg:flex lg:items-center lg:space-y-0 lg:gap-5 lg:justify-center'>
                        <li><FilterBySize /></li>
                        <li><FilterByMaterial /></li>
                        <li><FilterByCategory /></li>
                        <li><FilterByPrice /></li>
                    </ul>
                    <div className="xl:p-10 mt-10">
                        <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-5 gap-2">
                            {filteredByCategory.length > 0 ? (
                                filteredByCategory.map((p) => (
                                    <Link to='/product-details' onClick={() => handleProductDetails(p)} className="mt-5 group" key={p.id}>
                                        <div className="w-full h-52 xl:h-80 lg:h-80 relative rounded-xl overflow-hidden">
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
            </div>
        </>
    );
};

export default AllCategory;
