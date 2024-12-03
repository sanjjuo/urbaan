import { Button, Card, Radio } from '@material-tailwind/react'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { GoPlus } from "react-icons/go";

const SelectUserAddress = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="bg-white shadow-md py-4 px-4 w-full sticky top-0">
                <h1
                    className="flex items-center gap-5 text-xl font-medium cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" />Select Delivery Address
                </h1>
            </div>
            <div className="p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto">
                <div className='space-y-5'>
                    <Card className='p-4'>
                        <div className='flex justify-between'>
                            <div>
                                <h1 className='text-secondary font-bold'>Home</h1>
                                <p className='text-sm'>Apartment 304, Building 5,1234 Elm Street, Suite 567Example City, EX 12345PO Box 654321</p>
                                <div className='mt-3 flex items-center gap-2'>
                                    <Button variant='outlined' className='text-shippedBg border-shippedBg font-normal
                                    text-xs py-1 px-6 capitalize'>Edit</Button>
                                    <Button variant='outlined' className='text-deleteBg border-deleteBg font-normal 
                                    text-xs py-1 px-6 capitalize'>Remove</Button>
                                </div>
                            </div>
                            <div>
                                <Radio name="color" color='pink' className='border-primary border-2' />
                            </div>
                        </div>
                    </Card>

                    <Card className='p-4'>
                        <div className='flex justify-between'>
                            <div>
                                <h1 className='text-secondary font-bold'>Work</h1>
                                <p className='text-sm'>Apartment 304, Building 5,1234 Elm Street, Suite 567Example City, EX 12345PO Box 654321</p>
                                <div className='mt-3 flex items-center gap-2'>
                                    <Button variant='outlined' className='text-shippedBg border-shippedBg font-normal 
                                    text-xs py-1 px-6 capitalize'>Edit</Button>
                                    <Button variant='outlined' className='text-deleteBg border-deleteBg font-normal 
                                    text-xs py-1 px-6 capitalize'>Remove</Button>
                                </div>
                            </div>
                            <div>
                                <Radio name="color" color='pink' className='border-primary border-2' />
                            </div>
                        </div>
                    </Card>
                </div>

                <div className='mt-5 flex flex-col gap-2'>
                    <Button variant='outlined' className='border-primary text-primary text-sm capitalize font-custom 
                    font-normal flex items-center gap-2 justify-center'><GoPlus/>Add new address</Button>
                    <Button className='bg-primary text-white text-sm capitalize font-custom 
                    font-normal'>Continue</Button>
                </div>
            </div>
        </>
    )
}

export default SelectUserAddress
