import { Button, Card } from '@material-tailwind/react'
import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom';
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi2";
import { RiCoupon4Line } from "react-icons/ri";

const UserCart = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto">
                <h1
                    className="flex items-center gap-2 text-lg xl:text-xl lg:text-xl font-medium cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Cart
                </h1>

                <div className='grid grid-cols-1 xl:grid xl:grid-cols-3 xl:gap-2 gap-5 mt-5'>
                    <div className='space-y-5 xl:col-span-2 lg:col-span-2 xl:space-y-3 lg:space-y-3'>
                        <Card className='p-2 xl:p-6 lg:p-6'>
                            <div className='flex justify-between'>
                                <div className='flex gap-2 xl:gap-6 lg:gap-6'>
                                    <div className='w-20 h-28 xl:w-40 xl:h-40'>
                                        <img src="/p1.jpg" alt="" className='w-full h-full object-cover rounded-lg' />
                                    </div>
                                    <div>
                                        <h1 className='text-base text-secondary font-medium xl:mb-2 lg:mb-2'>Stylish crop top</h1>
                                        <ul className='xl:space-y-1 lg:space-y-1'>
                                            <li className='text-sm'>Color: Yellow</li>
                                            <li className='text-sm'>Size: M</li>
                                        </ul>
                                        <ul className="flex items-center justify-between mt-3 xl:mt-12 lg:mt-12 border border-gray-300 rounded-lg p-1 bg-white shadow-sm">
                                            {/* Decrease Button */}
                                            <li className="text-secondary flex items-center justify-center w-7 h-7 rounded-full cursor-pointer">
                                                <HiMinus className="text-lg" />
                                            </li>

                                            {/* Quantity */}
                                            <li className="text-secondary text-center font-medium text-base w-7">
                                                3
                                            </li>

                                            {/* Increase Button */}
                                            <li className="text-secondary flex items-center justify-center w-7 h-7 rounded-full cursor-pointer">
                                                <BsPlusLg className="text-lg" />
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                                <div className='flex flex-col items-end justify-between'>
                                    <RiDeleteBin5Line className='text-deleteBg' />
                                    <p className='text-secondary font-semibold text-xl'>₹400</p>
                                </div>
                            </div>
                        </Card>

                        {/* coupon */}
                        <Card className='p-4'>
                            <div className='flex items-center justify-between'>
                                <h1 className='flex items-center gap-3 text-base text-secondary font-medium'><RiCoupon4Line />Apply Coupon</h1>
                                <IoIosArrowForward className='text-secondary' />
                            </div>
                        </Card>
                    </div>

                    <div className='space-y-5 xl:space-y-3'>
                        {/* total */}
                        <Card className='p-4'>
                            <h1 className='text-secondary font-medium'>Cart Totals</h1>
                            <ul className='mt-3 border-b-[1px] border-gray-400 pb-3 space-y-2'>
                                <li className='flex justify-between items-center'>
                                    <span className='font-normal text-sm'>Total Items</span>
                                    <span className='text-secondary font-medium text-sm'>3</span>
                                </li>
                                <li className='flex justify-between items-center'>
                                    <span className='font-normal text-sm'>Total MRP</span>
                                    <span className='text-secondary font-medium text-sm'>₹1200</span>
                                </li>
                                <li className='flex justify-between items-center'>
                                    <span className='font-normal text-sm'>Discount</span>
                                    <span className='text-secondary font-medium text-sm'>₹50</span>
                                </li>
                            </ul>
                            <ul className='mt-2'>
                                <li className='flex justify-between items-center'>
                                    <span className='text-secondary font-medium text-sm'>Total</span>
                                    <span className='text-secondary font-bold text-lg'>₹1150</span>
                                </li>
                            </ul>
                        </Card>

                        {/* delivery address */}
                        <Card className='p-4'>
                            <div className='flex items-center justify-between mb-3'>
                                <h1 className='text-secondary font-medium'>Delivery Address</h1>
                                <Link to='/select-delivery-address'><p className='text-primary underline text-sm font-medium'>Change</p></Link>
                            </div>
                            <p className='text-sm font-normal text-gray-500 mb-3'>
                                Apartment 304, Building 5,1234 Elm Street, Suite 567 Example City, EX 12345 PO Box 654321
                            </p>
                            <Button className='w-full bg-primary font-custom font-normal text-sm capitalize'>Checkout</Button>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCart
