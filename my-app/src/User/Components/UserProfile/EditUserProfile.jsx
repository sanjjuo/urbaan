import { Button } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import { IoCameraOutline } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';

const EditUserProfile = () => {
    const [selectedImage, setSelectedImage] = useState('/userProfile.jpg');
    const location = useLocation();
    const initialDetails = location.state?.user || {};

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('')
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('');
    const [landMark, setLandMark] = useState('')
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');

    // Set initial state from location
    useEffect(() => {
        setName(initialDetails.name || '');
        setEmail(initialDetails.email || '');
        setNumber(initialDetails.phone || '');
        setDob(initialDetails.dob || '');
        setAddress(initialDetails.address || '');
        setLandMark(initialDetails.landmark || '');
        setCity(initialDetails.city || '');
        setDistrict(initialDetails.district || '');
        setState(initialDetails.state || '');
        setPincode(initialDetails.pincode || '');
    }, [initialDetails]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    // handleUserProfileSubmit
    const handleUserProfileSubmit = async (e) => {
        e.preventDefault()
    }


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

                <form action="" className="space-y-5 mt-10 xl:mx-72 lg:mx-72" onSubmit={handleUserProfileSubmit}>
                    {/* Name */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="font-medium text-sm xl:text-base lg:text-base">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Natalie Portman"
                            className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="natalieportmanofficial@gmail.com"
                            className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
                        />
                    </div>

                    {/* number */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="number" className="font-medium text-sm xl:text-base lg:text-base">
                            Phone Number
                        </label>
                        <input
                            type="number"
                            name="number"
                            id="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="natalieportmanofficial@gmail.com"
                            className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
                        />
                    </div>

                    {/* Date of Birth and gender */}
                    <div className='flex items-center gap-3'>
                        <div className="flex flex-col gap-1 w-1/2">
                            <label htmlFor="dob" className="font-medium text-sm xl:text-base lg:text-base">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name="date"
                                id="dob"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                className="w-full border-[1px] bg-transparent border-gray-400 p-[6px] rounded-md focus:outline-none text-gray-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1 w-1/2">
                            <label htmlFor="gender" className="font-medium text-sm xl:text-base lg:text-base">
                                Gender
                            </label>
                            <select
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md focus:outline-none text-gray-500"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>


                    {/* address */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="font-medium text-sm xl:text-base lg:text-base">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address (House No, Building, Street, Area )*"
                            className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
                        />
                        <input
                            type="text"
                            name="landmark"
                            id="landmark"
                            value={landMark}
                            onChange={(e) => setLandMark(e.target.value)}
                            placeholder="Landmark"
                            className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
                        />
                        <input
                            type="number"
                            name="pincode"
                            id="pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder="Pin code"
                            className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
                        />
                    </div>

                    {/* city and state */}
                    <div className='flex items-center gap-3'>
                        {/* city */}
                        <div className="flex flex-col gap-1 w-1/2">
                            <label htmlFor="name" className="font-medium text-sm xl:text-base lg:text-base">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Enter your city"
                                className="border-[1px] w-full bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
                            />
                        </div>
                        {/* district */}
                        <div className="flex flex-col gap-1 w-1/2">
                            <label htmlFor="name" className="font-medium text-sm xl:text-base lg:text-base">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Enter your city"
                                className="border-[1px] w-full bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
                            />
                        </div>
                        {/* state */}
                        <div className="flex flex-col gap-1 w-1/2">
                            <label htmlFor="name" className="font-medium text-sm xl:text-base lg:text-base">
                                State
                            </label>
                            <input
                                type="text"
                                name="state"
                                id="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder="Enter your state"
                                className="border-[1px] w-full bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
                            />
                        </div>
                    </div>
                </form>

                <div className='flex justify-center mt-10'>
                    <Link to='/user-profile' className='w-40'>
                        <Button type='submit' className="bg-primary font-custom font-normal text-sm capitalize w-full">Save profile</Button>
                    </Link>
                </div>

                <div className='bg-white shadow-md fixed bottom-0 inset-x-0 flex justify-center z-50 p-4 lg:hidden xl:hidden md:hidden'>
                    <Link to='/user-profile' className='w-full'>
                        <Button type='submit' className="bg-primary font-custom font-normal text-sm capitalize w-full">Save</Button>
                    </Link>
                </div>

            </div>
        </>
    )
}

export default EditUserProfile
