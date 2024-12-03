import React, { useContext, useState } from "react";
import {
    Drawer,
    Button,
    Typography,
    Checkbox,
} from "@material-tailwind/react";
import { AppContext } from "../../../StoreContext/StoreContext";

const filters = {
    Price: [
        "Under ₹100",
        "₹100 - ₹250",
        "₹250 - ₹500",
        "₹500 - ₹750",
        "₹750 - ₹1000",
        "₹1000 - ₹1500",
        "₹1500 - ₹2000",
        "₹2000 - ₹3000",
    ],
    Fabric: [
        "cotton",
        "semi silk",
        "linen",
        "modal",
        "rayon",
        "khadi",
        "chikankari",
        "hakoba",
        "digital prints",
        "solid colors",
        "hand block prints",
        "chanderi silk",
        "denim",
        "orgenza",
        "creap",
        "georgette",
    ],
    Style: [
        "straight cut kurti",
        "a-line kurti",
        "kaftan style kurti",
        "collar kurti",
        "embroidery kurti",
        "short kurti",
    ],
    Size: [
        "S(36)",
        "M(38)",
        "L(40)",
        "XL(42)",
        "2XL(44)",
        "3XL(46)",
        "4XL(48)",
        "5XL(50)",
    ],
};

export function ViewCategoryDrawer() {
    const { openBottomDrawer, handleCloseBottomDrawer } = useContext(AppContext);
    const [filterBy, setFilterBy] = useState("Price");

    return (
        <>
            <Drawer
                open={openBottomDrawer}
                onClose={handleCloseBottomDrawer}
                className="rounded-t-3xl overflow-y-scroll"
                placement="bottom"
                size={850}
            >
                <div className="grid grid-flow-col h-full">
                    {/* Left Side */}
                    <div className="col-span-1 bg-white shadow-lg flex flex-col p-4 rounded-tl-3xl">
                        <Typography className="font-custom text-lg font-medium">
                            Filters
                        </Typography>
                        <ul className="mt-5 space-y-3">
                            {Object.keys(filters).map((label) => (
                                <li
                                    key={label}
                                    onClick={() => setFilterBy(label)}
                                    className={`text-xs cursor-pointer ${filterBy === label
                                            ? "text-secondary font-medium font-custom"
                                            : "text-gray-600 font-custom"
                                        }`}
                                >
                                    Filter by {label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Side */}
                    <div className="col-span-2 bg-gray-100 flex flex-col p-4 rounded-tr-3xl">
                        <ul className="-space-y-2">
                            {filters[filterBy]?.map((item, index) => (
                                <li key={index}>
                                    <Checkbox
                                        label={
                                            <Typography className="text-secondary capitalize text-xs font-normal font-custom">
                                                {item}
                                            </Typography>
                                        }
                                        color="pink"
                                        className="border-2 border-primary rounded-sm w-4 h-4"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Buttons */}
                <div className="fixed bottom-0 w-full bg-white shadow-2xl p-4">
                    <div className="flex justify-center items-center gap-3">
                        <Button
                            variant="outlined"
                            className="py-2 w-full text-xs font-custom font-normal capitalize"
                        >
                            Clear All
                        </Button>
                        <Button className="bg-primary border-2 border-primary py-2 w-full text-xs font-custom font-normal capitalize">
                            Apply
                        </Button>
                    </div>
                </div>
            </Drawer>
        </>
    );
}
