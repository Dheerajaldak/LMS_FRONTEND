import React from "react";
import { useNavigate } from "react-router-dom";


const CourseCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/course/description/", {state: {...data}})}
      className="relative w-[22rem] h-[430px] sm:h-[500px] rounded-lg cursor-pointer group overflow-hidden bg-transparent border border-gray-300 shadow-xl transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl"
    >
      {/* Image with Hover Zoom Effect */}
      <img
        src={data?.thumbnail?.secure_url}
        alt="course thumbnail"
        className="h-48 w-full object-cover rounded-tl-lg rounded-tr-lg group-hover:scale-110 transition-transform duration-300 ease-in-out"
      />
      
      {/* Overlay for the Image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-300 ease-in-out"></div>

      {/* Card Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-lg">
        <h2 className="text-lg sm:text-xl font-semibold text-white line-clamp-2">
          {data?.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-300 line-clamp-3">
          {data?.description}
        </p>

        {/* Additional Info Section */}
        <div className="text-sm sm:text-base text-gray-200 space-y-1 mt-2">
          <p>
            <span className="text-yellow-400 font-bold">Category:</span> {data?.category}
          </p>
          <p>
            <span className="text-yellow-400 font-bold">Lectures:</span> {data?.numberoflectures}
          </p>
          <p>
            <span className="text-yellow-400 font-bold">Instructor:</span> {data?.createdBy}
          </p>
        </div>
        
        {/* Hover Action Button */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out mt-3">
          <button className="w-full py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400">
            View More 
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
