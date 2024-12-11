import React from 'react'
import CreateCarousel from './CreateCarousel'
import { RiSearch2Line } from 'react-icons/ri'
import AddedCarousel from './AddedCarousel'
import { useState } from 'react'
import EditCarousel from './EditCarousel'

const AdminCarousel = () => {
  const [createEditCarousel, setCreateEditCarousel] = useState("createcarousel");
  const [initialEditCarouselData, setInitialEditCarouselData] = useState(null)

  const handleEditCarousel = (crsl) => {
    setInitialEditCarouselData(crsl)
    setCreateEditCarousel('editcarousel')
    console.log(crsl);
    
  }

  return (
    <>
      <h1 className="text-2xl lg:text-3xl font-semibold">Carousel</h1>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 mt-5">
        {/* Left Section */}
        <div className="lg:col-span-2">
          <div className="h-[calc(100vh-6rem)] overflow-y-auto hide-scrollbar">
            {createEditCarousel === "createcarousel" ? (
              <CreateCarousel
              />
            ) : (
              <EditCarousel
                initialEditCarouselData={initialEditCarouselData}
              />
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-4 space-y-5">
          {/* Search Bar */}
          <div className="border border-gray-300 py-1 px-2 flex items-center gap-1 rounded-xl bg-white h-12 w-96">
            <RiSearch2Line className="text-gray-700 text-xl" />
            <input
              type="search"
              name="search"
              placeholder="Search Category"
              className="bg-transparent placeholder:text-gray-700 placeholder:text-base focus:outline-none text-secondary w-full"
            />
          </div>

          {/* Added Carousel */}
          <div className="space-y-10 h-[calc(100vh-10rem)] overflow-y-auto hide-scrollbar">
            <AddedCarousel
              createEditCarousel={createEditCarousel}
              handleEditCarousel={handleEditCarousel}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCarousel;

