// import React, { useState } from 'react';
// import { IoIosArrowBack } from 'react-icons/io';
// import { Button, Card } from '@material-tailwind/react';
// import { useNavigate } from 'react-router-dom';

// const ApplyCoupon = () => {
//     const [couponCode, setCouponCode] = useState('');
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

//     const handleApplyCoupon = () => {
//         if (couponCode.trim() === 'DISCOUNT50') {
//             setMessage('Coupon applied successfully! ₹50 discount added.');
//         } else {
//             setMessage('Invalid coupon code. Please try again.');
//         }
//     };

//     return (
//         <div className="p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto">
//             <h1
//                 className="flex items-center gap-2 text-lg xl:text-xl lg:text-xl font-medium cursor-pointer"
//                 onClick={() => navigate(-1)}
//             >
//                 <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Apply Coupon
//             </h1>

//             <div className="mt-8 flex justify-center items-center">
//                 <Card className="p-6 space-y-6 w-[500px]">
//                     <div>
//                         <label className="block text-secondary font-medium mb-2 text-sm">
//                             Enter your coupon code:
//                         </label>
//                         <input
//                             type="text"
//                             value={couponCode}
//                             onChange={(e) => setCouponCode(e.target.value)}
//                             placeholder="e.g., DISCOUNT50"
//                             className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
//                         />
//                     </div>

//                     <Button
//                         className="w-full bg-primary font-custom font-normal text-sm capitalize"
//                         onClick={handleApplyCoupon}
//                     >
//                         Apply Coupon
//                     </Button>

//                     {message && (
//                         <p
//                             className={`text-center text-sm font-medium mt-4 ${
//                                 message.includes('successfully')
//                                     ? 'text-green-500'
//                                     : 'text-red-500'
//                             }`}
//                         >
//                             {message}
//                         </p>
//                     )}
//                 </Card>
//             </div>
//         </div>
//     );
// };

// export default ApplyCoupon;


import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineXMark } from "react-icons/hi2";

export function ApplyCouponModal({ handleCouponModalOpen, openCoupon }) {
    const [open, setOpen] = React.useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleApplyCoupon = () => {
        if (couponCode.trim() === 'DISCOUNT50') {
            setMessage('Coupon applied successfully! ₹50 discount added.');
        } else {
            setMessage('Invalid coupon code. Please try again.');
        }
    };


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
                    <div>
                        <label className="block text-secondary font-medium mb-2 text-base capitalize">
                            Enter your coupon code:
                        </label>
                        <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="e.g., DISCOUNT50"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
                        />
                    </div>

                    <Button
                        className="w-full bg-primary font-custom font-normal text-sm capitalize"
                        onClick={handleApplyCoupon}
                    >
                        Apply Coupon
                    </Button>

                    {message && (
                        <p
                            className={`text-center text-sm font-medium mt-4 ${message.includes('successfully')
                                ? 'text-green-500'
                                : 'text-red-500'
                                }`}
                        >
                            {message}
                        </p>
                    )}
                </DialogBody>
            </Dialog>
        </>
    );
}
