import { motion, useAnimate } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function CallToAction() {
  const [isHovered, setIsHovered] = useState(false);
  const animation = useRef();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animation.current = animate(
      scope.current,
      { x: "-50%" },
      { duration: 30, ease: "linear", repeat: Infinity }
    );
  }, [animate, scope]);

  useEffect(() => {
    if (animation.current) {
      if (isHovered) {
        animation.current.speed = 0.5; // Decrease speed on hover
      } else {
        animation.current.speed = 1;   // Normal speed when not hovered
      }
    }
  }, [isHovered]); // Dependency on isHovered

  return (
    <section className="py-6">
      <div className="overflow-x-clip p-4 flex">
        <motion.div
          ref={scope}
          className="flex flex-none gap-16 pr-16 text-7xl md:text-8xl font-medium group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="text-lime-400 text-7xl">&#10038;</span>
              <span className="group-hover:text-lime-400">Try it for free</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default CallToAction;