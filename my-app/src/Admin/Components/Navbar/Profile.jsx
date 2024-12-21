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
              src="/admin.png"
            />
            <ul className='cursor-pointer flex flex-col items-center'>
              <li className='text-secondary text-base font-bold'>Amber Heard</li>
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
            <Typography as={Link} to='/admin-login' variant="small" className="font-medium font-custom flex items-center gap-2 text-buttonBg">
              <AiOutlineLogin className='text-2xl' />
              Log in
            </Typography>
          </MenuItem>
          <hr className="my-2 border-blue-gray-50" />
          <MenuItem className="px-7">
            <Typography as={Link} to='/admin-login' variant="small" className="font-medium font-custom flex items-center gap-2 text-deleteBg">
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
