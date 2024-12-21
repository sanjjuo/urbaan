import React, { useContext } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../StoreContext/StoreContext';
import { ViewCategoryDrawer } from './ViewCategoryDrawer';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { RiHeart3Line } from 'react-icons/ri';
import AppLoader from '../../../Loader';

const ViewAllCategory = () => {
    const navigate = useNavigate();
    const { handleOpenBottomDrawer, BASE_URL } = useContext(AppContext);
    const [allProducts, setAllProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/products/view-products`)
                setAllProducts(response.data)
                setIsLoading(false)
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllProducts()
    }, [])

    return (
        <>
            <div className="p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto">
                <div className="flex items-center justify-between gap-2">
                    <IoIosArrowBack onClick={() => navigate(-1)} className="text-secondary text-3xl cursor-pointer" />
                    <input
                        type="search"
                        name="search"
                        id=""
                        placeholder='Churidar Materials'
                        className='w-full text-sm p-2 rounded-lg placeholder:font-normal bg-searchUser placeholder:text-gray-700'
                    />
                    <div onClick={handleOpenBottomDrawer} className='bg-searchUser p-2 rounded-lg'>
                        <div className='w-5 h-5'>
                            <img src="/filter.png" alt="" className='w-full h-full' />
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-5 gap-5 mt-10'>
                    {
                        isLoading || allProducts.length === 0 ? (
                            <div className="col-span-2 flex justify-center items-center">
                                <AppLoader />
                            </div>
                        ) : (
                            <>
                                {allProducts.map((product) => (
                                    <div className='group relative' key={product._id}>
                                        <Link
                                            to='/product-details'
                                            className='cursor-pointer'
                                            key={product.id} >
                                            <div className='w-full h-52 xl:h-80 lg:h-80 relative rounded-xl overflow-hidden'>
                                                <img src={product.images[0]} alt={product.title} className='w-full h-full object-cover rounded-xl shadow-md
                                            transition transform scale-100 duration-500 ease-in-out cursor-pointer group-hover:scale-105' />
                                            </div>
                                        </Link>
                                        <RiHeart3Line className='absolute top-2 right-2 bg-white text-gray-600 w-6 h-6 xl:w-7 xl:h-7 lg:w-7 lg:h-7 p-1 rounded-full shadow-md' />
                                        <div className='mt-3'>
                                            <h4 className='font-medium text-sm xl:text-lg lg:text-lg'>{product.title}</h4>
                                            <p className='text-gray-600 font-normal text-xs xl:text-sm lg:text-sm'>{product.description}</p>
                                            <p className='text-primary text-base xl:text-xl lg:text-xl font-semibold mt-2'>₹{product.offerPrice}</p>
                                        </div>
                                    </div>
                                ))
                                }
                            </>
                        )
                    }
                </div>
            </div >

            <ViewCategoryDrawer />
        </>
    )
}

export default ViewAllCategory
