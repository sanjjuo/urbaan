import { Button } from '@material-tailwind/react'
import React from 'react'

const CreateCarousel = ({ selectedCarousel, handleCarouselUpload }) => {
    return (
        <>
            <div className='bg-white rounded-xl shadow-md sticky top-5 transition-all duration-300 ease-in-out'>
                <div className='p-5'>
                    <h2 className="text-xl font-medium mb-3 lg:mb-0 text-secondary">Create Carousel</h2>
                </div>
                <hr />
                <div className='p-5'>
                    <form action="" className='space-y-5'>
                        {/* image upload */}
                        <div>
                            <label htmlFor="" className='font-normal text-base'>Carousel Image</label>
                            <div className='w-full h-48 flex justify-center items-center border-2 rounded-xl mt-2'>
                                {!selectedCarousel ? (
                                    <>
                                        <input
                                            type="file"
                                            id="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleCarouselUpload}
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
                                        src={selectedCarousel}
                                        alt="Uploaded"
                                        className="w-full h-full rounded-lg"
                                    />
                                )}
                            </div>
                        </div>

                        {/* label */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-normal text-base'>Carousel Label</label>
                            <input type="text" name="name" id="" placeholder='Eg: Trending, New Season' className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                        </div>

                        {/* title */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-normal text-base'>Carousel Title</label>
                            <input type="text" name="name" id="" placeholder='eg: Stylish kurtis, kids Collection' className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                        </div>

                        {/* category */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-normal text-base'>Carousel Category</label>
                            <input type="text" name="name" id="" placeholder='eg:Kurti, Churidar' className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
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

export default CreateCarousel
