import React, { useContext } from 'react';
import { RxHeart } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { AppContext } from '../../../StoreContext/StoreContext';
import { useState } from 'react';
import axios from 'axios';
import AppLoader from '../../../Loader';
import { useEffect } from 'react';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';
import { UserNotLoginPopup } from '../UserNotLogin/UserNotLoginPopup';
import toast from 'react-hot-toast';


const FeaturedProducts = () => {
    const { BASE_URL, favProduct, setOpenUserNotLogin } = useContext(AppContext);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [heartIcons, setHeartIcons] = useState({});


    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/products/view-products`);
                const filteredProducts = response.data.filter(product => product.isFeaturedProduct);
                setFeaturedProducts(filteredProducts)
                console.log(filteredProducts);
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching offer products:", error);
            }
        }
        fetchFeaturedProducts()
    }, [])

    // add to wishlist
    const handleWishlist = async (productId, productTitle) => {
        try {
            const userId = localStorage.getItem('userId');

            if (!userId) {
                setOpenUserNotLogin(true);
                return;
            }

            // Check if product is already in wishlist
            const isInWishlist = favProduct?.items?.some(item => item.productId._id === productId);

            if (isInWishlist) {
                // If product is already in wishlist, show the appropriate toast and return
                toast.error(`${productTitle} is already in your wishlist`);
                return; // Stop here without making the API call
            }

            const payload = {
                userId: userId,
                productId: productId
            };
            
            // Add to wishlist if not already there
            const response = await axios.post(`${BASE_URL}/user/wishlist/add`, payload);
            console.log(response.data);
            // If the response is successful, update the heart icon state and show success toast
            setHeartIcons(prevState => ({
                ...prevState,
                [productId]: !isInWishlist, // Set the heart icon to filled
            }));

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

    return (
        <>
            <h1 className='text-secondary text-lg xl:text-2xl lg:text-2xl font-semibold text-center xl:text-left'>Featured Products</h1>
            {
                isLoading || featuredProducts.length === 0 ? (
                    <div className="col-span-2 flex justify-center items-center h-[50vh]">
                        <AppLoader />
                    </div>
                ) : (
                    <>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-5 gap-5 pb-10'>
                            {
                                featuredProducts.map((product) => {
                                    const isInWishlist = favProduct?.items?.some(item => item.productId._id === product._id);
                                    return (
                                        <div className='group relative' key={product._id}>
                                            <Link
                                                to="/product-details"
                                                state={{ productId: product._id }}
                                                className="cursor-pointer"
                                            >
                                                <div className='w-full h-52 xl:h-80 lg:h-80 relative rounded-xl overflow-hidden'>
                                                    <img
                                                        src={`${BASE_URL}/${product.images[0]}`}
                                                        alt={product.title}
                                                        className='w-full h-full object-cover rounded-xl shadow-md
                                                        transition transform scale-100 duration-500 ease-in-out cursor-pointer group-hover:scale-105'
                                                        onError={(e) => e.target.src = '/no-image.jpg'}
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
                                                <p className='text-gray-600 font-normal text-xs xl:text-sm lg:text-sm capitalize'>
                                                    {product.description}
                                                </p>
                                                <p className='text-primary text-base xl:text-xl lg:text-xl font-semibold mt-2'>
                                                    ₹{product.offerPrice}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </>
                )
            }
        </>
    )
}

export default FeaturedProducts