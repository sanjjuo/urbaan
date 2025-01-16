import React, { useState, useEffect, useContext } from 'react';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { IoIosArrowDown } from 'react-icons/io';
import { AppContext } from '../../../StoreContext/StoreContext';
import axios from 'axios';

const FilterBySubCategory = ({ categoryId, handleSubCategory }) => {
    const { BASE_URL } = useContext(AppContext);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategoryName, setSelectedSubCategoryName] = useState("All Subcategories");

    useEffect(() => {
        const fetchSubCategories = async () => {
            if (!categoryId) return;

            try {
                const response = await axios.get(`${BASE_URL}/user/subCategory/get`);
                console.log("Subcategories response:", response.data);
                // Filter subcategories based on the selected category ID
                const filterSubCategory = response.data.filter(subcat => subcat.MainCategory.id === categoryId);
                setSubCategories(filterSubCategory);
            } catch (error) {
                console.error("Error fetching subcategories:", error.response || error.message);
            }
        };

        fetchSubCategories();
    }, [categoryId]); // Re-run when the category ID changes

    const handleCategorySelection = (subCategory) => {
        setSelectedSubCategoryName(subCategory.title || "All Subcategories");
        console.log("Selected Subcategory:", subCategory); // Debugging log
        handleSubCategory(subCategory.id); // Trigger the parent handler with the subcategory ID
    };

    return (
        <Menu>
            <MenuHandler>
                <Button
                    variant="outlined"
                    className="w-full shadow-none font-custom flex justify-between items-center py-2 px-3 
                         border-gray-400 text-gray-600 font-medium rounded-3xl focus:outline-none"
                >
                    Filter by Subcategories
                    <span className="text-xs capitalize bg-primary ml-5 px-2 text-white rounded-md">
                        {selectedSubCategoryName}
                    </span>
                    <IoIosArrowDown className="text-lg text-gray-400" />
                </Button>
            </MenuHandler>
            <MenuList className="w-72 max-h-64 rounded-xl hide-scrollbar">
                {subCategories.length > 0 ? (
                    subCategories.map((subCategory) => (
                        <MenuItem
                            key={subCategory.id}
                            onClick={() => handleCategorySelection(subCategory)}
                            className="text-sm font-custom capitalize font-medium text-gray-600 cursor-pointer"
                        >
                            {subCategory.title}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem className="text-sm text-gray-500">No subcategories available</MenuItem>
                )}
            </MenuList>
        </Menu>
    );
};

export default FilterBySubCategory;
