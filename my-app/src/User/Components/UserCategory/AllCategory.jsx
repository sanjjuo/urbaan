import React, { useContext } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../StoreContext/StoreContext';
import { RxHeart } from 'react-icons/rx';
import FilterBySize from './FilterBySize';
import FilterByMaterial from './FilterByMaterial';
import FilterByCategory from './FilterByCategory';
import FilterByPrice from './FilterByPrice';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import AppLoader from '../../../Loader';
import { RiHeart3Line } from 'react-icons/ri';


const AllCategory = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const productsCategory = location.state.category
    const { BASE_URL } = useContext(AppContext);
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/products/products/category/${productsCategory.id}`);
                setProducts(response.data);
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching categories:", error.response || error.message);
            }
        };

        fetchProducts();
    }, []);

    const handleCategory = async (categoryId) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${BASE_URL}/user/products/products/category/${categoryId}`);
            setProducts(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching filtered products:", error.response || error.message);
            alert("Failed to load filtered products.");
            setIsLoading(false);
        }
    };

    const handlePriceFilter = (priceRange) => {
        const [minPrice, maxPrice] = priceRange;
        const filtered = products.filter(
            (product) => product.offerPrice >= minPrice && product.offerPrice <= maxPrice
        );
        setProducts(filtered);
    };


    return (
        <>
            <div className="bg-white z-20 shadow-md py-4 px-4 w-full sticky top-0">
                <h1
                    className="flex items-center gap-2 text-xl font-medium cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Back
                </h1>
            </div>
            <div className='min-h-[calc(100vh-4rem)]'>
                <div className='w-full h-44 relative'>
                    <img src="/banner.jpeg" alt="" className='w-full h-full object-cover' />
                    <div className='absolute inset-0 bg-primary/70'></div>
                    <h1 className='absolute inset-0 flex items-end justify-center z-50 text-white text-4xl font-medium
                        mb-5 capitalize'>{productsCategory.name}</h1>
                </div>
                <div className="px-4 py-10 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg">
                    <ul className='space-y-3 xl:flex xl:items-center xl:space-y-0 xl:gap-5 xl:justify-center
                        lg:flex lg:items-center lg:space-y-0 lg:gap-5 lg:justify-center'>
                        <li><FilterBySize handleCategory={handleCategory} /></li>
                        <li><FilterByMaterial /></li>
                        <li><FilterByCategory productsCategory={productsCategory} handleCategory={handleCategory} /></li>
                        <li><FilterByPrice handlePriceFilter={handlePriceFilter} /></li>
                    </ul>
                    <div className="xl:p-10 mt-10">
                        <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-5 gap-2">
                            {
                                isLoading || products.length === 0 ? (
                                    <div className='col-span-5 flex justify-center items-center h-[50vh]'>
                                        <AppLoader />
                                    </div>
                                ) : (
                                    <>
                                        {
                                            products.map((product) => (
                                                <div className='group relative' key={product._id}>
                                                    <Link
                                                        to='/product-details'
                                                        state={{ productId: product._id }}
                                                        className="cursor-pointer">
                                                        <div className="w-full h-52 xl:h-80 lg:h-80 relative rounded-xl overflow-hidden">
                                                            <img src={`${BASE_URL}/uploads/category/${product.images[0]}`} alt="" className='w-full h-full object-cover rounded-xl shadow-md
                                                        transition transform scale-100 duration-500 ease-in-out cursor-pointer group-hover:scale-105' />
                                                        </div>
                                                    </Link>
                                                    <RiHeart3Line className='absolute top-2 right-2 bg-white text-gray-600 w-6 h-6 xl:w-7 xl:h-7 lg:w-7 lg:h-7 p-1 rounded-full shadow-md' />
                                                    <div className='mt-3'>
                                                        <p className='font-medium text-sm xl:text-lg lg:text-lg truncate'>{product.title}</p>
                                                        <p className='text-gray-600 font-normal text-xs xl:text-sm lg:text-sm truncate'>{product.description}</p>
                                                        <p className='text-primary text-base xl:text-xl lg:text-xl font-semibold mt-2'>₹{product.offerPrice}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                )
                            }

                        </div>

                    </div>
                </div >
            </div >
        </>
    );
};

export default AllCategory;
