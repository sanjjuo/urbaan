import { Button, Card, Typography } from '@material-tailwind/react'
import React from 'react'
import { TiEdit } from "react-icons/ti";
import { RiAccountBoxLine } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
import { LiaClipboardListSolid } from "react-icons/lia";
import { RiHeart3Line } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../../StoreContext/StoreContext';
import { useEffect } from 'react';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';

const UserProfile = () => {
  const { BASE_URL, profile, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        navigate('/login-user')
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/user/profile/view/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProfile(response.data.user || null)
        console.log(response.data.user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserProfile()
  }, [])

  return (
    <>
      <div className="px-8 py-16 xl:py-16 xl:px-64 lg:py-16 lg:px-64 bg-userBg h-[calc(100vh-4rem)] overflow-y-auto">
        <Card className='p-4 xl:p-6 lg:p-6'>
          <div className='grid grid-cols-1 xl:grid-cols-3 gap-5'>
            {/* image */}
            <div className='flex flex-col gap-2 items-center xl:justify-center lg:justify-center'>
              <div className=' w-full h-56 xl:h-72 lg:h-72'>
                <img src="/userProfile.png" alt="" className='w-full h-full object-cover rounded-lg' />
              </div>
              <Typography className='font-custom font-medium capitalize text-lg xl:text-xl lg:text-xl flex items-center gap-1'>
                {profile.name}
              </Typography>
            </div>

            {/* options */}
            <div className='xl:col-span-2 lg:col-span-2'>
              <ul className='w-full'>
                <li className='bg-white hover:text-primary p-4 rounded-xl border-2 mb-4'>
                  <Link to='/user-addresses' className='flex items-center justify-between'>
                    <span className='flex items-center gap-2 text-base xl:text-lg lg:text-lg'>
                      <TbAddressBook className='text-xl' />My Addresses
                    </span>
                    <span className='text-base xl:text-xl lg:text-xl'>
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </li>

                <li className='bg-white hover:text-primary p-4 rounded-xl border-2 mb-4'>
                  <Link to='/user-orders' className='flex items-center justify-between'>
                    <span className='flex items-center gap-2 text-base xl:text-lg lg:text-lg'>
                      <LiaClipboardListSolid className='text-xl' />My Orders
                    </span>
                    <span className='text-base xl:text-xl lg:text-xl'>
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </li>

                <li className='bg-white hover:text-primary p-4 rounded-xl border-2'>
                  <Link to='/favourite' className='flex items-center justify-between'>
                    <span className='flex items-center gap-2 text-base xl:text-lg lg:text-lg'>
                      <RiHeart3Line className='text-xl' />My Wishlist
                    </span>
                    <span className='text-base xl:text-xl lg:text-xl'>
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </li>
              </ul>


              {/* button */}
              <div className='flex items-center justify-center mt-8'>
                <Link to='/login-user' className='w-full xl:w-48 lg:w-48'>
                  <Button className='flex items-center justify-center gap-1 w-full text-sm font-custom capitalize font-normal text-white bg-primary hover:bg-secondary'>
                    <FaSignOutAlt className='text-lg' />Logout</Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default UserProfile
