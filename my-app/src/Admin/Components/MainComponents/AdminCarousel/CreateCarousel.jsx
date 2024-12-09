import { Button, Radio } from '@material-tailwind/react'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const CreateCarousel = () => {
    const [carouselImage, setCarouselImage] = useState(null)
    const [carouselStatus, setCarouselStatus] = useState('enable')
    const [carouselLabel, setCarouselLabel] = useState('')
    const [carouselTitle, setCarouselTitle] = useState('')
    const [carouselLink, setCarouselLink] = useState('')
    const [carouselCategory, setCarouselCategory] = useState('')
    const [categories, setCategories] = useState([])

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const handleCarouselUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCarouselImage(file);
        }
    }

    // Handle status change
    const handleStatusChange = (value) => {
        setCarouselStatus(value);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Authorization is missing");
                    return;
                }

                const response = await axios.get(`${BASE_URL}/admin/category/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error.response || error.message);
                alert("Failed to load categories.");
            }
        };

        fetchCategories();
    }, []);

    const handleCarouselSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Authorization is missing")
                return;
            }

            const carouselFormData = new FormData();
            carouselFormData.append('image', carouselImage);
            carouselFormData.append('status', carouselStatus);
            carouselFormData.append('label', carouselLabel);
            carouselFormData.append('title', carouselTitle);
            carouselFormData.append('link', carouselLink);
            carouselFormData.append('category', carouselCategory);

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-type': 'multipart/form-data'
            }

            const response = await axios.post(`${BASE_URL}/admin/slider/create`, carouselFormData, { headers });
            console.log(response.data);
            alert('Carousel created successfully !')
        } catch (error) {
            console.log(error, ": error creating carousel");
            alert('Carousel is not created')
        }
    }


    return (
        <>
            <div className='bg-white rounded-xl shadow-md sticky top-5 transition-all duration-300 ease-in-out'>
                <div className='p-5'>
                    <h2 className="text-xl font-medium mb-3 lg:mb-0 text-secondary">Create Carousel</h2>
                </div>
                <hr />
                <div className='p-5'>
                    <form action="" className='space-y-5' onSubmit={handleCarouselSubmit}>
                        {/* image upload */}
                        <div>
                            <label htmlFor="" className='font-normal text-base'>Carousel Image</label>
                            <div className='w-full h-48 flex justify-center items-center border-2 rounded-xl mt-2'>
                                {!carouselImage ? (
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
                                        src={URL.createObjectURL(carouselImage)}
                                        alt="Uploaded"
                                        className="w-full h-full rounded-lg"
                                    />
                                )}
                            </div>
                        </div>

                        {/* status type */}

                        <div className='flex flex-col gap-1 w-full'>
                            <label className='font-normal text-base'>Status type</label>
                            <div className="flex gap-10">
                                <Radio
                                    name="type"
                                    color='green'
                                    label="Enable"
                                    checked={carouselStatus === 'enable'}
                                    onChange={() => handleStatusChange('enable')}
                                />
                                <Radio
                                    name="type"
                                    color='pink'
                                    label="Disable"
                                    checked={carouselStatus === 'disable'}
                                    onChange={() => handleStatusChange('disable')}
                                />
                            </div>
                        </div>


                        {/* label */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-normal text-base'>Carousel Label</label>
                            <input
                                type="text"
                                name="name"
                                value={carouselLabel}
                                onChange={(e) => setCarouselLabel(e.target.value)}
                                id=""
                                placeholder='Eg: Trending, New Season'
                                className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                        </div>

                        {/* title */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-normal text-base'>Carousel Title</label>
                            <input
                                type="text"
                                name="name"
                                value={carouselTitle}
                                onChange={(e) => setCarouselTitle(e.target.value)}
                                id=""
                                placeholder='eg: Stylish kurtis, kids Collection'
                                className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                        </div>

                        {/* link */}
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-normal text-base'>Carousel Link</label>
                            <input
                                type="url"
                                name="url"
                                value={carouselLink}
                                onChange={(e) => setCarouselLink(e.target.value)}
                                id=""
                                placeholder='www.carousel.com'
                                className='border-[1px] 
                                    bg-gray-100/50 p-2 rounded-md placeholder:text-sm placeholder:font-light placeholder:text-gray-500
                                     focus:outline-none'/>
                        </div>

                        {/* category */}
                        <div className='flex flex-col gap-1 w-full'>
                            <label className='font-normal text-base'>Category</label>
                            <select
                                name="selectField"
                                value={carouselCategory}
                                onChange={(e) => setCarouselCategory(e.target.value)}
                                className="w-full text-sm text-gray-500 font-light bg-gray-100/50 border p-2 rounded focus:outline-none focus:cursor-pointer"
                            >
                                <option value="">Select Category</option>
                                {
                                    categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* button */}
                        <div className='flex justify-end'>
                            <Button type='submit' className='bg-buttonBg font-normal tracking-wider font-custom text-sm'>Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateCarousel
