import { Button } from '@material-tailwind/react'
import React from 'react'

const EditDelivery = () => {
    return (
        <>
            <div className="bg-white rounded-xl shadow-md sticky top-5 transition-all duration-300 ease-in-out">
                <div className="p-5">
                    <h2 className="text-xl font-medium mb-3 lg:mb-0 text-secondary">Edit Delivery</h2>
                </div>
                <hr />
                <div className="p-5">
                    <form className="space-y-5"
                    // onSubmit={handleCategoryFormSubmit}
                    >
                        {/* quantity */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="font-normal text-base">Quantity</label>
                            <input
                                // value={createCategoryForm.name}
                                // onChange={handleCategoryInputChange}
                                type="number"
                                name="quantity"
                                id="quantity"
                                placeholder="Enter Quantity"
                                className="border-[1px] bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                            />
                        </div>

                        {/* quantity */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="font-normal text-base">Delivery Charge</label>
                            <input
                                // value={createCategoryForm.name}
                                // onChange={handleCategoryInputChange}
                                type="number"
                                name="delivery"
                                id="delivery"
                                placeholder="Enter Delivery Charge"
                                className="border-[1px] bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <Button type="submit" className="bg-buttonBg font-normal tracking-wider font-custom text-sm">
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditDelivery
