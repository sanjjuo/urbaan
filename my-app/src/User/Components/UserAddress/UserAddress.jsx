import { Button } from '@material-tailwind/react'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'

const UserAddress = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="bg-white shadow-md py-4 px-4 w-full sticky top-0">
                <h1
                    className="flex items-center gap-5 text-xl font-medium cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" />Add Delivery Address
                </h1>
            </div>

            <div className="p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto">
                <form action="" className="space-y-5 mt-3">
                    {/* Name */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="font-medium text-sm xl:text-base lg:text-base">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                            className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-xs placeholder:text-gray-500 focus:outline-none"
                        />
                    </div>
                    {/* address */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="font-medium text-sm xl:text-base lg:text-base">
                            Address
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Pin code"
                            className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-xs placeholder:text-gray-500 focus:outline-none"
                        />
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Address (House No, Building, Street, Area )*"
                            className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-xs placeholder:text-gray-500 focus:outline-none"
                        />
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Localty / Town"
                            className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-xs placeholder:text-gray-500 focus:outline-none"
                        />
                    </div>
                    {/* city */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="font-medium text-sm xl:text-base lg:text-base">
                            City
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your city"
                            className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-xs placeholder:text-gray-500 focus:outline-none"
                        />
                    </div>
                    {/* state */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="font-medium text-sm xl:text-base lg:text-base">
                            State
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your state"
                            className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-xs placeholder:text-gray-500 focus:outline-none"
                        />
                    </div>
                    {/* email */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="font-medium text-sm xl:text-base lg:text-base">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-xs placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                        />
                    </div>

                    {/* save address */}
                    <div className='flex items-center gap-3'>
                        <Button variant='outlined' className='text-primary border-primary font-custom text-sm capitalize'>Home</Button>
                        <Button variant='outlined' className='text-secondary border-secondary font-custom text-sm capitalize'>Work</Button>
                    </div>

                    {/* button */}
                    <div className='mb-3'>
                        <Link to='/select-delivery-address'>
                            <Button className='bg-primary font-custom text-sm capitalize w-full'>Save Address</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UserAddress
