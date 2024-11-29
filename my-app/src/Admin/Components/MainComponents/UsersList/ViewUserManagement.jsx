import React from 'react'
import UserDetails from './UserDetails'
import UserLargeImage from './UserLargeImage'
import UserOrdersTable from './UserOrdersTable'

const ViewUserManagement = () => {
  return (
    <>
      <h1 className='text-3xl font-semibold'>User Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mt-5">
        <div className="lg:col-span-2">
          <UserDetails />
        </div>
        <div className="lg:col-span-3 space-y-5">
          <UserLargeImage />
          <UserOrdersTable />
        </div>
      </div>
    </>
  )
}

export default ViewUserManagement