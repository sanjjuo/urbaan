import React, { useState } from 'react'
import Filter from './Filter'
import ListView from './ListView'
import GridView from './GridView'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../../../StoreContext/StoreContext'
import axios from 'axios'


const Products = () => {
  const [view, setView] = useState('list')
  const { BASE_URL } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialProducts, setInitialProducts] = useState(null)

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert("Authorization is missing")
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`
        }
        const response = await axios.get(`${BASE_URL}/admin/products/view-products`, { headers });
        setProducts(response.data);
        setIsLoading(false)
        console.log(response.data);
      } catch (error) {
        console.log(error, ": error fetching products");
      }
    }
    fetchProducts();
  }, [])


  return (
    <>
      <h1 className='text-2xl lg:text-3xl font-semibold'>Products</h1>
      <div className="grid grid-cols-8 mt-5 gap-5">
        <div className='grid col-span-2 h-[calc(100vh-6rem)] overflow-y-auto hide-scrollbar'>
          <Filter view={view} setView={setView} />
        </div>
        <div className='grid col-span-6 h-[calc(100vh-6rem)] overflow-y-auto hide-scrollbar'>
          {view === "list" ? (
            <ListView
              products={products}
              isLoading={isLoading}
              initialProducts={initialProducts}
              setInitialProducts={setInitialProducts}
            />
          ) : (
            <GridView
              products={products}
              isLoading={isLoading}
              initialProducts={initialProducts}
              setInitialProducts={setInitialProducts}
            />
          )
          }
        </div>
      </div>
    </>
  )
}

export default Products
