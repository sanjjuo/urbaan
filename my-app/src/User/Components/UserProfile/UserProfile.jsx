import { Button, Typography } from '@material-tailwind/react'
import React from 'react'
import { TiEdit } from "react-icons/ti";
import { RiAccountBoxLine } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
import { LiaClipboardListSolid } from "react-icons/lia";
import { RiHeart3Line } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../../StoreContext/StoreContext';
import { useEffect } from 'react';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';

const UserProfile = () => {
  const [profile, setProfile] = useState([])
  const { BASE_URL } = useContext(AppContext)
  const userProfile = profile.user

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('userToken');
      try {
        const response = await axios.get(`${BASE_URL}/user/profile/view/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProfile(response.data)
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserProfile()
  }, [])
  return (
    <>
      <div className="px-8 py-16 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] overflow-y-auto">
        <div className='flex flex-col justify-center items-center gap-2'>
          <div className='w-32 h-32'>
            <img src="/userProfile.jpg" alt="" className='w-full h-full object-cover rounded-3xl' />
          </div>
          <Typography className='font-custom font-medium capitalize text-lg xl:text-xl lg:text-xl flex items-center gap-1'>
            <Link to='/edit-user-profile'><TiEdit className='text-primary' /></Link>{userProfile?.name}</Typography>
        </div>

        <div className='mt-10 flex justify-center items-center'>
          <ul className='space-y-3 xl:space-y-5 lg:space-y-5 w-72'>
            {/* <li className='flex items-center justify-between bg-white p-3 rounded-xl shadow-md'>
              <span className='flex items-center gap-2 text-base'><RiAccountBoxLine className='text-lg' />Account Details</span>
              <span className='text-sm xl:text-base lg:text-base'>
                <IoIosArrowForward /></span>
            </li> */}
            <Link to='/user-profile-details'>
              <li className='flex items-center justify-between bg-white p-3 rounded-xl shadow-md'>
                <span className='flex items-center gap-2 text-base'><TbAddressBook className='text-lg' />Address</span>
                <span className='text-sm xl:text-base lg:text-base'>
                  <IoIosArrowForward /></span>
              </li>
            </Link>
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
            <FaSignOutAlt className='text-lg' />Logout</Button></Link>
        </div>
      </div>
    </>
  )
}

export default UserProfile
