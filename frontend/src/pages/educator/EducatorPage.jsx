import React from 'react';
import { Outlet } from 'react-router-dom';

export default function EducatorPage() {

   return (
      <div className="text-4xl">
         <h2>EducatorPage</h2>
         <div>
            {<Outlet />}
         </div>
      </div>

   );
}