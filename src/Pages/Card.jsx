import React from 'react';
import { SiConvertio, SiSimpleanalytics } from 'react-icons/si';
import { MdCampaign, MdOutlineAccountCircle } from 'react-icons/md';
import { motion } from 'framer-motion'; // Import Framer Motion

const Card = () => {
  const cards = [
    {
      id: 1,
      icon: <MdCampaign />,
      title: 'Automated Campaign Setup',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, sit ac turpis venenatis.',
    },
    {
      id: 2,
      icon: <SiConvertio />,
      title: 'Lead Scoring and Conversion',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, sit ac turpis venenatis.',
    },
    {
      id: 3,
      icon: <MdOutlineAccountCircle />,
      title: 'Personalized Customer Journeys',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, sit ac turpis venenatis.',
    },
    {
      id: 4,
      icon: <SiSimpleanalytics />,
      title: 'Real-Time Analytics and Optimization',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, sit ac turpis venenatis.',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 max-w-4xl mx-auto">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="bg-[#0e1c30] rounded-lg p-5 text-white flex items-center shadow-md"
          initial={{ opacity: 0, y: 20 }} // Initial position for smooth entry
          animate={{ opacity: 1, y: 0 }} // Fade-in and slide to position
          transition={{
            duration: 0.5,
            delay: index * 0.3, // Stagger each card's animation
          }}
          whileHover={{
            scale: 1.05, // Slight scale-up effect on hover for emphasis
            transition: { duration: 0.2 }, // Smooth transition for scale
          }}
        >
          <div className="bg-white/10 p-6 rounded-full text-2xl text-white mr-5">
            {card.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">{card.title}</h3>
            <p className="text-sm text-white/70">{card.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Card;
