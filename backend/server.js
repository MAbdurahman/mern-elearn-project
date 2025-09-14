/***************************** imports *****************************/
import dotenv from "dotenv";
import colors from "colors";
import app from './app/app.js';
import connectDatabase from './configs/databaseConfig.js';
import connectCloudinary from './configs/cloudinaryConfig.js';

/************************* configure setup *************************/
dotenv.config({path: './configs/config.env'});
colors.enabled = true;

/************************* handling Uncaught exceptions *************************/
process.on('uncaughtException', err => {
   console.log(`uncaughtException ERROR: ${err.stack}`.red);
   console.log(`  ➔  Server:  Shutting down the due to Uncaught Exception!`.yellow);
   process.exit(1);
});

/*********************************** variables ***********************************/
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;
const API_URL = process.env.API_ENV || '/api/v1.0/';
const ADDENDUM = `\t\t...press Ctrl-C to terminate.\n`.white;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

/************************* connect MongoDB and Cloudinary *************************/
connectDatabase().then(() => {});
connectCloudinary().then(() => {});

/********************************** app listening *********************************/
const server = app.listen(PORT, () => {
   console.log(`  ➔  Server:  Listening at ${BACKEND_URL}:${PORT} in ${NODE_ENV} mode!`.yellow);
   console.log(ADDENDUM);
});

/********************** handling unhandled promise rejection **********************/
process.on('unhandledRejection', err => {
   console.log(`unhandledRejection ERROR: ${err.stack}`.red);
   console.log(`  ➔  Server:  Shutting down due to Unhandled Promise Rejection!`.yellow);
   server.close(() => {
      process.exit(1);
   });
});