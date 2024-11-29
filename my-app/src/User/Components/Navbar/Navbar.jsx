import React from 'react'
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { IoSearch } from "react-icons/io5";
import { RiHeart3Line } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";

const NavList = () => {
    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
                    Pages
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
                    Account
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
                    Blocks
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
                    Docs
                </a>
            </Typography>
        </ul>
    );
}

const UserNavbar = () => {
    const [openNav, setOpenNav] = React.useState(false);

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
            <div className='hidden xl:block lg:block bg-white shadow-md'>
                <Navbar className="mx-auto max-w-screen-xl p-6 shadow-none rounded-none">
                    <div className="flex items-center justify-between text-blue-gray-900">
                        <div className="w-28">
                            <img src="/logo.png" alt="" className='w-full object-contain' />
                        </div>
                        <div className="hidden lg:block">
                            <NavList />
                        </div>
                        <div>
                            <ul className='flex items-center gap-8'>
                                <li className='text-2xl text-primary'><IoSearch /></li>
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
            <div className='xl:hidden lg:hidden sticky top-0 z-10 flex justify-between items-center bg-white shadow-md p-4'>
                <ul className='flex items-center gap-5'>
                    <li className='text-xl text-secondary'><GiHamburgerMenu /></li>
                    <li className="w-20">
                        <img src="/logo.png" alt="" className='w-full object-contain' />
                    </li>
                </ul>
                <ul className='flex items-center gap-5'>
                    <li className='text-xl text-secondary'><IoSearch /></li>
                    <li className='text-xl text-secondary'><RiHeart3Line /></li>
                </ul>
            </div>
        </>
    )
}

export default UserNavbar