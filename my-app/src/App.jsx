import React from 'react'
import "./App.css"
import FullRoutes from './Routes'
import StoreContext from './StoreContext/StoreContext'


const App = () => {
  return (
    <>
      <StoreContext>
        <FullRoutes />
      </StoreContext>
    </>
  )
}

export default App
