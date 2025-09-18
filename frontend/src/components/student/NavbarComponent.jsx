import React, {Fragment, useContext} from 'react';
import {assets} from '../../assets/assets.js';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function NavbarComponent() {
   const location = useLocation();
   const isCoursesListPage = location.pathname.includes('/course-list');

   const { backendURL, isEducator, setIsEducator, navigate, getToken } = useContext(AppContext);
   const { openSignIn } = useClerk();
   const { user } = useUser();

   async function becomeEducator() {
      try {
         if (isEducator) {
            navigate('/educator');
            return;
         }
         const token = await getToken();
         const { data } = await axios.get(backendURL + '/api/educator/update-role', { headers: { Authorization: `Bearer ${token}` } });

         if (data.success) {
            toast.success(data.message);
            setIsEducator(true);

         } else {
            toast.error(data.message);

         }

      } catch(err) {
         toast.error(err.message);
      }
   }


   return (
      <div id='home'  className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCoursesListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
         <img onClick={() => navigate('/')} src={assets.elearn_logo} alt="Logo" className="w-28 lg:w-32 cursor-pointer"/>
         <div className="md:flex hidden items-center gap-5 text-gray-500">
            <div className="flex items-center gap-5">
               {
                  user && <Fragment>
                     <button className="add-cursor" onClick={becomeEducator}>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
                     | <Link to='/enrollments' >My Enrollments</Link>
                  </Fragment>
               }
               {user
                  ? <UserButton />
                  : <button onClick={() => openSignIn()} className="bg-blue-600 text-white px-5 py-2 rounded-full">
                     Create Account
                  </button>}
            </div>
         </div>
         {/* For Phone Screens */}
         <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
            <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
               <button onClick={becomeEducator} className="add-cursor">{isEducator ? 'My Dashboard' : 'Become Educator'}</button>
               | {
               user && <Link to='/enrollments' >My Enrollments</Link>
            }
            </div>
            {user
               ? <UserButton />
               : <button onClick={() => openSignIn()}>
                  <img src={assets.user_icon} alt="User icon" />
               </button>}
         </div>
      </div>

   );
}