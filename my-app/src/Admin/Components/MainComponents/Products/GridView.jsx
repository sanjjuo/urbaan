import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Menu,
    MenuHandler,
    IconButton,
    MenuList,
    MenuItem
} from '@material-tailwind/react'
import React, { useContext } from 'react'
import { FaPlus, FaStar } from 'react-icons/fa6'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { DeleteModal } from '../../DeleteModal/DeleteModal'
import { AppContext } from "../../../../StoreContext/StoreContext"
import AppLoader from '../../../../Loader'

const GridView = ({ products, isLoading, initialProducts, setInitialProducts }) => {
    const { open, handleOpen } = useContext(AppContext)

    const product = [
        {
            id: "1",
            img: "/p1.jpg",
            product: "Stylish Crop Top",
            rating: "4.9",
            price: "500",
            description: "trendy, comfy crop top...",
            publish: "15-Nov-2024",
            stocks: "12",
            orders: "48"
        },
        {
            id: "2",
            img: "/p2.jpg",
            product: "Stylish Crop Top",
            rating: "4.1",
            price: "400",
            description: "trendy, comfy crop top...",
            publish: "15-jan-2024",
            stocks: "22",
            orders: "88"
        },
        {
            id: "3",
            img: "/p3.jpg",
            product: "Stylish Crop Top",
            rating: "4.5",
            price: "500",
            description: "trendy, comfy crop top...",
            publish: "15-Nov-2024",
            stocks: "12",
            orders: "48"
        },
    ]
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
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                                {
                                    products.map((product) => (
                                        <Card className="w-full cursor-default group" key={product._id}>
                                            <CardHeader shadow={false} floated={false} className="h-64 overflow-hidden relative">
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.title}
                                                    className="h-full w-full object-cover rounded-xl transition transform scale-100 duration-500 ease-in-out
                                            group-hover:scale-110"
                                                />
                                                <div className='absolute top-2 right-2'>
                                                    <Menu>
                                                        <MenuHandler>
                                                            <IconButton variant="text" className='bg-white h-4 rounded-md hover:bg-white focus:bg-white'>
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
                                                </div>
                                            </CardHeader>
                                            <CardBody className='p-4'>
                                                <div className="mb-2 flex items-center justify-between">
                                                    <Typography color="blue-gray" className="font-semibold font-custom text-primary">
                                                        ₹{product.offerPrice}
                                                    </Typography>
                                                    <Typography color="blue-gray" className="flex items-center justify-center gap-1 font-normal font-custom text-secondary">
                                                        {product.rating}<FaStar className='text-ratingBg' />
                                                    </Typography>
                                                </div>
                                                <div className='space-y-1'>
                                                    <Typography
                                                        variant="small"
                                                        color="gray"
                                                        className="font-custom text-base text-secondary font-semibold"
                                                    >
                                                        {product.product}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="gray"
                                                        className="font-custom text-sm capitalize font-normal"
                                                    >
                                                        {product.description}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="gray"
                                                        className="font-custom text-sm capitalize font-normal text-buttonBg"
                                                    >
                                                        Published on {product.publish}
                                                    </Typography>
                                                </div>
                                                <div className='mt-5'>
                                                    <ul className='flex items-center gap-10'>
                                                        <li className='flex flex-col items-center'>
                                                            <span className='text-lg text-secondary font-semibold'>{product.stock}</span>
                                                            <span className='font-normal capitalize text-sm'>stocks</span>
                                                        </li>
                                                        <li className='flex flex-col items-center'>
                                                            <span className='text-lg text-secondary font-semibold'>{product.orderCount}</span>
                                                            <span className='font-normal capitalize text-sm'>orders</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    ))
                                }
                            </div>
                        </>
                    )
                }
            </div>
            <DeleteModal
                open={open === "deleteProductModal"}
                handleOpen={handleOpen}
                title="Are you sure ?"
                description="Are you sure you want to remove this product item ?" />
        </>
    )
}

export default GridView
