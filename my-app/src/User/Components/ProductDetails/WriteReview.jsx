import { Button } from '@material-tailwind/react';
import React, { useState } from 'react'
import { IoIosArrowBack, IoMdCloudUpload } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const WriteReview = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    // image selecter
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    return (
        <>
            <div className="bg-white shadow-md py-4 px-4 w-full sticky top-0">
                <h1
                    className="flex items-center gap-5 text-xl font-medium cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Write a Review
                </h1>
            </div>
            <div className="p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-[calc(100vh-4rem)] pb-20 overflow-y-auto">
                <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 gap-5">

                    {/* Image Upload Section */}
                    <div className="flex flex-col justify-center items-center w-full xl:h-56 lg:h-56 h-44 border-4 border-dashed border-primary rounded-xl">
                        {!selectedImage ? (
                            <>
                                <input
                                    type="file"
                                    id="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="file"
                                    className="flex flex-col items-center cursor-pointer"
                                >
                                    <IoMdCloudUpload className="text-primary text-5xl" />
                                    <p className="text-secondary text-xs">Add Photo or Video</p>
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

                    {/* Review typing Section */}
                    <div className="flex flex-col justify-between h-56">
                        <h1 className="flex items-center gap-5 text-sm xl:text-xl lg:text-xl font-semibold cursor-pointer">Write your Review</h1>
                        <div className='flex-1 mt-4'>
                            <textarea
                                name="description"
                                rows="5"
                                className="w-full h-full border-2 border-gray-400 bg-transparent p-2 rounded-lg resize-none overflow-y-scroll hide-scrollbar focus:outline-none placeholder:text-xs xl:placeholder:text-sm
                                lg:placeholder:text-sm placeholder:font-light placeholder:text-gray-500"
                                placeholder="Would you like to write anything about this Product?"
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className='hidden xl:flex lg:flex justify-center mt-10'>
                    <Button className='bg-primary font-custom font-normal text-sm capitalize w-52'>Submit Review</Button>
                </div>

                <div className="bg-white shadow-md fixed bottom-0 inset-x-0 flex justify-center z-50 p-4 lg:hidden xl:hidden md:hidden">
                    <Button className="bg-primary font-custom font-normal text-sm capitalize w-full">Write a Review</Button>
                </div>
            </div>


        </>
    )
}

export default WriteReview