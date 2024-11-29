import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export function AddCouponModal({ open, handleOpen, title }) {

    return (
        <>
            <Dialog open={open} handler={handleOpen} size='sm'>
                <DialogHeader className="text-lg font-custom font-semibold mb-0 text-secondary">{title}</DialogHeader>
                <DialogBody>
                    <div className='p-5'>
                        <form action="" className='space-y-5'>
                            {/* title */}
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="" className='font-normal text-base'>Coupon title</label>
                                <input type="text" name="name" id="" placeholder='Gift Voucher' className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                            </div>
                            {/* Code and category */}
                            <div className='flex justify-between items-center gap-2'>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label className='font-normal text-base'>Code</label>
                                    <input type="text" name="name" id="" placeholder='FESTIVAL15' className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                                </div>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label className='font-normal text-base'>Category Type</label>
                                    <select
                                        name="selectField"
                                        className="w-full text-sm text-gray-500 font-light bg-gray-100/50 border p-3 rounded-md focus:outline-none focus:cursor-pointer"
                                    >
                                        <option value="Option 1">Kurti</option>
                                        <option value="Option 2">Kurti Set</option>
                                        <option value="Option 3">Bottom</option>
                                    </select>
                                </div>
                            </div>
                            {/* Start and End Date */}
                            <div className='flex justify-between items-center gap-2'>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label className='font-normal text-base'>Start Date</label>
                                    <input type="date" name="" id="" placeholder="02 Dec 2022" className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                                </div>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label className='font-normal text-base'>End Date</label>
                                    <input type="date" name="" id="" placeholder="02 Dec 2022" className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                                </div>
                            </div>
                            {/* Amount/ Status */}
                            <div className='flex justify-between items-center gap-2'>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label htmlFor="" className='font-normal text-sm'>Amount/Percentage</label>
                                    <input type="text" name="name" id="" placeholder='50%' className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                                </div>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label className='font-normal text-base'>Status</label>
                                    <select
                                        name="selectField"
                                        className="w-full text-sm text-gray-500 font-light bg-gray-100/50 border p-3 rounded-md focus:outline-none focus:cursor-pointer"
                                    >
                                        <option value="Option 1">Active</option>
                                        <option value="Option 2">Expired</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </DialogBody>
                <DialogFooter className='flex justify-center'>
                    <Button
                        onClick={handleOpen}
                        className="mr-1 capitalize bg-primary/20 text-primary font-normal text-sm w-52"
                    >
                        <span>Close</span>
                    </Button>
                    <Button onClick={handleOpen} className='capitalize bg-buttonBg font-normal text-sm w-52'>
                        <span>Update coupon</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}