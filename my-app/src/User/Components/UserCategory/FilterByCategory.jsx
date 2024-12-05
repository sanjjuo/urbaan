import React from 'react'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { IoIosArrowDown } from 'react-icons/io';
import { useContext } from 'react';
import { AppContext } from '../../../StoreContext/StoreContext';
import { categories } from '../../../data';

const FilterByCategory = () => {
    const { setSelectedCategory, selectedCategory } = useContext(AppContext);

    // // Handle category selection
    const handleCategory = (category) => {
        setSelectedCategory(category)
    }

    return (
        <>
            <Menu>
                <MenuHandler>
                    <Button variant='outlined' className='w-full shadow-none font-custom flex justify-between items-center py-2 px-3 
                         border-gray-400 text-gray-600 font-medium rounded-3xl focus:outline-none'>
                        Filter by categories <span className='text-xs capitalize bg-primary px-2 text-white rounded-md
                            '>{selectedCategory}</span><IoIosArrowDown className='text-lg text-gray-400' /></Button>
                </MenuHandler>
                <MenuList className='w-72 max-h-64 rounded-xl'>
                    {
                        categories.map((category, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => handleCategory(category.catTitle)}
                                className={`text-sm font-custom capitalize font-medium text-gray-600 cursor-pointer
                                    ${selectedCategory === category.catTitle ? "text-primary" : ""}`}
                            >
                                {category.catTitle}
                            </MenuItem>
                        ))
                    }
                </MenuList>
            </Menu>
        </>
    )
}

export default FilterByCategory
