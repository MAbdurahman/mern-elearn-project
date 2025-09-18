import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {AppContext} from '../../context/AppContext.jsx';
import CourseCardComponent from './CourseCardComponent.jsx';


export default function CourseSectionComponent() {

   const { allCourses} = useContext(AppContext);

   return (
      <div id='courses' className="py-16 md:px-40 px-8">
         <h2 className="text-4xl font-bold text-gray-800">Learn from the best</h2>
         <p className="md:text-base text-sm text-gray-500 mt-3">
            Discover our top-rated courses across various categories. From coding and design to<br /> business and wellness, our courses are crafted to deliver results.
         </p>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-4">
            {allCourses.slice(0, 4).map((course, index) => <CourseCardComponent key={index} course={course} />)}
         </div>
         <Link to={'/course-list'} onClick={() => scrollTo(0, 0)} className='text-gray-500 border border-gray-500/30 px-10 py-3 uppercase rounded'>Show all courses</Link>
      </div>

   );
}