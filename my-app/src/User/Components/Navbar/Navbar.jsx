import React, { useContext, useState } from 'react'
import {
    Navbar,
    Typography,
    Button,
    Chip,
} from "@material-tailwind/react";
import { RiSearch2Line } from "react-icons/ri";
import { RiHeart3Line } from "react-icons/ri";
import { RiHeart3Fill } from "react-icons/ri";
import { RiShoppingCartLine } from "react-icons/ri";
import { RiShoppingCartFill } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import BottomBar from '../BottomBar/BottomBar';
import { AppContext } from '../../../StoreContext/StoreContext';
import MobileSidebar from './MobileSidebar';
import { CategoryMenu } from './CategoryMenu';
import SearchBar from './SearchBar';
import { Link, useLocation } from 'react-router-dom';
import { UserProfile } from './UserProfile';
import { useEffect } from 'react';
import axios from 'axios';


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
                onClick={() => setNavActive("categories")}
                className={`p-1 font-medium cursor-pointer font-custom text-secondary transition-all transform duration-500 ease-in-out 
                    hover:text-primary ${navActive === "categories" ? "text-primary scale-110" : ""}`}
            >
                <CategoryMenu />
            </Typography>
            <Typography
                as="li"
                variant="small"
                onClick={() => setNavActive("trackOrder")}
                className={`p-1 font-medium font-custom text-secondary transition-all transform duration-500 ease-in-out 
                    hover:text-primary ${navActive === "trackOrder" ? "text-primary scale-110" : ""}`}
            >
                <Link to='/orders-tracking' >
                    Track Order
                </Link>
            </Typography>
        </ul>
    );
}

