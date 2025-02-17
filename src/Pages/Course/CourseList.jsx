import React, { useEffect, useState } from "react";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../Components/CourseCard";

const CourseList = () => {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  async function loadCourse() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    loadCourse();
  }, []);

  const filteredCourses = courseData?.filter((course) => {
    const titleMatch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === "All" || course.category === selectedCategory;
    return titleMatch && categoryMatch;
  });

  const categories = ["All", "Fitness", "Music", "Business", "Lifestyle", "Personal Development", "Coding", "Design", "Marketing", "Photography", "Language", "Cooking", "Art", "Science", "Math"]; // Example with more categories

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-8 pl-4 sm:pl-8 lg:pl-20 flex flex-col gap-6 text-white">
        
      <h1 className="font-semibold text-center text-2xl sm:text-4xl">
          Explore the courses made by{" "}
          <span className="font-bold text-yellow-500">Industry experts</span>
        </h1>

        {/* Search Bar */}
        <div className="relative w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search courses.."
            className="w-full bg-gray-800 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Category Filters with Scroll */}
        <div className="w-full max-w-md mx-auto overflow-x-auto whitespace-nowrap flex gap-4 py-2"> {/* Added scroll */}
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === category
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        

        <div className="mb-10 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-14">
          {filteredCourses?.map((element) => (
            <CourseCard key={element._id} data={element} />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseList;