/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Animation variants
const timelineItemVariants = {
  hidden: (isEven: boolean) => ({
    opacity: 0.2, // Start with a bit of opacity for a smoother effect
    x: isEven ? 60 : -60, // Slightly increased for a natural transition
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7, // Slightly longer duration for smoothness
      ease: "easeInOut", // More natural transition effect
    },
  },
};

const yearBadgeVariants = {
  initial: { scale: 0.9, opacity: 0.8 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  hover: { scale: 1.1, transition: { duration: 0.2, ease: "easeOut" } },
  tap: { scale: 0.95 },
};

const IPAMilestones = () => {
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const [isInView, setIsInView] = useState<Record<string, boolean>>({});
  const timelineRef = useRef<HTMLDivElement>(null);
  const [, setIsMobile] = useState(false);

  // Milestone data
  const milestones = [
    {
      year: "2023",
      image:
        "https://indianplumbing.org/wp-content/uploads/2024/03/Plumb-talk.png",
      description: "Launch of an IPA video series based on AGPP Chapters",
    },
    {
      year: "2022",
      image: "https://indianplumbing.org/wp-content/uploads/2024/03/WAC-1.png",
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

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Set first milestone as active on initial load
  useEffect(() => {
    if (milestones.length > 0 && !activeYear) {
      setActiveYear(milestones[0].year);

      // Initialize all milestones as not in view
      const initialInViewState: Record<string, boolean> = {};
      milestones.forEach((milestone) => {
        initialInViewState[milestone.year] = false;
      });
      setIsInView(initialInViewState);
    }
  }, [milestones, activeYear]);

  // Handle scroll to observe which milestone is in view
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineItems = timelineRef.current.querySelectorAll("[data-year]");
      const viewportHeight = window.innerHeight;

      timelineItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const year = item.getAttribute("data-year");

        if (!year) return;

        // Check if item is in viewport (with some buffer)
        const isVisible =
          rect.top <= viewportHeight * 0.75 &&
          rect.bottom >= viewportHeight * 0.25;

        setIsInView((prev) => ({
          ...prev,
          [year]: isVisible,
        }));

        // Set the first visible item as active
        if (isVisible && !activeYear) {
          setActiveYear(year);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeYear]);

  // Handle clicking on a year
  const handleYearClick = (year: string) => {
    setActiveYear(year);

    // Scroll to the selected milestone
    const element = document.querySelector(`[data-year="${year}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="relative w-full py-12 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-blue-100 opacity-30"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 rounded-full bg-blue-200 opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="relative mb-16 text-center">
          <h2 className="text-4xl font-bold text-sky-900 inline-block">
            IPA Milestones
          </h2>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-sky-300 to-blue-500 rounded-full"></div>
        </div>

        {/* Horizontal Year Navigation (visible on all screens) */}
        <div className="flex justify-center mb-8 overflow-x-auto py-2 px-4 gap-4 max-w-full">
          {milestones.map((milestone) => (
            <motion.button
              key={`year-nav-${milestone.year}`}
              variants={yearBadgeVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleYearClick(milestone.year)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-bold transition-all duration-300 ${
                activeYear === milestone.year
                  ? "bg-blue-600 text-white shadow-lg scale-110"
                  : "bg-white text-blue-600 border border-blue-300 hover:border-blue-500"
              }`}
            >
              {milestone.year}
            </motion.button>
          ))}
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative mt-8">
          {/* Center line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 transform -translate-x-1/2 rounded-full"></div>

          {/* Timeline Items */}
          <div className="relative space-y-12 md:space-y-24">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={milestone.year}
                  data-year={milestone.year}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Year Badge (Mobile) */}
                  <div className="md:hidden absolute -top-6 left-0 right-0 flex justify-center">
                    <motion.div
                      variants={yearBadgeVariants}
                      initial="initial"
                      animate="animate"
                      className={`px-4 py-1 rounded-full font-bold text-lg ${
                        activeYear === milestone.year
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {milestone.year}
                    </motion.div>
                  </div>

                  {/* Timeline Content */}
                  <motion.div
                    variants={timelineItemVariants}
                    initial="hidden"
                    animate={isInView[milestone.year] ? "visible" : "hidden"}
                    custom={isEven}
                    className={`w-full md:w-[calc(50%-2rem)] p-6 ${
                      activeYear === milestone.year
                        ? "bg-white shadow-xl rounded-xl border-2 border-blue-500"
                        : "bg-white/80 shadow-md rounded-xl"
                    } transition-all duration-500`}
                  >
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      {/* Image Container */}
                      <div
                        className={`relative w-32 h-32 rounded-full overflow-hidden border-4 ${
                          activeYear === milestone.year
                            ? "border-blue-500"
                            : "border-blue-200"
                        } shadow-md flex-shrink-0`}
                      >
                        <Image
                          src={milestone.image || "/placeholder.svg"}
                          alt={milestone.description}
                          fill
                          sizes="(max-width: 768px) 100vw, 128px"
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        {/* Year Badge (Desktop) */}
                        <div className="hidden md:block mb-2">
                          <span
                            className={`inline-block px-4 py-1 rounded-full font-bold text-lg ${
                              activeYear === milestone.year
                                ? "bg-blue-600 text-white"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {milestone.year}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-blue-800 text-lg leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Center Point (Desktop) */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className={`w-6 h-6 rounded-full ${
                        activeYear === milestone.year
                          ? "bg-blue-600 ring-4 ring-blue-200"
                          : "bg-blue-400"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPAMilestones;
