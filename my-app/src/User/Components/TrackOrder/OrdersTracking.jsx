import { Card } from '@material-tailwind/react'
import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const OrdersTracking = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="bg-white shadow-md py-4 px-4 w-full sticky top-0 xl:hidden lg:hidden">
                <h1
                    className="flex items-center gap-5 text-xl font-medium cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Orders Tracking
                </h1>
            </div>

            <div className="px-4 py-10 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto">
                <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 gap-5">
                    <Card className='p-2'>
                        <div className='flex justify-between items-center'>
                            <div className='w-16 h-14'>
                                <img src="dtdc.jpg" alt="" className='w-full h-full object-cover rounded-lg' />
                            </div>
                            <p className='text-secondary text-sm font-medium'>DTDC Tracking</p>
                            <IoIosArrowForward className='text-secondary text-xl' />
                        </div>
                    </Card>
                    <Card className='p-2'>
                        <div className='flex justify-between items-center'>
                            <div className='w-16 h-14'>
                                <img src="speedpost.avif" alt="" className='w-full h-full object-cover rounded-lg' />
                            </div>
                            <p className='text-secondary text-sm font-medium'>Speed Post Tracking</p>
                            <IoIosArrowForward className='text-secondary text-xl' />
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default OrdersTracking
