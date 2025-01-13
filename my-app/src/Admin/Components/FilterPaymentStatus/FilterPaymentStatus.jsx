import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Menu,
  MenuHandler,
  MenuList,
  Button,
} from "@material-tailwind/react";

const paymentStatus = ["Paid", "Unpaid", "Refund", "Pending"];

export function FilterPaymentStatus({ setInvoice, resetFilter }) {
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState([]);

  useEffect(() => {
    if (resetFilter) {
      setSelectedPaymentStatus([]);
    }
  }, [resetFilter]);

  const handleApplyFilters = async () => {
    if (selectedPaymentStatus.length > 0) {
      const url = `https://urban-backend-4qsg.onrender.com/admin/invoice/filter?status=${selectedPaymentStatus.join(",")}`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setInvoice(data);
        } else {
          console.error("Error fetching filtered invoices by payment status");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  };

  const handleStatusSelect = (status) => {
    setSelectedPaymentStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <Menu>
      <MenuHandler>
        <Button className="!bg-white text-secondary rounded-xl cursor-pointer flex items-center gap-5 p-3 font-custom capitalize text-base font-normal border-gray-300 border-[1px] shadow-none focus:shadow-none">
          <div className="flex gap-1 whitespace-nowrap overflow-x-auto hide-scrollbar w-32">
            {selectedPaymentStatus.length > 0
              ? selectedPaymentStatus.join(", ")
              : "Payment Status"}
          </div>
          <ChevronDownIcon
            strokeWidth={2.5}
            className="h-3.5 w-3.5 transition-transform"
          />
        </Button>
      </MenuHandler>
      <MenuList className="rounded-2xl w-full max-w-lg p-0">
        <div className="p-5">
          <ul className="mt-5 flex flex-wrap justify-center items-center gap-2">
            {paymentStatus.map((status, index) => (
              <li
                key={index}
                onClick={() => handleStatusSelect(status)}
                className={`cursor-pointer border-[1px] border-gray-400 text-sm w-[30%] p-2 flex justify-center items-center 
                rounded-full ${
                  selectedPaymentStatus.includes(status)
                    ? "bg-primary text-white"
                    : ""
                }`}
              >
                {status}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 flex justify-center">
          <Button
            onClick={handleApplyFilters}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Apply now
          </Button>
        </div>
      </MenuList>
    </Menu>
  );
}
