import React from 'react'
import OrderFilter from './OrderFilter'
import OrderTable from './OrderTable'

const OrderList = () => {
  return (
    <>
      <h1 className="text-2xl lg:text-3xl font-semibold">Order Lists</h1>
      <div className='space-y-5 mt-5'>
        <div>
          <OrderFilter/>
        </div>
        <div>
          <OrderTable/>
        </div>
      </div>
    </>
  )
}

export default OrderList
