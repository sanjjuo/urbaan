import React, { useState } from 'react';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const places = ["All","Kerala", "Tamil Nadu", "Banglore", "Delhi", "Mumbai", "Chennai", "Goa", "Hyderabad" ,"Manali", "Pune"]

export function PlaceMenu() {
    const [selectedPlace, setSelectedPlace] = useState("Place"); // Track selected place

    const handleMenuItemClick = (place) => {
        setSelectedPlace(place); // Update selected place
    };

    return (
        <Menu placement="bottom-end">
            <MenuHandler>
                <Button className="cursor-pointer flex items-center justify-between !w-64 font-custom bg-transparent text-gray-700 capitalize text-base font-normal
                border-gray-400 border-[1px] shadow-none rounded-md p-2 focus:shadow-none focus:outline-none hover:shadow-none outline-none"
                style={{ width: 'fit-content', maxWidth: '150px' }}
                >
                    {selectedPlace} {/* Display selected place */}
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className="h-3.5 w-3.5 transition-transform"
                    />
                </Button>
            </MenuHandler>
            <MenuList
                className="rounded-2xl p-0 max-h-40 overflow-y-scroll"
                style={{ width: "fit-content" }}
            >
                {places.map((place) => (
                    <MenuItem 
                        key={place}
                        onClick={() => handleMenuItemClick(place)} 
                        className="font-custom text-sm"
                    >
                        {place}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}
