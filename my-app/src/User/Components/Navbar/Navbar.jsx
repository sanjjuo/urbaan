import React, { useContext, useState } from 'react'
import {
    Navbar,
    Typography,
    Button,
} from "@material-tailwind/react";
import { FiSearch } from "react-icons/fi";
import { RiHeart3Line } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import BottomBar from '../BottomBar/BottomBar';
import { AppContext } from '../../../StoreContext/StoreContext';
import MobileSidebar from './MobileSidebar';
import { CategoryMenu } from './CategoryMenu';
import SearchBar from './SearchBar';
import { Link, useLocation } from 'react-router-dom';


const NavList = () => {
    const [navActive, setNavActive] = useState("home")

    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                onClick={() => setNavActive("home")}
                className={`p-1 font-medium font-custom text-secondary transition-all transform duration-500 ease-in-out 
                    hover:text-primary ${navActive === "home" ? "text-primary scale-110" : ""}`}
            >
                <Link to="/" >
                    Home
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                onClick={() => setNavActive("about")}
                className={`p-1 font-medium font-custom text-secondary transition-all transform duration-500 ease-in-out 
                    hover:text-primary ${navActive === "about" ? "text-primary scale-110" : ""}`}
            >
                <Link to="/about" >
                    About
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                onClick={() => setNavActive("categories")}
                className={`p-1 font-medium cursor-pointer font-custom text-secondary transition-all transform duration-500 ease-in-out 
                    hover:text-primary ${navActive === "categories" ? "text-primary scale-110" : ""}`}
            >
                <CategoryMenu />
            </Typography>
            <Typography
                as="li"
                variant="small"
                onClick={() => setNavActive("contact")}
                className={`p-1 font-medium font-custom text-secondary transition-all transform duration-500 ease-in-out 
                    hover:text-primary ${navActive === "contact" ? "text-primary scale-110" : ""}`}
            >
                <Link to="/contact" >
                    Contact
                </Link>
            </Typography>
        </ul>
    );
}

const UserNavbar = () => {
    const { openDrawer, handleOpenDrawer, handleCloseDrawer } = useContext(AppContext)
    const location = useLocation();

    // pages where navbar don't visible
    const noNavbar = ["/customer-reviews", "/write-review", "/add-delivery-address", "/select-delivery-address", "/orders-tracking",
        "/select-tracking", "/view-orders-tracking"]

    // Check if current path matches any of the visible routes
    if (noNavbar.includes(location.pathname)) {
        return null // dont render navbar
    }

    return (
        <>
            <div className='hidden sticky top-0 w-full z-50 xl:block lg:block bg-white shadow-lg'>
                <Navbar className="mx-auto max-w-screen-xl py-6 px-0 shadow-none rounded-none">
                    <div className="flex items-center justify-between text-blue-gray-900">
                        <Link to='/'><div className="w-28">
                            <img src="/logo.png" alt="" className='w-full object-contain' />
                        </div></Link>
                        <div className="hidden lg:block xl:flex xl:items-center xl:gap-10">
                            <NavList />
                            <SearchBar />
                        </div>
                        <div>
                            <ul className='flex items-center gap-8'>
                                <li className='text-2xl text-primary'><RiHeart3Line /></li>
                                <li className='text-2xl text-primary'><LuShoppingCart /></li>
                            </ul>
                        </div>
                        <div>
                            <ul className='flex items-center gap-1'>
                                <li><Link to='/login-user'><Button className='bg-primary font-custom font-normal
                                      capitalize text-sm'>sign in</Button></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Navbar>
            </div>

            {/* mobile view */}
            <div className='xl:hidden lg:hidden sticky top-0 z-10 flex justify-between items-center bg-white shadow-md py-4 px-4'>
                <ul className='flex items-center gap-5'>
                    <li onClick={handleOpenDrawer} className='text-xl text-secondary hover:text-primary'><GiHamburgerMenu /></li>
                    <li className="w-24">
                        <img src="/logo.png" alt="" className='w-full object-contain' />
                    </li>
                </ul>
                <ul className='flex items-center gap-3'>
                    <li className='text-xl text-secondary hover:text-primary'><FiSearch /></li>
                    <li className='text-xl text-secondary hover:text-primary'><RiHeart3Line /></li>
                </ul>
            </div>

            <BottomBar />
            <MobileSidebar
                openDrawer={openDrawer}
                handleCloseDrawer={handleCloseDrawer}
            />
        </>
    )
}

export default UserNavbar