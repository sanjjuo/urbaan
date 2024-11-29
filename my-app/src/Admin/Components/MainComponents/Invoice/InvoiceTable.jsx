import React, { useContext } from 'react'
import { Button, Card, CardFooter, Chip, IconButton, Typography } from "@material-tailwind/react";
import { AppContext } from "../../../../StoreContext/StoreContext"
import { DeleteModal } from '../../DeleteModal/DeleteModal';

const TABLE_HEAD = ["payment ID", "Customer", "mobile", "Date", "Size", "amount", "Status", "action"];

const TABLE_ROWS = [
    {
        paymentId: "#PAY12345",
        customer: "Alex",
        mobile: "7874561232",
        date: "14 Feb 2024",
        size: "S",
        amount: "499",
        status: "unpaid"
    },
    {
        paymentId: "#PAY2468",
        customer: "Arya Nair",
        mobile: "9845687525",
        date: "14 march 2024",
        size: "M",
        amount: "1299",
        status: "refund"
    },
    {
        paymentId: "#PAY6789",
        customer: "kavya",
        mobile: "6879452531",
        date: "14 sep 2024",
        size: "XL",
        amount: "2999",
        status: "paid"
    },
    {
        paymentId: "#PAY1357",
        customer: "asif ali",
        mobile: "9025861543",
        date: "14 oct 2024",
        size: "XXL",
        amount: "2399",
        status: "paid"
    },
];

const InvoiceTable = () => {
    const { open, handleOpen } = useContext(AppContext)
    return (
        <>
            <Card className="h-full w-full shadow-none bg-transparent">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr className='bg-white'>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 p-4"
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
                        {TABLE_ROWS.map((item, index) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            className="font-normal font-custom text-sm"
                                        >
                                            {item.paymentId}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            className="font-normal capitalize font-custom text-sm"
                                        >
                                            {item.customer}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            className="font-normal font-custom text-sm"
                                        >
                                            {item.mobile}
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
                                            {item.size}
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
                                            className={`
                                                ${item.status === "unpaid" ? "text-processingBg bg-processingBg/20 capitalize text-sm text-center font-normal" : ""}
                                                ${item.status === "paid" ? "text-shippedBg bg-shippedBg/20 capitalize text-sm text-center font-normal" : ""}
                                                ${item.status === "refund" ? "text-pendingBg bg-pendingBg/20 capitalize text-sm text-center font-normal" : ""}
                                                ${!["unpaid", "paid", "refund"].includes(item.status) ? "text-gray-500 bg-gray-200 capitalize text-sm text-center font-normal" : ""}
                                                    `}
                                            value={
                                                item.status === "unpaid" ? "unpaid" :
                                                    item.status === "paid" ? "paid" :
                                                        item.status === "refund" ? "refund" : "Unknown"
                                            }

                                        />
                                    </td>
                                    <td className={classes}>
                                        <div className="flex gap-2 text-sm">
                                            <button className="text-buttonBg bg-editBg w-14 h-7 flex justify-center items-center rounded-md
                                            hover:bg-buttonBg hover:text-editBg">
                                                Edit
                                            </button>
                                            <button onClick={() => handleOpen("deleteModal")} className="text-deleteBg bg-primary/20 w-14 h-7 flex justify-center items-center rounded-md
                                            hover:bg-primary hover:text-white">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Button variant="outlined" size="sm" className='font-custom border-gray-300 font-normal capitalize 
                    text-sm cursor-pointer hover:bg-black hover:text-white'>
                        Prev. Page
                    </Button>
                    <div className="flex items-center gap-2">
                        <IconButton variant="outlined" size="sm">
                            1
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            2
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            3
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            ...
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            8
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            9
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            10
                        </IconButton>
                    </div>
                    <Button variant="outlined" size="sm" className='font-custom border-gray-300 font-normal capitalize text-sm 
                    cursor-pointer hover:bg-black hover:text-white'>
                        Next Page
                    </Button>
                </CardFooter>
            </Card>
            <DeleteModal
                open={open === "deleteModal"}
                handleOpen={handleOpen}
                title="Are you sure ?"
                description="Do you really want to delete this item? This action cannot be undone."
            />
        </>
    )
}

export default InvoiceTable