import React, { useContext } from 'react'
import { FaStar } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { Button, Chip } from '@material-tailwind/react';
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
import { useState } from 'react';
import { TiTick } from "react-icons/ti";
import { useEffect } from 'react';

const ProductDetails = () => {
    const { handleOpenSizeDrawer, BASE_URL, wishlist } = useContext(AppContext)
    const location = useLocation();
    const isFavouritePage = location.pathname === "/favourite";
    const { productId } = location.state || {}
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState([]);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState({});
    const [heartIcons, setHeartIcons] = useState({});



    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/products/product/${productId}`)
                setProductDetails(response.data)
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProductDetails()
    }, [])

    console.log(productDetails);
    console.log("id", productId);


    const getContrastYIQ = (color) => {
        if (!/^#([0-9A-F]{3}){1,2}$/i.test(color)) return 'text-black'; // Default to black for invalid or empty colors
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? 'text-black' : 'text-white';
    };


    const userId = localStorage.getItem('userId')
    const userToken = localStorage.getItem('userToken');

    const addToCart = async () => {
        try {

            if (!selectedColor || !selectedSize) {
                toast.error("Please select a color and size.");
                return;
            }

            if (!userId) {
                toast.error("Authorization is missing")
                navigate('/login-user')
                return;
            }

            if (!userToken) {
                toast.error("Authorization userId is missing")
                navigate('/login-user')
                return;
            }


            const payload = {
                userId: userId,
                productId: productDetails._id,
                quantity: 1, // Default quantity
                color: selectedColor,
                size: selectedSize[selectedColor],
            };

            console.log(payload);


            const response = await axios.post(`${BASE_URL}/user/cart/add`, payload, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            if (response.status === 200) {
                toast.success(`${productDetails.title} added to your cart`);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to add to cart. Please try again.");
        }
    };


    const handleColorClick = (color) => {
        setSelectedColor((prevColor) => (prevColor === color ? "" : color));
    };



    // Handle size click for a specific color
    const handleSizeClick = (size, color) => {
        setSelectedSize((prevSelectedSize) => {
            const updatedSelectedSize = { ...prevSelectedSize };
            // If the size is already selected for the color, deselect it
            if (updatedSelectedSize[color] === size) {
                delete updatedSelectedSize[color];
            } else {
                updatedSelectedSize[color] = size; // Otherwise, select the new size for the color
            }
            return updatedSelectedSize;
        });
    };

    const handleWishlist = async (productId, productTitle) => {
        try {
            const payload = { userId: userId, productId: productId };

            const isInWishlist = wishlist?.items?.some(item => item.productId._id === productId);

            if (!isInWishlist) {
                const response = await axios.post(`${BASE_URL}/user/wishlist/add`, payload);
                console.log(response.data);

                setHeartIcons(prevState => ({
                    ...prevState,
                    [productId]: true,
                }));

                toast.success(`${productTitle} added to wishlist`);
            } else {
                toast.error('Product already in wishlist');
            }
        } catch (error) {
            console.log(error);
        }
    };


    const colorSizes = productDetails.colors?.find(item => item.color === selectedColor)?.sizes || [];
    const colorColor = productDetails.colors || []
    const features = productDetails.features || []


    return (
        <>
            <div className="p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto">
                <h2 onClick={() => navigate(-1)} className='flex items-center gap-1 text-lg xl:text-xl lg:text-xl font-medium cursor-pointer'>
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Back</h2>
                <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-5 xl:gap-10 lg:gap-10 mt-5">
                    <div className='col-span-2 xl:space-y-3 lg:space-y-3 xl:sticky xl:top-0 lg:sticky lg:top-0 h-[350px] xl:h-[600px] lg:h-[600px]'>
                        <div className='w-full h-full relative'>
                            <img
                                src={`${BASE_URL}/uploads/category/${productDetails.images}`}
                                alt={productDetails.title}
                                className='w-full h-full object-cover rounded-xl'
                                onError={(e) => e.target.src = '/no-image.jpg'}
                            />
                            {heartIcons[productDetails._id] || wishlist?.items?.some(item => item.productId._id === productDetails._id) ? (
                                <RiHeart3Fill
                                    onClick={() => handleWishlist(productDetails._id, productDetails.title)}
                                    className='absolute top-5 right-5 xl:text-3xl lg:text-3xl text-2xl cursor-pointer text-primary bg-white w-7 h-7 xl:w-8 xl:h-8 lg:w-8 lg:h-8 p-1 rounded-full shadow-md'
                                />
                            ) : (
                                <IoHeartOutline
                                    onClick={() => handleWishlist(productDetails._id, productDetails.title)}
                                    className='absolute top-5 right-5 xl:text-3xl lg:text-3xl text-2xl text-primary bg-white w-7 h-7 xl:w-8 xl:h-8 lg:w-8 lg:h-8 p-1 rounded-full shadow-md'
                                />
                            )}
                        </div>

                        <Button onClick={addToCart}
                            className='hidden xl:flex lg:flex items-center justify-center gap-2 font-normal capitalize font-custom tracking-wide text-sm
                        w-full bg-primary'>
                            <FiShoppingCart />Add to cart
                        </Button>
                    </div>
                    <div className='col-span-2'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-secondary capitalize font-semibold text-xl xl:text-2xl lg:text-2xl'>{productDetails.title}</h1>
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
                        <p className='text-gray-600 text-xs capitalize xl:text-base lg:text-base'>{productDetails.description}</p>
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

                            {/* Select Color */}
                            <div className='mt-4'>
                                <h4 className='font-medium text-sm xl:text-base lg:text-base mb-2'>Select Color</h4>
                                <ul className='flex items-center gap-3'>
                                    {colorColor.map((color) => (
                                        <li
                                            key={color._id}
                                            onClick={() => handleColorClick(color.color)}
                                            className={`cursor-pointer text-3xl relative flex items-center justify-center ${selectedColor.includes(color.color) ? 'text-primary' : ''}`}
                                        >
                                            {selectedColor.includes(color.color) && (
                                                <TiTick className={`absolute text-3xl p-1 rounded-full bg-black/10 ${getContrastYIQ(color.color)}`} />
                                            )}
                                            <FaCircle style={{ color: color.color }} />
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Select Size */}
                            <div className='mt-4'>
                                <div className='flex items-center justify-between xl:justify-normal lg:justify-normal xl:gap-32 lg:gap-32 mb-2'>
                                    <h4 className='font-medium text-sm xl:text-base lg:text-base'>Select Size</h4>
                                    <h4 onClick={handleOpenSizeDrawer} className='text-primary underline font-medium text-xs xl:text-sm lg:text-sm cursor-pointer'>Size chart</h4>
                                </div>
                                {/* Hint message */}
                                {!selectedColor && (
                                    <p className="text-xs text-gray-500 mb-3"><span className='text-primary'>*</span>
                                        Please select a color to see available sizes</p>
                                )}
                                <ul className='flex items-center gap-3'>
                                    {colorSizes.map((size) => (
                                        <li
                                            key={size._id}
                                            onClick={() => handleSizeClick(size.size, selectedColor)} // Pass color to handleSizeClick
                                            className={`bg-white cursor-pointer uppercase shadow-md rounded-md w-10 h-10 flex items-center justify-center text-sm xl:text-sm lg:text-sm 
                                                ${selectedSize[selectedColor] === size.size ? '!bg-primary text-white' : ''}`}>
                                            {size.size}
                                        </li>
                                    ))}
                                </ul>
                            </div>


                            {/* Specifications */}
                            <div className="mt-7">
                                <h4 className="font-medium mb-3 text-sm xl:text-base lg:text-base">Specifications</h4>
                                {
                                    Object.entries(features).map(([key, value], index) => (
                                        <div key={index} className="grid grid-cols-2 gap-x-4 mb-3">
                                            <span className="font-normal capitalize text-xs xl:text-sm lg:text-sm text-gray-600">{key}</span>
                                            <span className="text-left capitalize text-xs xl:text-sm lg:text-sm">{value || "null"}</span>
                                        </div>
                                    ))
                                }
                                <div className="grid grid-cols-2 gap-x-4 mb-3">
                                    <span className="font-normal capitalize text-xs xl:text-sm lg:text-sm text-gray-600">Manufacuturer Name</span>
                                    <span className="text-left capitalize text-xs xl:text-sm lg:text-sm">{productDetails.manufacturerName}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 mb-3">
                                    <span className="font-normal capitalize text-xs xl:text-sm lg:text-sm text-gray-600">Manufacturer Brand</span>
                                    <span className="text-left capitalize text-xs xl:text-sm lg:text-sm">{productDetails.manufacturerBrand}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 mb-3">
                                    <span className="font-normal capitalize text-xs xl:text-sm lg:text-sm text-gray-600">Manufacturer Address</span>
                                    <span className="text-left capitalize text-xs xl:text-sm lg:text-sm">{productDetails.manufacturerAddress}</span>
                                </div>
                                <p className="text-xs text-buttonBg text-left font-semibold underline cursor-pointer mt-5">
                                    See more
                                </p>
                            </div>


                            {/* Customer Reviews */}
                            <div className='mt-10'>
                                <ProductReviews productId={productId} />
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