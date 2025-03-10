import React, { useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

import avatar1 from "../../src/Assets/Avatar/avatar-1.png";
import avatar2 from "../../src/Assets/Avatar/avatar-2.png";
import avatar3 from "../../src/Assets/Avatar/avatar-3.png";
import avatar4 from "../../src/Assets/Avatar/avatar-4.png";

const testimonials = [
  {
    quote:
      "This product has completely transformed how I manage my projects and deadlines",
    name: "Sophia Perez",
    title: "Director @ Quantum",
    avatarImg: avatar1,
  },
  {
    quote:
      "These AI tools have completely revolutionized our SEO entire strategy overnight",
    name: "Jamie Lee",
    title: "Founder @ Pulse",
    avatarImg: avatar2,
  },
  {
    quote:
      "The user interface is so intuitive and easy to use, it has saved us countless hours",
    name: "Alisa Hester",
    title: "Product @ Innovate",
    avatarImg: avatar3,
  },
  {
    quote:
      "Our team's productivity has increased significantly since we started using this tool",
    name: "Alec Whitten",
    title: "CTO @ Tech Solutions",
    avatarImg: avatar4,
  },
];

const SecondTesti = () => {
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState(0);

  return (
    <section className="pb-[1000px]">
      <div className="container p-10">
        <div className="section-border">
          <div className="relative rounded-3xl px-6 md:px-10 lg:px-16 py-16 lg:py-16 border-4 flex flex-col items-center md:flex-row gap-3 lg:mx-20 hover:border-purple-300 transition-all duration-500">
            <div className="absolute size-30 text-5xl text-purple-300 top-0 left-6 md:left-16 -translate-y-1/2 ">
              <FaQuoteLeft />
            </div>
            {testimonials.map((testimonial, index) => (
              <React.Fragment key={testimonial.name}>
                {selectedTestimonialIndex === index && (
                  <blockquote
                    key={testimonial.name}
                    className="flex flex-col lg:flex-row gap-12"
                  >
                    <p className="text-xl md:text-2xl font-medium">
                      {testimonial.quote}
                    </p>
                    <cite className="not-italic ">
                      <img
                        src={testimonial.avatarImg}
                        alt={testimonial.name}
                        className="rounded-xl size-28 max-w-none" // Added mr-4 for spacing
                        // width={112} // Adjusted width to match size-28 (28 * 4)
                        // height={112} // Adjusted height to match size-28 (28 * 4)
                      />
                      <div>
                        <div className="font-bold mt-4">{testimonial.name}</div>
                        <div className="text-xs text-gray-400 mt-2">
                          {testimonial.title}
                        </div>
                      </div>
                    </cite>
                  </blockquote>
                )}
              </React.Fragment>
            ))}
            <div className="flex justify-center gap-2  md:flex-col">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className={`size-1.5 rounded-full mx-1 cursor-pointer ${
                    selectedTestimonialIndex === index
                      ? "bg-blue-500"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedTestimonialIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondTesti;
