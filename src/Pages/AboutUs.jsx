import React, { useEffect } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImage from "../Assets/Images/aboutMainImage.png";
import { celebrities } from "../Constants/CelebrityData";
import CarouselSlide from "../Components/CarouselSlide";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";  // Import the TextPlugin

// Register TextPlugin with GSAP
gsap.registerPlugin(TextPlugin);

function AboutUs() {
  useEffect(() => {
    // Animating the Heading with typing effect
    gsap.from(".aboutus-heading", {
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });

    gsap.to(".aboutus-heading", {
      text: "Empowering Minds, Shaping Futures", // Text to type out
      duration: 9, // Duration for typing effect
      delay: 0.2, // Delay to start after the fade-in
      ease: "power3.out",
    });

    // Animating the Paragraph
    gsap.from(".aboutus-paragraph", {
      opacity: 0,
      y: 50,
      duration: 1.5,
      delay: 0.5,
      ease: "power3.out",
    });

    // Animating the Image
    gsap.from(".aboutus-image", {
      opacity: 0,
      x: 100,
      duration: 1.5,
      ease: "power3.out",
    });

    // Animating the Carousel Slides
    gsap.from(".carousel-slide", {
      opacity: 0,
      y: 30,
      duration: 1.2,
      stagger: 0.2, // Staggering the slides
      ease: "power3.out",
    });
  }, []);

  return (
    <HomeLayout>
      <div className="px-4 sm:px-10 md:px-16 pt-10 text-white">
        {/* Main content (heading, paragraph, image) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Section (Heading and Paragraph) */}
          <section className="w-full md:w-1/2 space-y-6 md:space-y-10 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-yellow-500 font-semibold aboutus-heading">
              {/* This text will be typed by GSAP */}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 aboutus-paragraph">
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
              className="max-w-full h-auto drop-shadow-2xl aboutus-image"
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
                  className="carousel-slide"
                />
              ))}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
