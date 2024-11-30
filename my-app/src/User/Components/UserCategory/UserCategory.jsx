import React from 'react'

const UserCategory = () => {
  const categories = [
    {
      id: "1",
      catImg: "/c1.jpg",
      catTitle: "Kurti"
    },
    {
      id: "2",
      catImg: "/c2.webp",
      catTitle: "Bottom"
    },
    {
      id: "3",
      catImg: "/c3.webp",
      catTitle: "Home wear"
    },
    {
      id: "4",
      catImg: "/c4.jpg",
      catTitle: "Duppatta"
    },
    {
      id: "5",
      catImg: "/c5.avif",
      catTitle: "Offer zone"
    },
    {
      id: "6",
      catImg: "/c6.webp",
      catTitle: "churidar cloth"
    },
    {
      id: "7",
      catImg: "/c7.avif",
      catTitle: "Kids"
    },
    {
      id: "8",
      catImg: "/c8.avif",
      catTitle: "Footwear"
    },
    {
      id: "9",
      catImg: "/c9.jpg",
      catTitle: "Accessories"
    },
  ]

  return (
    <>
      <div className='flex justify-between items-center'>
        <h1 className='text-secondary text-lg xl:text-xl lg:text-xl font-semibold'>Shop by Category</h1>
        <p className='text-primary text-sm xl:text-base lg:text-base font-medium underline'>View all</p>
      </div>

      <div className='flex flex-wrap xl:flex-nowrap lg:flex-nowrap items-center justify-between xl:justify-normal 
      lg:justify-normal xl:gap-8 lg:gap-8 xl:overflow-x-scroll lg:overflow-x-scroll hide-scrollbar'>
        {
          categories.map((category, index) => (
            <div key={index} className='space-y-2 mb-4 w-[30%] transition-opacity duration-500 ease-in-out hover:opacity-55 
            cursor-pointer'>
              <div className='w-full h-24 xl:w-36 xl:h-36 lg:w-36 lg:h-36'>
                <img src={category.catImg} alt={category.catTitle} className='w-full h-full object-cover rounded-xl' />
              </div>
              <p className='text-secondary text-center text-xs xl:text-sm lg:text-sm font-normal capitalize truncate'>{category.catTitle}</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default UserCategory