const UserNavbar = () => {
    const { BASE_URL, openDrawer, handleOpenDrawer, handleCloseDrawer } = useContext(AppContext)
    const location = useLocation();
    const isFavouritePage = location.pathname === "/favourite";
    const isCartPage = location.pathname === "/user-cart";
    const [fav, setFav] = useState([])
    const [cart, setCart] = useState([])
    const cartView = cart?.length || 0;
    const favView = fav?.length || 0;
    console.log(cartView, favView);
    


    // pages where navbar don't visible
    const noNavbar = ["/customer-reviews", "/write-review", "/add-delivery-address", "/edit-delivery-address", "/select-delivery-address",
        "/select-tracking", "/all-category", "/order"]

    // Check if current path matches any of the visible routes
    if (noNavbar.includes(location.pathname)) {
        return null // dont render navbar
    }

    const token = localStorage.getItem("userToken")
    const userId = localStorage.getItem('userId');

    // fetching cart items and fav items for identifying the length initially
    useEffect(() => {
        const fetchCartItems = async () => {
            if (!token || !userId) return;
            try {
                const response = await axios.get(`${BASE_URL}/user/cart/view-cart/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCart(response.data?.items || []);
                console.log("Cart Items: ", response.data.items);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCartItems();
    }, []);


    useEffect(() => {
        const fetchWishlistProducts = async () => {
            if (!userId) return;
            try {
                const response = await axios.get(`${BASE_URL}/user/wishlist/view/${userId}`);
                setFav(response.data.items || []);
                console.log("Wishlist Items: ", response.data.items);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };
        fetchWishlistProducts();
    }, []);


    return (
        <>
            <div className='hidden sticky top-0 w-full z-50 xl:block lg:block bg-white shadow-lg'>
                <Navbar className="mx-auto max-w-screen-xl py-6 px-0 shadow-none rounded-none">
                    <div className="flex items-center justify-between text-blue-gray-900">
                        <div className="w-28">
                            <Link to='/'>
                                <img src="/logo.png" alt="" className='w-full object-contain' />
                            </Link>
                        </div>
                        <div className="hidden lg:block xl:flex xl:items-center xl:gap-10 lg:items-center lg:gap-10">
                            <NavList />
                            <SearchBar />
                        </div>
                        <div>
                            <ul className='flex items-center gap-10'>
                                <Link to="/favourite">
                                    <li className="text-2xl text-secondary cursor-pointer relative">
                                        {isFavouritePage ?
                                            <>
                                                <RiHeart3Fill className='text-primary' />
                                                {favView > 0 && (
                                                    <Chip
                                                        value={favView}
                                                        size="sm"
                                                        className="rounded-full !bg-gray-500 text-xs text-white absolute -top-1 -right-2 p-1 w-4 h-4 flex justify-center items-center"
                                                    />
                                                )}
                                            </>
                                            :
                                            <>
                                                <RiHeart3Line />
                                                {favView > 0 && (
                                                    <Chip
                                                        value={favView}
                                                        size="sm"
                                                        className="rounded-full !bg-primary text-xs text-white absolute -top-1 -right-2 p-1 w-4 h-4 flex justify-center items-center"
                                                    />
                                                )}
                                            </>
                                        }
                                    </li>

                                </Link>
                                <Link to='/user-cart'>
                                    <li className='text-2xl text-secondary cursor-pointer relative'>
                                        {isCartPage ?
                                            <>
                                                <RiShoppingCartFill className="text-2xl text-primary" />
                                                {cartView > 0 && (
                                                    <Chip value={cartView} size="sm"
                                                        className="rounded-full !bg-gray-500 text-xs text-white absolute -top-1 -right-2 p-1 w-4 h-4 flex justify-center items-center" />
                                                )}
                                            </>
                                            :
                                            <>
                                                <RiShoppingCartLine className="text-2xl" />
                                                {cartView > 0 && (
                                                    <Chip value={cartView} size="sm"
                                                        className="rounded-full text-xs !bg-primary absolute -top-1 -right-2 p-1 w-4 h-4 flex justify-center items-center" />
                                                )}
                                            </>
                                        }
                                    </li>
                                </Link>
                                <li>
                                    {token ? (
                                        <UserProfile />
                                    ) : (
                                        <Link to='/login-user'><Button className='bg-primary font-custom font-normal
                                      capitalize text-sm'>sign in</Button>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </Navbar>
            </div>

            {/* mobile view */}
            <div className='xl:hidden lg:hidden sticky top-0 z-10 flex justify-between items-center bg-white shadow-md py-4 px-4'>
                <ul className='flex items-center gap-5'>
                    <li onClick={handleOpenDrawer} className='text-2xl text-secondary hover:text-primary'><IoMenu /></li>
                    <Link to='/'><li className="w-24 cursor-pointer">
                        <img src="/logo.png" alt="" className='w-full object-contain' />
                    </li></Link>
                </ul>
                <ul className='flex items-center gap-3'>
                    <Link to='/user-search'><li className='text-2xl text-secondary hover:text-primary'><RiSearch2Line /></li></Link>
                    <Link to="/favourite">
                        <li className="text-2xl text-secondary relative">
                            {isFavouritePage ?
                                <>
                                    <RiHeart3Fill className='text-primary' />
                                    {favView > 0 && (
                                        <Chip
                                            value={favView}
                                            size="sm"
                                            className="rounded-full !bg-gray-500 text-xs text-white absolute -top-1 -right-2 p-1 w-4 h-4 flex justify-center items-center"
                                        />
                                    )}
                                </>
                                :
                                <>
                                    <RiHeart3Line />
                                    {favView > 0 && (
                                        <Chip
                                            value={favView}
                                            size="sm"
                                            className="rounded-full !bg-primary text-xs text-white absolute -top-1 -right-2 p-1 w-4 h-4 flex justify-center items-center"
                                        />
                                    )}
                                </>
                            }
                        </li>
                    </Link>
                </ul>
            </div>

            <BottomBar cartView={cartView} setCart={setCart} token={token} userId={userId} />
            <MobileSidebar
                openDrawer={openDrawer}
                handleCloseDrawer={handleCloseDrawer}
            />
        </>
    )
}

export default UserNavbar