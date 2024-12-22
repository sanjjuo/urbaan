import React, { useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import CreateDelivery from './CreateDelivery';
import EditDelivery from './EditDelivery';
import AddedDelivery from './AddedDelivery';

const Delivery = () => {
    const [createEditDelivery, setCreateEditDelivery] = useState("create");
    const [initialDelivery, setInitialDelivery] = useState(null);  // for displaying initial input fields on edit catgeory form before editing the form

    const handleEditDelivery = (delivery) => {
        setCreateEditDelivery('edit');
        setInitialDelivery(delivery);
        console.log(delivery);

    };
    return (
        <>
            <h1 className="text-2xl lg:text-3xl font-semibold">Delivery</h1>
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 mt-5">
                {/* Create Categories Section */}
                <div className="lg:col-span-2">
                    <div className="h-[calc(100vh-6rem)] overflow-y-auto hide-scrollbar">
                        {
                            createEditDelivery === "create" ? (
                                <>
                                    <CreateDelivery />
                                </>
                            )
                                : (
                                    <>
                                        <EditDelivery
                                            initialDelivery={initialDelivery}
                                        />
                                    </>
                                )
                        }
                    </div>
                </div>

                {/* Search and Added Categories Section */}
                <div className="lg:col-span-4 space-y-5">
                    {/* Search Bar */}
                    <div className="border border-gray-300 py-1 px-2 flex items-center gap-1 rounded-xl bg-white h-12 w-96">
                        <RiSearch2Line className="text-gray-700 text-xl" />
                        <input
                            type="search"
                            name="search"
                            placeholder="Search Category"
                            className="bg-transparent placeholder:text-gray-700 placeholder:text-base focus:outline-none text-secondary w-full"
                        />
                    </div>

                    {/* Added Categories */}
                    <div className="h-[calc(100vh-10rem)] overflow-y-auto hide-scrollbar">
                        <AddedDelivery createEditDelivery={createEditDelivery} handleEditDelivery={handleEditDelivery} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Delivery
