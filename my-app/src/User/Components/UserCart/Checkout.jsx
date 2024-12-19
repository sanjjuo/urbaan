import { Card } from '@material-tailwind/react';
import React from 'react';
import { useContext } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../StoreContext/StoreContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = () => {
    const navigate = useNavigate();
    const { BASE_URL } = useContext(AppContext);
    const [checkoutData, setCheckoutData] = useState({});
    const checkoutDetails = checkoutData?.checkout || {};

    useEffect(() => {
        const fetchCheckoutDetails = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get(`${BASE_URL}/user/checkout/checkout/${checkoutDetails._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCheckoutData(response.data || {});
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching checkout details:', error);
            }
        };
        fetchCheckoutDetails();
    }, [BASE_URL]); // Add dependencies

    console.log(`${checkoutData?.checkout?._id}`);


    return (
        <>
            <div className="p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto">
                <h1 className="flex items-center gap-2 text-lg xl:text-xl lg:text-xl font-medium cursor-pointer" onClick={() => navigate(-1)}>
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Back
                </h1>

                <h2 className='text-3xl xl:text-4xl lg:text-4xl font-semibold capitalize flex items-center justify-center gap-1 mt-5'>
                    Checkout
                </h2>

                <div className='grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-4 mt-10 gap-5'>
                    <div className='col-span-2 space-y-5'>
                        <Card className='p-4 xl:p-6 lg:p-6'>
                            <h1 className='text-secondary font-medium capitalize text-xl mb-3'>Delivery address information</h1>
                            <h2 className="font-medium text-lg">{checkoutDetails?.addressId?.name}</h2>
                            <p className="text-base font-normal capitalize">
                                {checkoutDetails?.addressId?.address},
                                {checkoutDetails?.addressId?.landmark},
                                {checkoutDetails?.addressId?.city},
                                {checkoutDetails?.addressId?.state}
                            </p>

                        </Card>
                        <Card className='p-4 xl:p-6 lg:p-6'>
                            <div>
                                <h1 className='text-secondary font-medium capitalize text-lg mb-3'>Review your cart</h1>
                                {checkoutDetails?.cartItems?.map((item, index) => (
                                    <div key={index} className='flex gap-5 mb-4'>
                                        <div className='w-20 h-28 xl:w-28 xl:h-32'>
                                            <img src="" alt="" className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                        <div className='flex flex-col justify-between'>
                                            <div>
                                                <h1 className='text-base text-secondary font-medium xl:mb-2 lg:mb-2'>{item.productId?.name || 'No name'}</h1>
                                                <ul className='xl:space-y-1 lg:space-y-1'>
                                                    <li className='text-sm capitalize'>Color : {item.color}</li>
                                                    <li className='text-sm capitalize'>Size : {item.size}</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <p className='text-secondary font-semibold text-xl'>₹{item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                    <div className='col-span-2'>
                        <Card className='p-4 xl:p-6 lg:p-6'>
                            <h1 className='text-secondary font-medium capitalize text-lg mb-3'>Total Price</h1>
                            <p className='text-secondary font-semibold text-base'>₹{checkoutDetails?.totalPrice}</p>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
