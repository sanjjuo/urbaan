import { Button, Card, IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import React, { useContext } from 'react';
import { FaPlus } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AppContext } from "../../../../StoreContext/StoreContext"
import { DeleteModal } from '../../DeleteModal/DeleteModal';

const TABLE_HEAD = ["Product Name", "Stock", "Rate", "Price", "Orders", "Publish", "Action"];
const TABLE_ROWS = [
    {
        img: "/p1.jpg",
        product: "Crop Top",
        stock: "12",
        rating: "4.9",
        price: "500",
        orders: "12",
        publish: "12 jan 2025"
    },
    {
        img: "/p2.jpg",
        product: "Crop Top",
        stock: "12",
        rating: "4.9",
        price: "500",
        orders: "12",
        publish: "12 jan 2025"
    },
    {
        img: "/p3.jpg",
        product: "Crop Top",
        stock: "12",
        rating: "4.9",
        price: "500",
        orders: "12",
        publish: "12 jan 2025"
    },
    {
        img: "/p1.jpg",
        product: "Crop Top",
        stock: "12",
        rating: "4.9",
        price: "500",
        orders: "12",
        publish: "12 jan 2025"
    },
];

const ListView = () => {
    const { open, handleOpen } = useContext(AppContext)
    return (
        <>
            <div className='space-y-5'>
                <Link to='/adminHome/addProduct'><Button className='flex items-center gap-1 bg-buttonBg font-custom font-normal text-sm'><FaPlus />Add product</Button></Link>
                <div className='bg-white rounded-xl h-screen shadow-md p-5'>
                    <Card className="w-full shadow-none">
                        <table className="w-full table-auto text-left border-collapse">
                            <thead>
                                <tr className='bg-quaternary'>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-b border-gray-300 p-4 text-center"
                                        >
                                            <Typography
                                                variant="small"
                                                className="font-semibold uppercase text-secondary text-base leading-none font-custom"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {TABLE_ROWS.map((item, index) => {
                                    const isLast = index === TABLE_ROWS.length - 1;
                                    const classes = isLast
                                        ? "p-4 text-center"
                                        : "p-4 border-b border-gray-300 text-center";
                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <div className='flex items-center gap-2'>
                                                    <div className='w-[60px] h-[60px] rounded-md'>
                                                        <img src={item.img} alt={item.product} className='w-full h-full object-cover rounded-md' />
                                                    </div>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal font-custom text-sm"
                                                    >
                                                        {item.product}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    className="font-normal font-custom text-sm"
                                                >
                                                    {item.stock}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    className="font-normal font-custom text-xs flex items-center gap-1"
                                                >
                                                    <FaStar className='text-ratingBg' />{item.rating}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    className="font-normal font-custom text-sm"
                                                >
                                                    ₹{item.price}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    className="font-normal font-custom text-sm"
                                                >
                                                    {item.orders}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    className="font-normal font-custom text-sm"
                                                >
                                                    {item.publish}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Menu>
                                                    <MenuHandler>
                                                        <IconButton variant="text">
                                                            <HiOutlineDotsHorizontal className='text-primary text-2xl cursor-pointer' />
                                                        </IconButton>
                                                    </MenuHandler>
                                                    <MenuList>
                                                        <Link to='/adminHome/editProduct'>
                                                            <MenuItem className='font-custom text-buttonBg hover:!text-buttonBg'>Edit</MenuItem>
                                                        </Link>
                                                        <MenuItem onClick={() => handleOpen("deleteProductModal")} className='font-custom text-primary hover:!text-primary'>
                                                            Delete</MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </Card>
                </div>

            </div>

            <DeleteModal
                open={open === "deleteProductModal"}
                handleOpen={handleOpen}
                title="Are you sure ?"
                description="Are you sure you want to remove this product item ?" />
        </>
    )
}

export default ListView
