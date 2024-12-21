import { Button, Progress, Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa6';
import { IoStarOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../StoreContext/StoreContext';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const { BASE_URL } = useContext(AppContext);
  console.log(productId);
  

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/review/${productId}`);
        setReviews(response.data);
        console.log(response.data);
        console.log("Product ID:", productId);
      console.log("Reviews Data:", reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <>
      <h4 className="font-medium mb-3 text-sm xl:text-base lg:text-base">
        Customer Reviews ({reviews.length})
      </h4>
      <div className="flex items-center justify-between gap-0 py-6 border-t-2 border-b-2 border-gray-300">
        <div className="flex flex-col justify-between gap-10 w-3/4 xl:w-1/2 lg:w-1/2">
          <h1 className="uppercase font-normal flex items-center gap-2 text-sm xl:text-base lg:text-base">
            Ratings <IoStarOutline />
          </h1>
          <div>
            <h2 className="flex items-center gap-2 text-sm xl:text-base lg:text-base">
              4.3 <FaStar className="text-ratingBg" />
            </h2>
            <p className="font-normal text-xs xl:text-sm lg:text-sm">
              1.4K Verified Buyers
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2">
              <Typography className="text-xs xl:text-sm lg:text-sm">{star}</Typography>
              <Progress value={star * 15} size="sm" color="pink" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        {reviews.map((review) => (
          <div className="space-y-2 mb-3" key={review._id}>
            <ul className="flex items-center gap-3 xl:gap-5 lg:gap-5 font-medium">
              <li className="w-12 h-12 xl:w-14 xl:h-14 lg:w-14 lg:h-14">
                <img
                  src={`${BASE_URL}/uploads/category/${review.image}`}
                  alt={review.userId.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </li>
              <li>
                <span className="text-sm xl:text-base lg:text-base">
                  {review.userId.name}
                </span>
                <ul className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <li
                      key={index}
                      className={`text-primary text-xs xl:text-sm lg:text-sm ${
                        index < Math.round(review.rating)
                          ? "text-ratingBg"
                          : "text-gray-300"
                      }`}
                    >
                      <FaStar />
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <p className="text-gray-600 font-normal text-xs xl:text-sm lg:text-sm">
              {review.message}
            </p>
          </div>
        ))}

        <Link to="/customer-reviews">
          <Button
            variant="outlined"
            className="mt-5 xl:mt-10 lg:mt-10 rounded-full p-2 flex items-center gap-1 text-xs capitalize font-custom font-normal tracking-wide"
          >
            View all reviews <BsArrowRight />
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ProductReviews;
