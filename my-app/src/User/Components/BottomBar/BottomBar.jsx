import React from 'react'
import { RiHome5Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";

const BottomBar = () => {
    return (
        <>
            <div className='xl:hidden lg:hidden sm:hidden md:hidden bg-white fixed bottom-0 shadow-xl w-full py-3 px-4 z-50'>
                <ul className='flex justify-between items-center'>
                    <li className='text-xl text-gray-500 flex flex-col items-center'>
                        <span><RiHome5Line /></span>
                        <span className='text-[11px] h-5'>Home</span>
                    </li>
                    <li className='text-xl text-gray-500 flex flex-col items-center'>
                        <span><FiSearch /></span>
                        <span className='text-[11px] h-5'>Search</span>
                    </li>
                    <li className='text-xl text-gray-500 flex flex-col items-center'>
                        <span><LuShoppingCart /></span>
                        <span className='text-[11px] h-5'>Cart</span>
                    </li>
                    <li className='text-xl text-gray-500 flex flex-col items-center'>
                        <span><FaRegUser /></span>
                        <span className='text-[11px] h-5'>Profile</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default BottomBar