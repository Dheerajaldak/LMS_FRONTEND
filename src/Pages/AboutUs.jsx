import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImage from "../Assets/Images/aboutMainImage.png";
import { celebrities } from "../Constants/CelebrityData";
import CarouselSlide from "../Components/CarouselSlide";

function AboutUs() {
  return (
    <HomeLayout>
      <div className="px-4 sm:px-10 md:px-16 pt-10 text-white">
        {/* Main content (heading, paragraph, image) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Section (Heading and Paragraph) */}
          <section className="w-full md:w-1/2 space-y-6 md:space-y-10 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-yellow-500 font-semibold">
              Affordable and quality education
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300">
              Our goal is to provide affordable and quality education to the
              world. We are providing a platform for aspiring teachers and
              students to share their skills, creativity, and knowledge with
              each other to empower and contribute to the growth and wellness
              of mankind.
            </p>
          </section>

          {/* Right Section (Image) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0,0,0));",
              }}
              alt="about main image"
              className="max-w-full h-auto drop-shadow-2xl"
              src={aboutMainImage}
            />
          </div>
        </div>

        {/* Carousel Section */}
        <div className="w-full flex justify-center my-16">
          <div className="carousel w-full sm:w-[90%] md:w-[80%] lg:w-2/3 xl:w-1/2">
            {celebrities &&
              celebrities.map((celebrity) => (
                <CarouselSlide
                  {...celebrity}
                  key={celebrity.slideNumber}
                  totalSlides={celebrities.length}
                />
              ))}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
