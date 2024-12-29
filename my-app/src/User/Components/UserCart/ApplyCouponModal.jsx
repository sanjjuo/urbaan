import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
} from "@material-tailwind/react";
import { useState } from 'react';
import { HiOutlineXMark } from "react-icons/hi2";
import { useContext } from "react";
import { AppContext } from "../../../StoreContext/StoreContext";
import axios from 'axios'
import toast from 'react-hot-toast'

const ApplyCouponModal = ({ handleCouponModalOpen, openCoupon }) => {
    const [couponCode, setCouponCode] = useState('');
    const { BASE_URL, setCouponDiscountTotalPrice } = useContext(AppContext)

    // handle Coupon
    const handleCouponSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('userToken')
            const userId = localStorage.getItem('userId')

            const couponPayload = {
                userId: userId,
                couponCode: couponCode
            }
            console.log(couponPayload);


            const response = await axios.post(`${BASE_URL}/user/cart/applyCoupon`, couponPayload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data);
            const couponData = response.data;
            setCouponDiscountTotalPrice(couponData); // for getting discount and previous amount value
            localStorage.setItem('couponDiscountTotalPrice', JSON.stringify(couponData));
            handleCouponModalOpen()
            toast.success('Coupon is applied')
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            const errorMessage = error.response?.data?.message || 'Failed to apply coupon';
            toast.error(errorMessage);
            handleCouponModalOpen();  // Close modal even if error occurs
        }
    }


    return (
        <>
            <Dialog open={openCoupon} handler={handleCouponModalOpen} size='sm' className='p-4'>
                <DialogHeader className='font-custom text-lg flex justify-between'>
                    Apply Coupon
                    <HiOutlineXMark
                        className='text-2xl cursor-pointer hover:text-primary'
                        onClick={handleCouponModalOpen} />
                </DialogHeader>
                <DialogBody className='space-y-5'>
                    <form action="" onSubmit={handleCouponSubmit}>
                        <label className="block text-secondary font-medium mb-2 text-base capitalize">
                            Enter your coupon code:
                        </label>
                        <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter coupon code"
                            className="w-full border uppercase placeholder:capitalize border-gray-300 rounded-lg p-3 focus:outline-none"
                        />

                        <Button
                            type='submit'
                            className="w-full bg-primary font-custom font-normal text-sm capitalize mt-5"
                        >
                            Apply Coupon
                        </Button>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    );
}

export default ApplyCouponModal
