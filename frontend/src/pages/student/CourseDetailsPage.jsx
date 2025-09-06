import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import{toast} from 'react-toastify';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import {useAuth} from '@clerk/clerk-react';
import {AppContext} from '../../context/AppContext.jsx';
import FooterComponent from '../../components/student/FooterComponent.jsx';
import LoadingComponent from '../../components/student/LoadingComponent.jsx';
import {assets} from '../../assets/assets.js';


export default function CourseDetailsPage() {

   const [courseData, setCourseData] = useState(null);
   const [playerData, setPlayerData] = useState(null);
   const [openSections, setOpenSections] = useState({});
   const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);

   const {courseId} = useParams();
   const {getToken} = useAuth();
   const {allCourses, backendURL, currency, userData, calculateChapterTime, calculateCourseDuration, calculateCourseRating, calculateNumberOfLectures } = useContext(AppContext);

   async function fetchCourseData() {
      console.log('fetching course data...');
       const findCourse = allCourses.find(course => course._id === courseId);
      setCourseData(findCourse);
   }

   async function enrollInCourse() {
      console.log('enroll course data...');
   }

   const handleToggleSection = (index) => {
      console.log('handleToggleSection', index);

   }

   useEffect(() => {
      fetchCourseData().then(r => {});
   },[])

   return (
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-20 pt-10 text-left'>
         <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70"></div>
         {/* left column  */}
         <div>
            <h2 className='md:text-course-deatails-heading-large text-course-deatails-heading-small font-semibold text-gray-800'>

            </h2>
         </div>
         {/* right column  */}
         <div>

         </div>
      </div>

   );
}