import { Button } from '@material-tailwind/react';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaCircle } from "react-icons/fa";

const EditProduct = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [color, setColor] = useState("#FFFFFF");
    const [showColorPicker, setShowColorPicker] = useState(false);

    // image selecter
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    // color selecter
    const handleColorSelecter = (e) => {
        setColor(e.target.value);
    }

    // to hide input defualt color picker
    const toggleColorPicker = () => {
        setShowColorPicker(!showColorPicker); // toggle visibility of color picker
    };

    return (
        <>
            <h1 className='text-2xl lg:text-3xl font-semibold'>Edit Product</h1>
            <div className="grid lg:grid-cols-2 gap-10 mt-5">
                <div className='bg-white rounded-xl shadow-md'>
                    <div className='p-5'>
                        <h2 className="text-xl font-medium mb-3 lg:mb-0 text-secondary">Product Information</h2>
                    </div>
                    <hr />
                    <div className='p-5'>
                        <form action="" className='space-y-5'>
                            {/* title */}
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="" className='font-normal text-base'>Product title</label>
                                <input type="text" name="name" id="" placeholder='Enter Product title' className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                            </div>
                            {/* category */}
                            <div className='flex justify-between items-center gap-2'>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label className='font-normal text-base'>Product Category</label>
                                    <select
                                        name="selectField"
                                        className="w-full text-sm text-gray-500 font-light bg-gray-100/50 border p-2 rounded focus:outline-none focus:cursor-pointer"
                                    >
                                        <option value="Option 1">Kurti</option>
                                        <option value="Option 2">Maternity Wear</option>
                                        <option value="Option 3">Bottom</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label className='font-normal text-base'>Sub Category</label>
                                    <select
                                        name="selectField"
                                        className="w-full text-sm text-gray-500 font-light bg-gray-100/50 border p-2 rounded focus:outline-none focus:cursor-pointer"
                                    >
                                        <option value="Option 1">Ethnic Wear</option>
                                        <option value="Option 2">Comfy Wear</option>
                                        <option value="Option 3">Ethnic Wear</option>
                                    </select>
                                </div>
                            </div>
                            {/* price */}
                            <div className='flex justify-between items-center gap-2'>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label className='font-normal text-base'>Actual Price</label>
                                    <select
                                        name="selectField"
                                        className="w-full text-sm text-gray-500 font-light bg-gray-100/50 border p-2 rounded focus:outline-none focus:cursor-pointer"
                                    >
                                        <option value="Option 1">Rs. 1000</option>
                                        <option value="Option 2">Rs. 2500</option>
                                        <option value="Option 3">Rs. 500</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label className='font-normal text-base'>Discount (%)</label>
                                    <select
                                        name="selectField"
                                        className="w-full text-sm text-gray-500 font-light bg-gray-100/50 border p-2 rounded focus:outline-none focus:cursor-pointer"
                                    >
                                        <option value="Option 1">50%</option>
                                        <option value="Option 2">25%</option>
                                        <option value="Option 3">15%</option>
                                    </select>
                                </div>
                            </div>
                            {/* offer price */}
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="" className='font-normal text-base'>Offer Price</label>
                                <input type="text" name="name" id="" placeholder='Rs. 500' className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
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
                        </form>
                    </div>
                </div>

                {/* second col */}

                {/* photo upload */}
                <div className='bg-white rounded-xl shadow-md p-5 space-y-5'>
                    <div className='flex gap-5'>
                        <div className="flex flex-col justify-center items-center w-72 h-44 border-4 border-dashed border-primary rounded-xl">
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

                        <ul className='flex-1 space-y-2'>
                            <li className='flex items-center justify-between bg-primary/15 rounded-md p-1'>
                                <div className='w-[30px] h-[30px]'>
                                    <img src="/p1.jpg" alt="" className='w-full h-full object-cover rounded-md shadow-md' />
                                </div>
                                <p className='text-secondary font-normal text-xs'>Stylish Crop top</p>
                                <MdDelete className='text-deleteBg text-lg cursor-pointer hover:text-primary' />
                            </li>
                            <li className='flex items-center justify-between bg-primary/15 rounded-md p-1'>
                                <div className='w-[30px] h-[30px]'>
                                    <img src="/p1.jpg" alt="" className='w-full h-full object-cover rounded-md shadow-md' />
                                </div>
                                <p className='text-secondary font-normal text-xs'>Stylish Crop top</p>
                                <MdDelete className='text-deleteBg text-lg cursor-pointer hover:text-primary' />
                            </li>
                            <li className='flex items-center justify-between bg-primary/15 rounded-md p-1'>
                                <div className='w-[30px] h-[30px]'>
                                    <img src="/p1.jpg" alt="" className='w-full h-full object-cover rounded-md shadow-md' />
                                </div>
                                <p className='text-secondary font-normal text-xs'>Stylish Crop top</p>
                                <MdDelete className='text-deleteBg text-lg cursor-pointer hover:text-primary' />
                            </li>
                            <li className='flex items-center justify-between bg-primary/15 rounded-md p-1'>
                                <div className='w-[30px] h-[30px]'>
                                    <img src="/p1.jpg" alt="" className='w-full h-full object-cover rounded-md shadow-md' />
                                </div>
                                <p className='text-secondary font-normal text-xs'>Stylish Crop top</p>
                                <MdDelete className='text-deleteBg text-lg cursor-pointer hover:text-primary' />
                            </li>
                        </ul>
                    </div>

                    {/* manufacter name */}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className='font-normal text-base'>Manufacturer Name</label>
                        <input type="text" name="name" id="" placeholder='Enter Manufacturer Name' className='border-[1px] 
                        bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                            focus:outline-none'/>
                    </div>

                    {/* manufacter brand */}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className='font-normal text-base'>Manufacturer Brand</label>
                        <input type="text" name="name" id="" placeholder='Enter Manufacturer Brand' className='border-[1px] 
                        bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                            focus:outline-none'/>
                    </div>

                    {/* color */}
                    <div>
                        <label htmlFor="" className='font-normal text-base'>Colour</label>
                        <div className='flex items-center gap-2 mt-2'>
                            <div className='w-full border-2 h-12 rounded-lg'>
                                <p className='rounded-lg text-secondary/50 text-sm  flex justify-center items-center focus:outline-none h-full' 
                                    style={{ backgroundColor: color }}>{color}</p>
                            </div>
                            <div className="border-primary rounded-md w-full border-2 text-primary font-custom tracking-wider flex items-center justify-center gap-2 px-3 py-2 cursor-pointer relative">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={handleColorSelecter}
                                    name="colorPicker"
                                    id="colorPicker"
                                    className="w-full bg-transparent absolute opacity-0 pointer-events-none"
                                />
                                <label
                                    htmlFor="colorPicker"
                                    className="flex items-center gap-1 cursor-pointer"
                                    onClick={() => document.getElementById('colorPicker').click()}
                                >
                                    <FaPlus /> Add Color
                                </label>
                            </div>
                        </div>
                        <ul className='mt-5 flex items-center gap-3'>
                            <li className='cursor-pointer'><FaCircle className='text-3xl text-green-400' /></li>
                            <li className='cursor-pointer'><FaCircle className='text-3xl text-red-400' /></li>
                            <li className='cursor-pointer'><FaCircle className='text-3xl text-yellow-400' /></li>
                            <li className='cursor-pointer'><FaCircle className='text-3xl text-blue-400' /></li>
                        </ul>
                    </div>

                    {/* size */}
                    <div>
                        <h3 className='text-secondary text-base'>Size</h3>
                        <ul className='mt-2 flex items-center gap-2'>
                            <li className='border-2 border-gray-300 w-7 h-7 flex items-center 
                            justify-center rounded-md text-xs cursor-pointer hover:bg-primary hover:text-white hover:border-primary'>XS</li>
                            <li className='border-2 border-gray-300 w-7 h-7 flex items-center 
                            justify-center rounded-md text-xs cursor-pointer hover:bg-primary hover:text-white hover:border-primary'>S</li>
                            <li className='border-2 border-gray-300 w-7 h-7 flex items-center 
                            justify-center rounded-md text-xs cursor-pointer hover:bg-primary hover:text-white hover:border-primary'>M</li>
                            <li className='border-2 border-gray-300 w-7 h-7 flex items-center 
                            justify-center rounded-md text-xs cursor-pointer hover:bg-primary hover:text-white hover:border-primary'>L</li>
                            <li className='border-2 border-gray-300 w-7 h-7 flex items-center 
                            justify-center rounded-md text-xs cursor-pointer hover:bg-primary hover:text-white hover:border-primary'>XL</li>
                            <li className='border-2 border-gray-300 w-7 h-7 flex items-center 
                            justify-center rounded-md text-xs cursor-pointer hover:bg-primary hover:text-white hover:border-primary'>2XL</li>
                            <li className='border-2 border-gray-300 w-7 h-7 flex items-center 
                            justify-center rounded-md text-xs cursor-pointer hover:bg-primary hover:text-white hover:border-primary'>3XL</li>
                        </ul>
                    </div>

                    {/* button */}
                    <div className='flex justify-center items-center mt-2'>
                        <Button className='bg-buttonBg font-custom font-normal tracking-wider'>submit product</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProduct
