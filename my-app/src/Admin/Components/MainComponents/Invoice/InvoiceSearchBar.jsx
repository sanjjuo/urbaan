import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { AppContext } from '../../../../StoreContext/StoreContext'

const InvoiceSearchBar = ({ setInvoice }) => {
  const [searchInvoice, setSearchInvoice] = useState('')
  const { BASE_URL } = useContext(AppContext)

  // search invoice
  useEffect(() => {
    const searchInvoice = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${BASE_URL}/admin/invoice/search?name=${searchInvoice}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setInvoice(response.data.invoices)
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    searchInvoice()
  }, [searchInvoice])
  return (
    <>
      <div className="border border-gray-300 py-1 px-2 flex items-center gap-1 rounded-xl bg-white h-12 w-96">
        <RiSearch2Line className="text-gray-700 text-xl" />
        <input
          type="search"
          name="search"
          value={searchInvoice}
          onChange={(e) => setSearchInvoice(e.target.value)}
          placeholder="Search by coupon code & name"
          className="bg-transparent placeholder:text-gray-700 placeholder:text-base focus:outline-none text-secondary w-full"
        />
      </div>
    </>
  )
}

export default InvoiceSearchBar