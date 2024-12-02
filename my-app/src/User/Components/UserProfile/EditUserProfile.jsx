import React from 'react';
import { IoCameraOutline } from "react-icons/io5";

const EditUserProfile = () => {
    return (
        <>
            <div className="p-4 xl:py-16 xl:px-32 lg:py-16 lg:px-32 bg-userBg h-screen">
                <div className='flex flex-col justify-center items-center gap-2'>
                    <div className='w-32 h-32'>
                        <img src="/userProfile.jpg" alt="" className='w-full h-full object-cover rounded-3xl' />
                    </div>
                    <div>
                        <IoCameraOutline />
                        <input type="file" name="" id="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditUserProfile
