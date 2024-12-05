import React, { useContext } from 'react';
import { Button, Carousel } from "@material-tailwind/react";
import { carousel } from '../../../data';
import { motion } from "motion/react";
import { AppContext } from '../../../StoreContext/StoreContext';
import { Link } from 'react-router-dom';

const UserCarousel = () => {
  const { setSelectedCategory } = useContext(AppContext);

  const handleCarouselCategory = (cat) => {
    setSelectedCategory(cat)
  }

  return (
    <Carousel
      transition={{ duration: 2 }}
      autoplay
      loop
      className="rounded-2xl"
    >
      {carousel.map((slider) => (
        <div
          key={slider.id}
          className="relative w-full h-56 lg:h-[500px] xl:h-[450px] shadow-md"
        >
          {/* Background Image */}
          <img
            src={slider.img}
            alt={`Image showcasing ${slider.item}`}
            className="h-full w-full object-cover"
          />

          {/* Animated Text and Button */}
          <div className="absolute inset-y-1/3 left-5 lg:left-20 text-white z-10">
            {/* New Arrival Text */}
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm lg:text-lg uppercase font-medium"
            >
              {slider.new}
            </motion.p>

            {/* Item Title */}
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl lg:text-5xl font-extrabold capitalize"
            >
              {slider.item}
            </motion.p>

            {/* Button with Hover Effect */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.8 }}
            >
              <Link onClick={() => handleCarouselCategory(slider.category)} to='/all-category'><Button
                className="bg-primary mt-3 font-custom capitalize tracking-wider text-white 
                px-5 py-2 text-sm lg:text-base rounded-lg shadow-md hover:bg-secondary/80"
              >
                Explore Now
              </Button></Link>
            </motion.div>
          </div>

          {/* Overlay for Better Contrast */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ))}
    </Carousel>
  );
};

export default UserCarousel;
