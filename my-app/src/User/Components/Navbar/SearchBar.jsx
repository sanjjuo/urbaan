import React from 'react'
import { RiSearch2Line } from 'react-icons/ri'

const SearchBar = () => {
    return (
        <>
            <ul className='w-[250px]'>
                <li className='border-[1px] border-gray-300 py-1 px-2 flex items-center gap-1 rounded-full bg-userBg w-full h-10'>
                    <RiSearch2Line className='text-gray-600 text-xl' />
                    <input type="search" name="search" id="" placeholder='Search' className='bg-transparent 
                        placeholder:text-gray-600 placeholder:text-sm font-light focus:outline-none text-secondary w-full'/>
                </li>
            </ul>
        </>
    )
}

export default SearchBar