import React from 'react'
import { GrMapLocation } from 'react-icons/gr'
import { AiOutlineFileText } from "react-icons/ai";
import { RiHeart3Line } from 'react-icons/ri'
import { VscSignOut } from 'react-icons/vsc'

const UserDash = ({ profile, setUserDash }) => {
    const userCoupon = localStorage.getItem('userCoupon')
    return (
        <>
            <h1 className='font-semibold text-2xl capitalize'>Hello {profile?.name || 'User'} !</h1>
            <p className='mt-3 text-gray-700 text-sm '>
                Welcome to your account dashboard! Easily manage your orders, addresses, and wishlist all in one place.
                Track your purchases, update delivery details, and save your favorite items for later. We're here to help
                make your shopping experience smooth and convenient.
            </p>
            <div className='grid grid-cols-2 xl:grid-cols-4 gap-2 mt-5 xl:px-24 lg:px-24'>
                <div onClick={() => setUserDash('orders')} className='border-[1px] border-gray-400 cursor-pointer 
                rounded-xl p-6 flex flex-col justify-center items-center h-32 hover:opacity-60 duration-300'>
                    <AiOutlineFileText className='text-[70px] xl:text-[100px] lg:text-[100px] text-gray-500' />
                    <p className='capitalize font-semibold text-secondary'>my orders</p>
                </div>
                <div onClick={() => setUserDash('address')} className='border-[1px] border-gray-400 cursor-pointer
                 rounded-xl p-6 flex flex-col justify-center items-center h-32 hover:opacity-60 duration-300'>
                    <GrMapLocation className='text-[70px] xl:text-[100px] lg:text-[100px] text-gray-500' />
                    <p className='capitalize font-semibold text-secondary'>my addresses</p>
                </div>
                <div onClick={() => setUserDash('favourite')} className='border-[1px] border-gray-400 cursor-pointer
                 rounded-xl p-6 flex flex-col justify-center items-center h-32 hover:opacity-60 duration-300'>
                    <RiHeart3Line className='text-[70px] xl:text-[100px] lg:text-[100px] text-gray-500' />
                    <p className='capitalize font-semibold text-secondary'>my wishlist</p>
                </div>
                <div onClick={() => setUserDash('logout')} className='border-[1px] border-gray-400 cursor-pointer
                 rounded-xl p-6 flex flex-col justify-center items-center h-32 hover:opacity-60 duration-300'>
                    <VscSignOut className='text-[70px] xl:text-[100px] lg:text-[100px] text-gray-500' />
                    <p className='capitalize font-semibold text-secondary'>logout</p>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center space-y-5 mt-10'>
                <h1>Your coupon code:</h1>
                <p className='text-3xl xl:text-4xl lg:text-4xl tracking-widest font-thin text-primary'>{userCoupon}</p>
            </div>
        </>
    )
}

export default UserDash
