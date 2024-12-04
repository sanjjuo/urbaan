import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../../../StoreContext/StoreContext';

const UserCategory = () => {
  const { setSelectedCategory } = useContext(AppContext);
  const categories = [
    {
      id: "1",
      catImg: "/c1.jpg",
      catTitle: "kurti"
    },
    {
      id: "2",
      catImg: "/c2.webp",
      catTitle: "bottoms"
    },
    {
      id: "3",
      catImg: "/c3.webp",
      catTitle: "home wear"
    },
    {
      id: "4",
      catImg: "/c4.jpg",
      catTitle: "duppatta"
    },
    {
      id: "5",
      catImg: "/c5.avif",
      catTitle: "offer zone"
    },
    {
      id: "6",
      catImg: "/c6.webp",
      catTitle: "churidar material"
    },
    {
      id: "7",
      catImg: "/c7.avif",
      catTitle: "kids wear"
    },
    {
      id: "8",
      catImg: "/c8.avif",
      catTitle: "footwear"
    },
    {
      id: "9",
      catImg: "/c9.jpg",
      catTitle: "accessories"
    },
  ]

  const handleCategory = (category) => {
    setSelectedCategory(category)
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <h1 className='text-secondary text-lg xl:text-xl lg:text-xl font-semibold'>Shop by Category</h1>
        <Link to='/view-all-category'><p className='text-primary text-sm xl:text-base lg:text-base font-medium underline'>View all</p></Link>
      </div>

      <div className='flex flex-wrap xl:flex-nowrap lg:flex-nowrap items-center justify-between xl:justify-normal 
      lg:justify-normal xl:gap-8 lg:gap-8 xl:overflow-x-scroll lg:overflow-x-scroll hide-scrollbar'>
        {categories.map((category, index) => (
          <Link
            to="/all-category"
            key={index}
            onClick={()=>handleCategory(category.catTitle)}
            className="space-y-2 mb-4 w-[30%] transition-opacity duration-500 ease-in-out hover:opacity-75 cursor-pointer block"
          >
            <div className="w-full h-24 xl:w-36 xl:h-36 lg:w-36 lg:h-36">
              <img
                src={category.catImg}
                alt={category.catTitle}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <p className="text-secondary text-center text-xs xl:text-sm lg:text-sm font-normal capitalize truncate">
              {category.catTitle}
            </p>
          </Link>
        ))}

      </div>
    </>
  )
}

export default UserCategory