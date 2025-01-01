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
            duration: 2000,
            style: {
              textTransform: 'capitalize',
              maxWidth: '450px', 
              width: 'auto', 
              padding: '20px',
              height: 'auto',
              color: '#000',
              backgroundColor: '#FFEDED',
              border: "2px solid #C21E56"
            }
          }}
        />
        <FullRoutes />
      </StoreContext>
    </>
  )
}

export default App
