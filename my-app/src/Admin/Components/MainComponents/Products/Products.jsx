import React, { useState } from 'react'
import Filter from './Filter'
import ListView from './ListView'
import GridView from './GridView'


const Products = () => {
  const [view, setView] = useState('list')
  return (
    <>
      <h1 className='text-2xl lg:text-3xl font-semibold'>Products</h1>
      <div className="grid grid-cols-8 mt-5 gap-8">
        <div className='grid col-span-2'>
          <Filter view={view} setView={setView} />
        </div>
        <div className='grid col-span-6'>
          {view === "list" ? (
            <ListView />
          ) : (
            <GridView />
          )
          }
        </div>
      </div>
    </>
  )
}

export default Products
