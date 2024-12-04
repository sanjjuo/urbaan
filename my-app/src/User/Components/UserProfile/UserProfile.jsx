import { Button, Typography } from '@material-tailwind/react'
import React from 'react'
import { TiEdit } from "react-icons/ti";
import { RiAccountBoxLine } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
import { LiaClipboardListSolid } from "react-icons/lia";
import { RiHeart3Line } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const UserProfile = () => {
  return (
    <>
      <div className="px-8 py-16 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] overflow-y-auto">
        <div className='flex flex-col justify-center items-center gap-2'>
          <div className='w-32 h-32'>
            <img src="/userProfile.jpg" alt="" className='w-full h-full object-cover rounded-3xl' />
          </div>
          <Typography className='font-custom font-medium text-lg xl:text-xl lg:text-xl flex items-center gap-1'>
            <Link to='/edit-user-profile'><TiEdit className='text-primary' /></Link>Natalie Portman</Typography>
        </div>

        <div className='mt-10'>
          <ul className='space-y-3 xl:space-y-8 lg:space-y-8 xl:mx-72 lg:mx-72'>
            <li className='flex items-center justify-between bg-white p-3 rounded-xl shadow-md'>
              <span className='flex items-center gap-2 text-base'><RiAccountBoxLine className='text-lg' />Account Details</span>
              <span className='text-sm xl:text-base lg:text-base'>
                <IoIosArrowForward /></span>
            </li>
           <li className='flex items-center justify-between bg-white p-3 rounded-xl shadow-md'>
              <span className='flex items-center gap-2 text-base'><TbAddressBook className='text-lg' />Address</span>
              <span className='text-sm xl:text-base lg:text-base'>
                <IoIosArrowForward /></span>
            </li>
           <li className='flex items-center justify-between bg-white p-3 rounded-xl shadow-md'>
              <span className='flex items-center gap-2 text-base'><LiaClipboardListSolid className='text-lg' />Orders</span>
              <span className='text-sm xl:text-base lg:text-base'>
                <IoIosArrowForward /></span>
            </li>
           <li className='flex items-center justify-between bg-white p-3 rounded-xl shadow-md'>
              <span className='flex items-center gap-2 text-base'><RiHeart3Line className='text-lg' />Wishlist</span>
              <span className='text-sm xl:text-base lg:text-base'>
                <IoIosArrowForward /></span>
            </li>
          </ul>
        </div>

        <div className='flex items-center justify-center mt-8'>
          <Link to='/login-user'><Button className='flex items-center justify-center gap-1 w-36 text-sm font-custom capitalize font-normal text-white bg-primary'>
            <RiLogoutCircleRFill className='text-lg' />Logout</Button></Link>
        </div>
      </div>
    </>
  )
}

export default UserProfile
