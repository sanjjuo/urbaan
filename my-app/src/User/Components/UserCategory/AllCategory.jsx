import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../StoreContext/StoreContext';
import FilterBySize from './FilterBySize';
import FilterByMaterial from './FilterByMaterial';
import FilterByPrice from './FilterByPrice';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import AppLoader from '../../../Loader';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { UserNotLoginPopup } from '../UserNotLogin/UserNotLoginPopup';
import FilterBySubCategory from './FilterBySubCategory';
import { IoIosArrowBack } from 'react-icons/io';


const AllCategory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const productsCategory = location.state?.category || [];
    const { BASE_URL, favProduct, setOpenUserNotLogin, setFav } = useContext(AppContext);

    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [heartIcons, setHeartIcons] = useState({});

    // Filter states
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [priceRange, setPriceRange] = useState([0, Infinity]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/products/products/category/${productsCategory.id}`);
                setProducts(response.data);
                setAllProducts(response.data); // Save the original list
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error.response || error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [productsCategory.id]);

    // Function to apply all filters
    const applyFilters = () => {
        let filteredProducts = [...allProducts];

        // Apply subcategory filter
        if (selectedSubCategory) {
            filteredProducts = filteredProducts.filter(
                (product) => product.subcategory._id === selectedSubCategory
            );
        }

        // Apply size filter
        if (selectedSize) {
            filteredProducts = filteredProducts.filter((product) =>
                product.colors.some((color) => color.sizes.some((s) => s.size === selectedSize))
            );
        }

        // Apply material filter
        if (selectedMaterial) {
            filteredProducts = filteredProducts.filter(
                (product) => product.features.material === selectedMaterial
            );
        }

        // Apply price range filter
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange;
            filteredProducts = filteredProducts.filter(
                (product) => product.offerPrice >= minPrice && product.offerPrice <= maxPrice
            );
        }

        setProducts(filteredProducts);
    };

    // Handle individual filter changes
    const handleSubCategory = (subCategoryId) => {
        setSelectedSubCategory(subCategoryId);
    };

    const handleSizeFilter = (size) => {
        setSelectedSize(size);
    };

    const handleMaterialFilter = (material) => {
        setSelectedMaterial(material);
    };

    const handlePriceFilter = (range) => {
        setPriceRange(range);
    };

    // Reapply filters whenever a filter state changes
    useEffect(() => {
        applyFilters();
    }, [selectedSize, selectedMaterial, selectedSubCategory, priceRange]);

    return (
        <div className='h-[calc(100vh-4rem)] pb-20'>
            {/* Header */}
            <div className='w-full h-44 relative'>
                <img src="/banner.jpeg" alt="" className='w-full h-full object-cover' />
                <div className='absolute inset-0 bg-primary/70'></div>
                <div className='absolute inset-0 flex items-end justify-center mb-5'>
                    <h1 className='text-white text-4xl font-medium capitalize flex items-center gap-5'>
                        <IoIosArrowBack onClick={() => navigate(-1)} className="text-white text-3xl cursor-pointer" />
                        {productsCategory.name}
                    </h1>
                </div>
            </div>

            {/* Filters */}
            <div className="px-4 py-10 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg">
                <ul className='space-y-3 xl:flex xl:items-center xl:space-y-0 xl:gap-5 xl:justify-center
                    lg:flex lg:items-center lg:space-y-0 lg:gap-5 lg:justify-center'>
                    <li><FilterBySize handleSizeFilter={handleSizeFilter} /></li>
                    <li><FilterByMaterial handleMaterialFilter={handleMaterialFilter} /></li>
                    <li><FilterBySubCategory categoryId={productsCategory.id} handleSubCategory={handleSubCategory} /></li>
                    <li><FilterByPrice handlePriceFilter={handlePriceFilter} /></li>
                </ul>

                {/* Products */}
                <div className="xl:p-10 mt-10">
                    <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-5 gap-5">
                        {isLoading ? (
                            <div className='col-span-5 flex justify-center items-center h-[50vh]'>
                                <AppLoader />
                            </div>
                        ) : products.length === 0 ? (
                            <div className="col-span-5 flex flex-col justify-center items-center h-[50vh] text-center">
                                <p className="text-xl font-semibold text-secondary">No products available,</p>
                                <p className="text-md text-gray-700">Please check back later or try filtering the products.</p>
                            </div>
                        ) : (
                            products.map((product) => {
                                const isInWishlist = favProduct?.items?.some(item => item.productId?._id === product._id);
                                return (
                                    <div className='group relative' key={product._id}>
                                        <Link to='/product-details' state={{ productId: product._id, categoryId: product.category._id }} className="cursor-pointer">
                                            <div className="w-full h-52 xl:h-80 lg:h-80 relative rounded-xl overflow-hidden">
                                                <img src={product.images[0]} alt="" className='w-full h-full object-cover rounded-xl shadow-md transition transform scale-100 duration-500 ease-in-out cursor-pointer group-hover:scale-105' onError={(e) => e.target.src = '/no-image.jpg'} />
                                            </div>
                                        </Link>
                                        {heartIcons[product._id] || isInWishlist ? (
                                            <RiHeart3Fill onClick={() => handleWishlist(product._id, product.title)} className='absolute top-2 right-2 cursor-pointer text-primary bg-white w-7 h-7 xl:w-8 xl:h-8 lg:w-8 lg:h-8 p-1 rounded-full shadow-md' />
                                        ) : (
                                            <RiHeart3Line onClick={() => handleWishlist(product._id, product.title)} className='absolute top-2 right-2 cursor-pointer bg-white text-gray-600 w-7 h-7 xl:w-8 xl:h-8 lg:w-8 lg:h-8 p-1 rounded-full shadow-md' />
                                        )}
                                        <div className='mt-3'>
                                            <p className='font-medium text-sm xl:text-lg lg:text-lg truncate capitalize'>{product.title}</p>
                                            <p className='text-gray-600 font-normal text-xs xl:text-sm lg:text-sm truncate overflow-hidden whitespace-nowrap w-40 xl:w-56 lg:w-56 capitalize'>{product.description}</p>
                                            <p className='text-primary text-base xl:text-xl lg:text-xl font-semibold mt-2'>₹{product.offerPrice}</p>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AllCategory;
