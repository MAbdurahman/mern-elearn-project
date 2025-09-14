import axios from "axios";
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useAuth, useUser} from '@clerk/clerk-react';
import humanizeDuration from 'humanize-duration';
import {dummyCourses} from '../assets/assets.js';


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

      const token = await getToken();

      const { data } = await axios.get(backendURL + '/api/user/enrolled-courses',
         { headers: { Authorization: `Bearer ${token}` } })

      if (data.success) {
         setEnrolledCourses(data.enrolledCourses.reverse());

      } else (
         toast.error(data.message)

      )

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
      return Math.floor(totalRating / course.courseRatings.length)
   }

   const calculateNumberOfLectures = (course) => {
      console.log('calculateNumberOfLectures', course);
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
      calculateNumberOfLectures
   }
   return (
      <AppContext.Provider value={value}>
         {props.children}
      </AppContext.Provider>
   )
}