import React from 'react'
import UserSlider from '../Components/Slider/Slider'
import UserCategory from '../Components/UserCategory/UserCategory'
import LatestProducts from '../Components/LatestProducts/LatestProducts'

const UserHome = () => {
    return (
        <>
            <div className='bg-userBg p-4'>
                <UserSlider />
                <UserCategory />
                <LatestProducts />
            </div>
        </>
    )
}

export default UserHome