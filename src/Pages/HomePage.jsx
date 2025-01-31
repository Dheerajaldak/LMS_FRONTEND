import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import HomePageImage from "../Assets/Images/elearning.png";

function HomePage() {
  return (
    <HomeLayout>
      <div className="pt-10 text-white flex flex-col md:flex-row items-center justify-center gap-10 mx-4 md:mx-16 h-[90vh]">
        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            Find out best&nbsp;
            <span className="text-yellow-500 font-bold">Online Courses</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200">
            We have a large library of courses taught by highly skilled and
            qualified faculties at a very affordable cost.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 mt-6 flex flex-col sm:flex-row items-center sm:justify-start">
            <Link to="/courses">
              <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out mb-4 sm:mb-0">
                Explore courses
              </button>
            </Link>
            <Link to="/contact">
              <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src={HomePageImage}
            alt="homepage image"
            className="max-w-[300px] sm:max-w-[380px] md:max-w-[380px] w-full h-auto object-contain"
          />
        </div>
      </div>
    </HomeLayout>
  );
}

export default HomePage;
