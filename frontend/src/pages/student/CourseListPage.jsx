import React, {Fragment, useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {AppContext} from '../../context/AppContext.jsx';
import CourseCardComponent from '../../components/student/CourseCardComponent.jsx';
import SearchBarComponent from '../../components/student/SearchBarComponent.jsx';
import FooterComponent from '../../components/student/FooterComponent.jsx';
import {assets} from '../../assets/assets.js';


export default function CourseListPage() {
   const {input} = useParams();
   const {allCourses, navigate} = useContext(AppContext);
   const [filteredCourse, setFilteredCourse] = useState([]);

   useEffect(() => {

      if (allCourses && allCourses.length > 0) {

         const tempCourses = allCourses.slice()

         input
            ? setFilteredCourse(
               tempCourses.filter(
                  item => item.courseTitle.toLowerCase().includes(input.toLowerCase())
               )
            )
            : setFilteredCourse(tempCourses)

      }

   }, [allCourses, input])

   return (
      <Fragment>
         <div className="relative md:px-36 px-8 pt-20 text-left">
            <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
               <div>
                  <h2 className='text-4xl font-semibold text-gray-800'>Course List</h2>
                  <p className='text-gray-500'><span onClick={() => navigate('/')} className='text-blue-600 cursor-pointer'>Home</span> / <span>Course List</span></p>
               </div>
               <SearchBarComponent data={input} />
            </div>
            {input && <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600'>
               <p>{input}</p>
               <img onClick={() => navigate('/course-list')} className='cursor-pointer' src={assets.cross_icon} alt="Cross icon" />
            </div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
               {filteredCourse.map((course, index) => <CourseCardComponent key={index} course={course} />)}
            </div>
         </div>
         <FooterComponent />
      </Fragment>

   );
}