import React, { useState, useContext } from 'react';
import { RxHeart } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { AppContext } from '../../../StoreContext/StoreContext';
import { useEffect } from 'react';
import axios from 'axios';
import AppLoader from '../../../Loader';


const LatestProducts = () => {
  const { handleProductDetails, BASE_URL } = useContext(AppContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const token = localStorage.getItem('userToken')
        if (!token) {
          alert("Authorization is missing")
          return;
        }
        console.log(localStorage.getItem('userToken'));

        const headers = {
          Authorization: `Bearer ${token}`
        }
        const response = await axios.get(`${BASE_URL}/user/products/view-products`, { headers });
        const filteredProducts = response.data.filter(product => product.isLatestProduct);
        setLatestProducts(filteredProducts)
        console.log(filteredProducts);
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching offer products:", error);
      }
    }
    fetchLatestProducts()
  }, [])
  return (
    <>
      <h1 className='text-secondary text-lg xl:text-2xl lg:text-2xl font-semibold text-center xl:text-left'>Latest Products</h1>
      {
        isLoading || latestProducts.length === 0 ? (
          <div className="col-span-2 flex justify-center items-center">
            <AppLoader />
          </div>
        ) : (
          <>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-5 gap-5'>
              {
                latestProducts.map((product) => (
                  <Link onClick={() => handleProductDetails(product)} to='/product-details' className='cursor-pointer' key={product._id} >
                    <div className='group'>
                      <div className='w-full h-52 xl:h-80 lg:h-80 relative rounded-xl overflow-hidden'>
                        <img src={`${BASE_URL}/${product.images[0]}`} alt={product.title} className='w-full h-full object-cover rounded-xl shadow-md
                transition transform scale-100 duration-500 ease-in-out cursor-pointer group-hover:scale-105' />
                        <RxHeart className='absolute top-2 right-2 bg-white text-gray-600 w-6 h-6 xl:w-7 xl:h-7 lg:w-7 lg:h-7 p-1 rounded-full shadow-md' />
                      </div>
                      <div className='mt-3'>
                        <h4 className='font-medium text-sm xl:text-lg lg:text-lg'>{product.title}</h4>
                        <p className='text-gray-600 font-normal text-xs xl:text-sm lg:text-sm'>{product.description}</p>
                        <p className='text-primary text-base xl:text-xl lg:text-xl font-semibold mt-2'>₹{product.offerPrice}</p>
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </>
        )
      }
    </>
  )
}

export default LatestProducts