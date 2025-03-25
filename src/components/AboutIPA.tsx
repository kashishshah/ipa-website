/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaBuilding, FaUsers, FaCalendarAlt } from "react-icons/fa";

// Animation variants for the section
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AboutIPA = () => {
  const [isInView, setIsInView] = useState(false);
  const controls = useAnimation();
  const [animatedNumbers, setAnimatedNumbers] = useState<
    Record<string, number>
  >({});

  // Data for the statistics
  const stats = [
    {
      key: "chapters",
      icon: <FaBuilding className="text-blue-600 text-4xl mb-4" />,
      number: 28,
      label: "IPA Chapters",
      description:
        "To date, IPA has 27 Chapters set up across the country with duly elected Executive Committees to serve the society. All IPA volunteers are committed towards making India, a country with Better Plumbing for Better Living.",
    },
    {
      key: "members",
      icon: <FaUsers className="text-blue-600 text-4xl mb-4" />,
      number: 7000,
      label: "Members",
      description:
        "IPA boasts 7,000+ Members across the Real Estate Eco-System including those in the government, private as well as the financial sector.",
    },
    {
      key: "events",
      icon: <FaCalendarAlt className="text-blue-600 text-4xl mb-4" />,
      number: 25000,
      label: "Events",
      description:
        "IPA has an established track record of many years in undertaking skill development activities and has done more than 25,000 trainings in the real estate sector through different programs under the Government and its other initiatives.",
    },
  ];

  // Trigger animation when the component is in view
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("about-ipa");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75 && !isInView) {
          setIsInView(true);
          controls.start("visible");

          // Animate numbers
          stats.forEach((stat) => {
            let start = 0;
            const end = stat.number;
            const duration = 2000; // 2 seconds
            const stepTime = 50;
            const steps = duration / stepTime;
            const increment = end / steps;

            const interval = setInterval(() => {
              start += increment;
              setAnimatedNumbers((prev) => ({
                ...prev,
                [stat.key]: Math.floor(start),
              }));

              if (start >= end) {
                clearInterval(interval);
                setAnimatedNumbers((prev) => ({
                  ...prev,
                  [stat.key]: end,
                }));
              }
            }, stepTime);
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls, isInView]);

  return (
    <motion.div
      id="about-ipa"
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
      className="w-full py-12 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-12">
          About IPA
        </h2>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon */}
              {stat.icon}

              {/* Animated Number */}
              <motion.h3
                className="text-5xl font-bold text-blue-600 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {animatedNumbers[stat.key] || 0}
                {stat.number > 1000 ? "+" : ""}
              </motion.h3>

              {/* Label */}
              <h4 className="text-xl font-semibold text-blue-900 mb-4">
                {stat.label}
              </h4>

              {/* Description */}
              <p className="text-blue-700 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AboutIPA;
