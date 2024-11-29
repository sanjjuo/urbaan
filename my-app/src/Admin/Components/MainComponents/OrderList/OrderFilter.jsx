import React, { useState } from 'react';
import { ImFilter } from "react-icons/im";
import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import FilterDate from '../../FilterDate/FilterDate';
import FilterCategory from '../../FilterCategory/FilterCategory';
import { FilterOrderStatus } from '../../FilterOrderStatus/FilterOrderStatus';

const OrderFilter = () => {

    return (
        <>
            <ul className="flex items-center gap-1 text-secondary">
                <li className="bg-white border-[1px] border-gray-300 rounded-full p-1 w-12 h-12 flex items-center justify-center">
                    <ImFilter />
                </li>
                <li className="bg-white font-normal text-base border-[1px] border-gray-300 rounded-xl p-1 w-24 h-12 flex items-center justify-center">Filter by</li>
                <li><FilterDate/></li>
                <li><FilterCategory/></li>
                <li><FilterOrderStatus/></li>
                <li className="bg-white cursor-pointer font-normal text-base border-[1px] border-gray-300 rounded-xl p-1 w-32 h-12 flex items-center justify-center gap-1
                     text-red-500 hover:text-primary" 
                     >
                    <PiArrowCounterClockwiseBold />
                    Reset Filter
                </li>
            </ul>
        </>
    );
};

export default OrderFilter;
