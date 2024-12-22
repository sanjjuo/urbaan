import { Button, Card } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiDeleteBin5Line, RiShoppingCartLine } from "react-icons/ri";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi2";
import { RiCoupon4Line } from "react-icons/ri";
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../../../StoreContext/StoreContext';
import AppLoader from '../../../Loader';
import namer from 'color-namer'; // Import the color-namer library
import toast from 'react-hot-toast';
import { HiOutlineXMark } from "react-icons/hi2";
import { ApplyCouponModal } from './ApplyCouponModal';

const UserCart = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const selectedAddress = location.state?.selectedAddress || {}
    const { BASE_URL, viewCart, setViewCart } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const [cartItems, setCartItems] = useState(viewCart.items || []); // for get details
    const [isUpdating, setIsUpdating] = useState(false);
    const [checkoutId, setCheckoutId] = useState('')
    const [openCoupon, setOpenCoupon] = React.useState(false); // modal for coupon


    // handle Coupon modal
    const handleCouponModalOpen = () => setOpenCoupon(!openCoupon);

    // Function to get the nearest named color
    const getNamedColor = (colorCode) => {
        try {
            const namedColors = namer(colorCode);
            return namedColors.pantone[0].name || "Unknown Color";
        } catch (error) {
            console.error("Invalid color code:", error);
            return "Invalid Color";
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('userToken');

        if (!userId || !token) {
            alert("User is not logged in or authorization is missing.");
            navigate('/login-user');
            return;
        }

        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/cart/view-cart/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setViewCart(response.data);
                setCartItems(response.data.items);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCartItems();
    }, [BASE_URL, navigate]);


    // handle update
    const updateQuantity = async (itemId, newQuantity) => {
        if (isUpdating || newQuantity <= 0) return;
        setIsUpdating(true);

        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('userToken');
            const item = cartItems.find(item => item._id === itemId);

            if (!item) throw new Error('Product not found in cart.');

            const payload = {
                userId,
                productId: item.productId._id,
                quantity: newQuantity,
                color: item.color,
                size: item.size,
            };

            const response = await axios.patch(`${BASE_URL}/user/cart/update`, payload, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                setCartItems(prev =>
                    prev.map(cartItem => (cartItem._id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem)),
                );
            }
        } catch (error) {
            console.error('Error updating quantity:', error.response?.data || error.message);
            toast.error('Failed to update quantity. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };


    // handle remove
    const removeCart = async (itemId) => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('userToken');

        // Ensure user is authenticated
        if (!userId || !token) {
            alert("User is not logged in or authorization is missing.");
            navigate('/login-user');
            return;
        }

        // Find the item in the cartItems array
        const item = cartItems.find(item => item.productId._id === itemId);

        if (!item) {
            toast.error('Item not found in the cart.');
            return;
        }

        try {
            const payload = {
                userId: userId,
                productId: item.productId._id,
                color: item.color,
                size: item.size,
            };

            const response = await axios.delete(`${BASE_URL}/user/cart/remove`, {
                data: payload,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                // Remove item from local state
                const updatedCartItems = cartItems.filter(cartItem => cartItem.productId._id !== itemId);
                setCartItems(updatedCartItems);

                // Update global cart state
                setViewCart(prevViewCart => ({
                    ...prevViewCart,
                    items: updatedCartItems,
                    totalPrice: updatedCartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0),
                }));

                toast.success('Item removed from the cart');
            } else {
                console.error("Unexpected response status:", response.status);
                toast.error('Failed to remove item from the cart. Please try again.');
            }
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            toast.error('An error occurred while removing the item. Please try again.');
        }
    };


    // handle checkout
    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const userId = localStorage.getItem('userId');

            if (!selectedAddress || !selectedAddress._id) {
                toast.error("Please select a valid delivery address.");
                return null; // Ensure the function exits early on error
            }

            const checkoutPayload = {
                userId: userId,
                cartId: viewCart._id,
                cartItems: cartItems,
                addressId: selectedAddress._id,
                totalPrice: viewCart.totalPrice,
            };

            const response = await axios.post(`${BASE_URL}/user/checkout/checkout`, checkoutPayload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const newCheckoutId = response.data.checkout._id;
            setCheckoutId(newCheckoutId); // Update local state for completeness
            return newCheckoutId; // Return the checkoutId for further use
        } catch (error) {
            console.error("Error during checkout:", error.response?.data || error.message);
            toast.error("Failed to initiate checkout. Please try again.");
            return null; // Return null to signal failure
        }
    };

    // handle clear
    const handleClearAll = async () => {
        try {
            const token = localStorage.getItem('userToken')
            const userId = localStorage.getItem('userId')
            const response = await axios.delete(`${BASE_URL}/user/cart/clear/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data);
            setCartItems([]);
            setViewCart({ items: [] });
            toast.success('Cart cleared successfully')
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <>
            <div className="p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto">
                <h1 className="flex items-center gap-2 text-lg xl:text-xl lg:text-xl font-medium cursor-pointer" onClick={() => navigate(-1)}>
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Back
                </h1>
                {/* 
                <h2 className='text-3xl xl:text-4xl lg:text-4xl font-semibold capitalize flex items-center justify-center gap-1 mt-0'>
                    My cart<RiShoppingCartLine />
                </h2> */}
                <div className='grid grid-cols-1 xl:grid-cols-5 gap-5 mt-5'>
                    <div className='space-y-5 xl:col-span-3 lg:col-span-2'>
                        <p onClick={handleClearAll} className='capitalize flex justify-end items-center gap-1 text-sm hover:text-primary cursor-pointer'>
                            clear all <HiOutlineXMark className='text-lg' /></p>
                        {
                            isLoading ? (
                                <div className='col-span-2 flex justify-center items-center h-[50vh]'>
                                    <AppLoader />
                                </div>
                            ) : cartItems.length === 0 ? (
                                <>
                                    <div className='flex flex-col justify-center items-center h-[60vh] !mb-20'>
                                        <div className='w-72 h-72 xl:w-96 xl:h-96 lg:w-96 lg:h-96'>
                                            <img src="/empty-cart.png" alt="" className='w-full h-full object-cover' />
                                        </div>
                                        <div className='space-y-3 flex flex-col justify-center items-center'>
                                            <h1 className='text-2xl font-semibold'>Your Cart is Empty</h1>
                                            <p className='text-center text-gray-600'>Looks like you haven’t added anything to your cart yet</p>
                                            <Link to='/'>
                                                <Button className='bg-primary w-52 text-sm capitalize font-custom font-normal'>Go shopping</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                cartItems.map((item) => (
                                    <Card className='p-2 xl:p-6 lg:p-6' key={item._id}>
                                        <div className='flex justify-between'>
                                            <div className='flex gap-2 xl:gap-6 lg:gap-6'>
                                                <div className='w-20 h-28 xl:w-28 xl:h-32'>
                                                    {item.productId && item.productId.images && item.productId.images.length > 0 ? (
                                                        <img src={item.productId.images[0]} alt={item.productId.title || "Product"} className="w-full h-full object-cover rounded-lg" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                                                            <span className="text-gray-500 text-sm text-center">Image not available</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className='flex flex-col justify-between'>
                                                    {item.productId ? (
                                                        <div>
                                                            <h1 className='text-base text-secondary font-medium xl:mb-2 lg:mb-2'>{item.productId.title}</h1>
                                                            <ul className='xl:space-y-1 lg:space-y-1'>
                                                                <li className='text-sm capitalize'>Color : {getNamedColor(item.color)}</li>
                                                                <li className='text-sm capitalize'>Size : {item.size}</li>
                                                            </ul>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <h1 className='text-base text-secondary font-medium xl:mb-2 lg:mb-2'>Product Unavailable</h1>
                                                            <p className='text-sm text-gray-500'>This product has been removed from our catalog.</p>
                                                        </div>
                                                    )}
                                                    <ul className="flex items-center">
                                                        <li
                                                            className={`text-secondary flex items-center justify-center w-7 h-7 rounded-full cursor-pointer border-[1px] 
                                                            border-secondary hover:bg-gray-500 hover:border-gray-500 ${item.quantity === 1 && "cursor-not-allowed opacity-50"}`}
                                                            onClick={() => item.quantity > 1 && updateQuantity(item._id, item.quantity - 1)}
                                                        >
                                                            <HiMinus className="text-lg" />
                                                        </li>

                                                        <li className="text-secondary text-center font-medium text-base w-7">{item.quantity}</li>

                                                        <li
                                                            className="text-secondary flex items-center justify-center w-7 h-7 rounded-full cursor-pointer border-[1px] 
                                                            border-secondary hover:bg-gray-500 hover:border-gray-500"
                                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                        >
                                                            <BsPlusLg className="text-lg" />
                                                        </li>
                                                    </ul>

                                                </div>
                                            </div>
                                            <div className='flex flex-col items-end justify-between'>
                                                <RiDeleteBin5Line
                                                    onClick={() => removeCart(item.productId._id)}
                                                    className="text-deleteBg cursor-pointer hover:text-primary"
                                                />

                                                <p className='text-secondary font-semibold text-xl'>₹{item.price}</p>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            )
                        }
                    </div>

                    <div className='xl:col-span-2 space-y-5'>
                        {/* coupon */}
                        <Card className='p-4'>
                            <Link onClick={handleCouponModalOpen}>
                                <div className='flex items-center justify-between'>
                                    <h1 className='flex items-center gap-3 text-base text-secondary font-medium'>
                                        <RiCoupon4Line className='text-xl' />Apply Coupon</h1>
                                    <IoIosArrowForward className='text-secondary text-2xl' />
                                </div>
                            </Link>
                        </Card>
                        {/* total */}
                        <Card className='p-4 xl:p-6 lg:p-6'>
                            <h1 className='text-secondary font-medium'>Cart Totals</h1>
                            <ul className='mt-3 border-b-[1px] border-gray-400 pb-3 space-y-4'>
                                <li className='flex justify-between items-center'>
                                    <span className='font-normal text-sm'>Total Items</span>
                                    <span className='text-secondary font-medium text-sm'>{viewCart?.items?.length || 0}</span>
                                </li>
                                <li className='flex justify-between items-center'>
                                    <span className='font-normal text-sm'>Total MRP</span>
                                    <span className='text-secondary font-medium text-sm'>₹5000</span>
                                </li>
                                <li className='flex justify-between items-center'>
                                    <span className='font-normal text-sm'>Discount</span>
                                    <span className='text-secondary font-medium text-sm'>₹50</span>
                                </li>
                            </ul>
                            <ul className='mt-2'>
                                <li className='flex justify-between items-center'>
                                    <span className='text-secondary font-medium text-sm'>Total</span>
                                    <span className='text-secondary font-bold text-lg'>₹{viewCart.totalPrice || 0.00}</span>
                                </li>
                            </ul>
                        </Card>

                        {/* delivery address */}
                        <Card className='p-4 xl:p-6 lg:p-6'>
                            <div className='flex items-center justify-between mb-3'>
                                <h1 className='text-secondary font-medium'>Delivery Address</h1>
                                <Link to='/select-delivery-address'><p className='text-primary underline text-sm font-medium'>Change</p></Link>
                            </div>
                            <p className='text-sm font-normal mb-3 capitalize'>
                                {selectedAddress?.address}, {selectedAddress?.landmark}, {selectedAddress?.city},
                                {selectedAddress?.state}, {selectedAddress?.pincode}
                            </p>
                            <Button
                                onClick={async () => {
                                    const newCheckoutId = await handleCheckout(); // Ensure handleCheckout returns checkoutId
                                    if (newCheckoutId) {
                                        navigate('/checkout', { state: { checkoutId: newCheckoutId } });
                                    }
                                }}
                                className='w-full bg-primary font-custom font-normal text-sm capitalize'
                            >
                                Checkout
                            </Button>


                        </Card>
                    </div>
                </div>
            </div>

            <ApplyCouponModal
                handleCouponModalOpen={handleCouponModalOpen}
                openCoupon={openCoupon}
            />
        </>
    );
};

export default UserCart;
