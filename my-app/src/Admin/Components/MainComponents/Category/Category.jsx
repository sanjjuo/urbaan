import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import CreateCategories from './CreateCategories';
import AddedCategories from './AddedCategories';
import EditCategories from './EditCategories';
import { RiSearch2Line } from 'react-icons/ri';

const Category = () => {
  const [createEdit, setCreateEdit] = useState("create");
  const [initialData, setInitialData] = useState(null);  // for displaying initial input fields on edit catgeory form before editing the form

  const handleEditCategory = (category) => {
    setCreateEdit('edit');
    setInitialData(category);
    console.log(category);

  };

  return (
    <>
      <h1 className="text-2xl lg:text-3xl font-semibold">Categories</h1>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 mt-5">
        {/* Create Categories Section */}
        <div className="lg:col-span-2">
          <div className="h-[calc(100vh-6rem)] overflow-y-auto hide-scrollbar">
            {
              createEdit === "create" ? (
                <>
                  <CreateCategories />
                </>
              )
                : (
                  <>
                    <EditCategories
                      initialData={initialData}
                    />
                  </>
                )
            }
          </div>
        </div>

        {/* Search and Added Categories Section */}
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
          <div className="grid lg:grid-cols-2 gap-5 h-[calc(100vh-10rem)] overflow-y-auto hide-scrollbar">
            <AddedCategories createEdit={createEdit} handleEditCategory={handleEditCategory} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
