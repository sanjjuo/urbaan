import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../../../StoreContext/StoreContext';
import { categories } from '../../../data';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import AppLoader from '../../../Loader';

const ShopByCategory = () => {
  const { setSelectedCategory, BASE_URL } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);


  const handleCategory = (category) => {
    setSelectedCategory(category)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/category/get`);
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        console.log("Category data could not be fetched.");
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [BASE_URL]);

  return (
    <>
      <div className='flex justify-between items-center'>
        <h1 className='text-secondary text-lg xl:text-xl lg:text-xl font-semibold'>Shop by Category</h1>
        <Link to='/view-all-category'><p className='text-primary text-sm xl:text-base lg:text-base font-medium underline'>View all</p></Link>
      </div>
      {
        isLoading || categories.length === 0 ? (
          <div className="col-span-2 flex justify-center items-center">
            <AppLoader />
          </div>
        ) : (
          <>
            <div className='flex flex-wrap xl:flex-nowrap lg:flex-nowrap items-center justify-between xl:justify-normal 
      lg:justify-normal xl:gap-8 lg:gap-8 xl:overflow-x-scroll lg:overflow-x-scroll hide-scrollbar'>
              {categories.map((category, index) => (
                <Link
                  to="/all-category"
                  key={index}
                  onClick={() => handleCategory(category.name)}
                  className="space-y-2 mb-4 w-[30%] transition-opacity duration-500 ease-in-out hover:opacity-75 cursor-pointer block"
                >
                  <div className="w-full h-24 xl:w-36 xl:h-36 lg:w-36 lg:h-36">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <p className="text-secondary text-center text-xs xl:text-sm lg:text-sm font-normal capitalize truncate">
                    {category.name}
                  </p>
                </Link>
              ))}
            </div>
          </>
        )
      }
    </>
  )
}

export default ShopByCategory