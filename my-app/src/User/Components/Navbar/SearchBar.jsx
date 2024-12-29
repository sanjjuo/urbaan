import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { AppContext } from '../../../StoreContext/StoreContext'

const SearchBar = ({ searchUserProducts, setSearchedUserProducts, setSearchedProducts }) => {
    const { BASE_URL } = useContext(AppContext)

    useEffect(() => {
        const fetchUserSearchProducts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/products/products/search?name=${searchUserProducts}`)
                setSearchedProducts(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserSearchProducts()
    }, [searchUserProducts])

    return (
        <>
            <div className='xl:w-[450px] lg:w-[450px]'>
                <ul>
                    <li className='w-full flex items-center gap-2 text-sm p-2 rounded-full placeholder:font-normal bg-searchUser placeholder:text-gray-700'>
                        <RiSearch2Line className='text-gray-600 text-xl' />
                        <input
                            type="search"
                            name="search"
                            value={searchUserProducts}
                            onChange={(e) => setSearchedUserProducts(e.target.value)}
                            id=""
                            placeholder='Search Products'
                            className='bg-transparent 
                        placeholder:text-gray-600 placeholder:text-sm font-light focus:outline-none text-secondary w-full'/>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SearchBar