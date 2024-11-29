import React from 'react'
import InvoiceSearchBar from './InvoiceSearchBar'
import InvoiceFilter from './InvoiceFilter'
import InvoiceTable from './InvoiceTable'

const Invoice = () => {
  return (
    <>
      <h1 className="text-2xl lg:text-3xl font-semibold">Order Lists</h1>
      <div className='space-y-5 mt-5'>
        <div className='flex items-center gap-5'>
          <div>
            <InvoiceSearchBar />
          </div>
          <div>
            <InvoiceFilter />
          </div>
        </div>
        <div>
          <InvoiceTable />
        </div>
      </div>
    </>
  )
}

export default Invoice
