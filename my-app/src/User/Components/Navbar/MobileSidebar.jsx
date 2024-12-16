import React from "react";
import { Drawer } from "@material-tailwind/react";
import { HiMiniXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../StoreContext/StoreContext";
import { useState } from "react";
import { useEffect } from "react";
import AppLoader from "../../../Loader";
import axios from "axios";


const MobileSidebar = ({ openDrawer, handleCloseDrawer }) => {
    const { setSelectedCategory, BASE_URL } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/admin/category/get`);
                setCategories(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                console.log("Category data could not be fetched.");
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, [BASE_URL]);


    const handleCategory = (category) => {
        setSelectedCategory(category)
    }
    return (
        <>
            <Drawer open={openDrawer} onClose={handleCloseDrawer} className="p-4 overflow-y-scroll">
                <div className="flex justify-between border-b-2 pb-5">
                    <div className='flex items-center gap-3'>
                        <div className='w-16 h-16'>
                            <img src="/user.png" alt="" className='w-full h-full object-cover' />
                        </div>
                        <Link onClick={handleCloseDrawer} to='/login-user'>
                            <p className='text-primary font-medium underline'>SIGN IN</p>
                        </Link>
                    </div>
                    <div>
                        <HiMiniXMark onClick={handleCloseDrawer} className='text-2xl text-gray-500' />
                    </div>
                </div>
                <div className="my-8 p-0">
                    <h2 className='text-sm font-medium tracking-wider'>CATEGORIES</h2>
                    {
                        isLoading || categories.length === 0 ? (
                            <div className="col-span-2 flex justify-center items-center h-[50vh]">
                                <AppLoader />
                            </div>
                        ) : (
                            <>
                                <ul className='space-y-4 mt-5 text-gray-600 text-sm'>
                                    {
                                        categories.map((category) => (
                                            <li key={category.id} onClick={() => handleCategory(category.name)}>
                                                <Link to='/all-category' className="capitalize">{category.name}</Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </>
                        )
                    }
                </div>

                <div className="my-8 p-0">
                    <h2 className='text-sm font-medium tracking-wider'>ORDER INFO</h2>
                    <ul className='space-y-4 mt-5 text-gray-600 text-sm'>
                        <li onClick={handleCloseDrawer}><Link to='/user-cart'>Cart</Link></li>
                        <li onClick={handleCloseDrawer}><Link to='/favourite'>Wishlist</Link></li>
                        <li onClick={handleCloseDrawer}><Link to='/orders-tracking'>Track Order</Link></li>
                    </ul>
                </div>

            </Drawer>
        </>
    )
}

export default MobileSidebar