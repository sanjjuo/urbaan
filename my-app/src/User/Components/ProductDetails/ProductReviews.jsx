import { Button, Progress, Typography } from '@material-tailwind/react'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa6'
import { IoStarOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

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


const ProductReviews = () => {
    return (
        <>
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

                <div className='mt-5'>
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

                    <Link to='/customer-reviews'><Button variant='outlined' className='mt-5 xl:mt-10 lg:mt-10 rounded-full p-2 flex items-center gap-1 text-xs capitalize font-custom font-normal
                                 tracking-wide'>View all reviews <BsArrowRight /></Button></Link>
                </div>
        </>
    )
}

export default ProductReviews
