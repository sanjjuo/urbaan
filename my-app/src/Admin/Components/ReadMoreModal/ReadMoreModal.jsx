import React from "react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export function ReadMoreModal({ handleOpen, open, category }) {
    if (!category) return null; // Ensure item is defined

    return (
        <Dialog
            open={open}
            handler={() => handleOpen(null)}
            size="xs"
            className="fixed right-0 p-5"
            animate={{
                mount: { x: 0, y: 0 }, // Center position
                unmount: { x: 100, y: 0 }, // Move off to the right
            }}
        >
            <DialogBody className="flex flex-col justify-center items-center space-y-4">
                <div className="w-full h-32">
                    <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div>
                    <h1 className="font-bold text-2xl text-secondary capitalize">
                        {category.name}
                    </h1>
                    <p className="font-normal text-secondary capitalize">
                        {category.description}
                    </p>
                </div>
            </DialogBody>
            <DialogFooter className="flex justify-center items-center gap-1">
                <Button
                    onClick={() => handleOpen(null)}
                    className="w-32 bg-buttonBg text-white font-custom capitalize text-sm font-normal tracking-wider"
                >
                    <span>Edit</span>
                </Button>
                <Button
                    onClick={() => handleOpen(null)}
                    className="w-32 bg-primary/20 text-primary font-custom capitalize text-sm font-normal tracking-wider shadow-none hover:shadow-none"
                >
                    <span>Delete</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
