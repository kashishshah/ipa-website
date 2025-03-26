"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WaterBackground from "../shared/WaterBackground";

// Animation variants for the image transition
const imageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom ease curve for smooth motion
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// Button animation
const buttonVariants = {
  initial: { opacity: 0.7, scale: 1 },
  hover: { opacity: 1, scale: 1.1 },
  tap: { scale: 0.95 },
};

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Array of images for the carousel
  const images = [
    {
      src: "https://indianplumbing.org/wp-content/uploads/2025/01/02-IPT-March-2025-web-pointer-768x401.jpg",
      alt: "IPT March 2025",
      title: "IPT March 2025",
      description: "The latest edition of Indian Plumbing Today magazine",
    },
    {
      src: "https://indianplumbing.org/wp-content/uploads/2024/03/Plumbex_web_banner_02-768x400.jpg",
      alt: "Plumbex Web Banner",
      title: "Plumbex India 2025",
      description: "The premier exhibition for plumbing industry professionals",
    },
  ];

  // Auto-slide every 5 seconds if autoplay is enabled
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  // Handle navigation
  const handleNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Handle pagination dot click
  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full md:w-[85%] mx-auto h-[550px] overflow-hidden rounded-2xl shadow-xl bg-white">
      {/* Water background animation */}
      <WaterBackground height={550} />

      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 z-10" />

      {/* Carousel content */}
      <div className="relative w-full h-full flex items-center justify-center z-20">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full h-full flex flex-col items-center justify-center px-8"
          >
            <div className="relative w-full h-[70%] overflow-hidden rounded-xl shadow-lg">
              <Image
                src={images[currentIndex].src || "/placeholder.svg"}
                alt={images[currentIndex].alt}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Caption */}
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-blue-800">
                {images[currentIndex].title}
              </h2>
              <p className="text-blue-600 mt-2">
                {images[currentIndex].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg z-30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-blue-600" />
        </motion.button>

        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg z-30"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-blue-600" />
        </motion.button>

        {/* Pagination dots */}
        <div className="absolute bottom-4 flex space-x-3 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-blue-600 scale-125 shadow-md"
                  : "bg-blue-300 hover:bg-blue-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
