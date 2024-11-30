import React, { useContext } from 'react'
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { FiSearch } from "react-icons/fi";
import { RiHeart3Line } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import BottomBar from '../BottomBar/BottomBar';
import { AppContext } from '../../../StoreContext/StoreContext';
import MobileSidebar from './MobileSidebar';


const NavList = () => {
    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                className="p-1 font-medium font-custom"
            >
                <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
                    Home
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-medium font-custom"
            >
                <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
                    About
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-medium font-custom"
            >
                <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
                    Categories
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-medium font-custom"
            >
                <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
                    Contact
                </a>
            </Typography>
        </ul>
    );
}

const UserNavbar = () => {
    const [openNav, setOpenNav] = React.useState(false);
    const { openDrawer, handleOpenDrawer, handleCloseDrawer } = useContext(AppContext)

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);
    return (
        <>
            <div className='hidden sticky top-0 w-full z-50 xl:block lg:block bg-white shadow-lg'>
                <Navbar className="mx-auto max-w-screen-xl py-6 px-0 shadow-none rounded-none">
                    <div className="flex items-center justify-between text-blue-gray-900">
                        <div className="w-28">
                            <img src="/logo.png" alt="" className='w-full object-contain' />
                        </div>
                        <div className="hidden lg:block">
                            <NavList />
                        </div>
                        <div>
                            <ul className='flex items-center gap-8'>
                                <li className='text-2xl text-primary'><FiSearch /></li>
                                <li className='text-2xl text-primary'><RiHeart3Line /></li>
                                <li className='text-2xl text-primary'><LuShoppingCart /></li>
                            </ul>
                        </div>
                    </div>
                    <Collapse open={openNav}>
                        <NavList />
                    </Collapse>
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