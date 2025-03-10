import React from "react";
import avatar1 from "../../src/Assets/Avatar/avatar-1.png";
import avatar2 from "../../src/Assets/Avatar/avatar-2.png";
import avatar3 from "../../src/Assets/Avatar/avatar-3.png";
import avatar4 from "../../src/Assets/Avatar/avatar-4.png";

import { motion } from "framer-motion";

const testimonials = [
  {
    text: "This product has completely transformed how I manage my projects and deadlines",
    name: "Sophia Perez",
    title: "Director @ Quantum",
    avatarImg: avatar1,
  },
  {
    text: "These AI tools have completely revolutionized our SEO entire strategy overnight",
    name: "Jamie Lee",
    title: "Founder @ Pulse",
    avatarImg: avatar2,
  },
  {
    text: "The user interface is so intuitive and easy to use, it has saved us countless hours",
    name: "Alisa Hester",
    title: "Product @ Innovate",
    avatarImg: avatar3,
  },
  {
    text: "Our team's productivity has increased significantly since we started using this tool",
    name: "Alec Whitten",
    title: "CTO @ Tech Solutions",
    avatarImg: avatar4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="mx-auto px-2">
       
        <h2 className="text-5xl text-center tracking-tighter font-medium text-white">
          Beyond Expectations.
        </h2>
        <p className="text-white/70 text-lg md:text-xl text-center mt-5">
          Our revolutionary AI SEO tools have transformed our clients'
          strategies.
        </p>
        <div
          className="flex overflow-hidden mt-10"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)",
          }}
        >
          <motion.div
            initial={{ translateX: "-50%" }} // Start from the right edge
            animate={{ translateX: "0%" }}
            transition={{
              duration: 60, // Adjust speed as needed
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex gap-5 flex-none"
          >
            
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`} 
                className="border border-white/15 p-6 md:p-10 rounded-xl bg-[linear-gradient(to_bottom_left,rgb(140,69,255,0.1),rgb(255,255,255,0.05))]"
              >
                <div className="text-lg tracking-tight md:text-2xl">
                  "{testimonial.text}"
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <div className="relative ">
                    <img
                      src={testimonial.avatarImg}
                      alt={`Avatar for ${testimonial.name}`}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-lg grayscale"
                    />
                  </div>
                  <div className="">
                    <div>{testimonial.name}</div>
                    <div className="text-white/50 text-sm">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
