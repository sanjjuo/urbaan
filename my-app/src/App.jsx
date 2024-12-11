import React from 'react'
import "./App.css"
import FullRoutes from './Routes'
import StoreContext from './StoreContext/StoreContext'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { Toaster } from 'react-hot-toast';



const App = () => {
  return (
    <>
      <StoreContext>
        {/* <Toaster /> */}
        <FullRoutes />
      </StoreContext>
    </>
  )
}

export default App
