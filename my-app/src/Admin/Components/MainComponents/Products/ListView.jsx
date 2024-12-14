import { Button, Card, IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react'
import React, { useContext } from 'react';
import { FaPlus } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AppContext } from "../../../../StoreContext/StoreContext"
import { DeleteModal } from '../../DeleteModal/DeleteModal';
import AppLoader from '../../../../Loader';
import axios from 'axios';
import { useState } from 'react';

const TABLE_HEAD = ["Product Name", "Description", "Stock", "Rate", "Price", "Orders", "Publish", "Action"];

const ListView = ({ products, isLoading }) => {
    const { open, handleOpen, modalType, BASE_URL } = useContext(AppContext);
    const [selectedProductId, setSelectedProductId] = useState(null)

    const handleDeleteProduct = async (productId) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                alert("Authorization is missing")
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`
            };

            const response = await axios.delete(`${BASE_URL}/admin/products/delete-product/${productId}`, { headers })
            console.log(response.data);
            handleOpen()
            alert("Product is deleted")
        } catch (error) {
            console.log(error);
            alert("Product is not deleted")
            handleOpen()
        }
    }

    return (
        <>
            <div className='space-y-5'>
                <Link to='/adminHome/addProduct'><Button className='flex items-center gap-1 bg-buttonBg font-custom font-normal text-sm'><FaPlus />Add product</Button></Link>
                {
                    isLoading || products.length === 0 ? (
                        <div className='col-span-2 flex justify-center items-center h-[50vh]'>
                            <AppLoader />
                        </div>
                    ) : (
                        <>
                            {/* <div className='bg-white rounded-xl h-screen shadow-md p-5'> */}
                            <Card className="w-full shadow-sm rounded-xl bg-white border-[1px]">
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
                                        {products.map((product, index) => {
                                            const isLast = index === products.length - 1;
                                            const classes = isLast
                                                ? "p-4 text-center"
                                                : "p-4 border-b border-gray-300 text-center";
                                            return (
                                                <tr key={product._id}>
                                                    <td className={classes}>
                                                        <div className='flex flex-col items-center gap-2'>
                                                            <div className='w-[60px] h-[60px] rounded-md'>
                                                                <img src={product.images[0]} alt={product.title} className='text-xs w-full h-full object-cover rounded-md' />
                                                            </div>
                                                            <Typography
                                                                variant="small"
                                                                className="font-normal font-custom text-sm"
                                                            >
                                                                {product.title}
                                                            </Typography>
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal font-custom text-sm"
                                                        >
                                                            {product.description}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal font-custom text-sm"
                                                        >
                                                            {product.stock}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal font-custom text-xs flex items-center gap-1"
                                                        >
                                                            <FaStar className='text-ratingBg' />{product.rating}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal font-custom text-sm"
                                                        >
                                                            ₹{product.offerPrice}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal font-custom text-sm"
                                                        >
                                                            {product.orderCount}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal font-custom text-sm"
                                                        >
                                                            {product.publish}
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
                                                                <Link
                                                                    to={{
                                                                        pathname: '/adminHome/editProduct',
                                                                    }}
                                                                    state={{ product }}
                                                                >
                                                                    <MenuItem className='font-custom text-buttonBg hover:!text-buttonBg active:border-none'>
                                                                        Edit
                                                                    </MenuItem>
                                                                </Link>
                                                                <MenuItem
                                                                    onClick={() => {
                                                                        handleOpen("deleteProductModal");
                                                                        setSelectedProductId(product._id);
                                                                    }}
                                                                    className='font-custom text-primary hover:!text-primary'
                                                                >
                                                                    Delete
                                                                </MenuItem>
                                                            </MenuList>
                                                        </Menu>

                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </Card>
                            {/* </div> */}
                        </>
                    )
                }

            </div>

            <DeleteModal
                open={open === "deleteProductModal"}
                handleOpen={handleOpen}
                handleDelete={handleDeleteProduct}
                productId={selectedProductId}
                title="Are you sure ?"
                modalType="products"
                description="Are you sure you want to remove this product item ?" />
        </>
    )
}

export default ListView
