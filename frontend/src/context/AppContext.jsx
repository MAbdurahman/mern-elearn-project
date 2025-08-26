import axios from "axios";
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const AppContext = createContext();

export const AppContextProvider = (props) => {
   const backendURL = import.meta.env.VITE_BACKEND_URL;
   const currency = import.meta.env.VITE_CURRENCY;



const value = {}

   return (
      <AppContext.Provider value={value}>
         {props.children}
      </AppContext.Provider>
   )
}