import { Card, Typography } from "@material-tailwind/react";
import { useState } from "react";

const TABLE_HEAD = ["Quantity", "Delivery Charge", "Action"];

const TABLE_ROWS = [
    {
        name: "John Michael",
        job: "Manager",
    },
    {
        name: "Alexa Liras",
        job: "Developer",
    },
    {
        name: "Laurent Perrier",
        job: "Executive",
    },
    {
        name: "Michael Levi",
        job: "Developer",
    },
    {
        name: "Richard Gran",
        job: "Manager",
    },
];

export default function AddedDelivery({ createEditDelivery, handleEditDelivery }) {
    const [selectedDeliveryId, setSelectedDeliveryId] = useState(null);
    
    return (
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
                    {TABLE_ROWS.map(({ name, job, date }, index) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast ?
                            "p-4 text-center"
                            : "p-4 border-b border-gray-300 text-center";

                        return (
                            <tr key={name}>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        className="font-normal font-custom text-sm"
                                    >
                                        {name}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        className="font-normal font-custom text-sm"
                                    >
                                        {job}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <div className="flex justify-center gap-2 text-sm">
                                        <button
                                            onClick={handleEditDelivery}
                                            className={`text-buttonBg bg-editBg w-14 h-7 flex justify-center items-center rounded-md hover:bg-buttonBg 
                                            hover:text-editBg ${createEditDelivery === "edit" ? "!bg-buttonBg text-editBg" : ""}`}>
                                            Edit
                                        </button>
                                        <button className="text-deleteBg bg-primary/20 w-14 h-7 flex justify-center items-center rounded-md
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
    );
}