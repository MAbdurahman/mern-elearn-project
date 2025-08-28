import React from 'react';
import HeroComponent from '../../components/student/HeroComponent.jsx';
import CompaniesComponent from '../../components/student/CompaniesComponent.jsx';
import CourseSectionComponent
   from '../../components/student/CourseSectionComponent.jsx';


export default function HomePage() {

   return (
      <div className="flex flex-col items-center space-y-7 text-center">
         <HeroComponent />
         <CompaniesComponent />
         <CourseSectionComponent />
      </div>

   );
}