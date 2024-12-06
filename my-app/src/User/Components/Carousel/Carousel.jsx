import React, { useContext } from 'react';
import { carousel } from '../../../data';
import Slider from "react-slick";
import { motion } from "motion/react";
import { AppContext } from '../../../StoreContext/StoreContext';
import { Link } from 'react-router-dom';

const UserCarousel = () => {

  const { setSelectedCategory } = useContext(AppContext);

  const handleCarouselCategory = (cat) => {
    setSelectedCategory(cat)
  }

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 6000,
  };
  return (
    <>
      <Slider {...settings}>
        {carousel.map((slider) => (
          <div
            key={slider.id}
            className="relative w-full h-56 lg:h-[500px] xl:h-[450px] shadow-md rounded-2xl"
          >
            <img
              src={slider.img}
              alt={`Image showcasing ${slider.title}`}
              className="h-full w-full object-cover rounded-2xl"
            />
            <div className="absolute inset-y-1/3 left-5 lg:left-20 text-white z-10">
              <motion.p
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm lg:text-lg uppercase font-medium"
              >
                {slider.label}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl lg:text-5xl font-extrabold capitalize"
              >
                {slider.title}
              </motion.p>

              <Link onClick={() => handleCarouselCategory(slider.category)} to='/all-category'>
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.1 }}
                  className="bg-primary mt-3 font-custom font-normal capitalize tracking-wider text-white 
                p-2 xl:py-3 xl:px-6 lg:py-3 lg:px-6 text-xs xl:text-sm lg:text-sm  rounded-lg shadow-md hover:bg-secondary/80"
                >
                  Explore Now
                </motion.button>
              </Link>
            </div>

            <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
          </div>
        ))}
      </Slider>
    </>
  )
}

export default UserCarousel

