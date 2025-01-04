import { Card, Chip } from '@material-tailwind/react'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const UserOrders = () => {
    const navigate = useNavigate()
    return (
        <>
            <div>
                <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 gap-2'>
                    <Card className='p-4'>
                        <div className='flex justify-between'>
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
                            <div className='flex flex-col justify-between items-end'>
                                <Chip value='delivered' className='text-xs font-normal capitalize'/>
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
