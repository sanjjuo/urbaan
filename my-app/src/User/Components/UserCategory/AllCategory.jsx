import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'


const categories = [
    "Kurti", "Bottom", "Kurti Set", "Maternity Wear", "Night Wear", "Running Material", "Churidar Material", "Offer Zone"
]

const AllCategory = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="bg-white z-20 shadow-md py-4 px-4 w-full sticky top-0">
                <h1
                    className="flex items-center gap-2 text-xl font-medium cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack className="text-secondary text-2xl cursor-pointer" /> Back
                </h1>
            </div>
            <div className='grid grid-cols-2'>
                <div className='bg-white shadow-xl z-10 h-screen p-4'>
                    <div className='mt-5'>
                        <h1 className='font-semibold text-lg'>All Categories</h1>
                        <ul className='space-y-2 mt-5'>
                            {
                                categories.map((category, index) => (
                                    <li key={index} className='text-sm text-gray-600'>{category}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className='bg-userBg'>
                    <div className="grid grid-cols-2 p-4 gap-2">
                        <div className='mt-5'>
                            <div className='w-full h-24'>
                                <img src="/p1.jpg" alt="" className='w-full h-full object-cover rounded-lg'/>
                            </div>
                            <p className='text-secondary text-sm text-center'>Kurti</p>
                        </div>
                        <div className='mt-5'>
                            <div className='w-full h-24'>
                                <img src="/p1.jpg" alt="" className='w-full h-full object-cover rounded-lg'/>
                            </div>
                            <p className='text-secondary text-sm text-center'>Kurti</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllCategory
