import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiHome5Line } from "react-icons/ri";
import { RiSearch2Line } from "react-icons/ri";
import { RiShoppingCartLine } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";
import { RiHome5Fill } from "react-icons/ri";
import { RiShoppingCartFill } from "react-icons/ri";
import { RiUser3Fill } from "react-icons/ri";
import { RiSearch2Fill } from "react-icons/ri";

const BottomBar = () => {
    const location = useLocation();
    const [iconActive, setIconActive] = useState(() => {
        const path = location.pathname;
        if (path === '/') return "home";
        if (path === '/user-search') return "search";
        if (path === '/user-cart') return "cart";
        if (path === '/user-profile') return "profile";
        return "home";
    })

    useEffect(() => {
        const path = location.pathname;
        if (path === '/') setIconActive("home");
        if (path === '/user-search') setIconActive("search");
        if (path === '/user-cart') setIconActive("cart");
        if (path === '/user-profile') setIconActive("profile");
    }, [location]);

    // Pages where BottomBar should be visible
    const visibleRoutes = ["/", "/view-all-category", "/favourite", "/user-search", "/user-profile", "/user-cart"];

    // Check if current path matches any of the visible routes
    if (!visibleRoutes.includes(location.pathname)) {
        return null; // Don't render BottomBar
    }

    return (
        <div className="xl:hidden lg:hidden sm:hidden md:hidden bg-white fixed bottom-0 shadow-xl w-full pt-3 pb-2 px-10 z-50">
            <ul className="flex justify-between items-center">
                <Link to='/'><li onClick={() => setIconActive("home")} className={`text-gray-500 hover:text-primary flex flex-col items-center
                        ${iconActive === "home" ? "text-primary" : ""}`}>
                    {
                        iconActive === "home" ? (
                            <>
                                <span><RiHome5Fill className="text-2xl" /></span>
                            </>
                        ) : (
                            <>
                                <span><RiHome5Line className="text-2xl" /></span>
                            </>
                        )
                    }
                    <span className="text-[11px] h-5">Home</span>
                </li></Link>

                <Link><li onClick={() => setIconActive("search")} className={`text-gray-500 hover:text-primary flex flex-col items-center
                        ${iconActive === "search" ? "text-primary" : ""}`}>
                    {
                        iconActive === "search" ? (
                            <>
                                <span><RiSearch2Fill className="text-2xl" /></span>
                            </>
                        ) : (
                            <>
                                <span><RiSearch2Line className="text-2xl" /></span>
                            </>
                        )
                    }
                    <span className="text-[11px] h-5">Search</span>
                </li></Link>

                <Link><li onClick={() => setIconActive("cart")} className={`text-gray-500 hover:text-primary flex flex-col items-center
                        ${iconActive === "cart" ? "text-primary" : ""}`}>
                    {
                        iconActive === "cart" ? (
                            <>
                                <span><RiShoppingCartFill className="text-2xl" /></span>
                            </>
                        ) : (
                            <>
                                <span><RiShoppingCartLine className="text-2xl" /></span>
                            </>
                        )
                    }
                    <span className="text-[11px] h-5">Cart</span>
                </li></Link>

                <Link to='/user-profile'><li onClick={() => setIconActive("profile")} className={`text-gray-500 hover:text-primary flex flex-col items-center
                        ${iconActive === "profile" ? "text-primary" : ""}`}>
                    {
                        iconActive === "profile" ? (
                            <>
                                <span><RiUser3Fill className="text-2xl" /></span>
                            </>
                        ) : (
                            <>
                                <span><RiUser3Line className="text-2xl" /></span>
                            </>
                        )
                    }
                    <span className="text-[11px] h-5">Profile</span>
                </li></Link>
            </ul>
        </div>
    );
};

export default BottomBar;
