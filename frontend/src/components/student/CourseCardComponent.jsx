import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {AppContext} from '../../context/AppContext.jsx';
import {assets} from '../../assets/assets.js';



export default function CourseCardComponent({course}) {
   const {currency  } = useContext(AppContext);


   console.log(course);

   return (
      <Link onClick={() => scrollTo(0, 0)} to={'/course/' + course._id} className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg">
         <img className="w-full" src={course.courseThumbnail} alt='Course Thumbnail' />
         <div className="p-3 text-left">
            <h3 className="text-base font-semibold">{course.courseTitle}</h3>
            <p className="text-gray-500">{course.educator.name}</p>
            <div className="flex items-center space-x-2">
               <p>4.5</p>
               <div className="flex">
                  {[...Array(5)].map((_, index) => (
                     <img
                        key={index}
                        className="w-3.5 h-3.5"
                        src={assets.star}
                        alt="Star Rating icon"
                     />
                  ))}
               </div>
               <p className="text-gray-500">22</p>
            </div>
            <p className="text-base font-semibold text-gray-800">{currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
         </div>
      </Link>

   );
}