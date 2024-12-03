import React, { useContext } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../StoreContext/StoreContext';
import { RxHeart } from 'react-icons/rx';
import { ViewCategoryDrawer } from './ViewCategoryDrawer';


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

const ViewAllCategory = () => {
    const navigate = useNavigate();
    const { handleProductDetails, handleOpenBottomDrawer } = useContext(AppContext);

    return (
        <>
            <div className="p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto">
                <div className="flex items-center gap-3 text-xl font-medium cursor-pointer">
                    <IoIosArrowBack onClick={() => navigate(-1)} className="text-secondary text-2xl cursor-pointer" />
                    <input
                        type="search"
                        name="search"
                        id=""
                        placeholder='Churidar Materials'
                        className='w-full text-sm p-2 rounded-lg placeholder:font-normal bg-searchUser placeholder:text-gray-700'
                    />
                    <div onClick={handleOpenBottomDrawer} className='bg-searchUser p-2 rounded-lg'>
                        <div className='w-5 h-5'>
                            <img src="/filter.png" alt="" className='w-full h-full' />
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-5 gap-5 mt-10'>
                    {
                        products.map((product) => (
                            <Link onClick={() => handleProductDetails(product)} to='/product-details' className='cursor-pointer' key={product.id} >
                                <div className='group'>
                                    <div className='w-full h-52 xl:h-80 lg:h-80 relative rounded-xl overflow-hidden'>
                                        <img src={product.img} alt={product.title} className='w-full h-full object-cover rounded-xl shadow-md
                                            transition transform scale-100 duration-500 ease-in-out cursor-pointer group-hover:scale-105' />
                                        <RxHeart className='absolute top-2 right-2 bg-white text-gray-600 w-6 h-6 xl:w-7 xl:h-7 lg:w-7 lg:h-7 p-1 rounded-full shadow-md' />
                                    </div>
                                    <div className='mt-3'>
                                        <h4 className='font-medium text-sm xl:text-lg lg:text-lg'>{product.title}</h4>
                                        <p className='text-gray-600 font-normal text-xs xl:text-sm lg:text-sm'>{product.description}</p>
                                        <p className='text-primary text-base xl:text-xl lg:text-xl font-semibold mt-2'>₹{product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>

            <ViewCategoryDrawer />
        </>
    )
}

export default ViewAllCategory
