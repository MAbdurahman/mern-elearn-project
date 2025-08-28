import axios from "axios";
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {dummyCourses} from '../assets/assets.js';


export const AppContext = createContext();

export const AppContextProvider = (props) => {
   const backendURL = import.meta.env.VITE_BACKEND_URL;
   const currency = import.meta.env.VITE_CURRENCY;

   const [allCourses, setAllCourses] = useState([])



   const fetchAllCourses = async () => {
      setAllCourses(dummyCourses);

/*      try {

         const { data } = await axios.get(backendURL + '/api/course/all');

         if (data.success) {
            setAllCourses(data.courses)
         } else {
            toast.error(data.message)
         }

      } catch (error) {
         toast.error(error.message)
      }*/

   }
   useEffect(() => {
      fetchAllCourses().then(r => {});
   }, [])

   const value = {
      currency, allCourses
   }
   return (
      <AppContext.Provider value={value}>
         {props.children}
      </AppContext.Provider>
   )
}