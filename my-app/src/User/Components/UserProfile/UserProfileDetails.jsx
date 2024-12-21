import { Card, Chip } from '@material-tailwind/react';
import React from 'react'
import { useState } from 'react';
import { RiHeart3Line, RiShoppingCartLine, RiUser3Fill } from 'react-icons/ri';
import { TbTruckDelivery } from 'react-icons/tb';
import { TiEdit } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../../../StoreContext/StoreContext';
import { ImAddressBook } from "react-icons/im";
import { FaLandmark } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import { FaGlobeAsia } from "react-icons/fa";
import { IoCalendarClearSharp } from 'react-icons/io5';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import AppLoader from '../../../Loader';


const UserProfileDetails = () => {
    const [userDetails, setUserDetails] = useState([])
    const { BASE_URL } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(true);

    // fetch user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('userToken')
                const response = await axios.get(`${BASE_URL}/user/profile/view/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUserDetails(response.data)
                setIsLoading(false)
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserDetails()
    }, [])

    const user = userDetails.user
    return (
        <>
            <div className="px-4 py-16 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto">
                {
                    isLoading || userDetails.length === 0 ? (
                        <div className="col-span-2 flex justify-center items-center h-[50vh]">
                            <AppLoader />
                        </div>
                    ) : (
                        <>
                            <Card className='bg-white flex flex-col p-6'>
                                <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 gap-5'>
                                    <div>
                                        {/* Profile Picture */}
                                        <div className='w-full h-64 xl:h-72 lg:h-72 relative'>
                                            <img
                                                src='/userProfile.jpg'
                                                alt="Profile"
                                                className='w-full h-full object-cover rounded-xl'
                                            />
                                            <Link
                                                to="/edit-user-profile"
                                                state={{ user: userDetails?.user }}
                                                onClick={console.log(user)}
                                            >
                                                <TiEdit className='text-primary text-2xl absolute top-3 right-3' />
                                            </Link>
                                        </div>

                                        <div className='flex flex-col justify-center items-center p-4'>
                                            {/* Upload Button */}
                                            <h1 className='font-custom font-normal capitalize text-base xl:text-lg lg:text-lg flex items-center gap-1'>
                                                {user?.name}
                                            </h1>
                                            <p className='text-sm'>{user?.email || 'Email not provided'}</p>
                                            <ul className='flex items-center gap-10 mt-5'>
                                                <Link to='/favourite '><li className='text-primary text-3xl relative cursor-pointer'>
                                                    <RiHeart3Line />
                                                </li>
                                                </Link>
                                                <Link to='/'><li className='text-primary text-3xl relative cursor-pointer'>
                                                    <TbTruckDelivery />
                                                </li>
                                                </Link>
                                                <Link to='/user-cart'><li className='text-primary text-3xl relative cursor-pointer'>
                                                    <RiShoppingCartLine />
                                                </li>
                                                </Link>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className='xl:col-span-2 lg:col-span-2'>
                                        <h1 className='text-center text-xl xl:text-2xl lg:text-2xl font-medium'>User Details</h1>
                                        <form action="" className="space-y-5 w-full mt-10">
                                            {/* name and gender */}
                                            <div className='flex flex-col xl:flex-row lg:flex-row items-center gap-3'>
                                                {/* number */}
                                                <div className="flex items-center gap-2 text-lg w-full xl:w-1/2 lg:w-1/2 border-[1px] bg-gray-100 border-gray-100 p-2 rounded-lg">
                                                    <MdOutlinePhoneAndroid className='text-lg' />
                                                    <input
                                                        type="number"
                                                        name="number"
                                                        id="number"
                                                        value={user?.phone}
                                                        disabled
                                                        className="capitalize text-secondary bg-transparent focus:outline-none"
                                                    />
                                                </div>

                                                {/* Date of Birth */}
                                                <div className="flex items-center gap-2 text-lg w-full xl:w-1/2 lg:w-1/2 border-[1px] bg-gray-100 border-gray-100 p-2 rounded-lg">
                                                    <IoCalendarClearSharp />
                                                    <input
                                                        type="text"
                                                        name="text"
                                                        id="dob"
                                                        value={user?.dob || null}
                                                        className="w-full bg-transparent focus:outline-none"
                                                    />
                                                </div>

                                                {/* gender */}
                                                <div className="flex items-center gap-2 text-lg w-full xl:w-1/2 lg:w-1/2 border-[1px] bg-gray-100 border-gray-100 p-2 rounded-lg">
                                                    <RiUser3Fill />
                                                    <input
                                                        type="text"
                                                        name="gender"
                                                        id="gender"
                                                        value={user?.gender || null}
                                                        disabled
                                                        className="w-full bg-transparent focus:outline-none"
                                                    />
                                                </div>
                                            </div>


                                            {/* address landmark and pincode */}
                                            <div className="flex flex-col gap-1">
                                                <div className='flex flex-col xl:flex-row lg:flex-row items-start gap-3'>
                                                    {/* address */}
                                                    <div className='h-28 flex items-baseline gap-2 text-lg w-full xl:w-full lg:w-full border-[1px] bg-gray-100 border-gray-100 p-2 rounded-lg'>
                                                        <ImAddressBook />
                                                        <textarea
                                                            type="text"
                                                            name="address"
                                                            id="address"
                                                            value={user?.addresses?.[0]?.address || ''}
                                                            className="capitalize bg-transparent overflow-y-auto hide-scrollbar w-full h-full text-secondar focus:outline-none"
                                                        />
                                                    </div>

                                                    {/* landmark and code */}
                                                    <div className='flex flex-col gap-4 w-full xl:w-1/2 lg:w-1/2'>
                                                        <div className='w-full flex items-center gap-2 text-lg xl:w-full lg:w-full border-[1px] bg-gray-100 border-gray-100 p-2 rounded-lg'>
                                                            <FaLandmark />
                                                            <input
                                                                type="text"
                                                                name="landmark"
                                                                id="landmark"
                                                                value={user?.addresses?.[0]?.landmark || ''}
                                                                className="bg-transparent w-full capitalize text-secondary focus:outline-none"
                                                            />
                                                        </div>
                                                        <div className='w-full flex items-center gap-2 text-lg xl:w-full lg:w-full border-[1px] bg-gray-100 border-gray-100 p-2 rounded-lg'>
                                                            <FaLocationDot />
                                                            <input
                                                                type="number"
                                                                name="pincode"
                                                                id="pincode"
                                                                value={user?.addresses?.[0]?.pincode || ''}
                                                                className="w-full text-secondary bg-transparent focus:outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/*city and state  */}
                                            <div className='flex flex-col xl:flex-row lg:flex-row items-center gap-3'>
                                                {/* city */}
                                                <div className="flex text-lg items-center gap-1 w-full xl:w-1/2 lg:w-1/2 border-[1px] bg-gray-100 border-gray-100 p-2 rounded-lg">
                                                    <FaCity />
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        id="city"
                                                        value={user?.addresses?.[0]?.city || ''}
                                                        className="capitalize w-full text-secondary bg-transparent focus:outline-none"
                                                    />
                                                </div>
                                                {/* state */}
                                                <div className="flex text-lg items-center gap-1 w-full xl:w-1/2 lg:w-1/2 border-[1px] bg-gray-100 border-gray-100 p-2 rounded-lg">
                                                    <FaGlobeAsia />
                                                    <input
                                                        type="text"
                                                        name="state"
                                                        id="state"
                                                        value={user?.addresses?.[0]?.state || ''}
                                                        className="w-full bg-transparent capitalize text-secondary focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div >
                            </Card >
                        </>
                    )
                }
            </div >
        </>
    )
}

export default UserProfileDetails
