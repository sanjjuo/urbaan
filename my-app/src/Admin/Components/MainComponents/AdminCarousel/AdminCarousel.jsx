import React from 'react'
import CreateCarousel from './CreateCarousel'
import { RiSearch2Line } from 'react-icons/ri'
import AddedCarousel from './AddedCarousel'
import { useState } from 'react'
import EditCarousel from './EditCarousel'

const AdminCarousel = () => {
  const [createEditCarousel, setCreateEdotCarousel] = useState("createcarousel");
  const [selectedCarousel, setSelectedCarousel] = useState(null);

  const handleCarouselUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const CarouselUrl = URL.createObjectURL(file);
      setSelectedCarousel(CarouselUrl);
    }
  };
  return (
    <>
      <h1 className="text-2xl lg:text-3xl font-semibold">Carousel</h1>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 mt-5">
        <div className="lg:col-span-2">
          {
            createEditCarousel === "createcarousel" ? (
              <>
                <CreateCarousel
                  selectedCarousel={selectedCarousel}
                  handleCarouselUpload={handleCarouselUpload}
                />
              </>
            ) : (
              <>
                <EditCarousel
                  selectedCarousel={selectedCarousel}
                  handleCarouselUpload={handleCarouselUpload}
                />
              </>
            )
          }
        </div>
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

          {/* Added Categories */}
          <div className="grid grid-cols-1 gap-5">
            <AddedCarousel createEditCarousel={createEditCarousel} setCreateEdotCarousel={setCreateEdotCarousel} />
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminCarousel
