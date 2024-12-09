import React from 'react'
import { Card } from '@material-tailwind/react';
import { DeleteModal } from '../../DeleteModal/DeleteModal';
import { useContext } from 'react';
import { AppContext } from '../../../../StoreContext/StoreContext';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const AddedCarousel = ({ createEditCarousel, setCreateEdotCarousel }) => {
    const { open, handleOpen } = useContext(AppContext);
    const [adminCarousel, setAdminCarousel] = useState([])

    useEffect(() => {
        const fetchAdminCarousel = async () => {
            try {
                const BASE_URL = import.meta.env.VITE_BASE_URL;
                const response = await axios.get(`${BASE_URL}/admin/slider`);
                setAdminCarousel(response.data);
                console.log(response.data);
            } catch (error) {
                console.log("error fetching data:", error);
            }
        }
        fetchAdminCarousel();
    }, [])
    return (
        <>
            {
                adminCarousel.length > 0 ? (
                    <>
                        {adminCarousel.map((carousel) => (
                            <Card className="p-5 relative" key={carousel._id}>
                                {/* carousel image */}
                                <div className='w-full h-72'>
                                    <img src={carousel.image} alt={carousel.title} className='w-full h-full object-cover rounded-lg' />
                                </div>
                                <div className='flex justify-between items-center'>
                                    <ul className="mt-5 space-y-2">
                                        <li className='text-secondary font-bold capitalize text-2xl'>{carousel.category}</li>
                                        <li className="flex items-center text-secondary">
                                            <span className="font-semibold w-24">Label:</span>
                                            <span>{carousel.label}</span>
                                        </li>
                                        <li className="flex items-center text-secondary">
                                            <span className="font-semibold w-24">Title:</span>
                                            <span>{carousel.title}</span>
                                        </li>
                                    </ul>
                                    <div className="flex gap-2 text-sm">
                                        <button
                                            onClick={() => setCreateEdotCarousel("editcarousel")}
                                            className={`text-buttonBg bg-editBg w-14 h-7 flex justify-center items-center rounded-md hover:bg-buttonBg 
                                    hover:text-editBg ${createEditCarousel === "editcarousel" ? "!bg-buttonBg text-editBg" : ""}`}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleOpen('deleteModal')
                                            }
                                            className="text-deleteBg bg-primary/20 w-14 h-7 flex justify-center items-center rounded-md hover:bg-primary hover:text-white"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </>
                ) : (
                    <p className='text-secondary text-sm flex justify-center items-center h-[50vh]'>Loading...</p>
                )
            }

            <DeleteModal
                open={open === "deleteModal"}
                handleOpen={handleOpen}
                title="Are you sure ?"
                description="Do you really want to delete this Carousel? This action cannot be undone."
            />
        </>
    )
}

export default AddedCarousel
