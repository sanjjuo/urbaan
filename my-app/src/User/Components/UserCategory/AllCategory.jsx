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
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { UserNotLoginPopup } from '../UserNotLogin/UserNotLoginPopup';


const AllCategory = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const productsCategory = location.state.category
    const { BASE_URL, favProduct, setOpenUserNotLogin, setFav } = useContext(AppContext);
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [heartIcons, setHeartIcons] = useState({});

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
            // Check if the error has a response and if the response contains a message
            const errorMessage = error.response?.data?.message || "Failed to load filtered products.";
            toast(errorMessage);  // Display the error message from the response
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
            const isInWishlist = favProduct?.items?.some(item => item.productId._id === productId);
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

    return (
        <>
            <div className="bg-white z-20 shadow-md py-4 px-4 w-full sticky top-0">
                <h1
                    className="flex items-center gap-1 text-xl font-medium cursor-pointer"
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
                        <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-5 gap-5">
                            {
                                isLoading || products.length === 0 ? (
                                    <div className='col-span-5 flex justify-center items-center h-[50vh]'>
                                        <AppLoader />
                                    </div>
                                ) : (
                                    <>
                                        {
                                            products.map((product) => {
                                                const isInWishlist = favProduct?.items?.some(item => item.productId._id === product._id);
                                                return (
                                                    <div className='group relative' key={product._id}>
                                                        <Link
                                                            to='/product-details'
                                                            state={{ productId: product._id }}
                                                            className="cursor-pointer">
                                                            <div className="w-full h-52 xl:h-80 lg:h-80 relative rounded-xl overflow-hidden">
                                                                <img
                                                                    src={`${BASE_URL}/uploads/category/${product.images[0]}`}
                                                                    alt=""
                                                                    className='w-full h-full object-cover rounded-xl shadow-md
                                                                transition transform scale-100 duration-500 ease-in-out cursor-pointer group-hover:scale-105'
                                                                    onError={(e) => e.target.src = '/no-image.jpg'} />
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
                                                            <p className='font-medium text-sm xl:text-lg lg:text-lg truncate capitalize'>{product.title}</p>
                                                            <p className='text-gray-600 font-normal text-xs xl:text-sm lg:text-sm truncate capitalize'>{product.description}</p>
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

                    </div>
                </div >
            </div >

            <UserNotLoginPopup
                title='You are not logged in'
                description='Please log in or create an account to add items to your wishlist and keep track of your favorites.'
            />
        </>
    );
};

export default AllCategory;
