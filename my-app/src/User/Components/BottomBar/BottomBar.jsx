import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RiHome5Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";

const BottomBar = () => {
    const location = useLocation();
    const [iconActive, setIconActive] = useState("home")

    // Pages where BottomBar should be visible
    const visibleRoutes = ["/", "/user-search", "/user-profile", "/user-cart"];

    // Check if current path matches any of the visible routes
    if (!visibleRoutes.includes(location.pathname)) {
        return null; // Don't render BottomBar
    }

    return (
        <div className="xl:hidden lg:hidden sm:hidden md:hidden bg-white fixed bottom-0 shadow-xl w-full pt-3 pb-2 px-10 z-50">
            <ul className="flex justify-between items-center">
                <li onClick={() => setIconActive("home")} className={`text-gray-500 hover:text-primary flex flex-col items-center
                        ${iconActive === "home" ? "text-primary" : ""}`}>
                    <span><RiHome5Line className="text-2xl" /></span>
                    <span className="text-[11px] h-5">Home</span>
                </li>
                <li onClick={() => setIconActive("search")} className={`text-gray-500 hover:text-primary flex flex-col items-center
                        ${iconActive === "search" ? "text-primary" : ""}`}>
                    <span><FiSearch className="text-2xl" /></span>
                    <span className="text-[11px] h-5">Search</span>
                </li>
                <li onClick={() => setIconActive("cart")} className={`text-gray-500 hover:text-primary flex flex-col items-center
                        ${iconActive === "cart" ? "text-primary" : ""}`}>
                    <span><LuShoppingCart className="text-2xl" /></span>
                    <span className="text-[11px] h-5">Cart</span>
                </li>
                <li onClick={() => setIconActive("profile")} className={`text-gray-500 hover:text-primary flex flex-col items-center
                        ${iconActive === "profile" ? "text-primary" : ""}`}>
                    <span><FaRegUser className="text-2xl" /></span>
                    <span className="text-[11px] h-5">Profile</span>
                </li>
            </ul>
        </div>
    );
};

export default BottomBar;
