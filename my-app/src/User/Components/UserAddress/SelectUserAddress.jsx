import { Button, Card, Radio } from '@material-tailwind/react'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { GoPlus } from "react-icons/go";
import { useContext } from 'react';
import { AppContext } from '../../../StoreContext/StoreContext';
import { RemoveAddressModal } from './RemoveAddressModal';

const SelectUserAddress = () => {
    const navigate = useNavigate()
    const { handleOpenRemoveModal } = useContext(AppContext)
    return (
        <>
            <div className="bg-white shadow-md py-4 px-4 w-full sticky top-0">
                <h1
                    className="flex items-center gap-2 text-xl font-medium cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" />Select Delivery Address
                </h1>
            </div>
            <div className="p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto">
                <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 gap-5">
                    <Card className='p-4 xl:p-10 lg:p-10'>
                        <div className='flex justify-between'>
                            <div>
                                <h1 className='text-secondary font-bold'>Home</h1>
                                <p className='text-sm'>Apartment 304, Building 5,1234 Elm Street, Suite 567Example City, EX 12345PO Box 654321</p>
                                <div className='mt-3 flex items-center gap-2'>
                                    <Link to='/add-delivery-address'><Button variant='outlined' className='text-shippedBg border-shippedBg font-normal 
                                    text-xs py-1 px-6 capitalize font-custom'>Edit</Button></Link>
                                    <Button onClick={handleOpenRemoveModal} variant='outlined' className='text-deleteBg border-deleteBg font-normal 
                                    text-xs py-1 px-6 capitalize font-custom'>Remove</Button>
                                </div>
                            </div>
                            <div>
                                <Radio name="color" color='pink' className='border-primary border-2' />
                            </div>
                        </div>
                    </Card>

                    <Card className='p-4 xl:p-10 lg:p-10'>
                        <div className='flex justify-between'>
                            <div>
                                <h1 className='text-secondary font-bold'>Work</h1>
                                <p className='text-sm'>Apartment 304, Building 5,1234 Elm Street, Suite 567Example City, EX 12345PO Box 654321</p>
                                <div className='mt-3 flex items-center gap-2'>
                                    <Link to='/add-delivery-address'><Button variant='outlined' className='text-shippedBg border-shippedBg font-normal 
                                    text-xs py-1 px-6 capitalize font-custom'>Edit</Button></Link>
                                    <Button onClick={handleOpenRemoveModal} variant='outlined' className='text-deleteBg border-deleteBg font-normal 
                                    text-xs py-1 px-6 capitalize font-custom'>Remove</Button>
                                </div>
                            </div>
                            <div>
                                <Radio name="color" color='pink' className='border-primary border-2' />
                            </div>
                        </div>
                    </Card>
                </div>

                <div className='mt-5 flex flex-col xl:flex-row lg:flex-row gap-2 justify-normal xl:justify-center xl:items-center'>
                    <Link to='/add-delivery-address'><Button variant='outlined' className='w-full xl:w-52 lg:w-52 border-primary text-primary text-sm capitalize font-custom 
                    font-normal flex items-center gap-2 justify-center'><GoPlus />Add new address</Button></Link>
                    <Button className='w-full xl:w-52 lg:w-52 bg-primary text-white text-sm capitalize font-custom 
                    font-normal'>Continue</Button>
                </div>
            </div>

            <RemoveAddressModal/>
        </>
    )
}

export default SelectUserAddress
