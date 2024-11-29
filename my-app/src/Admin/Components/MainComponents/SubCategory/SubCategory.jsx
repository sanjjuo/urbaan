import React, { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import CreateSubCategories from './CreateSubCategories'
import AddedSubCategories from './AddedSubCategories'
import EditSubCategories from './EditSubCategories'

const SubCategory = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [createEditSub, setCreateEditSub] = useState("createSub")

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const ImageUrl = URL.createObjectURL(file);
      setSelectedImage(ImageUrl);
    }
  };
  return (
    <>
      <h1 className="text-2xl lg:text-3xl font-semibold">Sub Categories</h1>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 mt-5">

        <div className="lg:col-span-2">
          {
            createEditSub === "createSub" ? (
              <>
                <CreateSubCategories selectedImage={selectedImage} handleImageUpload={handleImageUpload} />
              </>
            ) : (
              <>
                <EditSubCategories selectedImage={selectedImage} handleImageUpload={handleImageUpload} />
              </>
            )
          }
        </div>

        <div className="lg:col-span-4 space-y-5">
          {/* Search Bar */}
          <div className="border border-gray-300 py-1 px-2 flex items-center gap-1 rounded-xl bg-white h-12 w-96">
            <IoIosSearch className="text-gray-700 text-xl" />
            <input
              type="search"
              name="search"
              placeholder="Search Category"
              className="bg-transparent placeholder:text-gray-700 placeholder:text-base font-light focus:outline-none text-secondary w-full"
            />
          </div>

          {/* Added Sub Categories */}
          <div>
            <AddedSubCategories createEditSub={createEditSub} setCreateEditSub={setCreateEditSub}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubCategory
