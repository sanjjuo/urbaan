import React, { useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
    Menu,
    MenuHandler,
    MenuList,
    Button,
} from "@material-tailwind/react";
import { useEffect } from "react";

const paymentStatus = [
    "Paid",
    "Unpaid",
    "Refund",
    "Pending"
];

export function FilterPaymentStatus({ setFilters, resetFilter }) {
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState([]);

    // Reset selected statuses when resetFilter is triggered
    useEffect(() => {
        if (resetFilter) {
            setSelectedPaymentStatus([]);
            setFilters((prevFilters) => ({
                ...prevFilters,
                status: undefined, // Reset status filter
            }));
        }
    }, [resetFilter, setFilters]);

    // Handle status selection
    const handleOrderStatusSelect = (payment) => {
        const updatesPaymentStatuses = selectedPaymentStatus.includes(payment)
            ? selectedPaymentStatus.filter((p) => p !== payment)
            : [...selectedPaymentStatus, payment]

        setSelectedPaymentStatus(updatesPaymentStatuses);

        if (updatesPaymentStatuses.length === 0) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                payment: undefined
            }))
        }
    };

    // Handle Apply now click
    const handleApplyFilters = () => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            payment: selectedPaymentStatus.length > 0 ? selectedPaymentStatus : undefined, // Update status field with selected statuses
        }));
    };

    // Prevent the click event from propagating to the Menu component
    const handleClickInside = (event) => {
        event.stopPropagation();
    };

    return (
        <Menu>
            <MenuHandler>
                <Button
                    className="!bg-white text-secondary rounded-xl cursor-pointer flex items-center gap-5 p-3 font-custom capitalize text-base font-normal
                   border-gray-300 border-[1px] shadow-none focus:shadow-none focus:outline-none hover:shadow-none outline-none"
                    style={{ width: 'fit-content', maxWidth: '200px' }}
                >
                    <div className="flex gap-1 whitespace-nowrap overflow-x-auto hide-scrollbar w-32">
                    {selectedPaymentStatus.length > 0 ? selectedPaymentStatus.join(", ") : "Payment Status"}
                    </div>
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className="h-3.5 w-3.5 transition-transform"
                    />
                </Button>
            </MenuHandler>
            <MenuList className="rounded-2xl w-full max-w-lg p-0">
                <div className="border-b-[1px] p-5 hover:outline-none focus:outline-none">
                    <h1 className="text-secondary font-semibold text-lg text-center">Select Payment Status</h1>
                    <ul className="mt-5 text-secondary flex flex-wrap justify-center items-center gap-2">
                        {paymentStatus.map((payment, index) => (
                            <li
                                key={index}
                                onClick={(e) => {
                                    handleOrderStatusSelect(payment);
                                    handleClickInside(e);  // Prevent Menu from closing
                                }}
                                className={`cursor-pointer border-[1px] border-gray-400 text-sm w-[30%] p-2 flex justify-center items-center 
                                    rounded-full ${selectedPaymentStatus.includes(payment) ? 'bg-primary text-white' : ''}`}
                            >
                                {payment}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='p-5 flex flex-col justify-center items-center gap-5 hover:outline-none focus:outline-none'>
                    <p className="text-sm">*You can choose multiple payment status</p>
                    <Button onClick={handleApplyFilters} className="bg-primary font-custom text-sm tracking-wider font-normal capitalize py-2 px-4">
                        Apply now
                    </Button>
                </div>
            </MenuList>
        </Menu>
    );
}