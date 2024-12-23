import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../../../../StoreContext/StoreContext";
import { DeleteModal } from "../../DeleteModal/DeleteModal";
import toast from "react-hot-toast";
import AppLoader from "../../../../Loader";

const TABLE_HEAD = ["Quantity", "Delivery Charge", "Action"];

export default function AddedDelivery({ createEditDelivery, handleEditDelivery }) {
    const { BASE_URL, open, handleOpen, modalType, } = useContext(AppContext)
    const [selectedDeliveryId, setSelectedDeliveryId] = useState(null);
    const [deliveryFees, setDeliveryFees] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchDeliveryFees = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/admin/delivery-fee/view`)
                setDeliveryFees(response.data.data)
                setIsLoading(false)
                console.log(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDeliveryFees()
    })

    // handle delete
    const handleDeleteDelivery = async (deliveryId) => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.delete(`${BASE_URL}/admin/delivery-fee/delete/${deliveryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data);
            handleOpen()
            toast.success('Delivery fee is deleted')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                isLoading || deliveryFees === 0 ? (
                    <div className='col-span-2 flex justify-center items-center h-[50vh]'>
                        <AppLoader />
                    </div>
                ) : (
                    <>
                        <Card className="w-full shadow-none bg-transparent">
                            <table className="w-full table-auto text-left border-collapse">
                                <thead>
                                    <tr className="bg-white">
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
                                    {deliveryFees.map((delivery, index) => {
                                        const isLast = index === deliveryFees.length - 1;
                                        const classes = isLast ?
                                            "p-4 text-center"
                                            : "p-4 border-b border-gray-300 text-center";

                                        return (
                                            <tr key={delivery._id}>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal font-custom text-sm"
                                                    >
                                                        {delivery.quantity}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal font-custom text-sm"
                                                    >
                                                        {delivery.deliveryFee}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex justify-center gap-2 text-sm">
                                                        <button
                                                            onClick={() => { handleEditDelivery(delivery); setSelectedDeliveryId(delivery._id) }}
                                                            className={`text-buttonBg bg-editBg w-14 h-7 flex justify-center items-center rounded-md hover:bg-buttonBg 
                                            hover:text-editBg ${createEditDelivery === "edit" && selectedDeliveryId === delivery._id ? "!bg-buttonBg text-editBg" : ""}`}>
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => { handleOpen('deleteModal'); setSelectedDeliveryId(delivery._id) }}
                                                            className="text-deleteBg bg-primary/20 w-14 h-7 flex justify-center items-center rounded-md
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
                        </Card>
                    </>
                )
            }
            <DeleteModal
                open={open === "deleteModal"} // Distinguish by modalType
                handleOpen={handleOpen}
                title="Are you sure?"
                description="Do you really want to delete this delivery fee? This action cannot be undone."
                handleDelete={handleDeleteDelivery}
                deliveryId={selectedDeliveryId}
                modalType="delivery"
            />
        </>
    );
}