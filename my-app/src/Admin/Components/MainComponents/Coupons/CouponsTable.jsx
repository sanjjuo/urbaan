import React, { useContext } from 'react'
import { Button, Card, CardFooter, Chip, IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { AppContext } from "../../../../StoreContext/StoreContext"
import { DeleteModal } from '../../DeleteModal/DeleteModal';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { AddCouponModal } from './AddCouponModal';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import AppLoader from '../../../../Loader';

const TABLE_HEAD = ["Discount", "Coupon Title", "Code", "Start Date", "End Date", "Status", "Action"];


const CouponsTable = () => {
    const { open, handleOpen, BASE_URL } = useContext(AppContext)
    const [adminCoupon, setAdminCoupon] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert("Authorization is missing");
                }

                const headers = {
                    Authorization: `Bearer ${token}`
                }
                const response = await axios.get(`${BASE_URL}/admin/coupon/list`, { headers });
                setAdminCoupon(response.data);
                console.log(response.data);
                setIsLoading(false)
            } catch (error) {
                console.log(error, ": error fetching data");
            }
        }
        fetchCoupons();
    }, [])
    return (
        <>
            {
                isLoading || adminCoupon.length === 0 ? (
                    <div className='col-span-2 flex justify-center items-center h-[50vh]'>
                        <AppLoader />
                    </div>
                ) : (
                    <>
                        <Card className="h-full w-full shadow-none bg-transparent">
                            <table className="w-full table-auto text-left border-collapse">
                                <thead>
                                    <tr className='bg-white'>
                                        {TABLE_HEAD.map((head) => (
                                            <th
                                                key={head}
                                                className="border-b border-gray-300 p-4 text-center"
                                            >
                                                <Typography
                                                    variant="small"
                                                    className="font-semibold font-custom text-secondary leading-none text-base uppercase"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {adminCoupon.map((coupon, index) => {
                                        const isLast = index === adminCoupon.length - 1;
                                        const classes = isLast
                                            ? "p-4 text-center"
                                            : "p-4 border-b border-gray-300 text-center";

                                        return (
                                            <tr key={coupon._id}>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal font-custom text-sm"
                                                    >
                                                        {coupon.discount}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal capitalize font-custom text-sm"
                                                    >
                                                        {coupon.title}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal font-custom text-sm"
                                                    >
                                                        {coupon.code}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal font-custom text-sm"
                                                    >
                                                        {new Date(coupon.startDate).toLocaleString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal font-custom text-sm"
                                                    >
                                                        {new Date(coupon.endDate).toLocaleString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </Typography>
                                                </td>

                                                <td className={classes}>
                                                    <Chip
                                                        className={`
                                                 ${coupon.status === "expired" ? "text-cancelBg bg-cancelBg/20 capitalize text-sm text-center font-normal" : ""}
                                                 ${coupon.status === "active" ? "text-shippedBg bg-shippedBg/20 capitalize text-sm text-center font-normal" : ""}
                                                 ${!["expired", "active"].includes(coupon.status) ? "text-gray-500 bg-gray-200 capitalize text-sm text-center font-normal" : ""}
                                                    `}
                                                        value={
                                                            coupon.status === "expired" ? "Expired" :
                                                                coupon.status === "active" ? "Active" : "Unknown"
                                                        }

                                                    />
                                                </td>
                                                <td className={classes}>
                                                    <Menu>
                                                        <MenuHandler>
                                                            <IconButton variant="text">
                                                                <HiOutlineDotsHorizontal className='text-primary text-2xl cursor-pointer' />
                                                            </IconButton>
                                                        </MenuHandler>
                                                        <MenuList>
                                                            <MenuItem onClick={() => handleOpen("couponModal")} className='font-custom text-buttonBg hover:!text-buttonBg'>Edit</MenuItem>
                                                            <MenuItem onClick={() => handleOpen("deleteModal")} className='font-custom text-primary hover:!text-primary'>
                                                                Delete</MenuItem>
                                                        </MenuList>
                                                    </Menu>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                                <Button variant="outlined" size="sm" className='font-custom border-gray-300 font-normal capitalize 
                    text-sm cursor-pointer hover:bg-black hover:text-white'>
                                    Prev. Page
                                </Button>
                                <div className="flex items-center gap-2">
                                    <IconButton variant="outlined" size="sm">
                                        1
                                    </IconButton>
                                    <IconButton variant="text" size="sm">
                                        2
                                    </IconButton>
                                    <IconButton variant="text" size="sm">
                                        3
                                    </IconButton>
                                    <IconButton variant="text" size="sm">
                                        ...
                                    </IconButton>
                                    <IconButton variant="text" size="sm">
                                        8
                                    </IconButton>
                                    <IconButton variant="text" size="sm">
                                        9
                                    </IconButton>
                                    <IconButton variant="text" size="sm">
                                        10
                                    </IconButton>
                                </div>
                                <Button variant="outlined" size="sm" className='font-custom border-gray-300 font-normal capitalize text-sm 
                    cursor-pointer hover:bg-black hover:text-white'>
                                    Next Page
                                </Button>
                            </CardFooter>
                        </Card>

                    </>
                )
            }
            <DeleteModal
                open={open === "deleteModal"}
                handleOpen={handleOpen}
                title="Are you sure ?"
                description="Do you really want to delete this item? This action cannot be undone."
            />
            <AddCouponModal
                open={open === "couponModal"}
                handleOpen={handleOpen}
                title="Edit Coupon"
            />
        </>
    )
}

export default CouponsTable
