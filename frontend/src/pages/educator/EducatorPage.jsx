import React from 'react';
import {Outlet} from 'react-router-dom';
import SideBarComponent from '../../components/educator/SideBarComponent.jsx';
import NavbarComponent from '../../components/educator/NavbarComponent.jsx';
import FooterComponent from '../../components/educator/FooterComponent.jsx';

export default function EducatorPage() {

   return (
      <div className='text-default min-h-screen bg-white'>
         <NavbarComponent bgColor='bg-gray-100'/>
         <div className='flex'>
            <SideBarComponent/>
            <div>
               {<Outlet/>}
            </div>
         </div>
         <FooterComponent/>
      </div>

   );
}