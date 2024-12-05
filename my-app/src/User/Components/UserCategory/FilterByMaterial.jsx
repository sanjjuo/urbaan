import React from 'react'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { IoIosArrowDown } from 'react-icons/io';


// material
const materials = ["cotton", "slub silk"]

const FilterByMaterial = () => {
    return (
        <>
            <Menu>
                <MenuHandler>
                    <Button variant='outlined' className='w-full shadow-none font-custom flex justify-between items-center py-2 px-3 
                         border-gray-400 text-gray-600 font-medium rounded-3xl focus:outline-none'>
                        Filter by material<IoIosArrowDown className='text-lg text-gray-400' /></Button>
                </MenuHandler>
                <MenuList className='w-72 max-h-64 rounded-xl'>
                    {
                        materials.map((material,index) => (
                            <MenuItem 
                            key={index}
                            className='capitalize font-medium font-custom text-gray-600 cursor-pointer'
                            >
                                {material}</MenuItem>
                        ))
                    }
                </MenuList>
            </Menu>
        </>
    )
}

export default FilterByMaterial
