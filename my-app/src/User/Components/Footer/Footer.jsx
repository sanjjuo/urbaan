import React from 'react'
import { GrLocation } from "react-icons/gr";
import { FaRegEnvelope } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className='bg-footerBg text-white pt-16 pb-32 px-4 xl:p-16 lg:p-16 cursor-default'>
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-16">
          {/* About */}
          <div className='xl:col-span-2 lg:col-span-2'>
            <h1 className='text-xl xl:text-2xl lg:text-2xl font-semibold'>About us</h1>
            <p className='text-sm font-light mt-5 cursor-default'><strong className='text-primary font-bold uppercase'>Urbaan</strong> is your one-stop shop for stylish and comfortable women's fashion. We offer a wide range of Kurtis,
              Kurti sets, bottoms, nightwear, home wear, maternity wear, accessories, and kidswear, blending elegance with
              everyday comfort. Discover fashion that fits every occasion at Urbaan!</p>
          </div>

          {/* sitemap */}
          <div className=''>
            <h1 className='text-xl xl:text-2xl lg:text-2xl font-semibold'>Sitemap</h1>
            <ul className='mt-5 space-y-5'>
              <li className='font-light text-sm'>
                <Link className='hover:text-primary'>Home</Link>
              </li>
              <li className='font-light text-sm'>
                <Link className='hover:text-primary'>About us</Link>
              </li>
              <li className='font-light text-sm'>
                <Link className='hover:text-primary'>Growers</Link>
              </li>
              <li className='font-light text-sm'>
                <Link className='hover:text-primary'>Contact</Link>
              </li>
            </ul>
          </div>

          {/* contact */}
          <div>
            <h1 className='text-xl xl:text-2xl lg:text-2xl font-semibold'>Contact</h1>
            <ul className='mt-5 space-y-5'>
              <li>
                <Link className='flex items-center gap-2 font-light text-sm hover:text-primary'>
                  <FiPhone className='text-2xl' />
                  +91 1234567890
                </Link>
              </li>
              <li>
                <Link className='flex items-center gap-2 font-light text-sm hover:text-primary'>
                  <FaWhatsapp className='text-2xl' />
                  Whatsapp
                </Link>
              </li>
              <li>
                <Link className='flex items-center gap-2 font-light text-sm hover:text-primary'>
                  <FaRegEnvelope className='text-2xl' />
                  support@gmail.com
                </Link>
              </li>
            </ul>
          </div>
          
        </div>

        {/* privacy policy */}
        <div className='space-y-10'>
          <ul className='flex flex-col lg:flex-row xl:flex-row lg:items-center xl:items-center justify-center
            xl:gap-20 lg:gap-20 gap-5 mt-20'>
            <li className='text-sm font-light cursor-pointer'>Privacy Policy</li>
            <li className='text-sm font-light cursor-pointer'>Terms of Use</li>
            <li className='text-sm font-light cursor-pointer'>Refunds</li>
            <li className='text-sm font-light cursor-pointer'>Legal</li>
          </ul>

          {/* copyright */}
          <p className='text-sm font-light text-center cursor-pointer'>Copyright &copy; {new Date().getFullYear()} • Lift Media Inc.</p>
        </div>
      </div>
    </>
  )
}

export default Footer