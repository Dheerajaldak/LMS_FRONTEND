import React from "react";
import CourseCard from "../Components/CourseCard";
import { Link } from "react-router-dom";

const CourseSection = () => {
  const courses = [
    {
      title: "Web Development ",
      instructor: "Dheeraj Aldak",
      rating: 4.5,
      reviews: 122,
      price: 10.99,
      imageUrl:
        "https://cdn.pixabay.com/photo/2020/01/26/20/14/computer-4795762_1280.jpg", // Replace with your actual image path
    },
    {
      title: "Machine Learning",
      instructor: "Richard James",
      rating: 4.5,
      reviews: 122,
      price: 10.99,
      imageUrl:
        "https://cdn.pixabay.com/photo/2024/02/09/16/47/robot-8563414_1280.jpg", // Replace with your actual image path
    },
    {
      title: "Logic Buildig",
      instructor: "Richard James",
      rating: 4.5,
      reviews: 122,
      price: 10.99,
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/10/10/14/01/chess-1728482_1280.jpg", // Replace with your actual image path
    },
    {
      title: "Data Science",
      instructor: "Richard James",
      rating: 4.5,
      reviews: 122,
      price: 10.99,
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/04/30/12/34/skyscrapers-4168483_1280.jpg", // Replace with your actual image path
    },
  ];

  return (
    <div className="bg-transparent p-8  dark:text-white">
      <div className="text-center mb-8">
        <p className="text-[1.5rem] font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 inline-block text-transparent bg-clip-text">
          Learn from the best
        </p>

        <p className="text-gray-600 dark:text-gray-400 text-center mx-auto max-w-2xl">
          Discover our top-rated courses across various categories. From coding
          and design to business and wellness, our courses are crafted to
          deliver results.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course.title}
            className="border border-white/30   rounded-lg overflow-hidden shadow-sm dark:border-gray-700"
          >
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">
                {course.instructor}
              </p>
              <div className="flex items-center mb-2">
                {/* Replaced the 5 individual star icons with a simpler method */}
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 text-yellow-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3.22l1.62 4.97h5.28l-4.25 3.08 1.62 4.97-4.27-3.09-4.27 3.09 1.62-4.97-4.25-3.08h5.28L10 3.22z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {course.rating.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500 ml-1 dark:text-gray-400">
                  ({course.reviews})
                </span>
              </div>
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                ₹ {course.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/courses">
          <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 font-semibold py-2 px-4 rounded dark:text-white">
            Show all courses
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseSection;
