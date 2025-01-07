import React from 'react'
import CreateCarousel from './CreateCarousel'
import { RiSearch2Line } from 'react-icons/ri'
import AddedCarousel from './AddedCarousel'
import { useState } from 'react'
import EditCarousel from './EditCarousel'
import { useContext } from 'react'
import { AppContext } from '../../../../StoreContext/StoreContext'
import { useEffect } from 'react'
import axios from 'axios'

const AdminCarousel = () => {
  const { BASE_URL } = useContext(AppContext);
  const [createEditCarousel, setCreateEditCarousel] = useState("createcarousel");
  const [initialEditCarouselData, setInitialEditCarouselData] = useState(null)
  const [adminCarousel, setAdminCarousel] = useState([]);
  const [searchCarousel, setSearchCarousel] = useState('')

  const handleEditCarousel = (crsl) => {
    setInitialEditCarouselData(crsl)
    setCreateEditCarousel('editcarousel')
    console.log(crsl);

  }

  const token = localStorage.getItem('token')

  //handle search carousel
  useEffect(() => {
    const handleSearchCarousel = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/slider/search?name=${searchCarousel}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setAdminCarousel(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    handleSearchCarousel()
  }, [searchCarousel])

  return (
    <>
      <h1 className="text-2xl lg:text-3xl font-semibold">Carousel</h1>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 mt-5">
        {/* Left Section */}
        <div className="lg:col-span-2">
          <div className="h-fit overflow-y-auto hide-scrollbar">
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
              value={searchCarousel}
              onChange={(e) => setSearchCarousel(e.target.value)}
              placeholder="Search Category"
              className="bg-transparent placeholder:text-gray-700 placeholder:text-base focus:outline-none text-secondary w-full"
            />
          </div>

          {/* Added Carousel */}
          <div className="space-y-10 overflow-y-auto hide-scrollbar">
            <AddedCarousel
              createEditCarousel={createEditCarousel}
              handleEditCarousel={handleEditCarousel}
              adminCarousel={adminCarousel}
              setAdminCarousel={setAdminCarousel}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCarousel;

