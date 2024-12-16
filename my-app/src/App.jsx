import React from 'react'
import "./App.css"
import FullRoutes from './Routes'
import StoreContext from './StoreContext/StoreContext'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <>
      <StoreContext>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: '',
            duration: 5000,
            style: {
              height: '50px',
              width: '250px'
            },
          }}
        />
        <FullRoutes />
      </StoreContext>
    </>
  )
}

export default App
