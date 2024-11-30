import React from "react";
import {
    Navbar,
} from "@material-tailwind/react";
import { IoIosSearch } from "react-icons/io";
import Profile from "./Profile";
import { Notification } from "./Notification";



export function AppNavbar() {
    
    return (
        <>
            <div className='bg-white'>
                <Navbar className="mx-auto py-2 px-16 shadow-none rounded-none">
                    <div className='hidden lg:flex items-center justify-between'>
                        <ul className='w-[350px]'>
                            <li className='border-[1px] border-gray-300 py-1 px-2 flex items-center gap-1 rounded-full bg-quaternary w-full h-10'>
                                <IoIosSearch className='text-gray-600 text-xl' />
                                <input type="search" name="search" id="" placeholder='Search' className='bg-transparent 
                                placeholder:text-gray-600 placeholder:text-base font-light focus:outline-none text-secondary w-full'/>
                            </li>
                        </ul>
                        <ul className='flex items-center gap-10'>
                            <li className="relative text-secondary text-xl cursor-pointer">
                                <Notification />
                            </li>
                            <li><Profile /></li>
                        </ul>
                    </div>
                </Navbar>
            </div>
        </>
    );
}