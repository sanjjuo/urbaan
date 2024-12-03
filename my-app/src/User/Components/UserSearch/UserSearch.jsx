import React from 'react'
import SearchBar from '../Navbar/SearchBar'
import { RxCountdownTimer } from "react-icons/rx";

const UserSearch = () => {
    return (
        <>
            <div className='p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-screen'>
                <SearchBar />
                <div className='mt-10'>
                    <h3 className='text-base font-medium text-secondary'>Your Recent Searches</h3>
                    <ul className='mt-5 space-y-2'>
                        <li className='text-sm flex items-center gap-1 text-gray-700'><RxCountdownTimer />Kurti</li>
                        <li className='text-sm flex items-center gap-1 text-gray-700'><RxCountdownTimer />Churidar</li>
                        <li className='text-sm flex items-center gap-1 text-gray-700'><RxCountdownTimer />Ethnic Wear</li>
                        <li className='text-sm flex items-center gap-1 text-gray-700'><RxCountdownTimer />Palazzo</li>
                    </ul>
                </div>
                <div className='mt-10'>
                    <h3 className='text-base font-medium text-secondary'>Popular Searches</h3>
                    <ul className='mt-5 flex flex-wrap items-center gap-2'>
                        <li className='text-sm text-primary border-[1px] border-primary rounded-xl px-3 py-2'>Kurti</li>
                        <li className='text-sm text-primary border-[1px] border-primary rounded-xl px-3 py-2'>Night Wear</li>
                        <li className='text-sm text-primary border-[1px] border-primary rounded-xl px-3 py-2'>Palazzo</li>
                        <li className='text-sm text-primary border-[1px] border-primary rounded-xl px-3 py-2'>Churidar</li>
                        <li className='text-sm text-primary border-[1px] border-primary rounded-xl px-3 py-2'>Maternity Wear</li>
                        <li className='text-sm text-primary border-[1px] border-primary rounded-xl px-3 py-2'>Bottoms</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default UserSearch
