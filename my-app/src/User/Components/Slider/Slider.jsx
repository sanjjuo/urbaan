import React from 'react';
import { Carousel } from "@material-tailwind/react";

const UserSlider = () => {
  return (
    <Carousel transition={{ duration: 1  }} autoplay={true} className='rounded-2xl'>
      <div className="w-full h-56 lg:h-[500px] xl:h-[450px] shadow-md">
        <img
          src="s2.webp"
          alt="Slide 1"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="w-full h-56 lg:h-[500px] xl:h-[450px] shadow-md">
        <img
          src="s1.jpg"
          alt="Slide 2"
          className="h-full w-full object-cover"
        />
      </div>
    </Carousel>
  );
};

export default UserSlider;
