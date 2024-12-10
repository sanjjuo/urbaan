import React, { useState } from 'react'
import CreateSubCategories from './CreateSubCategories'
import AddedSubCategories from './AddedSubCategories'
import EditSubCategories from './EditSubCategories'
import { RiSearch2Line } from 'react-icons/ri'

const SubCategory = () => {
  const [createEditSub, setCreateEditSub] = useState("createSub");
  const [initialSubCategory, setInitialSubCategory] = useState(null);
  
  const handleEditCategory = (category) => {
    setCreateEditSub('editSub');
    setInitialSubCategory(category);
    console.log(category);
    
  };

  return (
    <>
      <h1 className="text-2xl lg:text-3xl font-semibold">Sub Categories</h1>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 mt-5">

        <div className="lg:col-span-2">
        <div className="h-[calc(100vh-6rem)] overflow-y-auto hide-scrollbar">
          {
            createEditSub === "createSub" ? (
              <>
                <CreateSubCategories />
              </>
            ) : (
              <>
                <EditSubCategories initialSubCategory={initialSubCategory} />
              </>
            )
          }
          </div>
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

          {/* Added Sub Categories */}
          <div className="h-[calc(100vh-10rem)] overflow-y-auto hide-scrollbar">
            <AddedSubCategories createEditSub={createEditSub} handleEditCategory={handleEditCategory}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubCategory
