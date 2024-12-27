import React, { useContext } from 'react'
import { Button, Card, CardBody, CardFooter, Chip, IconButton, Typography } from "@material-tailwind/react";
import { AppContext } from "../../../../StoreContext/StoreContext"
import { DeleteModal } from '../../DeleteModal/DeleteModal';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AppLoader from '../../../../Loader';

const TABLE_HEAD = ["payment ID", "Customer", "mobile", "Date", "Size", "amount", "Status", "action"];

const InvoiceTable = ({ invoice, setInvoice }) => {
    const { BASE_URL } = useContext(AppContext)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(true)
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null)


    // fetch invoice
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(`${BASE_URL}/admin/invoice/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setInvoice(response.data)
                setIsLoading(false)
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchInvoices()
    }, [])



    // Get current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInvoice = invoice.slice(indexOfFirstItem, indexOfLastItem);


    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle next and prev page
    const handleNextPage = () => {
        if (currentPage < Math.ceil(invoice.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            {
                isLoading || invoice.length === 0 ? (
                    <div className='col-span-2 flex justify-center items-center h-[50vh]'>
                        <AppLoader />
                    </div>
                ) : (
                    <>
                        <Card className="w-full shadow-sm rounded-xl bg-white border-[1px]">
                            <CardBody>
                                <table className="w-full min-w-max table-auto text-left">
                                    <thead>
                                        <tr className='bg-quaternary'>
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
                                        {Array.isArray(currentInvoice) && currentInvoice.map((invoice, index) => {
                                            const isLast = index === currentInvoice.length - 1;
                                            const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

                                            return (
                                                <tr key={invoice._id}>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal font-custom text-sm uppercase"
                                                        >
                                                            {invoice.paymentId}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal capitalize font-custom text-sm"
                                                        >
                                                            {invoice.customerName}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal capitalize font-custom text-sm"
                                                        >
                                                            {invoice.customerMobile}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal font-custom text-sm"
                                                        >
                                                            {invoice.date}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal capitalize font-custom text-sm"
                                                        >
                                                            {invoice.products[0].size}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal font-custom text-sm"
                                                        >
                                                            ₹{invoice.totalAmount}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Chip
                                                            className={`
                                                ${invoice.status === "Cancelled" ? "text-processingBg bg-processingBg/20 capitalize text-sm text-center font-normal" : ""}
                                                ${invoice.status === "Delivered" ? "text-shippedBg bg-shippedBg/20 capitalize text-sm text-center font-normal" : ""}
                                                ${invoice.status === "Pending" ? "text-pendingBg bg-pendingBg/20 capitalize text-sm text-center font-normal" : ""}
                                                ${!["Cancelled", "Delivered", "Pending"].includes(invoice.status) ? "text-gray-500 bg-gray-200 capitalize text-sm text-center font-normal" : ""}
                                                    `}
                                                            value={
                                                                invoice.status === "Cancelled" ? "Cancelled" :
                                                                    invoice.status === "Delivered" ? "Delivered" :
                                                                        invoice.status === "Pending" ? "Pending" : "Unknown"
                                                            }

                                                        />
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="flex gap-2 text-sm">
                                                            <button className="text-buttonBg bg-editBg w-14 h-7 flex justify-center items-center rounded-md
                                            hover:bg-buttonBg hover:text-editBg">
                                                                Edit
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </CardBody>
                            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    className='font-custom border-gray-300 font-normal capitalize text-sm cursor-pointer hover:bg-black hover:text-white'
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                >
                                    Prev. page
                                </Button>

                                <div className="flex items-center gap-2">
                                    {[...Array(Math.ceil(invoice.length / itemsPerPage))].map((_, index) => (
                                        <IconButton key={index} variant="text" size="sm" onClick={() => paginate(index + 1)}>
                                            {index + 1}
                                        </IconButton>
                                    ))}
                                </div>

                                <Button
                                    variant="outlined"
                                    size="sm"
                                    className='font-custom border-gray-300 font-normal capitalize text-sm cursor-pointer hover:bg-black hover:text-white'
                                    onClick={handleNextPage}
                                    disabled={currentPage === Math.ceil(invoice.length / itemsPerPage)}
                                >
                                    Next page
                                </Button>
                            </CardFooter>
                        </Card>
                    </>
                )
            }
        </>
    )
}

export default InvoiceTable