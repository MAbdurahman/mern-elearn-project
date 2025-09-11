import React from 'react';
import {assets} from '../../assets/assets.js';


export default function FooterComponent() {

   let date = new Date();
   let year = date.getFullYear();

   return (
      <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
         <div className='flex flex-col md:items-start px-8 md:px-0 justify-center gap-10 md:gap-8 py-10 border-b border-white/30 xl:flex xl:flex-row xl:gap-20'>

            <div className='flex flex-col md:items-start items-center w-full'>
               <img src={assets.logo_dark} alt="logo" />
               <p className='mt-6 text-center md:text-left text-sm text-white/80'>
                  Our mission is to empower students to learn by doing through engaging video content, providing practical skills and knowledge essential for success in today's dynamic world. We are committed to transforming the learning experience with hands-on opportunities that foster real-world application and growth.
               </p>
            </div>

            <div className='flex flex-col md:items-start items-center w-full'>
               <h3 className='font-semibold text-white mb-5'>Company</h3>
               <ul className='flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2'>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#">About us</a></li>
                  <li><a href="#courses">Courses</a></li>
                  <li><a href="#">Contact us</a></li>
               </ul>
            </div>

            <div className='hidden md:flex flex-col justify-items-center-safe w-full'>
               <h3 className='font-semibold text-white mb-5'>Subscribe to Our Newsletter</h3>
               <p className='text-sm text-white/80'>
                  The latest news, articles, and resources, sent to your inbox weekly.
               </p>
               <div className='flex items-center gap-2 pt-4'>
                  <input className='border border-gray-500/30 bg-gray-800 text-gray-300 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm' type='email' placeholder='Enter your email' />
                  <button className='bg-blue-600 w-24 h-9 text-white rounded'>Subscribe</button>
               </div>
            </div>

         </div>
         <p className='pt-4 pb-3 text-center text-xs md:text-sm text-white/60'>
            Copyright {year} Edemy,Inc., | All Rights Reserved.
            <a href='#' className='block pb-8 text-center text-xs text-white/40'>Privacy policy | Terms and Conditions</a>
         </p>
      </footer>
   );
}