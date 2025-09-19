import React from 'react';
import { assets } from '../../assets/assets';


export default function FooterComponent() {
   let date = new Date();
   let year = date.getFullYear();

   return (
      <footer className='mt-2 flex flex-col  items-center justify-between text-left w-full px-8 border-t bg-gray-200'>
         <div className='flex items-center gap-8 mt-3'>
            <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
               <img src={assets.facebook_icon} alt='facebook_icon' className='w-6 h-6 md:w-8 md:h-8'/>
            </a>
            <a href='https://www.x.com/' target='_blank' rel='noopener noreferrer'>
               <img src={assets.twitter_icon} alt='twitter_icon' className='w-6 h-6 md:w-8 md:h-8' />
            </a>
            <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
               <img src={assets.instagram_icon} alt='instagram_icon' className='w-6 h-6 md:w-8 md:h-8' />
            </a>
         </div>
         <p className="py-4 text-center text-xs md:text-sm text-gray-500">
            Copyright {year} eLearn,Inc., | All Rights Reserved.
         </p>
      </footer>

   );
}