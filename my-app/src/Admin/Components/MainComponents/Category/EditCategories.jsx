import { Button } from '@material-tailwind/react'
import React from 'react'

const EditCategories = ({ selectedImage, handlImageUpload }) => {
    return (
        <>
            <div className='bg-white rounded-xl shadow-md sticky top-5 transition-all duration-300 ease-in-out'>
                <div className='p-5'>
                    <h2 className="text-xl font-medium mb-3 lg:mb-0 text-secondary">Edit Categories</h2>
                </div>
                <hr />
                <div className='p-5'>
                    <form action="" className='space-y-5'>
                        {/* title */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-normal text-base'>Category title</label>
                            <input type="text" name="name" id="" placeholder='Other Accessories' className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                        </div>

                        {/* image upload */}
                        <div>
                            <label htmlFor="" className='font-normal text-base'>Image</label>
                            <div className='w-full h-48 flex justify-center items-center border-2 rounded-xl mt-2'>
                                {!selectedImage ? (
                                    <>
                                        <input
                                            type="file"
                                            id="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handlImageUpload}
                                        />
                                        <label
                                            htmlFor="file"
                                            className="flex flex-col items-center cursor-pointer"
                                        >
                                            <img src="/imgupload.png" alt="" className='w-16' />
                                            <p className="text-secondary text-xs">Browse files to upload</p>
                                        </label>
                                    </>
                                ) : (
                                    <img
                                        src={selectedImage}
                                        alt="Uploaded"
                                        className="w-full h-full rounded-lg"
                                    />
                                )}
                            </div>
                        </div>
                        {/* description */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-normal text-base'>Product Description</label>
                            <textarea
                                name="description"
                                rows="5"
                                className="w-full border-[1px] bg-gray-100/50 p-2 rounded resize-none overflow-y-scroll focus:outline-none
                                        placeholder:text-sm placeholder:font-light placeholder:text-gray-500"
                                placeholder="Enter your description here..."
                                style={{ maxHeight: '150px' }}
                            ></textarea>
                        </div>

                        {/* button */}
                        <div className='flex justify-end'>
                            <Button className='bg-buttonBg font-normal tracking-wider font-custom text-sm'>Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditCategories
