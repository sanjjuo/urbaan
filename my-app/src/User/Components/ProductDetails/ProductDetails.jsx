import React, { useContext } from 'react'
import { FaStar } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { IoStarOutline } from "react-icons/io5";
import { Button, Progress, Typography } from '@material-tailwind/react';
import { BsArrowRight } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { RxHeart } from 'react-icons/rx';
import { FiShoppingCart } from "react-icons/fi";
import { AppContext } from '../../../StoreContext/StoreContext';


const reviews = [
    {
        id: "1",
        customer: "Florence Pugh",
        img: "/review1.webp",
        rating: "4.1",
        description: "I recently bought a top from Urbaan, and I love it! The fabric is soft and comfortable"
    },
    {
        id: "2",
        customer: "Scarlett Johansson",
        img: "/review2.JPG",
        rating: "3.9",
        description: "I recently bought a top from Urbaan, and I love it! The fabric is soft and comfortable"
    },
    {
        id: "3",
        customer: "Alexandro Daddario",
        img: "/review3.jpg",
        rating: "4.5",
        description: "I recently bought a top from Urbaan, and I love it! The fabric is soft and comfortable"
    },

]

const products = [
    {
        id: "1",
        img: "/p1.jpg",
        title: "Kurti",
        description: "Trendy, comfy crop tops for all.",
        price: "500"
    },
    {
        id: "2",
        img: "/p2.jpg",
        title: "Duppatta",
        description: "Trendy, comfy crop tops for all.",
        price: "700"
    },
    {
        id: "3",
        img: "/p3.jpg",
        title: "Home wear",
        description: "Trendy, comfy crop tops for all.",
        price: "300"
    },
    {
        id: "4",
        img: "/p4.jpg",
        title: "Churidar",
        description: "Trendy, comfy crop tops for all.",
        price: "800"
    },
    {
        id: "5",
        img: "/p5.jpg",
        title: "White printed Pants",
        description: "Trendy, comfy crop tops for all.",
        price: "400"
    },
]

