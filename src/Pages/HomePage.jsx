// import React from "react";
// import HomeLayout from "../Layouts/HomeLayout";
// import { Link } from "react-router-dom";
// import HomePageImage from "../Assets/Images/elearning.png";

// function HomePage() {
//   return (
//     <HomeLayout>
//       <div className="pt-10 text-white flex flex-col sm:flex-row items-center justify-center gap-10 mx-4 sm:mx-16 h-[90vh]">
//         {/* Image Section (order-first on mobile to appear first) */}
//         <div className="w-full sm:w-1/2 flex items-center justify-center order-1 sm:order-2 mt-6 sm:mt-0">
//           <img
//             src={HomePageImage}
//             alt="homepage image"
//             className="max-w-[250px] sm:max-w-[350px] md:max-w-[380px] w-full h-auto object-contain"
//           />
//         </div>

//         {/* Text Section (order-second on mobile) */}
//         <div className="w-full sm:w-1/2 space-y-6 text-center sm:text-left order-2 sm:order-1">
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
//             Find out best&nbsp;
//             <span className="text-yellow-500 font-bold">Online Courses</span>
//           </h1>
//           <p className="text-lg sm:text-xl lg:text-2xl text-gray-200">
//             We have a large library of courses taught by highly skilled and
//             qualified faculties at a very affordable cost.
//           </p>
//           <div className="space-y-4 sm:space-y-0 sm:space-x-4 mt-6 flex flex-col sm:flex-row items-center sm:justify-start">
//             {/* Buttons */}
//             <div className="w-full flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
//               <Link to="/courses">
//                 <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out mb-4 sm:mb-0 w-full sm:w-auto">
//                   Explore courses
//                 </button>
//               </Link>
//               <Link to="/contact">
//                 <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out w-full sm:w-auto">
//                   Contact Us
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//     </HomeLayout>
//   );
// }

// export default HomePage;
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HomePageImage from "../Assets/Images/elearning.png";
import { gsap } from "gsap";

function HomePage() {
  useEffect(() => {
    // Typing effect for the paragraph text
    const text = document.querySelector(".homepage-description");
    const textContent = text.textContent;
    text.textContent = "";

    let i = 0;
    const typingEffect = () => {
      text.textContent += textContent.charAt(i);
      i++;
      if (i < textContent.length) {
        setTimeout(typingEffect, 50); // Reduced delay for faster typing effect (from 100 to 50 ms)
      }
    };
    typingEffect();

    // Animating the Image
    gsap.from(".homepage-image", {
      opacity: 0,
      x: -100,
      duration: 1.5,
      ease: "power3.out",
    });

    // Animating the Title
    gsap.from(".homepage-title", {
      opacity: 0,
      y: 50,
      duration: 1.2,
      delay: 0.5,
      ease: "power3.out",
    });

    // Animating the Buttons
    // gsap.from(".homepage-button", {
    //   opacity: 0,            // Start with opacity 0 (invisible)
    //   scale: 0.5,            // Start at half size
    //   y: 30,                 // Start slightly lower
    //   duration: 1.2,         // Duration of the animation
    //   delay: 1.5,            // Delay before starting animation
    //   ease: "back.out(1.7)",  // Ease for a nice growth effect
    //   stagger: 0.3,          // Stagger effect to animate buttons one by one
    // });
  }, []);

  return (
    <>
      <div className="pt-10 text-white flex flex-col sm:flex-row items-center justify-center gap-10 mx-4 sm:mx-16 h-[90vh]">
        {/* Image Section */}
        <div className="w-full sm:w-1/2 flex items-center justify-center order-1 sm:order-2 mt-6 sm:mt-0">
          <img
            src={HomePageImage}
            alt="homepage image"
            className="max-w-[250px] sm:max-w-[350px] md:max-w-[380px] w-full h-auto object-contain homepage-image"
          />
        </div>

        {/* Text Section */}
        <div className="w-full sm:w-1/2 space-y-6 text-center sm:text-left order-2 sm:order-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold homepage-title">
            Find out best&nbsp;
            <span className="text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text font-bold">
              Online Courses
            </span>
          </h1>

          {/* Paragraph with Typing Effect */}
          <p className="homepage-description text-lg sm:text-xl lg:text-2xl text-gray-200 tracking-wide leading-relaxed">
            We have a large library of courses taught by highly skilled and
            qualified faculties at a very affordable cost. Explore the best
            learning opportunities online.
          </p>

          <div className="mt-6 w-full sm:w-auto flex flex-col sm:flex-row items-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Buttons Section */}
            <div className="w-full flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Link to="/courses">
                <button className="homepage-button bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out mb-4 sm:mb-0 w-full sm:w-auto">
                  Explore courses
                </button>
              </Link>
              <Link to="/contact">
                <button className="homepage-button border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out w-full sm:w-auto">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
