import React from 'react'
import {
    Card,
    Typography,
    CardBody,
    Chip,
} from "@material-tailwind/react";
import MonthMenu from './MonthMenu';

const TABLE_HEAD = ["Product Name", "Location", "Date", "Piece", "Amount", "Status"];

const ORDERS = [
    {
        img: "/p1.jpg",
        product: "Stylish Crop Top",
        location: "Texas",
        date: "23/04/18",
        piece: "423",
        amount: "395",
        status: "delivered", // Updated status
    },
    {
        img: "/p2.jpg",
        product: "Violet Crop Top",
        location: "California",
        date: "10/04/24",
        piece: "423",
        amount: "600",
        status: "pending", // Updated status
    },
    {
        img: "/p3.jpg",
        product: "Traditional Kurti",
        location: "California",
        date: "10/04/24",
        piece: "423",
        amount: "600",
        status: "cancelled", // Updated status
    },
];

const RecentOrders = () => {
    return (
        <>
            <Card className="w-full p-10">
                <div>
                    <ul className='flex items-center justify-between'>
                        <li className="text-2xl font-medium text-secondary">Recent Orders</li>
                        <li><MonthMenu /></li>
                    </ul>
                </div>
                <CardBody className="p-0 mt-10">
                    <table className="w-full table-auto text-left border-collapse">
                        <thead className='bg-quaternary'>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-b border-gray-300 p-4 text-center"
                                    >
                                        <Typography
                                            variant="small"
                                            className="font-semibold font-custom text-secondary text-base uppercase"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {ORDERS.map(
                                (item, index) => {
                                    const isLast = index === ORDERS.length - 1;
                                    const classes = isLast
                                        ? "p-4 text-center"
                                        : "p-4 border-b border-gray-300 text-center";

                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-2">
                                                    <div className='w-[60px] h-[60px] rounded-md'>
                                                        <img src={item.img} alt={item.product} className='w-full h-full object-cover rounded-md' />
                                                    </div>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal font-custom text-sm"
                                                    >
                                                        {item.product}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    className="font-normal font-custom text-sm"
                                                >
                                                    {item.location}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    className="font-normal font-custom text-sm"
                                                >
                                                    {item.date}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    className="font-normal font-custom text-sm"
                                                >
                                                    {item.piece}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    className="font-normal font-custom text-sm"
                                                >
                                                    ₹{item.amount}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Chip
                                                    className={`capitalize text-sm text-center font-normal ${item.status === "delivered"
                                                            ? "text-deliveredBg bg-deliveredBg/20"
                                                            : item.status === "processing"
                                                                ? "text-processingBg bg-processingBg/20"
                                                                : item.status === "cancelled"
                                                                    ? "text-cancelBg bg-cancelBg/20"
                                                                    : item.status === "pending"
                                                                        ? "text-pendingBg bg-pendingBg/20"
                                                                        : item.status === "shipped"
                                                                            ? "text-shippedBg bg-shippedBg/20"
                                                                            : "text-gray-500 bg-gray-200"
                                                        }`}
                                                    value={item.status}
                                                />
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </>
    )
}

export default RecentOrders
