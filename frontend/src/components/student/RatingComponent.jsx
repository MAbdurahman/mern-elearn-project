import React, { useState, useEffect } from 'react';


export default function RatingComponent({ initialRating, onRate}) {
   const [rating, setRating] = useState(initialRating || 0);

   function handleAddRating(value) {
      setRating(value);
      if (onRate) {
         onRate(value);
      }
   }

   useEffect(() => {
      if (initialRating) {
         setRating(initialRating);
      }
   }, [initialRating]);

   return (
      <div className="flex gap-2">
         {Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            return (
               <span
                  key={index}
                  className={`text-xl sm:text-2xl cursor-pointer transition-colors ${starValue <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                  onClick={() => handleAddRating(starValue)}
               >
                        &#9733;
                    </span>
            );
         })}
      </div>

   );
}