import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../../StoreContext/StoreContext'
import toast from 'react-hot-toast'
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri'
import { IoIosArrowBack } from 'react-icons/io'
import SearchBar from '../Navbar/SearchBar'
import { RxCountdownTimer } from 'react-icons/rx'

const UserSearch = () => {
    const { BASE_URL, wishlist } = useContext(AppContext)
    const navigate = useNavigate()
    const [searchedProducts, setSearchedProducts] = useState([])
    const [heartIcons, setHeartIcons] = useState({})
    const [searchUserProducts, setSearchedUserProducts] = useState('')

    useEffect(() => {
        const fetchSearchedProducts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/products/view-products`)
                setSearchedProducts(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchSearchedProducts()
    }, [BASE_URL])

    // add to wishlist
    const handleWishlist = async (productId, productTitle) => {
        try {
            const userId = localStorage.getItem('userId')
            const payload = { userId, productId }

            // Check if product is already in wishlist
            const isInWishlist = wishlist?.items?.some(item => item.productId._id === productId)

            if (!isInWishlist) {
                const response = await axios.post(`${BASE_URL}/user/wishlist/add`, payload)
                console.log(response.data)

                setHeartIcons(prevState => ({
                    ...prevState,
                    [productId]: true
                }))

                toast.success(`${productTitle} added to wishlist`)
            } else {
                toast.error('Product already in wishlist')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto'>
            <h1 className="flex items-center gap-1 text-lg xl:text-xl lg:text-xl font-medium cursor-pointer" onClick={() => navigate('/')}>
                <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Back
            </h1>

            <div className='mt-5'>
                <SearchBar
                    searchUserProducts={searchUserProducts}
                    setSearchedUserProducts={setSearchedUserProducts}
                    setSearchedProducts={setSearchedProducts}
                />
            </div>

            {searchUserProducts.length === 0 ? (
                <div>
                    <div className='mt-10'>
                        <h3 className='text-base font-medium text-secondary'>Your Recent Searches</h3>
                        <ul className='mt-5 space-y-2'>
                            <li className='text-sm flex items-center gap-1 text-gray-700'><RxCountdownTimer />Kurti</li>
                            <li className='text-sm flex items-center gap-1 text-gray-700'><RxCountdownTimer />Churidar</li>
                            <li className='text-sm flex items-center gap-1 text-gray-700'><RxCountdownTimer />Ethnic Wear</li>
                            <li className='text-sm flex items-center gap-1 text-gray-700'><RxCountdownTimer />Palazzo</li>
                        </ul>
                    </div>
                    <div className='mt-10'>
                        <h3 className='text-base font-medium text-secondary'>Popular Searches</h3>
                        <ul className='mt-5 flex flex-wrap items-center gap-2'>
                            <li className='text-sm text-primary border-[1px] border-primary rounded-xl px-3 py-2'>Kurti</li>
                            <li className='text-sm text-primary border-[1px] border-primary rounded-xl px-3 py-2'>Night Wear</li>
                            <li className='text-sm text-primary border-[1px] border-primary rounded-xl px-3 py-2'>Palazzo</li>
                            <li className='text-sm text-primary border-[1px] border-primary rounded-xl px-3 py-2'>Churidar</li>
                            <li className='text-sm text-primary border-[1px] border-primary rounded-xl px-3 py-2'>Maternity Wear</li>
                            <li className='text-sm text-primary border-[1px] border-primary rounded-xl px-3 py-2'>Bottoms</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className='grid grid-cols-2 gap-5 mt-10'>
                    {searchedProducts.map((product) => {
                        const isInWishlist = wishlist?.items?.some(item => item.productId._id === product._id)
                        return (
                            <div className='group relative' key={product._id}>
                                <Link to="/product-details" state={{ productId: product._id }} className="cursor-pointer">
                                    <div className='w-full h-52 xl:h-80 lg:h-80 rounded-xl overflow-hidden'>
                                        <img
                                            src={`${BASE_URL}/uploads/category/${product.images[0]}`}
                                            alt={product.title}
                                            className='w-full h-full object-cover rounded-xl shadow-md transition transform scale-100 duration-500 ease-in-out cursor-pointer group-hover:scale-105'
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
                                    <p className='text-gray-600 font-normal text-xs xl:text-sm lg:text-sm capitalize'>{product.description}</p>
                                    <p className='text-primary text-base xl:text-xl lg:text-xl font-semibold mt-2'>
                                        ₹{product.offerPrice}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default UserSearch
