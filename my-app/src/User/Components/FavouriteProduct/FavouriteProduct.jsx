import { Button } from '@material-tailwind/react';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

const FavouriteProduct = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='bg-userBg p-4 xl:p-16 lg:p-16 space-y-8 xl:space-y-14 lg:space-y-14 h-screen'>
                <h1
                    className="flex items-center gap-2 text-lg xl:text-xl lg:text-xl font-medium cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> My Wishlist
                </h1>

                <div className='flex flex-col justify-center items-center'>
                    <div className='w-20 h-20 mb-10'>
                        <img src="/favorite.png" alt="" className='w-full h-full object-cover'/>
                    </div>
                    <p className='font-medium text-lg xl:text-xl lg:text-xl mb-3'>Your wishlist is Empty</p>
                    <p className='font-normal text-xs xl:text-sm lg:text-sm text-center mb-3 text-gray-600
                    '>You can add an item to your favourites by clicking “Heart Icon”</p>
                    <Link to='/'><Button className='bg-primary text-sm capitalize font-custom font-normal w-48'>Go Shopping</Button></Link>
                </div>
            </div>
        </>
    )
}

export default FavouriteProduct