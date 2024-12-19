import { Button, Card } from '@material-tailwind/react'
import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../../../StoreContext/StoreContext'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const EditUserAddress = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const initailAddressData = location.state.address
    const { BASE_URL } = useContext(AppContext)
    const [editName, setEditName] = useState('')
    const [editNumber, setEditNumber] = useState('')
    const [editAddress, setEditAddress] = useState('')
    const [editLandMark, setEditLandMark] = useState('')
    const [editPinCode, setEditPinCode] = useState('')
    const [editCity, setEditCity] = useState('')
    const [editState, setEditState] = useState('')
    const [editEmail, setEditEmail] = useState('')
    const [editAddressType, setEditAddressType] = useState('home')


    useEffect(() => {
        if (initailAddressData) {
            setEditName(initailAddressData.name)
            setEditNumber(initailAddressData.number)
            setEditAddress(initailAddressData.address)
            setEditLandMark(initailAddressData.landmark)
            setEditPinCode(initailAddressData.pincode)
            setEditCity(initailAddressData.city)
            setEditState(initailAddressData.state)
            setEditEmail(initailAddressData.email)
            setEditAddressType(initailAddressData.addressType)
        }
    }, [initailAddressData])

    // createAddressFormSubmit
    const editAddressFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('userToken')
            const userId = localStorage.getItem('userId')

            // append to formdata
            const rowData = {
                // userId: userId,
                name: editName,
                number: editNumber,
                address: editAddress,
                landmark: editLandMark,
                // pincode: editPinCode,
                city: editCity,
                state: editState,
                // email: editEmail,
                addressType: editAddressType
            }

            console.log('Payload:', rowData);

            const headers = {
                Authorization: `Bearer ${token}`
            }
            console.log('Headers:', headers);
            console.log(`${initailAddressData._id}`);
            const response = await axios.put(`${BASE_URL}/user/address/update/${initailAddressData._id}`, rowData, { headers })
            console.log(response.data);
            toast.success("Address updated successfully")
            navigate('/select-delivery-address');

            setEditName('')
            setEditAddress('')
            setEditLandMark('')
            setEditPinCode('')
            setEditNumber('')
            setEditEmail('')
            setEditAddressType('')
            setEditState('')
            setEditCity('')
        } catch (error) {
            console.error(error);
            if (error.response) {
                console.error(`Error: ${error.response?.data || "Failed to update address"}`);
            } else {
                toast.error("Network error. Please try again later.");
            }
        }
    }

    return (
        <>
            <div className="bg-white shadow-md py-4 px-4 w-full sticky top-0 z-50">
                <h1
                    className="flex items-center gap-2 text-xl font-medium cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" />Add Delivery Address
                </h1>
            </div>

            <div className="p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto">
                <div className='flex justify-center items-center'>
                    <Card className='p-5 w-[600px]'>
                        <form action="" className="space-y-5 mt-3" onSubmit={editAddressFormSubmit}>
                            {/* Name */}
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="name" className="font-medium text-sm xl:text-base lg:text-base">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
                                />
                            </div>
                            {/* number */}
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="name" className="font-medium text-sm xl:text-base lg:text-base">
                                    Phone Number
                                </label>
                                <input
                                    type="number"
                                    name="number"
                                    id="number"
                                    value={editNumber}
                                    onChange={(e) => setEditNumber(e.target.value)}
                                    placeholder="Enter your name"
                                    className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
                                />
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
                                    value={editAddress}
                                    onChange={(e) => setEditAddress(e.target.value)}
                                    placeholder="Address (House No, Building, Street, Area )*"
                                    className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="landmark"
                                    id="landmark"
                                    value={editLandMark}
                                    onChange={(e) => setEditLandMark(e.target.value)}
                                    placeholder="Landmark"
                                    className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
                                />
                                <input
                                    type="number"
                                    name="pincode"
                                    id="pincode"
                                    value={editPinCode}
                                    onChange={(e) => setEditPinCode(e.target.value)}
                                    placeholder="Pin code"
                                    className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
                                />
                            </div>
                            {/* city */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="name" className="font-medium text-sm xl:text-base lg:text-base">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={editCity}
                                    onChange={(e) => setEditCity(e.target.value)}
                                    placeholder="Enter your city"
                                    className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
                                />
                            </div>
                            {/* state */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="name" className="font-medium text-sm xl:text-base lg:text-base">
                                    State
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    id="state"
                                    value={editState}
                                    onChange={(e) => setEditState(e.target.value)}
                                    placeholder="Enter your state"
                                    className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:text-gray-500 focus:outline-none"
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
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="border-[1px] bg-transparent border-gray-400 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                                />
                            </div>

                            {/* save address */}
                            <div className='flex items-center gap-3'>
                                <Button onClick={() => setEditAddressType("home")} variant='outlined' className={`text-secondary border-secondary font-custom text-sm capitalize 
                                    ${editAddressType === "home" ? "text-primary border-primary text-opacity-100 shadow-none" : ""}`}>Home</Button>
                                <Button onClick={() => setEditAddressType("work")} variant='outlined' className={`text-secondary border-secondary font-custom text-sm capitalize 
                                    ${editAddressType === "work" ? "text-primary border-primary text-opacity-100 shadow-none" : ""}`}>Work</Button>
                                <Button onClick={() => setEditAddressType("other")} variant='outlined' className={`text-secondary border-secondary font-custom text-sm capitalize 
                                ${editAddressType === "other" ? "text-primary border-primary text-opacity-100 shadow-none" : ""}`}>Other</Button>
                            </div>

                            {/* button */}
                            <div className='mb-3'>
                                <Button type='submit' className='bg-primary font-custom text-sm capitalize w-full font-normal'>Save Address</Button>
                            </div>
                        </form>
                    </Card>
                </div>

            </div>
        </>
    )
}

export default EditUserAddress
