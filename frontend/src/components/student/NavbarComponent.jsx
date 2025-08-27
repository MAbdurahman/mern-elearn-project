import React, {useContext} from 'react';
import {assets} from '../../assets/assets.js';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function NavbarComponent() {
   const location = useLocation();
 let isEducator = true;
   const isCoursesListPage = location.pathname.includes('/course-list');

   return (
      <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCoursesListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
         <img src={assets.logo} alt="Logo" className="w-28 lg:w-32 cursor-pointer"/>
         <div className="md:flex hidden items-center gap-5 text-gray-500">
            <div className="flex items-center gap-5">
               <button>Become Educator</button>
               | <Link to='/enrollments' >Enrollments</Link>
               <button className="bg-blue-600 text-white px-5 py-2 rounded-full">Create Account</button>
            </div>
         </div>
         {/* For Phone Screens */}
         <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
            <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
               <button>Become Educator</button>
               | <Link to='/enrollments' >Enrollments</Link>
            </div>
            <button>
               <img src={assets.user_icon} alt="User Icon" />
            </button>
         </div>
      </div>

   );
}