const ProductDetails = () => {
    const { selectedProduct } = useContext(AppContext)
    return (
        <div className='p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg'>
            <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-5 xl:gap-10 lg:gap-10">
                <div className='col-span-2 xl:space-y-3 lg:space-y-3 xl:sticky xl:top-0 lg:sticky lg:top-0 h-[350px] xl:h-[600px] lg:h-[600px]'>
                    <div className='w-full h-full relative'>
                        <img src={selectedProduct.img} alt={selectedProduct.title} className='w-full h-full object-cover rounded-xl' />
                        {/* <ul className='absolute bottom-3 right-8 left-8 xl:right-32 xl:left-32 lg:right-32 lg:left-32 flex items-center justify-center gap-1 bg-white p-1 rounded-md shadow-md'>
                            <li className='w-8 h-8 xl:w-14 xl:h-14 lg:w-14 lg:h-14'>
                                <img src="p1.jpg" alt="" className='w-full h-full object-cover rounded-md' />
                            </li>
                            <li className='w-8 h-8 xl:w-14 xl:h-14 lg:w-14 lg:h-14'>
                                <img src="p1.jpg" alt="" className='w-full h-full object-cover rounded-md' />
                            </li>
                            <li className='w-8 h-8 xl:w-14 xl:h-14 lg:w-14 lg:h-14'>
                                <img src="p1.jpg" alt="" className='w-full h-full object-cover rounded-md' />
                            </li>
                            <li className='w-8 h-8 xl:w-14 xl:h-14 lg:w-14 lg:h-14'>
                                <img src="p1.jpg" alt="" className='w-full h-full object-cover rounded-md' />
                            </li>
                            <li className='w-8 h-8 xl:w-14 xl:h-14 lg:w-14 lg:h-14'>
                                <img src="p1.jpg" alt="" className='w-full h-full object-cover rounded-md' />
                            </li>
                            <li className='w-8 h-8 xl:w-14 xl:h-14 lg:w-14 lg:h-14'>
                                <img src="p1.jpg" alt="" className='w-full h-full object-cover rounded-md' />
                            </li>
                        </ul> */}
                    </div>
                    <Button className='hidden xl:flex lg:flex items-center justify-center gap-2 font-normal capitalize font-custom tracking-wide text-sm
                        w-full bg-primary'><FiShoppingCart />Add to cart</Button>
                </div>
                <div className='col-span-2'>
                    <h1 className='text-secondary font-semibold text-xl xl:text-2xl lg:text-2xl'>{selectedProduct.title}</h1>
                    <p className='text-gray-600 text-xs xl:text-base lg:text-base'>{selectedProduct.description}</p>
                    <div>
                        <div className='flex items-center justify-between xl:justify-normal lg:justify-normal xl:gap-10 lg:gap-10 mt-5'>
                            <p className='text-xs xl:text-sm lg:text-sm font-semibold text-shippedBg'>Free Shipping</p>
                            <ul className='flex items-center gap-1 xl:gap-3 lg:gap-3'>
                                <li className='text-sm xl:text-base lg:text-base'>4.1</li>
                                <li className='text-primary text-sm xl:text-base lg:text-base'><FaStar /></li>
                                <li className='text-primary text-sm xl:text-base lg:text-base'><FaStar /></li>
                                <li className='text-primary text-sm xl:text-base lg:text-base'><FaStar /></li>
                                <li className='text-primary text-sm xl:text-base lg:text-base'><FaStar /></li>
                                <li className='text-primary text-sm xl:text-base lg:text-base'><FaStar /></li>
                            </ul>
                            <p className='text-gray-600 text-xs xl:text-sm lg:text-sm'>103 Ratings</p>
                        </div>

                        <div className='mt-5'>
                            <ul className='flex items-center gap-8 xl:gap-4 lg:gap-4'>
                                <li className='font-semibold text-xl xl:text-2xl lg:text-2xl'>₹{selectedProduct.price}</li>
                                <li className='text-gray-600 font-normal text-sm xl:text-base lg:text-base'><s>MRP ₹1000</s></li>
                                <li className='text-shippedBg font-semibold text-sm xl:text-base lg:text-base'>( 50% OFF )</li>
                            </ul>
                        </div>

                        {/* Select Size */}
                        <div className='mt-5'>
                            <div className='flex items-center justify-between xl:justify-normal lg:justify-normal 
                            xl:gap-32 lg:gap-32 mb-5'>
                                <h4 className='font-medium text-sm xl:text-base lg:text-base'>Select Size</h4>
                                <h4 className='text-primary underline font-medium text-xs xl:text-sm lg:text-sm'>Size chart</h4>
                            </div>
                            <ul className='flex items-center gap-3'>
                                <li className='bg-white shadow-md rounded-md w-12 h-12 flex items-center justify-center text-sm
                                    xl:text-sm lg:text-sm hover:bg-primary hover:text-white cursor-pointer'>M</li>
                                <li className='bg-white shadow-md rounded-md w-12 h-12 flex items-center justify-center text-sm
                                    xl:text-sm lg:text-sm hover:bg-primary hover:text-white cursor-pointer'>L</li>
                                <li className='bg-white shadow-md rounded-md w-12 h-12 flex items-center justify-center text-sm
                                    xl:text-sm lg:text-sm hover:bg-primary hover:text-white cursor-pointer'>XL</li>
                                <li className='bg-white shadow-md rounded-md w-12 h-12 flex items-center justify-center text-sm
                                    xl:text-sm lg:text-sm hover:bg-primary hover:text-white cursor-pointer'>XXL</li>
                            </ul>
                        </div>

                        {/* Select Color */}
                        <div className='mt-5'>
                            <h4 className='font-medium text-sm xl:text-base lg:text-base'>Select Color</h4>
                            <ul className='flex items-center gap-3 mt-3'>
                                <li className='text-primary text-3xl cursor-pointer'><FaCircle /></li>
                                <li className='text-green-700 text-3xl cursor-pointer'><FaCircle /></li>
                                <li className='text-buttonBg text-3xl cursor-pointer'><FaCircle /></li>
                                <li className='text-processingBg text-3xl cursor-pointer'><FaCircle /></li>
                                <li className='text-pendingBg text-3xl cursor-pointer'><FaCircle /></li>
                            </ul>
                        </div>

                        {/* Specifications */}
                        <div className="mt-10">
                            <h4 className="font-medium mb-3 text-sm xl:text-base lg:text-base">Specifications</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between xl:justify-normal lg:justify-normal">
                                    <span className="font-normal text-sm xl:w-1/2 lg:w-1/2 text-gray-600">Net weight/Content</span>
                                    <span className="xl:w-1/2 lg:w-1/2 text-left text-sm">300</span>
                                </div>
                                <div className="flex justify-between xl:justify-normal lg:justify-normal">
                                    <span className="font-normal text-sm xl:w-1/2 lg:w-1/2 text-gray-600">Fit</span>
                                    <span className="xl:w-1/2 lg:w-1/2 text-left text-sm">Comfy</span>
                                </div>
                                <div className="flex justify-between xl:justify-normal lg:justify-normal">
                                    <span className="font-normal text-sm xl:w-1/2 lg:w-1/2 text-gray-600">Sleeves Type</span>
                                    <span className="xl:w-1/2 lg:w-1/2 text-left text-sm">Full Sleeves</span>
                                </div>
                                <div className="flex justify-between xl:justify-normal lg:justify-normal">
                                    <span className="font-normal text-sm xl:w-1/2 lg:w-1/2 text-gray-600">Kurta length</span>
                                    <span className="xl:w-1/2 lg:w-1/2 text-left text-sm">30</span>
                                </div>
                                <div className="flex justify-between xl:justify-normal lg:justify-normal">
                                    <span className="font-normal text-sm xl:w-1/2 lg:w-1/2 text-gray-600">Net Quantity</span>
                                    <span className="xl:w-1/2 lg:w-1/2 text-left text-sm">1</span>
                                </div>
                                <div className="flex justify-between xl:justify-normal lg:justify-normal">
                                    <span className="font-normal text-sm xl:w-1/2 lg:w-1/2 text-gray-600">Occassion</span>
                                    <span className="xl:w-1/2 lg:w-1/2 text-left text-sm">Casual</span>
                                </div>
                                <div className="flex justify-between xl:justify-normal lg:justify-normal">
                                    <span className="font-normal text-sm xl:w-1/2 lg:w-1/2 text-gray-600">Inner Lining</span>
                                    <span className="xl:w-1/2 lg:w-1/2 text-left text-sm">Available</span>
                                </div>
                                <div className="flex justify-between xl:justify-normal lg:justify-normal">
                                    <span className="font-normal text-sm xl:w-1/2 lg:w-1/2 text-gray-600">Brand</span>
                                    <span className="xl:w-1/2 lg:w-1/2 text-left text-sm">A.B Designers</span>
                                </div>
                                <div className="flex justify-between xl:justify-normal lg:justify-normal">
                                    <span className="font-normal text-sm xl:w-1/2 lg:w-1/2 text-gray-600">Manufacturer Name</span>
                                    <span className="xl:w-1/2 lg:w-1/2 text-left text-sm">A.B Designers</span>
                                </div>
                                <div className="flex justify-between xl:justify-normal lg:justify-normal">
                                    <span className="font-normal text-sm xl:w-1/2 lg:w-1/2 text-gray-600">Manufacturer Address</span>
                                    <span className="xl:w-1/2 lg:w-1/2 text-left text-sm">SVS Market</span>
                                </div>
                                <p className='text-xs text-buttonBg font-semibold underline cursor-pointer'>See more</p>
                            </div>
                        </div>

                        {/* Customer Reviews */}
                        <div className='mt-10'>
                            <h4 className="font-medium mb-3 text-sm xl:text-base lg:text-base">Customer Reviews (194)</h4>
                            <div className='flex items-center justify-between gap-0 py-6 border-t-2 border-b-2 border-gray-300'>
                                <div className='flex flex-col justify-between gap-10 w-3/4 xl:w-1/2 lg:w-1/2'>
                                    <h1 className='uppercase font-normal flex items-center gap-2 text-sm xl:text-base lg:text-base
                                    '>ratings <IoStarOutline /></h1>
                                    <div>
                                        <h2 className='flex items-center gap-2 text-sm xl:text-base lg:text-base'>4.3<FaStar className='text-ratingBg' /></h2>
                                        <p className='font-normal text-xs xl:text-sm lg:text-sm'>1.4K Verified Buyers</p>
                                    </div>
                                </div>
                                <div className="flex w-full flex-col gap-0">
                                    <div className='flex items-center gap-2'>
                                        <Typography>5</Typography>
                                        <Progress value={75} size="sm" color='pink' />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Typography>4</Typography>
                                        <Progress value={55} size="sm" color='pink' />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Typography>3</Typography>
                                        <Progress value={35} size="sm" color='pink' />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Typography>2</Typography>
                                        <Progress value={25} size="sm" color='pink' />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Typography>1</Typography>
                                        <Progress value={15} size="sm" color='pink' />
                                    </div>
                                </div>
                            </div>

                            <div className='mt-5'>
                                {
                                    reviews.map((review, index) => (
                                        <div className='space-y-2 mb-3' key={index}>
                                            <ul className='flex items-center gap-3 xl:gap-5 lg:gap-5 font-medium'>
                                                <li className='w-12 h-12 xl:w-14 xl:h-14 lg:w-14 lg:h-14'>
                                                    <img src={review.img} alt={review.customer} className='w-full h-full object-cover rounded-full' />
                                                </li>
                                                <li>
                                                    <span className='text-sm xl:text-base lg:text-base'>{review.customer}</span>
                                                    <ul className='flex items-center gap-1'>
                                                        <li className='font-normal text-sm xl:text-base lg:text-base'>{review.rating}</li>
                                                        <li className='text-primary text-xs xl:text-sm lg:text-sm'><FaStar /></li>
                                                        <li className='text-primary text-xs xl:text-sm lg:text-sm'><FaStar /></li>
                                                        <li className='text-primary text-xs xl:text-sm lg:text-sm'><FaStar /></li>
                                                        <li className='text-primary text-xs xl:text-sm lg:text-sm'><FaStar /></li>
                                                        <li className='text-primary text-xs xl:text-sm lg:text-sm'><FaStar /></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <p className='text-gray-600 font-normal text-xs xl:text-sm lg:text-sm'>{review.description}</p>
                                        </div>
                                    ))
                                }

                                <Button variant='outlined' className='mt-5 xl:mt-10 lg:mt-10 rounded-full px-5 py-1 flex items-center gap-1 text-xs capitalize font-custom font-normal
                                 tracking-wide'>View all reviews <BsArrowRight /></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-10 xl:mt-20 lg:mt-10'>
                <h1 className='text-secondary text-lg xl:text-2xl lg:text-2xl font-semibold text-center mb-10'>Similar Products</h1>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-5 gap-5 pb-10'>
                    {
                        products.map((product, index) => (
                            <Link to='/product-details' className='cursor-pointer'>
                                <div key={index} className='group'>
                                    <div className='w-full h-44 xl:h-80 lg:h-80 relative rounded-xl overflow-hidden'>
                                        <img src={product.img} alt={product.title} className='w-full h-full object-cover rounded-xl shadow-md
                                transition transform scale-100 duration-500 ease-in-out cursor-pointer group-hover:scale-105' />
                                        <RxHeart className='absolute top-2 right-2 bg-white text-gray-600 w-6 h-6 xl:w-7 xl:h-7 lg:w-7 lg:h-7 p-1 rounded-full shadow-md' />
                                    </div>
                                    <div className='mt-3'>
                                        <h4 className='font-medium text-sm xl:text-lg lg:text-lg'>{product.title}</h4>
                                        <p className='text-gray-600 font-normal text-xs xl:text-sm lg:text-sm'>{product.description}</p>
                                        <p className='text-primary text-base xl:text-xl lg:text-xl font-semibold mt-2'>₹ {product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>

            <Button className='flex xl:hidden lg:hidden items-center justify-center gap-2 font-normal capitalize font-custom tracking-wide text-sm
                        w-full bg-primary'><FiShoppingCart />Add to cart</Button>
        </div>
    )
}

export default ProductDetails