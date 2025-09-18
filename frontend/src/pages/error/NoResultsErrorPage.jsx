import {assets} from '../../assets/assets.js';


export default function NoResultsErrorPage() {

   return (
      <div
         className="flex flex-col h-screen justify-center items-center bg-transparent">
         <div className="flex flex-col items-center">
            <img className='max-h-32' src={assets.no_results} alt="Sad Face" />
            <p className="text-2xl font-semibold tracking-wide text-center  text-gray-600 mb-6">Sorry, no results!</p>
            <a href='/'
               className="px-4 py-2 font-semibold tracking-wider text-neutral-100 bg-neutral-800 rounded-md hover:bg-neutral-600 transition-all duration-200 ease-in-out">
               Go To Home
            </a>
         </div>
      </div>

   );
}