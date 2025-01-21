import React, { useContext } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../StoreContext/StoreContext';
import { ViewCategoryDrawer } from './ViewCategoryDrawer';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { RiHeart3Fill, RiHeart3Line, RiSearch2Line } from 'react-icons/ri';
import AppLoader from '../../../Loader';
import toast from 'react-hot-toast';
import { UserNotLoginPopup } from '../UserNotLogin/UserNotLoginPopup';
import { Chip } from '@material-tailwind/react';

const ViewAllCategory = () => {
    const navigate = useNavigate();
    const { handleOpenBottomDrawer, BASE_URL, favProduct, setOpenUserNotLogin, setFav } = useContext(AppContext);
    const [allProducts, setAllProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [searchProducts, setSearchProducts] = useState('');
    const [heartIcons, setHeartIcons] = useState({});
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [noProductsFound, setNoProductsFound] = useState(false);
    // const [activeFilters, setActiveFilters] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        price: [],
        category: [],
        size: [],
        material: []
    });

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/products/view-products`)
                setAllProducts(response.data)
                setFilteredProducts(response.data);
                setIsLoading(false)
                console.log(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchAllProducts()
    }, [])

    // search products
    useEffect(() => {
        const fetchSearchedProducts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/user/products/products/search?name=${searchProducts}`);
                setAllProducts(response.data);
                setFilteredProducts(response.data)
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSearchedProducts()
    }, [searchProducts]);

    // add to wishlist
    const handleWishlist = async (productId, productTitle) => {
        try {
            const userId = localStorage.getItem('userId');

            if (!userId) {
                setOpenUserNotLogin(true);
                return;
            }

            const payload = {
                userId: userId,
                productId: productId
            };

            // Check if product is already in wishlist
            const isInWishlist = favProduct?.items?.some(item => item.productId?._id === productId);
            if (isInWishlist) {
                // If product is already in wishlist, show the appropriate toast and return
                toast.error(`${productTitle} is already in your wishlist`);
                return; // Stop here without making the API call
            }

            // Add to wishlist if not already there
            const response = await axios.post(`${BASE_URL}/user/wishlist/add`, payload);
            console.log(response.data);

            // If the response is successful, update the heart icon state and show success toast
            setHeartIcons(prevState => ({
                ...prevState,
                [productId]: !isInWishlist, // Set the heart icon to filled
            }));

            setFav((prevFav) => {
                const isAlreadyFav = prevFav.some(
                    (item) => item.productId === payload.productId
                );
                return isAlreadyFav ? prevFav : [...prevFav, payload];
            });

            toast.success(`${productTitle} added to wishlist`);

        } catch (error) {
            // Check if the error is related to the product already being in the wishlist
            if (error.response && error.response.data.message === "Product is already in the wishlist") {
                toast.error(`${productTitle} is already in your wishlist`);
            } else {
                console.log("Error adding to wishlist:", error);
                toast.error("Failed to add product to wishlist");
            }
        }
    };

    console.log(filteredProducts);


    return (
        <>
            <div className="p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto hide-scrollbar">
                <h1 className="flex items-center gap-1 text-lg xl:text-xl lg:text-xl font-medium cursor-pointer" onClick={() => navigate(-1)}>
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Back
                </h1>
                <div className="flex items-center justify-center gap-2 mt-5 ">
                    <div className='w-96 bg-searchUser flex items-center gap-2 rounded-lg text-sm p-2'>
                        <RiSearch2Line className='text-gray-600 text-xl' />
                        <input
                            type="search"
                            name="search"
                            id=""
                            value={searchProducts}
                            onChange={(e) => setSearchProducts(e.target.value)}
                            placeholder='Search products'
                            className='w-full bg-transparent placeholder:font-normal placeholder:text-gray-700 focus:outline-none'
                        />
                    </div>
                    <div onClick={handleOpenBottomDrawer} className='bg-searchUser p-2 rounded-lg relative'>
                        <div className='w-5 h-5 cursor-pointer'>
                            <img src="/filter.png" alt="" className='w-full h-full' />
                        </div>
                        {(selectedFilters.price.length > 0 ||
                            selectedFilters.category.length > 0 ||
                            selectedFilters.size.length > 0) && (
                                <div className='bg-primary w-3 h-3 rounded-full absolute -top-1 -right-1'></div>
                            )}
                    </div>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-5 gap-5 mt-10'>
                    {
                        isLoading ? (
                            <div className="col-span-5 flex justify-center items-center h-[50vh]">
                                <AppLoader />
                            </div>
                        ) : noProductsFound ? (
                            <div className="col-span-5 flex justify-center items-center h-[50vh]">
                                <p className="text-sm text-secondary">No products found for the selected filters.</p>
                            </div>
                        ) : (
                            <>
                                {filteredProducts.map((product) => {
                                    const isInWishlist = favProduct?.items?.some(item => item.productId?._id === product._id);
                                    return (
                                        <div className='group relative' key={product._id}>
                                            <Link
                                                to="/product-details"
                                                state={{
                                                    productId: product._id,
                                                    categoryId: product.category._id
                                                }}
                                                className="cursor-pointer"
                                            >
                                                <div className='w-full h-52 xl:h-80 lg:h-80 relative rounded-xl overflow-hidden'>
                                                    <img src={product.images[0]} alt={product.title}
                                                        className='w-full h-full object-cover rounded-xl shadow-md
                                            transition transform scale-100 duration-500 ease-in-out cursor-pointer group-hover:scale-105'
                                                    />
                                                </div>
                                            </Link>
                                            {heartIcons[product._id] || isInWishlist ? (
                                                <RiHeart3Fill
                                                    onClick={() => handleWishlist(product._id, product.title)}
                                                    className='absolute top-2 right-2 cursor-pointer text-primary bg-white w-7 h-7 xl:w-8 xl:h-8 lg:w-8 lg:h-8 p-1 rounded-full shadow-md'
                                                />
                                            ) : (
                                                <RiHeart3Line
                                                    onClick={() => handleWishlist(product._id, product.title)}
                                                    className='absolute top-2 right-2 cursor-pointer bg-white text-gray-600 w-7 h-7 xl:w-8 xl:h-8 lg:w-8 lg:h-8 p-1 rounded-full shadow-md'
                                                />
                                            )}
                                            <div className='mt-3'>
                                                <h4 className='font-medium text-sm xl:text-lg lg:text-lg capitalize'>{product.title}</h4>
                                                <p className='text-gray-600 font-normal text-xs xl:text-sm lg:text-sm capitalize truncate overflow-hidden 
                                                whitespace-nowrap w-40 xl:w-60 lg:w-60'>{product.description}</p>
                                                <p className='text-primary text-base xl:text-xl lg:text-xl font-semibold mt-2'>₹{product.offerPrice}</p>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </>
                        )
                    }
                </div>
            </div >

            <ViewCategoryDrawer
                setFilteredProducts={setFilteredProducts}
                allProducts={allProducts}
                setNoProductsFound={setNoProductsFound}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
            />
            <UserNotLoginPopup
                title='You are not logged in'
                description='Please log in or create an account to add items to your wishlist and keep track of your favorites.'
            />
        </>
    )
}

export default ViewAllCategory
