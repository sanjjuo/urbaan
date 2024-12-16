import React, { useContext } from 'react'
import { FaStar } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { Button } from '@material-tailwind/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";
import { AppContext } from '../../../StoreContext/StoreContext';
import { IoHeartOutline } from "react-icons/io5";
import { IoIosArrowBack } from 'react-icons/io';
import { RiHeart3Fill, RiHeart3Line, RiSearch2Line } from 'react-icons/ri';
import SimilarProducts from './SimilarProducts';
import ProductReviews from './ProductReviews';
import { SizeChart } from './SIzeChart';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductDetails = () => {
    const { productDetails, handleOpenSizeDrawer, BASE_URL } = useContext(AppContext)
    const location = useLocation()
    const isFavouritePage = location.pathname === "/favourite";
    const navigate = useNavigate();
    const colorSizes = productDetails.colors[0].sizes;
    const colorColor = productDetails.colors
    const features = productDetails.features



    const addToCart = async () => {
        try {
            const payload = {
                productId: productDetails._id,
                quantity: 1, // Default quantity
                selectedColor: colorColor[0].color, // Default color
                selectedSize: colorSizes[0].size // Default size
            };

            const response = await axios.post(`${BASE_URL}/user/cart/add`, payload);
            if (response.status === 200) {
                toast.success("Added to cart successfully!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add to cart. Please try again.");
        }
    };

    return (
        <>
            <div className='sticky top-0 z-10 flex justify-between items-center bg-white shadow-md py-4 px-4'>
                <ul className='flex items-center gap-2'>
                    <li onClick={() => navigate(-1)} className='text-2xl text-secondary cursor-pointer'><IoIosArrowBack /></li>
                    <li className="w-24">
                        <img src="/logo.png" alt="" className='w-full object-contain' />
                    </li>
                </ul>
                <ul className='flex items-center gap-3'>
                    <li className='text-2xl text-secondary hover:text-primary'><RiSearch2Line /></li>
                    <Link to="/favourite">
                        <li className="text-2xl text-secondary">
                            {isFavouritePage ? <RiHeart3Fill className='text-primary' /> : <RiHeart3Line />}
                        </li>
                    </Link>
                </ul>
            </div>

            <div className='p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg'>
                <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-5 xl:gap-10 lg:gap-10">
                    <div className='col-span-2 xl:space-y-3 lg:space-y-3 xl:sticky xl:top-0 lg:sticky lg:top-0 h-[350px] xl:h-[600px] lg:h-[600px]'>
                        <div className='w-full h-full relative'>
                            <img
                                src={`${BASE_URL}/uploads/category/${productDetails.images}`}
                                alt={productDetails.title}
                                className='w-full h-full object-cover rounded-xl'
                            />
                            <IoHeartOutline className='absolute top-5 right-5 xl:text-3xl lg:text-3xl text-2xl text-white' />
                        </div>
                        <Button onClick={addToCart}
                            className='hidden xl:flex lg:flex items-center justify-center gap-2 font-normal capitalize font-custom tracking-wide text-sm
                        w-full bg-primary'>
                            <FiShoppingCart />Add to cart
                        </Button>
                    </div>
                    <div className='col-span-2'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-secondary font-semibold text-xl xl:text-2xl lg:text-2xl'>{productDetails.title}</h1>
                            <div className='flex items-center gap-1'>
                                <p className='text-sm text-shippedBg'>4.1</p>
                                <ul className='flex items-center gap-1 xl:gap-3 lg:gap-3'>
                                    <li className='text-primary text-sm xl:text-base lg:text-base'><FaStar /></li>
                                    <li className='text-primary text-sm xl:text-base lg:text-base'><FaStar /></li>
                                    <li className='text-primary text-sm xl:text-base lg:text-base'><FaStar /></li>
                                    <li className='text-primary text-sm xl:text-base lg:text-base'><FaStar /></li>
                                    <li className='text-primary text-sm xl:text-base lg:text-base'><FaStar /></li>
                                </ul>
                                <p className='text-xs xl:text-sm lg:text-sm'>(103)</p>
                            </div>
                        </div>
                        <p className='text-gray-600 text-xs xl:text-base lg:text-base'>{productDetails.description}</p>
                        <div>
                            <div className='flex items-center justify-between xl:justify-normal lg:justify-normal xl:gap-10 lg:gap-10 mt-2'>
                                <p className='text-xs xl:text-sm lg:text-sm font-semibold text-shippedBg'>Free Shipping</p>
                            </div>

                            <div className='mt-2'>
                                <ul className='flex items-center gap-3 xl:gap-4 lg:gap-4'>
                                    <li className='text-deleteBg font-medium text-2xl xl:text-base lg:text-base'>- {productDetails.discount}%</li>
                                    <li className='font-bold text-3xl xl:text-2xl lg:text-2xl'>₹{productDetails.offerPrice}</li>
                                </ul>
                                <p className="text-gray-600 font-normal text-sm xl:text-base lg:text-base">
                                    M.R.P : <s>{productDetails.actualPrice}</s>
                                </p>
                            </div>

                            {/* Select Size */}
                            <div className='mt-4'>
                                <div className='flex items-center justify-between xl:justify-normal lg:justify-normal 
                            xl:gap-32 lg:gap-32 mb-5'>
                                    <h4 className='font-medium text-sm xl:text-base lg:text-base'>Select Size</h4>
                                    <h4 onClick={handleOpenSizeDrawer} className='text-primary underline font-medium text-xs xl:text-sm lg:text-sm cursor-pointer'>Size chart</h4>
                                </div>
                                <ul className='flex items-center gap-3'>
                                    {colorSizes.map((size) => (
                                        <li key={size._id} className='bg-white uppercase shadow-md rounded-md w-10 h-10 flex items-center justify-center text-sm xl:text-sm lg:text-sm hover:bg-primary hover:text-white cursor-pointer'>
                                            {size.size}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Select Color */}
                            <div className='mt-4'>
                                <h4 className='font-medium text-sm xl:text-base lg:text-base'>Select Color</h4>
                                <ul className='flex items-center gap-3 mt-3'>
                                    {
                                        colorColor.map((color) => (
                                            <li key={color._id} className='cursor-pointer'>
                                                <FaCircle
                                                    className='text-3xl'
                                                    style={{ color: color.color }} // Apply the backend color value
                                                />
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>

                            {/* Specifications */}
                            <div className="mt-7">
                                <h4 className="font-medium mb-3 text-sm xl:text-base lg:text-base">Specifications</h4>
                                {
                                    Object.entries(features).map(([key, value], index) => (
                                        <div key={index} className="grid grid-cols-2 gap-x-4 mb-3">
                                            <span className="font-normal capitalize text-xs xl:text-sm lg:text-sm text-gray-600">{key}</span>
                                            <span className="text-left text-xs xl:text-sm lg:text-sm">{value || "null"}</span>
                                        </div>
                                    ))
                                }
                                <div className="grid grid-cols-2 gap-x-4 mb-3">
                                    <span className="font-normal capitalize text-xs xl:text-sm lg:text-sm text-gray-600">Manufacuturer Name</span>
                                    <span className="text-left text-xs xl:text-sm lg:text-sm">{productDetails.manufacturerName}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 mb-3">
                                    <span className="font-normal capitalize text-xs xl:text-sm lg:text-sm text-gray-600">Manufacturer Brand</span>
                                    <span className="text-left text-xs xl:text-sm lg:text-sm">{productDetails.manufacturerBrand}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 mb-3">
                                    <span className="font-normal capitalize text-xs xl:text-sm lg:text-sm text-gray-600">Manufacturer Address</span>
                                    <span className="text-left text-xs xl:text-sm lg:text-sm">{productDetails.manufacturerAddress}</span>
                                </div>
                                <p className="text-xs text-buttonBg text-left font-semibold underline cursor-pointer mt-5">
                                    See more
                                </p>
                            </div>


                            {/* Customer Reviews */}
                            <div className='mt-10'>
                                <ProductReviews productDetails={productDetails} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* similar products */}
                <div className='mt-10 xl:mt-20 lg:mt-10'>
                    <SimilarProducts />
                </div>

                <div className="bg-white shadow-md fixed bottom-0 inset-x-0 z-50 w-full p-4 xl:hidden lg:hidden">
                    <Button onClick={addToCart} className='flex items-center justify-center gap-2 font-normal capitalize font-custom tracking-wide text-sm
                        w-full bg-primary'>
                        <FiShoppingCart />Add to cart
                    </Button>
                </div>
            </div>

            {/* size chart drawer */}
            <SizeChart />
        </>
    )
}

export default ProductDetails