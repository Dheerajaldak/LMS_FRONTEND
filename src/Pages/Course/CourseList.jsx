import React, { useEffect } from "react";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../Components/CourseCard";

const CourseList = () => {
  const dispatch = useDispatch();

  const { courseData } = useSelector((state) => state.course);

  async function loadCourse() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    loadCourse();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-8 pl-4 sm:pl-8 lg:pl-20 flex flex-col gap-10 text-white">
        <h1 className="font-semibold text-center text-2xl sm:text-4xl">
          Explore the courses made by{" "}
          <span className="font-bold text-yellow-500">Industry experts</span>
        </h1>
        <div className="mb-10 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-14">
          {courseData?.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })}
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseList;
