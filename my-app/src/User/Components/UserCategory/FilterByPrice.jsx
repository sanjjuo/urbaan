import React, { useState } from 'react';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { IoIosArrowDown } from 'react-icons/io';
import Slider from '@mui/material/Slider';

const FilterByPrice = () => {
    const [priceRange, setPriceRange] = useState([50, 200]);

    const handlePriceChange = (event, newValue) => {
        // Ensure that the maximum price does not go below the minimum price
        if (newValue[0] <= newValue[1]) {
            setPriceRange(newValue);
        }
    };

    return (
        <>
            <Menu>
                <MenuHandler>
                    <Button
                        variant='outlined'
                        className='w-full shadow-none font-custom flex justify-between items-center py-2 px-3 
                        border-gray-400 text-gray-600 font-medium rounded-3xl focus:outline-none'
                    >
                        Filter by price
                        <IoIosArrowDown className='text-lg text-gray-400' />
                    </Button>
                </MenuHandler>
                <MenuList className='w-72 max-h-64 rounded-xl p-4'>
                    <MenuItem className="p-2 hover:!bg-transparent focus:!bg-transparent">
                        <div className='text-gray-800 font-medium mb-4'>Price Range</div>
                        <Slider
                            size='small'
                            value={priceRange}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={500}
                            valueLabelFormat={(value) => `₹${value}`}
                        />
                        <div className='flex items-center justify-between'>
                            <div className='text-sm text-gray-800 mt-2'>
                                Selected: ₹{priceRange[0]} - ₹{priceRange[1]}
                            </div>
                            <Button className='bg-primary text-white font-custom text-sm capitalize font-normal py-1 px-5 opacity-100 shadow-none'>Filter</Button>
                        </div>
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
};

export default FilterByPrice;
