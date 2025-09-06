/************************* imports *************************/
import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

/************************* setup config file *************************/
if (process.env.NODE_ENV !== 'production') {
   dotenv.config({path: 'backend/configs/config.env'});
}

/***************************** variables *****************************/
const app = express();
colors.enabled = true;

/**************************** middlewares ****************************/
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}
app.use(helmet());
app.use(
   cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
         "Content-Type",
         "Authorization",
         "Cache-Control",
         "Expires",
         "Pragma",
      ],
      credentials: true,
   })
);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/*************************** import all routes ***************************/
import homeRoute from '../routes/homePageRoute.js';
import clerkRoute from '../routes/clerkRoute.js';

/********************************* routes *********************************/
app.use('/api/v1.0/', homeRoute);
app.use('/api/v1.0/clerk', clerkRoute);


export default app;