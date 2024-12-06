import React from 'react'
import { carousel } from '../../../../data';
import { Card } from '@material-tailwind/react';
import { DeleteModal } from '../../DeleteModal/DeleteModal';
import { useContext } from 'react';
import { AppContext } from '../../../../StoreContext/StoreContext';

const AddedCarousel = ({ createEditCarousel, setCreateEdotCarousel }) => {
    const { open, handleOpen } = useContext(AppContext);
    return (
        <>
            {carousel.map((slider) => (
                <Card className="p-5 relative" key={slider.id}>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-secondary font-bold capitalize text-2xl'>{slider.category}</h1>
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
                    
                    {/* carousel image */}
                    <div className='w-full h-32 mt-5'>
                        <img src={slider.img} alt={slider.title} className='w-full h-full object-cover rounded-lg' />
                    </div>
                    <ul className="mt-5 space-y-2">
                        <li className="flex items-center text-secondary">
                            <span className="font-semibold w-24">Label:</span>
                            <span>{slider.label}</span>
                        </li>
                        <li className="flex items-center text-secondary">
                            <span className="font-semibold w-24">Title:</span>
                            <span>{slider.title}</span>
                        </li>
                    </ul>
                </Card>
            ))}

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
