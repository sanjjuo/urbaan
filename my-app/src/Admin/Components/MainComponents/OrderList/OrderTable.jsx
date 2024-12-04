import React, { useState } from 'react';
import { Button, Card, CardFooter, Chip, IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

const TABLE_HEAD = ["ID", "Customer", "Address", "Delivery Date", "Product", "Size", "Payment", "Status", "Action"];

const initialRows = [
  { id: "0001", customer: "Alex", address: "089 Kutch Green Apt.448", deliveryDate: "14 Feb 2024", product: "Kurti", size: "S", payment: "COD", status: "delivered" },
  { id: "0002", customer: "Christina", address: "089 Ernakulam Apt.448", deliveryDate: "14 June 2024", product: "Bottom", size: "XL", payment: "Razorpay", status: "processing" },
  { id: "0003", customer: "John", address: "089 Malappuram Apt.448", deliveryDate: "26 Aug 2024", product: "Night Wear", size: "L", payment: "Razorpay", status: "cancelled" },
  { id: "0004", customer: "Lakshmi", address: "089 Trivandrum Apt.448", deliveryDate: "06 Sep 2024", product: "Jeans", size: "M", payment: "COD", status: "shipped" },
  { id: "0005", customer: "Seetha", address: "089 Kozhikode Apt.448", deliveryDate: "14 Nov 2024", product: "Kurti", size: "2XL", payment: "card", status: "pending" },
];

const OrderTable = () => {
  const [rows, setRows] = useState(initialRows);

  // Handle status update
  const handleStatusChange = (id, newStatus) => {
    const updatedRows = rows.map(row => row.id === id ? { ...row, status: newStatus } : row);
    setRows(updatedRows);
  };

  // Status colors
  const statusColors = {
    delivered: "text-deliveredBg bg-deliveredBg/20",
    processing: "text-processingBg bg-processingBg/20",
    cancelled: "text-cancelBg bg-cancelBg/20",
    pending: "text-pendingBg bg-pendingBg/20",
    shipped: "text-shippedBg bg-shippedBg/20",
    default: "text-gray-500 bg-gray-200",
  };

  return (
    <>
      <Card className="w-full shadow-none bg-transparent">
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className='bg-white'>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 p-4 text-center"
                >
                  <Typography
                    variant="small"
                    className="font-semibold font-custom text-secondary leading-none text-base uppercase"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((item, index) => {
              const isLast = index === rows.length - 1;
              const classes = isLast ? "p-4 text-center" : "p-4 border-b border-gray-300 text-center";

              return (
                <tr key={item.id}>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal font-custom text-sm">{item.id}</Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal font-custom text-sm">{item.customer}</Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal font-custom text-sm">{item.address}</Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal font-custom text-sm">{item.deliveryDate}</Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal font-custom text-sm">{item.product}</Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal font-custom text-sm">{item.size}</Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal font-custom text-sm">{item.payment}</Typography>
                  </td>
                  <td className={classes}>
                    <Chip
                      className={`capitalize text-sm text-center font-normal ${statusColors[item.status] || statusColors.default}`}
                      value={item.status}
                    />
                  </td>
                  <td className={classes}>
                    <Menu placement="bottom-end" className='outline-none'>
                      <MenuHandler>
                        <IconButton variant="text">
                          <HiOutlineDotsHorizontal className='text-primary text-2xl cursor-pointer' />
                        </IconButton>
                      </MenuHandler>
                      <MenuList>
                        {["pending", "processing", "shipped", "delivered", "cancelled"].map((statusOption) => (
                          <MenuItem
                            key={statusOption}
                            onClick={() => handleStatusChange(item.id, statusOption)} // Update status
                            className={`font-custom ${statusColors[statusOption]?.split(" ")[0]} hover:!text-buttonBg`}
                          >
                            {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)} {/* Capitalize */}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button variant="outlined" size="sm" className='font-custom border-gray-300 font-normal capitalize text-sm cursor-pointer hover:bg-black hover:text-white'>
            Prev. Date
          </Button>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 8, 9, 10].map((page, i) => (
              <IconButton key={i} variant={page === 1 ? "outlined" : "text"} size="sm">
                {page}
              </IconButton>
            ))}
          </div>
          <Button variant="outlined" size="sm" className='font-custom border-gray-300 font-normal capitalize text-sm cursor-pointer hover:bg-black hover:text-white'>
            Next Date
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default OrderTable;
