import { Card } from '@material-tailwind/react'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const UserOrders = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto">
                <h1 className="flex items-center gap-1 text-lg xl:text-xl lg:text-xl font-medium cursor-pointer" onClick={() => navigate(-1)}>
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Back
                </h1>
                <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 mt-10'>
                    <Card className='p-4 xl:p-6 lg:p-6'>
                        <div className='flex justify-between items-end'>
                            <div className='flex gap-5'>
                                <div className='w-32 h-32'>
                                    <img src="/p1.jpg" alt="" className='w-full h-full object-cover rounded-lg' />
                                </div>
                                <div>
                                    <h1 className='text-secondary font-medium text-base xl:text-lg lg:text-lg'>Red designed kurti</h1>
                                    <p className='text-gray-700 text-sm'>Well designed kurti in this category.</p>
                                    <ul className='mt-3'>
                                        <li className='text-secondary space-x-2'>
                                            <span>Color :</span>
                                            <span>Red</span>
                                        </li>
                                        <li className='text-secondary space-x-2'>
                                            <span>Size :</span>
                                            <span>XL</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* price */}
                            <div>
                                <p className='text-secondary font-bold text-2xl'>₹1500</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default UserOrders
