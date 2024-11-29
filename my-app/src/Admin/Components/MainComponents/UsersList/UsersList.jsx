import React from 'react'
import UsersListSearchBar from './UsersListSearchBar'
import UsersListTable from './UsersListTable'

const UsersList = () => {
  return (
    <>
      <h1 className="text-2xl lg:text-3xl font-semibold">Users List</h1>
      <div className='space-y-5 mt-5'>
        <div>
          <UsersListSearchBar />
        </div>
        <div>
          <UsersListTable />
        </div>
      </div>
    </>
  )
}

export default UsersList
