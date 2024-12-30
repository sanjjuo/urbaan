import { Button } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

const OrderPlaced = () => {
    return (
        <>
            <div className='flex flex-col justify-center items-center h-[100vh]'>
                <div className='flex justify-center items-center'>
                    <video autoPlay muted className='w-[200px]'>
                        <source src="order-placed.webm" type="video/webm" />
                    </video>
                </div>
                <div className='space-y-2 flex flex-col items-center justify-center'>
                    <h1 className='font-bold text-4xl'>Order Confirmed !</h1>
                    <p className='text-gray-600 text-sm flex items-center gap-1'>Your order has been placed successfully.
                        <Link className='text-primary font-semibold'>Order History</Link></p>
                    <Link className='text-primary font-semibold capitalize'>Track my order</Link>
                </div>
                <Link to='/'>
                    <Button className='mt-10 bg-primary text-sm font-normal font-custom capitalize'>continue shopping</Button>
                </Link>
            </div>
        </>
    )
}

export default OrderPlaced
