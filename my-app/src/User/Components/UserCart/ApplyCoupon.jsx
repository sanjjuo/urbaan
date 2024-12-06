import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Button, Card } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const ApplyCoupon = () => {
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
        <div className="p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto">
            <h1
                className="flex items-center gap-2 text-lg xl:text-xl lg:text-xl font-medium cursor-pointer"
                onClick={() => navigate(-1)}
            >
                <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Apply Coupon
            </h1>

            <div className="mt-8">
                <Card className="p-6 space-y-6">
                    <div>
                        <label className="block text-secondary font-medium mb-2 text-sm">
                            Enter your coupon code:
                        </label>
                        <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="e.g., DISCOUNT50"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
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
                            className={`text-center text-sm font-medium mt-4 ${
                                message.includes('successfully')
                                    ? 'text-green-500'
                                    : 'text-red-500'
                            }`}
                        >
                            {message}
                        </p>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ApplyCoupon;
