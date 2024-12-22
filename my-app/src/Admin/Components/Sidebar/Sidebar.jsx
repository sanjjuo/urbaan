import {
    List,
    ListItem,
    ListItemPrefix,
    Card
} from "@material-tailwind/react";
import React, { useState, useEffect } from 'react'
import { IoMdTimer } from "react-icons/io";
import { MdOutlineWindow } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { CgListTree } from "react-icons/cg";
import { TbListCheck } from "react-icons/tb";
import { RiCouponLine } from "react-icons/ri";
import { PiUsersBold } from "react-icons/pi";
import { TbFileInvoice } from "react-icons/tb";
import { MdOutlineViewCarousel } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar() {

    const location = useLocation();
    const [activeLink, setActiveLink] = useState(() => {
        // Dynamically set the initial state based on the current path 
        // it is used for avoiding sudden display of initially "dashboard" path before showing current path or page where user on,
        const path = location.pathname;
        if (path === "") return "dashboard";
        if (path === "/adminHome") return "dashboard";
        if (path === "/adminHome/product") return "product";
        if (path === "/adminHome/addProduct") return "product";
        if (path === "/adminHome/editProduct") return "product";
        if (path === "/adminHome/category") return "category";
        if (path === "/adminHome/subcategory") return "subcategory";
        if (path === "/adminHome/admincarousel") return "admincarousel";
        if (path === "/adminHome/orderlist") return "orderlist";
        if (path === "/adminHome/coupon") return "coupon";
        if (path === "/adminHome/userslist") return "userslist";
        if (path === "/adminHome/userDetails") return "userslist";
        if (path === "/adminHome/invoice") return "invoice";
        return "dashboard"; // Fallback to "dashboard" for unknown paths
    });

    // Update active link based on the current path, used for show current page that user on after refresh
    useEffect(() => {
        const path = location.pathname;
        if (path === "/") setActiveLink("dashboard");
        else if (path === "/adminHome") setActiveLink("dashboard");
        else if (path === "/adminHome/product") setActiveLink("product");
        else if (path === "/adminHome/addProduct") setActiveLink("product");
        else if (path === "/adminHome/editProduct") setActiveLink("product");
        else if (path === "/adminHome/category") setActiveLink("category");
        else if (path === "/adminHome/subcategory") setActiveLink("subcategory");
        else if (path === "/adminHome/admincarousel") setActiveLink("admincarousel");
        else if (path === "/adminHome/orderlist") setActiveLink("orderlist");
        else if (path === "/adminHome/coupon") setActiveLink("coupon");
        else if (path === "/adminHome/userslist") setActiveLink("userslist");
        else if (path === "/adminHome/userDetails") setActiveLink("userslist");
        else if (path === "/adminHome/invoice") setActiveLink("invoice");
    }, [location]);
    return (
        <>
            <Card className="hidden lg:block h-screen lg:w-64 pt-4 shadow-none rounded-none overflow-y-auto hide-scrollbar">
                <div className='flex justify-center items-center'>
                    <Link to='/adminHome'><div className="mb-2 pt-2 w-28 rounded-3xl">
                        <img src="/logo.png" alt="" className='w-full object-contain' />
                    </div></Link>
                </div>
                <List className='mt-8 px-4 space-y-1'>
                    <Link to="/adminHome">
                        <ListItem onClick={() => setActiveLink('dashboard')} className={` text-secondary bg-gray-100 p-3 text-base font-medium transition-all duration-300 ease-in-out
                            ${activeLink === "dashboard" ? "!bg-primary text-white py-6 focus:!text-white" : "bg-none"}`}>
                            <ListItemPrefix>
                                <IoMdTimer className="h-5 w-5" />
                            </ListItemPrefix>
                            Dashboard
                        </ListItem>
                    </Link>

                    <Link to="/adminHome/product">
                        <ListItem onClick={() => setActiveLink('product')} className={`text-secondary bg-gray-100 p-3 text-base font-medium transition-all duration-300 ease-in-out
                            ${activeLink === "product" ? "!bg-primary text-white py-6 focus:!text-white" : "bg-none"}`}>
                            <ListItemPrefix>
                                <MdOutlineWindow className="h-5 w-5" />
                            </ListItemPrefix>
                            Products
                        </ListItem>
                    </Link>

                    <Link to='/adminHome/category'>
                        <ListItem onClick={() => setActiveLink('category')} className={`text-secondary bg-gray-100 p-3 text-base font-medium transition-all duration-300 ease-in-out
                            ${activeLink === "category" ? "!bg-primary text-white py-6 focus:!text-white" : "bg-none"}`}>
                            <ListItemPrefix>
                                <MdOutlineCategory className="h-5 w-5" />
                            </ListItemPrefix>
                            Category
                        </ListItem>
                    </Link>
                    <Link to='/adminHome/subcategory'>
                        <ListItem onClick={() => setActiveLink('subcategory')} className={`text-secondary bg-gray-100 p-3 text-base font-medium transition-all duration-300 ease-in-out
                            ${activeLink === "subcategory" ? "!bg-primary text-white py-6 focus:!text-white" : "bg-none"}`}>
                            <ListItemPrefix>
                                <CgListTree className="h-5 w-5" />
                            </ListItemPrefix>
                            Sub Category
                        </ListItem>
                    </Link>

                    <Link to='/adminHome/admincarousel'>
                        <ListItem onClick={() => setActiveLink('admincarousel')} className={`text-secondary bg-gray-100 p-3 text-base font-medium transition-all duration-300 ease-in-out
                            ${activeLink === "admincarousel" ? "!bg-primary text-white py-6 focus:!text-white" : "bg-none"}`}>
                            <ListItemPrefix>
                                <MdOutlineViewCarousel className="h-5 w-5" />
                            </ListItemPrefix>
                            Carousel
                        </ListItem>
                    </Link>

                    <Link to='/adminHome/orderlist'>
                        <ListItem onClick={() => setActiveLink('orderlist')} className={`text-secondary bg-gray-100 p-3 text-base font-medium transition-all duration-300 ease-in-out
                            ${activeLink === "orderlist" ? "!bg-primary text-white py-6 focus:!text-white" : "bg-none"}`}>
                            <ListItemPrefix>
                                <TbListCheck className="h-5 w-5" />
                            </ListItemPrefix>
                            Order List
                        </ListItem>
                    </Link>

                    <Link to='/adminHome/coupon'>
                        <ListItem onClick={() => setActiveLink('coupon')} className={`text-secondary bg-gray-100 p-3 text-base font-medium transition-all duration-300 ease-in-out
                            ${activeLink === "coupon" ? "!bg-primary text-white py-6 focus:!text-white" : "bg-none"}`}>
                            <ListItemPrefix>
                                <RiCouponLine className="h-5 w-5" />
                            </ListItemPrefix>
                            Coupons
                        </ListItem>
                    </Link>

                    <Link to='/adminHome/userslist'>
                        <ListItem onClick={() => setActiveLink('userslist')} className={`text-secondary bg-gray-100 p-3 text-base font-medium transition-all duration-300 ease-in-out
                            ${activeLink === "userslist" ? "!bg-primary text-white py-6 focus:!text-white" : "bg-none"}`}>
                            <ListItemPrefix>
                                <PiUsersBold className="h-5 w-5" />
                            </ListItemPrefix>
                            Users List
                        </ListItem>

                    </Link>

                    <Link to='/adminHome/delivery'>
                        <ListItem onClick={() => setActiveLink('delivery')} className={`text-secondary bg-gray-100 p-3 text-base font-medium transition-all duration-300 ease-in-out
                            ${activeLink === "delivery" ? "!bg-primary text-white py-6 focus:!text-white" : "bg-none"}`}>
                            <ListItemPrefix>
                                <TbTruckDelivery className="h-5 w-5" />
                            </ListItemPrefix>
                            Delivery
                        </ListItem>

                    </Link>

                    <Link to='/adminHome/invoice'>
                        <ListItem onClick={() => setActiveLink('invoice')} className={`text-secondary bg-gray-100 p-3 text-base font-medium transition-all duration-300 ease-in-out
                            ${activeLink === "invoice" ? "!bg-primary text-white py-6 focus:!text-white" : "bg-none"}`}>
                            <ListItemPrefix>
                                <TbFileInvoice className="h-5 w-5" />
                            </ListItemPrefix>
                            Invoice
                        </ListItem>
                    </Link>
                </List>
            </Card>
        </>
    );
}