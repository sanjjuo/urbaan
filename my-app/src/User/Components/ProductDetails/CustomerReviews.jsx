import { Button, Progress, Typography } from '@material-tailwind/react';
import React from 'react'
import { FaStar } from 'react-icons/fa6';
import { IoIosArrowBack } from "react-icons/io";
import { IoStarOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

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

const CustomerReviews = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="bg-white shadow-md py-4 px-4 w-full sticky top-0">
                <h1
                    className="flex items-center gap-5 text-xl font-medium cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Customer Reviews
                </h1>
            </div>

            {/* Customer Reviews */}
            <div className='p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[100%]'>
                <div className='flex items-center justify-between gap-0 pb-6 border-b-2 border-gray-300'>
                    <div className='flex flex-col justify-between gap-10 w-3/4 xl:w-1/4 lg:w-1/4'>
                        <h1 className='uppercase font-normal flex items-center gap-2 text-sm xl:text-xl lg:text-xl'>
                            ratings <IoStarOutline /></h1>
                        <div>
                            <h2 className='flex items-center gap-2 text-sm xl:text-xl lg:text-xl font-medium'>4.3<FaStar className='text-ratingBg' /></h2>
                            <p className='font-normal text-xs xl:text-base lg:text-base'>1.4K Verified Buyers</p>
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        <div className='flex items-center gap-2'>
                            <Typography className='text-xs xl:text-sm lg:text-sm'>5</Typography>
                            <Progress value={75} size="sm" color='pink' />
                        </div>
                        <div className='flex items-center gap-2'>
                            <Typography className='text-xs xl:text-sm lg:text-sm'>4</Typography>
                            <Progress value={55} size="sm" color='pink' />
                        </div>
                        <div className='flex items-center gap-2'>
                            <Typography className='text-xs xl:text-sm lg:text-sm'>3</Typography>
                            <Progress value={35} size="sm" color='pink' />
                        </div>
                        <div className='flex items-center gap-2'>
                            <Typography className='text-xs xl:text-sm lg:text-sm'>2</Typography>
                            <Progress value={25} size="sm" color='pink' />
                        </div>
                        <div className='flex items-center gap-2'>
                            <Typography className='text-xs xl:text-sm lg:text-sm'>1</Typography>
                            <Progress value={15} size="sm" color='pink' />
                        </div>
                    </div>
                </div>

                <ul className="flex items-center gap-2 mt-5 overflow-x-scroll hide-scrollbar">
                    {['Most Helpful', 'Latest', 'Positive', 'Negative'].map((label) => (
                        <li
                            key={label}
                            className="font-normal capitalize text-xs xl:text-sm lg:text-sm font-custom min-w-[100px] sm:min-w-[128px] py-2 px-5 sm:p-3 flex justify-center items-center 
            rounded-2xl border border-primary text-primary hover:bg-primary hover:text-white hover:opacity-100 whitespace-nowrap cursor-pointer"
                        >
                            {label}
                        </li>
                    ))}
                </ul>



                {/* reviews */}
                <div className='mt-5 pb-20 xl:pb-0 lg:pb-0'>
                    {
                        reviews.map((review) => (
                            <div className='space-y-2 mb-3' key={review.id}>
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
                </div>

                <div className='hidden xl:flex lg:flex justify-center mt-10'>
                    <Link to='/write-review'><Button className='bg-primary font-custom font-normal text-sm capitalize w-52'>Write a Review</Button></Link>
                </div>

                <div className="bg-white shadow-md fixed bottom-0 inset-x-0 flex justify-center z-50 p-4 lg:hidden xl:hidden md:hidden">
                <Link to='/write-review' className='w-full'><Button className="bg-primary font-custom font-normal text-sm capitalize w-full">Write a Review</Button></Link>
                </div>

            </div>
        </>
    )
}

export default CustomerReviews