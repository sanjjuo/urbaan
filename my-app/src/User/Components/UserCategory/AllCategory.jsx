import React, { useContext } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../StoreContext/StoreContext';

const categories = [
    'kurti', 'bottoms', 'Kurti Set', 'maternity wear', 'night wear',
    'running material', 'churidar material', 'Offer Zone',
    'home wear', 'duppatta', 'kids wear', 'footwear'
];

const AllCategory = () => {
    const navigate = useNavigate();
    const { setSelectedCategory, filteredByCategory } = useContext(AppContext);

    // // Handle category selection
    const handleCategory = (category) => {
        setSelectedCategory(category)
      }

    return (
        <>
            <div className="bg-white z-20 shadow-md py-4 px-4 w-full sticky top-0">
                <h1
                    className="flex items-center gap-2 text-xl font-medium cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Back
                </h1>
            </div>
            <div className="grid grid-cols-2">
                <div className="bg-white shadow-xl z-10 h-screen p-4">
                    <div className="mt-5">
                        <h1 className="font-semibold text-lg">All Categories</h1>
                        <ul className="space-y-2 mt-5">
                            {categories.map((category, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleCategory(category)}
                                    className="text-sm capitalize text-gray-600 cursor-pointer hover:text-primary"
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="bg-userBg p-2">
                        <div className="grid grid-cols-2 gap-2">
                            {filteredByCategory.length > 0 ? (
                                filteredByCategory.map((p) => (
                                    <div className="mt-5" key={p.id}>
                                        <div className="w-full h-24">
                                            <img src={p.img} alt="" className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                        <p className="text-secondary text-sm text-center capitalize truncate">{p.title}</p>
                                    </div>
                                ))
                            ) : (
                                <div className='col-span-2 flex justify-center items-center h-screen'>
                                    <p className="text-gray-500 text-xs">No products found for this category.</p>
                                </div>
                            )}
                        </div>

                    </div>
            </div>
        </>
    );
};

export default AllCategory;
