import React from 'react'
import { RiSearch2Line } from 'react-icons/ri'

const UsersListSearchBar = () => {
    return (
        <>
            <div className="border border-gray-300 py-1 px-2 flex items-center gap-1 rounded-xl bg-white h-12 w-96">
                <RiSearch2Line className="text-gray-700 text-xl" />
                <input
                    type="search"
                    name="search"
                    placeholder="Search for user"
                    className="bg-transparent placeholder:text-gray-700 placeholder:text-base focus:outline-none text-secondary w-full"
                />
            </div>
        </>
    )
}

export default UsersListSearchBar
