import axios from "axios";
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useAuth, useUser} from '@clerk/clerk-react';
import humanizeDuration from 'humanize-duration';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
   const backendURL = import.meta.env.VITE_BACKEND_URL;
   const currency = import.meta.env.VITE_CURRENCY;

   const navigate = useNavigate();
   const {getToken} = useAuth();
   const {user} = useUser();

   const [showLogin, setShowLogin] = useState(false);
   const [isEducator,setIsEducator] = useState(false);
   const [allCourses, setAllCourses] = useState([]);
   const [userData, setUserData] = useState(null);
   const [enrolledCourses, setEnrolledCourses] = useState([]);

   /**
    * fetchAllCourses -
    * @returns {Promise<void>}
    */
   const fetchAllCourses = async () => {
      try {

         const {data} = await axios.get(backendURL + '/api/course/all-courses');

         if (data.success) {
            setAllCourses(data.courses);

         } else {
            toast.error(data.message);
         }

      } catch (err) {
         toast.error(err.message);
      }
   }

   /**
    * fetchUserData -
    * @returns {Promise<void>}
    */
   const fetchUserData = async () => {
      try {

         if (user.publicMetadata.role === 'educator') {
            setIsEducator(true);

         }

         const token = await getToken();

         const {data} = await axios.get(backendURL + '/api/user/retrieve-data',
            { headers: { Authorization: `Bearer ${token}` } });

         if (data.success) {
            setUserData(data.user);

         } else (
            toast.error(data.message)

         )

      } catch (err) {
         toast.error(err.message);

      }
   }

   /**
    * fetchUserEnrolledCourses -
    * @returns {Promise<void>}
    */
   const fetchUserEnrolledCourses = async () => {

      try {
         const token = await getToken();

         const {data} = await axios.get(backendURL + '/api/user/enrolled-courses',
            { headers: { Authorization: `Bearer ${token}` } })

         if (data.success) {
            setEnrolledCourses(data.enrolledCourses.reverse());

         } else (
            toast.error(data.message)

         )

      } catch(err) {
         toast.error(err.message);
      }

   }

   /**
    * calculateCourseRating - calculates the average rating of the course
    * @param course - the specified course
    * @returns {number} - returns the average rating of course
    */
   const calculateCourseRating = (course) => {

      if (course.courseRatings.length === 0) {
         return 0
      }

      let totalRating = 0
      course.courseRatings.forEach(rating => {
         totalRating += rating.rating
      })

      return Math.floor(totalRating / course.courseRatings.length);

   }

   /**
    * calculateNumberOfLectures - calculates the total number of lectures in the course
    * @param course
    * @returns {number}
    */
   const calculateNumberOfLectures = (course) => {
      let totalLectures = 0;
      course.courseContent.forEach(chapter => {
         if (Array.isArray(chapter.chapterContent)) {
            totalLectures += chapter.chapterContent.length;
         }
      });
      return totalLectures;
   }

   /**
    * calculateCourseDuration - calculates the total duration of the course
    * @param course
    * @returns {*}
    */
   const calculateCourseDuration = (course) => {
      let time = 0;

      course.courseContent.map(
         (chapter) => chapter.chapterContent.map(
            (lecture) => time += lecture.lectureDuration
         )
      )

      return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });

   }

   /**
    * calculateChapterTime - calculates the total duration of the chapter
    * @param chapter
    * @returns {*}
    */
   const calculateChapterTime = (chapter) => {
      let time = 0;

      chapter.chapterContent.map((lecture) => time += lecture.lectureDuration);

      return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });

   }

   useEffect(() => {
      fetchAllCourses().then(response => {});
   }, []);

   useEffect(() => {
      if (user) {
         fetchUserData().then(response =>{});
         fetchUserEnrolledCourses().then(response => {});

      }
   }, [user]);

   const value = {
      showLogin, setShowLogin,
      backendURL, currency, navigate,
      userData, setUserData, getToken,
      allCourses, fetchAllCourses,
      enrolledCourses, fetchUserEnrolledCourses,
      isEducator, setIsEducator, calculateCourseRating,
      calculateNumberOfLectures, calculateCourseDuration,
      calculateChapterTime
   }
   return (
      <AppContext.Provider value={value}>
         {props.children}
      </AppContext.Provider>
   )
}