import React from 'react'
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { AiOutlineLogin } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <>

      <Menu placement='bottom-end'>
        <MenuHandler>
          <div className='flex items-center gap-2'>
            <Avatar
              variant="circular"
              alt="tania andrew"
              className="cursor-pointer"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <ul className='cursor-pointer'>
              <li className='text-secondary text-base font-bold'>Leo Messi</li>
              <li className='text-sm text-gray-400 font-normal'>Admin</li>
            </ul>
          </div>
        </MenuHandler>
        <MenuList className='rounded-xl shadow-md !w-[50px] py-2 px-0 !m-0'>
          <MenuItem className="px-7">
            <Typography variant="small" className="font-medium font-custom flex items-center gap-2 text-secondary">
              <CgProfile className='text-2xl' />
              My Profile
            </Typography>
          </MenuItem>
          <MenuItem className="px-7">
            <Typography as={Link} to='/adminLogin' variant="small" className="font-medium font-custom flex items-center gap-2 text-buttonBg">
              <AiOutlineLogin className='text-2xl' />
              Log in
            </Typography>
          </MenuItem>
          <hr className="my-2 border-blue-gray-50" />
          <MenuItem className="px-7">
            <Typography as={Link} to='/adminLogin' variant="small" className="font-medium font-custom flex items-center gap-2 text-deleteBg">
              <AiOutlineLogout className='text-2xl' />
              Log Out
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default Profile
