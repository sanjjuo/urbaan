import React, { useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
    Menu,
    MenuHandler,
    MenuList,
    Button,
    MenuItem,
} from "@material-tailwind/react";

const months = [
    "All",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];


export default function MonthMenu() {
    const [selectedMonth, setSelectedMonth] = useState("Month");

    // Handle status selection
    const handleOrderStatusSelect = (month) => {
        setSelectedMonth(month);
    };

    // Prevent the click event from propagating to the Menu component
    const handleClickInside = (event) => {
        event.stopPropagation();
    };
    return (
        <Menu placement='bottom-end' closeOnClick={false}>
            <MenuHandler>
                <Button className="cursor-pointer flex items-center justify-between !w-64 font-custom bg-transparent text-gray-700 capitalize text-base font-normal
                border-gray-400 border-[1px] shadow-none rounded-md p-2 focus:shadow-none focus:outline-none hover:shadow-none outline-none"
                    style={{ width: 'fit-content', maxWidth: '150px' }}>
                    <div className="flex gap-1 whitespace-nowrap">
                        {selectedMonth}
                    </div>
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
                {months.map((month, index) => (
                    <MenuItem className='font-custom text-sm' key={index} onClick={(e) => {
                        handleOrderStatusSelect(month);
                        handleClickInside(e);
                    }}>
                        {month}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}