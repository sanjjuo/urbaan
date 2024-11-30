import React from 'react'
import UserSlider from '../Components/Slider/Slider'
import UserCategory from '../Components/UserCategory/UserCategory'
import LatestProducts from '../Components/LatestProducts/LatestProducts'
import FeaturedProducts from '../Components/FeaturedProducts/FeaturedProducts'

const UserHome = () => {
    return (
        <>
            <div className='bg-userBg p-4 xl:p-16 lg:p-16 space-y-8 xl:space-y-14 lg:space-y-14'>
                <UserSlider />
                <UserCategory />
                <LatestProducts />
                <FeaturedProducts />
            </div>
        </>
    )
}

export default UserHome