import React from 'react';
import {assets} from '../../assets/assets.js';


export default function CallToActionComponent() {

   return (
      <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
         <h2 className='md:text-4xl text-xl text-gray-800 font-semibold'>Learn
            anything, anytime, anywhere</h2>
         <p className='text-gray-500 sm:text-sm'>Unlock your potential today! Take
            the first step toward achieving your educational goals.<br/> Get started
            and gain access to a wealth of courses designed to enhance your skills!
         </p>
         <div className='flex items-center font-medium gap-6 mt-4'>
            <a href='#courses' >
               <button className='cursor-pointer px-10 py-3 rounded-md text-white bg-blue-600'>Get
                  started
               </button>
            </a>
            <a href='#courses'>
               <button className='cursor-pointer flex items-center gap-2'>
                  Learn more
                  <img src={assets.arrow_icon} alt='arrow_icon'/>
               </button>
            </a>
         </div>
      </div>

   );
}