import { Checkbox, Typography } from '@material-tailwind/react'
import React from 'react'
import { FaRegRectangleList } from "react-icons/fa6";
import { LuLayoutGrid } from "react-icons/lu";

const Filter = ({ view, setView }) => {

    const models = ["Kurti", "Bottom", "Kurti Set", "Maternity Wear", "Night Wear", "Running Material", "Churidar Material", "Offer Zone"]

    return (
        <>
            <div className='bg-white shadow-md rounded-xl p-5 h-full'>
                <ul className='flex items-center justify-between gap-2'>
                    <li onClick={() => setView("list")} className={`text-secondary text-base font-normal bg-gray-100 rounded-md flex items-center justify-center gap-1 py-2 w-full transition-all duration-300 ease-in-out cursor-pointer 
                        ${view === 'list' ? '!bg-primary/30 py-2 px-2 rounded-md !text-primary' : ""}`}><FaRegRectangleList/>List View</li>
                    <li onClick={() => setView("grid")} className={`text-secondary text-base font-normal bg-gray-100 rounded-md flex items-center justify-center gap-1 py-2 w-full transition-all duration-300 ease-in-out cursor-pointer 
                        ${view === 'grid' ? '!bg-primary/30 py-2 px-2 rounded-md !text-primary' : ""}`}><LuLayoutGrid/>Grid View</li>
                </ul>
                <div className='mt-5'>
                    <h2 className='text-secondary font-medium'>Filters</h2>
                    <div className='flex flex-col'>
                        {
                            models.map(item => (
                                <Checkbox label={
                                    <Typography className='font-custom text-secondary text-base font-normal'>{item}</Typography>
                                } color='pink' className='border-2 border-primary rounded-sm w-4 h-4' />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filter
