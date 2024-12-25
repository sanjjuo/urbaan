import React, { useState, useEffect, useContext } from "react";
import { Button, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import axios from "axios";
import { AppContext } from "../../../../StoreContext/StoreContext";
import toast from "react-hot-toast";

export function EditCouponModal({ open, handleOpen, initialEditCoupon }) {
    const { BASE_URL } = useContext(AppContext);
    const [categories, setCategories] = useState([]);
    const [editCouponTitle, setEditCouponTitle] = useState('');
    const [editCouponCode, setEditCouponCode] = useState('');
    const [editCouponCategory, setEditCouponCategory] = useState('');
    const [editCouponStartDate, setEditCouponStartDate] = useState('');
    const [editCouponEndDate, setEditCouponEndDate] = useState('');
    const [editCouponDiscountValue, setEditCouponDiscountValue] = useState('');
    const [editCouponDiscountType, setEditCouponDiscountType] = useState('');
    const [editCouponIsActive, setEditCouponIsActive] = useState(true);

    useEffect(() => {
        if (initialEditCoupon) {
            setEditCouponTitle(initialEditCoupon.title);
            setEditCouponCode(initialEditCoupon.code);
            setEditCouponCategory(initialEditCoupon.category?._id);
            setEditCouponStartDate(initialEditCoupon.startDate);
            setEditCouponEndDate(initialEditCoupon.endDate);
            setEditCouponDiscountValue(initialEditCoupon.discountValue);
            setEditCouponDiscountType(initialEditCoupon.discountType);
            setEditCouponIsActive(initialEditCoupon.status);
        }
    }, [initialEditCoupon]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/admin/category/get`);
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, [BASE_URL]);

    const handleEditCouponSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Authorization is missing");
                return;
            }

            const status = editCouponIsActive ? 'active' : 'expired';

            let discountValue = editCouponDiscountValue;

            if (editCouponDiscountType === 'Percentage') {
                discountValue = parseFloat(editCouponDiscountValue); // Cast percentage as a number
            } else if (editCouponDiscountType === 'amount') {
                discountValue = parseFloat(
                    String(editCouponDiscountValue).replace('%', '') // Ensure the value is a string
                );
            }


            const discountType = editCouponDiscountType.toLowerCase();  // normalize the case
            if (discountType !== 'percentage' && discountType !== 'amount') {
                throw new Error("Invalid discount type");
            }

            const couponData = {
                title: editCouponTitle,
                code: editCouponCode,
                category: editCouponCategory,
                startDate: editCouponStartDate,
                endDate: editCouponEndDate,
                discountValue,
                discountType,
                status
            };

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            const response = await axios.patch(`${BASE_URL}/admin/coupon/update/${initialEditCoupon._id}`, couponData, { headers });
            console.log(response.data);
            handleOpen()
            toast.success('Coupon is updated');
        } catch (error) {
            console.error(error);
            alert("Coupon is not updated");
        }
    };

    return (
        <>
            <Dialog open={open} handler={handleOpen} size='md' className='rounded-none'>
                <DialogBody>
                    <div className='p-5'>
                        <h1 className="text-2xl font-custom font-semibold mb-0 text-secondary">Edit Coupon</h1>
                        <form className='space-y-5 mt-10' onSubmit={handleEditCouponSubmit}>
                            {/* Title */}
                            <div className='flex flex-col gap-1'>
                                <label className='font-normal text-base'>Coupon title</label>
                                <input
                                    type="text"
                                    value={editCouponTitle}
                                    onChange={(e) => setEditCouponTitle(e.target.value)}
                                    placeholder='Coupon title'
                                    className='border-[1px] capitalize text-sm bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500 focus:outline-none'
                                />
                            </div>
                            {/* Code and category */}
                            <div className='flex justify-between items-center gap-2'>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label className='font-normal text-base'>Code</label>
                                    <input
                                        type="text"
                                        value={editCouponCode}
                                        onChange={(e) => setEditCouponCode(e.target.value)}
                                        placeholder='Code'
                                        className='border-[1px] text-sm bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500 focus:outline-none'
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label className='font-normal text-base'>Category Type</label>
                                    <select
                                        value={editCouponCategory}
                                        onChange={(e) => setEditCouponCategory(e.target.value)}
                                        className="w-full text-sm capitalize text-gray-500 font-light bg-gray-100/50 border p-2 rounded-md focus:outline-none focus:cursor-pointer"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {/* Start and End Date */}
                            <div className='flex justify-between items-center gap-2'>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label className='font-normal text-base'>Start Date</label>
                                    <input
                                        type="date"
                                        value={editCouponStartDate}
                                        onChange={(e) => setEditCouponStartDate(e.target.value)}
                                        placeholder="Start Date"
                                        className='border-[1px] text-sm bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500 focus:outline-none'
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label className='font-normal text-base'>End Date</label>
                                    <input
                                        type="date"
                                        value={editCouponEndDate}
                                        onChange={(e) => setEditCouponEndDate(e.target.value)}
                                        placeholder="End Date"
                                        className='border-[1px] text-sm bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500 focus:outline-none'
                                    />
                                </div>
                            </div>
                            {/* Amount/ Status */}
                            <div className='flex justify-between items-end gap-2'>
                                <div className='flex flex-col gap-1 w-1/3'>
                                    <label className='font-normal text-sm'>Discount Value</label>
                                    <input
                                        type="text"
                                        value={editCouponDiscountValue}
                                        onChange={(e) => setEditCouponDiscountValue(e.target.value)}
                                        placeholder='Discount Value (50 or 50%)'
                                        className='border-[1px] capitalize text-sm bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500 focus:outline-none'
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-1/3'>
                                    <label className='font-normal text-sm'>Discount Type</label>
                                    <input
                                        type="text"
                                        value={editCouponDiscountType}
                                        onChange={(e) => setEditCouponDiscountType(e.target.value)}
                                        placeholder='Discount Type (Percentage or amount)'
                                        className='border-[1px] capitalize text-sm bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500 focus:outline-none'
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-1/3'>
                                    <label className='font-normal text-base'>Status</label>
                                    <select
                                        value={editCouponIsActive ? 'active' : 'expired'}
                                        onChange={(e) => setEditCouponIsActive(e.target.value === 'active')}
                                        className="w-full text-sm text-gray-500 font-light bg-gray-100/50 border p-2 rounded-md focus:outline-none focus:cursor-pointer"
                                    >
                                        <option value="active">Active</option>
                                        <option value="expired">Expired</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex justify-center items-center mt-5'>
                                <Button onClick={handleOpen} className="mr-1 capitalize bg-primary/20 text-primary font-normal text-sm w-52">
                                    <span>Close</span>
                                </Button>
                                <Button type="submit" className='capitalize bg-buttonBg font-normal text-sm w-52'>
                                    <span>Update coupon</span>
                                </Button>
                            </div>
                        </form>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}
