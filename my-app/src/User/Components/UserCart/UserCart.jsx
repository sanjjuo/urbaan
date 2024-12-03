import { Card } from '@material-tailwind/react'
import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin5Line } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";
import { RiCoupon4Line } from "react-icons/ri";

const UserCart = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-screen'>
                <h1
                    className="flex items-center gap-3 text-lg xl:text-xl lg:text-xl font-medium cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Cart
                </h1>

                <div className='space-y-5'>
                    <Card className='p-2 mt-5'>
                        <div className='flex justify-between'>
                            <div className='flex gap-2'>
                                <div className='w-20 h-24'>
                                    <img src="/p1.jpg" alt="" className='w-full h-full object-cover rounded-lg' />
                                </div>
                                <div>
                                    <h1 className='text-base text-secondary font-medium'>Stylish crop top</h1>
                                    <ul>
                                        <li className='text-sm'>Color: Yellow</li>
                                        <li className='text-sm'>Size: M</li>
                                    </ul>
                                    <ul className='flex items-center gap-1 mt-3'>
                                        <li className='bg-searchUser p-1 text-secondary rounded-md w-6'><AiOutlineMinus/></li>
                                        <li className='text-secondary w-6 text-center'>3</li>
                                        <li className='bg-searchUser p-1 text-secondary rounded-md w-6'><GoPlus/></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='flex flex-col items-center justify-between'>
                                <RiDeleteBin5Line className='text-deleteBg' />
                                <p className='text-secondary font-semibold text-xl'>₹400</p>
                            </div>
                        </div>
                    </Card>

                    {/* coupon */}
                    <Card className='p-4'>
                        <div className='flex items-center justify-between'>
                            <h1 className='flex items-center gap-3 text-sm text-secondary font-medium'><RiCoupon4Line/>Apply Coupon</h1>
                            <IoIosArrowForward className='text-secondary'/>
                        </div>
                    </Card>
                    
                    {/* total */}
                    <Card className='p-4'>
                        <h1 className='text-secondary font-medium'>Cart Totals</h1>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default UserCart
