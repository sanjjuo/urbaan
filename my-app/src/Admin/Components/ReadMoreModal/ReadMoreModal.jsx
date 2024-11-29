import React from "react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export function ReadMoreModal({ handleOpen, open, item }) {
    if (!item) return null; // Ensure item is defined

    return (
        <Dialog
            open={open}
            handler={() => handleOpen(null)}
            size="xs"
            className="fixed right-0 pt-10 px-3"
            animate={{
                mount: { x: 0, y: 0 }, // Center position
                unmount: { x: 100, y: 0 }, // Move off to the right
            }}
        >
            <DialogBody className="flex flex-col justify-center items-center space-y-4">
                <div className="w-40 h-40">
                    <img
                        src="/p1.jpg"
                        alt={item.category}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                <div className="space-y-3">
                    <div>
                        <h1 className="text-lg font-semibold text-secondary mb-2">
                            Description
                        </h1>
                        <p className="text-base leading-relaxed">
                            Sample description about the category "{item.category}".
                        </p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-secondary mb-2">
                            Sub Categories
                        </h2>
                        <ul className="list-disc px-5 text-sm space-y-1 capitalize">
                            {item.subCategories.map((sub, index) => (
                                <li key={index}>{sub}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </DialogBody>
            <DialogFooter className="flex justify-center items-center gap-1">
                <Button
                    onClick={() => handleOpen(null)}
                    className="w-40 bg-buttonBg text-white font-custom capitalize text-sm font-normal tracking-wider"
                >
                    <span>Edit</span>
                </Button>
                <Button
                    onClick={() => handleOpen(null)}
                    className="w-40 bg-primary/20 text-primary font-custom capitalize text-sm font-normal tracking-wider shadow-none hover:shadow-none"
                >
                    <span>Delete</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
