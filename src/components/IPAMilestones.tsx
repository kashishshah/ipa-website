"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Card animation for sliding in/out
const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    transition: { duration: 0.5 },
  }),
};

// Button animation
const buttonVariants = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

const IPAMilestones = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Milestone data (from the image)
  const milestones = [
    {
      year: "2023",
      image:
        "https://indianplumbing.org/wp-content/uploads/2024/03/Plumb-talk.png",
      description: "Launch of an IPA video series based on AGPP Chapters",
    },
    {
      year: "2022",
      image: "	https://indianplumbing.org/wp-content/uploads/2024/03/WAC-1.png",
      description: "Launch of Water Audit Council",
    },
    {
      year: "2021",
      image:
        "https://indianplumbing.org/wp-content/uploads/2024/03/Neerathon.png",
      description:
        "Launch of the Run for the cause of water with its debut in Bengaluru",
    },
    {
      year: "2020",
      image:
        "https://indianplumbing.org/wp-content/uploads/2024/03/Summit-2023.png",
      description:
        "IPA launches its leaders forum on Make for India in Built Environment",
    },
  ];

  // Handle navigation
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === milestones.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? milestones.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full py-6">
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 text-center mb-8 sm:mb-12">
          IPA Milestones
        </h2>

        {/* Carousel */}
        <div className="relative flex items-center justify-center">
          {/* Previous Button (Left Side) */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handlePrevious}
            className="absolute left-0 sm:left-4 top-1/3 transform -translate-y-1/2 bg-blue-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          {/* Timeline with Card */}
          <div className="flex flex-col items-center w-full max-w-md relative overflow-hidden h-80">
            {/* Milestone Card with Animation */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-white rounded-lg p-4 flex flex-col items-center text-center shadow-lg border border-blue-500 w-full absolute top-0"
              >
                {/* Year Display */}
                <div className="flex items-center justify-center py-2">
                  <p className="text-lg font-bold text-blue-600">
                    {milestones[currentIndex].year}
                  </p>
                </div>

                {/* Milestone Image */}
                <div className="w-32 h-32 relative mb-2">
                  <Image
                    src={milestones[currentIndex].image}
                    alt={milestones[currentIndex].description}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>

                {/* Milestone Description */}
                <p className="text-base text-blue-600">
                  {milestones[currentIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button (Right Side) */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleNext}
            className="absolute right-0 sm:right-4 top-1/3 transform -translate-y-1/2 bg-blue-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default IPAMilestones;
