import React from 'react'
import { RiSearch2Line } from 'react-icons/ri'

const SearchBar = () => {
    return (
        <>
            <ul className='w-96'>
                <li className='w-full flex items-center gap-2 text-sm p-2 rounded-lg placeholder:font-normal bg-searchUser placeholder:text-gray-700'>
                    <RiSearch2Line className='text-gray-600 text-xl' />
                    <input type="search" name="search" id="" placeholder='Search' className='bg-transparent 
                        placeholder:text-gray-600 placeholder:text-sm font-light focus:outline-none text-secondary w-full'/>
                </li>
            </ul>
        </>
    )
}

export default SearchBar