import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { getFirstName } from '../../utils/functionsUtil';

export default function NavbarComponent({bgColor}) {
   const { isEducator } = useContext(AppContext);
   const { user } = useUser();

   return (
      isEducator && user && (
         <div className={`flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3 ${bgColor}`}>
            <Link to="/">
               <img src={assets.elearn_logo} alt='Logo' className='w-28 lg:w-32' />
            </Link>
            <div className='flex items-center gap-5 text-gray-800 relative'>
               <p>Hi&nbsp; {getFirstName(user.fullName)}&nbsp;<span className='text-gray-900 font-semibold'>!</span></p>
               <UserButton />
            </div>
         </div>
      )
   );
}