import React from "react";
import {
    Button,
    Dialog,
    DialogBody,
    Typography,
} from "@material-tailwind/react";

export function DeleteModal({ open, handleOpen, title, description }) {
    return (
        <Dialog open={open} handler={handleOpen} size="sm" className="rounded-none">
            <DialogBody className="flex flex-col justify-center items-center py-8 px-10 space-y-5">
                <div className="w-12 h-12">
                    <img src="/close.png" alt="" className="w-full h-full object-cover" />
                </div>
                <Typography className="font-custom text-2xl text-secondary font-semibold">
                    {title}
                </Typography>
                <Typography className="font-custom text-base text-gray-500 font-light text-center">
                    {description}
                </Typography>
                <div className="flex items-center space-x-2">
                    <Button
                        className="bg-gray-300 text-black font-custom capitalize text-sm tracking-wider font-normal w-36"
                        onClick={handleOpen}
                    >
                        Close
                    </Button>
                    <Button
                        className="bg-deleteBg text-white font-custom capitalize text-sm tracking-wider font-normal w-36"
                        onClick={handleOpen}
                    >
                        Delete
                    </Button>
                </div>
            </DialogBody>
        </Dialog>
    );
}
