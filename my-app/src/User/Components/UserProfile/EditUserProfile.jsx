import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import { IoCameraOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const EditUserProfile = () => {
    const [selectedImage, setSelectedImage] = useState('/userProfile.jpg');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };
    return (
        <>
            <div className="px-4 py-16 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto">
                <div className='flex flex-col justify-center items-center gap-4'>
                    {/* Profile Picture */}
                    <div className='w-32 h-32'>
                        <img
                            src={selectedImage}
                            alt="Profile"
                            className='w-full h-full object-cover rounded-3xl'
                        />
                    </div>

                    {/* Upload Button */}
                    <label
                        htmlFor="upload"
                        className='flex items-center gap-2 text-sm font-normal border-[1px] border-primary bg-transparent text-primary py-2 px-4 rounded-lg cursor-pointer'
                    >
                        <IoCameraOutline className='text-lg' />
                        Upload Profile Picture
                        <input
                            type="file"
                            id="upload"
                            className='hidden'
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>

                <form action="" className="space-y-5 mt-10">
                    {/* Name */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="font-medium text-sm xl:text-base lg:text-base">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Natalie Portman"
                            className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-medium text-sm xl:text-base lg:text-base">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="natalieportmanofficial@gmail.com"
                            className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-medium text-sm xl:text-base lg:text-base">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="********"
                            className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="dob" className="font-medium text-sm xl:text-base lg:text-base">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="date"
                            id="dob"
                            className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:font-light 
                            placeholder:text-gray-500 focus:outline-none text-gray-500"
                        />
                    </div>

                    {/* Country */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="country" className="font-medium text-sm xl:text-base lg:text-base">
                            Country/Region
                        </label>
                        <select
                            name="country"
                            id="country"
                            className="border-[1px] bg-transparent placeholder:font-light border-gray-400 p-2 rounded-md text-sm text-gray-500 focus:outline-none"
                        >
                            <option value="" disabled selected>
                                Select your country
                            </option>
                            <option value="us">United States</option>
                            <option value="uk">United Kingdom</option>
                            <option value="in">India</option>
                            <option value="au">Australia</option>
                            <option value="ca">Canada</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                </form>

                <div className='bg-white shadow-md fixed bottom-0 inset-x-0 flex justify-center z-50 p-4 lg:hidden xl:hidden md:hidden'>
                    <Link to='/user-profile'><Button className="bg-primary font-custom font-normal text-sm capitalize w-full">Save</Button></Link>
                </div>

            </div>
        </>
    )
}

export default EditUserProfile
