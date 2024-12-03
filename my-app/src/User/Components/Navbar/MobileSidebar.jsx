import React from "react";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { HiMiniXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";


const MobileSidebar = ({ openDrawer, handleCloseDrawer }) => {
    return (
        <>
            <Drawer open={openDrawer} onClose={handleCloseDrawer} className="p-4 overflow-y-scroll">
                <div className="flex justify-between border-b-2 pb-5">
                    <div className='flex items-center gap-3'>
                        <div className='w-16 h-16'>
                            <img src="/user.png" alt="" className='w-full h-full object-cover' />
                        </div>
                        <Link to='/login-user'>
                            <p className='text-primary font-medium underline'>SIGN IN</p>
                        </Link>
                    </div>
                    <div>
                        <HiMiniXMark onClick={handleCloseDrawer} className='text-2xl text-gray-500' />
                    </div>
                </div>
                <div className="my-8 p-0">
                    <h2 className='text-sm font-medium tracking-wider'>CATEGORIES</h2>
                    <ul className='space-y-4 mt-5 text-gray-600 text-sm'>
                        <li>Kurti</li>
                        <li>Bottom</li>
                        <li>Kurti Set</li>
                        <li>Maternity Wear</li>
                        <li>Night Wear</li>
                        <li>Running Material</li>
                        <li>Churidar Material</li>
                        <li>Offer zone</li>
                    </ul>
                </div>

                <div className="my-8 p-0">
                    <h2 className='text-sm font-medium tracking-wider'>ORDER INFO</h2>
                    <ul className='space-y-4 mt-5 text-gray-600 text-sm'>
                        <Link to='/user-cart'><li>Cart</li></Link>
                        <Link to='/favourite'><li>Wishlist</li></Link>
                        <Link to='/view-orders-tracking'><li>Track Order</li></Link>
                    </ul>
                </div>

            </Drawer>
        </>
    )
}

export default MobileSidebar