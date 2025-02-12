import React, { useEffect, useState } from "react";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../Components/CourseCard";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseData } = useSelector((state) => state.course);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(9);

  async function loadCourse() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    loadCourse();
  }, [dispatch]);

  // Filter and sort courses based on user inputs
  const filteredCourses = courseData
    .filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((course) => category === "All" || course.category === category)
    .sort((a, b) => {
      if (sortOption === "Newest") {
        return new Date(b.createdAt) - new Date(a.createdAt); // Sorting by newest
      } else if (sortOption === "Highest Rated") {
        return b.rating - a.rating; // Sorting by highest rating
      }
      return 0;
    });

  // Pagination logic
  const totalCourses = filteredCourses.length;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(totalCourses / coursesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-8 pl-4 sm:pl-8 lg:pl-20 flex flex-col gap-10 text-white">
        <h1 className="font-semibold text-center text-2xl sm:text-4xl">
          Explore Courses from <span className="font-bold text-yellow-500">Industry Experts</span>
        </h1>

        {/* Search and Filters Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for a course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/3 py-2 px-4 rounded-md border-2 border-gray-500 text-gray-800 focus:outline-none focus:border-yellow-400"
          />

          <div className="flex gap-4">
            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="py-2 px-4 rounded-md border-2 border-gray-500 focus:outline-none focus:border-yellow-400"
            >
              <option value="All">All Categories</option>
              {/* Dynamically generate categories from course data */}
              {[...new Set(courseData.map(course => course.category))].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="py-2 px-4 rounded-md border-2 border-gray-500 focus:outline-none focus:border-yellow-400"
            >
              <option value="Newest">Newest</option>
              <option value="Highest Rated">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Course Cards */}
        <div className="mb-10 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-14">
          {currentCourses.length > 0 ? (
            currentCourses.map((course) => (
              <CourseCard key={course._id} data={course} />
            ))
          ) : (
            <p className="text-center text-xl text-gray-400">No courses found</p>
          )}
        </div>

        {/* Pagination Section */}
        <div className="flex justify-center gap-4 items-center mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`py-2 px-4 rounded-md text-white bg-gray-700 hover:bg-yellow-500 disabled:opacity-50`}
          >
            Previous
          </button>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`py-2 px-4 rounded-md text-white ${currentPage === index + 1 ? "bg-yellow-400" : "bg-gray-700 hover:bg-yellow-500"}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`py-2 px-4 rounded-md text-white bg-gray-700 hover:bg-yellow-500 disabled:opacity-50`}
          >
            Next
          </button>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseList;
