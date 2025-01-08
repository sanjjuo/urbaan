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

const FilterByCategory = ({ productsCategory, handleCategory }) => {
    const { BASE_URL } = useContext(AppContext);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryName, setSelectedCategoryName] = useState(productsCategory.name); // Initialize with current category name

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/category/get`);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error.response || error.message);
                alert("Failed to load categories.");
            }
        };

        fetchCategories();
    }, []);

    const handleCategorySelection = (category) => {
        setSelectedCategoryName(category.name); // Update button label
        handleCategory(category.id); // Trigger parent handler with category ID
    };

    return (
        <Menu>
            <MenuHandler>
                <Button
                    variant="outlined"
                    className="w-full shadow-none font-custom flex justify-between items-center py-2 px-3 
                         border-gray-400 text-gray-600 font-medium rounded-3xl focus:outline-none"
                >
                    Filter by categories 
                    <span className="text-xs capitalize bg-primary ml-5 px-2 text-white rounded-md">
                        {selectedCategoryName}
                    </span>
                    <IoIosArrowDown className="text-lg text-gray-400" />
                </Button>
            </MenuHandler>
            <MenuList className="w-72 max-h-64 rounded-xl hide-scrollbar">
                {categories.map((category) => (
                    <MenuItem
                        key={category.id}
                        onClick={() => handleCategorySelection(category)} // Pass category object
                        className="text-sm font-custom capitalize font-medium text-gray-600 cursor-pointer"
                    >
                        {category.name}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};

export default FilterByCategory;
