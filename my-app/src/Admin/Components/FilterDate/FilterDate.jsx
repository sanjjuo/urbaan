import React, { useState } from "react";
import {
    Menu,
    MenuHandler,
    MenuList,
    Button,
} from "@material-tailwind/react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function FilterDate() {
    const [selectedDate, setSelectedDate] = useState([]);

    // Format the selected dates to display on the button
    const formattedDates = selectedDate.length > 0
        ? selectedDate.slice(0, 3).map(date => format(date, "PP")).join(", ")
        : "14 Feb 2024";

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        // Prevent the menu from closing when a date is selected
        event.stopPropagation();
    };

    return (
        <Menu closeOnClick={false}>
            <MenuHandler>
                <Button
                    className="!bg-white text-secondary rounded-xl cursor-pointer flex items-center gap-5 p-3 font-custom capitalize text-base font-normal
                   border-gray-300 border-[1px] shadow-none focus:shadow-none focus:outline-none hover:shadow-none outline-none"
                    style={{ width: 'fit-content', maxWidth: '150px' }}
                >
                    <div className="flex gap-1 whitespace-nowrap">
                        {formattedDates}
                    </div>
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className="h-3.5 w-3.5 transition-transform"
                    />
                </Button>
            </MenuHandler>
            <MenuList className="rounded-2xl p-0">
                <div className="border-b-[1px] py-1 px-4 hover:outline-none focus:outline-none">
                    <DayPicker
                        mode="multiple"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        styles={{
                            root: { fontSize: '1.1rem' }, // Smaller text size
                            day: { padding: '0.25rem' },    // Reduce day button size
                            month: { padding: '0rem' },  // Reduce padding inside the month view
                        }} 
                        classNames={{
                            caption: 'text-xs font-semibold', // Smaller caption text
                            day: 'p-1 text-base hover:bg-gray-200 focus:bg-primary', // Adjust day styles
                        }}
                    />
                </div>
                <div className='p-4 flex flex-col justify-center items-center gap-5 hover:outline-none focus:outline-none'>
                    <p className="text-sm">*You can choose multiple dates</p>
                    <Button className="bg-primary font-custom text-sm tracking-wider font-normal capitalize py-2 px-4">
                        Apply now
                    </Button>
                </div>
            </MenuList>
        </Menu>
    );
}
