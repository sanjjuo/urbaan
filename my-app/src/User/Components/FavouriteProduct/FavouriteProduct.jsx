import { Button } from '@material-tailwind/react';
import React, { useContext, useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../StoreContext/StoreContext';
import axios from 'axios';
import AppLoader from '../../../Loader';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
import { RiHeart3Line } from 'react-icons/ri';
import { HiOutlineXMark } from 'react-icons/hi2';

const FavouriteProduct = () => {
    const navigate = useNavigate();
    const { BASE_URL, wishlist, setWishlist } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const wishlistProducts = wishlist?.items || [];

    // Fetch wishlist products
    useEffect(() => {
        const fetchWishlistProducts = async () => {
            setIsLoading(true);
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`${BASE_URL}/user/wishlist/view/${userId}`);
                setWishlist(response.data || {});
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWishlistProducts();
    }, []);

    // Delete wishlist product
    const handleWishlistDelete = async (productId) => {
        try {
            const userId = localStorage.getItem('userId');
            const payload = { userId, productId };

            const response = await axios.delete(`${BASE_URL}/user/wishlist/remove`, {
                data: payload,
            });

            if (response.status === 200) {
                setWishlist((prev) => ({
                    ...prev,
                    items: prev.items.filter((item) => item.productId._id !== productId),
                }));
                toast.success('Product removed from wishlist');
            }
        } catch (error) {
            console.error('Error deleting wishlist item:', error);
            toast.error('Failed to remove product');
        }
    };

    // handle clear
    const handleWishlistClear = async () => {
        try {
            const userId = localStorage.getItem('userId')
            const response = await axios.delete(`${BASE_URL}/user/wishlist/clear/${userId}`)
            console.log(response.data);
            toast.success('Wishlist is cleared')
            setWishlist([])
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-userBg p-4 xl:p-16 lg:p-16 space-y-8 xl:space-y-14 lg:space-y-14 h-screen'>
            <h1
                className="flex items-center gap-2 text-lg xl:text-xl lg:text-xl font-medium cursor-pointer"
                onClick={() => navigate(-1)}
            >
                <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> My Wishlist
            </h1>

            <h2 className='text-3xl xl:text-4xl lg:text-4xl font-semibold capitalize flex items-center justify-center gap-1 mt-5'>
                My Wishlist<RiHeart3Line />
            </h2>

            <p onClick={handleWishlistClear} className='mt-10 capitalize flex items-center gap-0 text-sm hover:text-primary cursor-pointer'>
                clear all <HiOutlineXMark className='text-lg' /></p>

            {isLoading ? (
                <div className='col-span-2 flex justify-center items-center h-[50vh]'>
                    <AppLoader />
                </div>
            ) : wishlistProducts.length === 0 ? (
                <div className='flex flex-col justify-center items-center'>
                    <div className='w-20 h-20 mb-10'>
                        <img src="/favorite.png" alt="Empty Wishlist" className='w-full h-full object-cover' />
                    </div>
                    <p className='font-medium text-lg xl:text-xl lg:text-xl mb-3'>Your wishlist is Empty</p>
                    <p className='font-normal text-xs xl:text-sm lg:text-sm text-gray-600 text-center mb-3'>
                        You can add an item to your favourites by clicking “Heart Icon”
                    </p>
                    <Link to='/'>
                        <Button className='bg-primary text-sm capitalize w-48 font-custom font-normal'>
                            Go Shopping
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-5 gap-5'>
                    {wishlistProducts.map((product) => (
                        <div key={product._id} className='relative'>
                            <MdDelete
                                onClick={() => handleWishlistDelete(product.productId._id)}
                                className='text-deleteBg bg-white shadow-md rounded-full p-1 w-7 h-7 hover:bg-primary 
                                hover:text-white absolute -top-10 right-0 cursor-pointer'
                            />
                            <Link
                                to="/product-details"
                                state={{ productId: product.productId._id }}
                                className="group"
                            >
                                <div className='w-full h-52 xl:h-80 lg:h-80 rounded-xl overflow-hidden'>
                                    <img
                                        src={`${BASE_URL}/uploads/category/${product.productId.images[0] || 'default.jpg'}`}
                                        alt={product.productId.title}
                                        className='w-full h-full object-cover rounded-xl shadow-md
                                        transition-transform scale-100 duration-500 ease-in-out group-hover:scale-105'
                                    />
                                </div>
                                <div className='mt-3'>
                                    <h4 className='font-medium text-sm xl:text-lg lg:text-lg'>
                                        {product.productId.title}
                                    </h4>
                                    <p className='text-gray-600 text-xs xl:text-sm lg:text-sm'>
                                        {product.productId.description}
                                    </p>
                                    <p className='text-primary text-base xl:text-xl lg:text-xl font-semibold mt-2'>
                                        ₹{product.productId.offerPrice}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavouriteProduct;
