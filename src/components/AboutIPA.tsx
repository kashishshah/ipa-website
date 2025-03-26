/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Data for the statistics
  const stats = [
    {
      key: "chapters",
      icon: <FaBuilding className="text-sky-600 text-4xl mb-4" />,
      number: 28,
      label: "IPA Chapters",
      description:
        "To date, IPA has 27 Chapters set up across the country with duly elected Executive Committees to serve the society. All IPA volunteers are committed towards making India, a country with Better Plumbing for Better Living.",
    },
    {
      key: "members",
      icon: <FaUsers className="text-sky-600 text-4xl mb-4" />,
      number: 7000,
      label: "Members",
      description:
        "IPA boasts 7,000+ Members across the Real Estate Eco-System including those in the government, private as well as the financial sector.",
    },
    {
      key: "events",
      icon: <FaCalendarAlt className="text-sky-600 text-4xl mb-4" />,
      number: 25000,
      label: "Events",
      description:
        "IPA has an established track record of many years in undertaking skill development activities and has done more than 25,000 trainings in the real estate sector through different programs under the Government and its other initiatives.",
    },
  ];

  // Flowing water background animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = 600);

    // Wave parameters
    const waves = [
      {
        y: height * 0.2,
        length: 0.01,
        amplitude: 20,
        speed: 0.01,
        color: "rgba(173, 216, 230, 0.2)",
      },
      {
        y: height * 0.4,
        length: 0.02,
        amplitude: 15,
        speed: 0.015,
        color: "rgba(135, 206, 235, 0.15)",
      },
      {
        y: height * 0.6,
        length: 0.015,
        amplitude: 25,
        speed: 0.008,
        color: "rgba(100, 149, 237, 0.1)",
      },
    ];

    let time = 0;

    const drawWave = (wave: any) => {
      ctx.beginPath();

      // Draw the wave
      for (let x = 0; x <= width; x += 5) {
        const y =
          wave.y +
          Math.sin(x * wave.length + time * wave.speed) * wave.amplitude;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      // Complete the wave shape
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      // Fill the wave
      ctx.fillStyle = wave.color;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw each wave
      waves.forEach(drawWave);

      // Increment time
      time += 1;

      requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = 600;
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      className="relative w-full py-16 overflow-hidden"
    >
      {/* Flowing water background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Title with water drop decoration */}
        <div className="relative mb-16 text-center">
          <h2 className="text-4xl font-bold text-sky-900 inline-block">
            About IPA
          </h2>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-sky-300 to-blue-500 rounded-full"></div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-sky-100 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {/* Decorative water drop in corner */}
              <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-sky-100 opacity-50"></div>
              <div className="absolute -bottom-10 -left-10 w-16 h-16 rounded-full bg-blue-100 opacity-40"></div>

              {/* Icon with animated background */}
              <div className="relative mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-100 to-blue-200 animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-inner">
                  {stat.icon}
                </div>
              </div>

              {/* Animated Number */}
              <motion.h3
                className="text-5xl font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {animatedNumbers[stat.key] || 0}
                {stat.number > 1000 ? "+" : ""}
              </motion.h3>

              {/* Label */}
              <h4 className="text-xl font-semibold text-sky-900 mb-4">
                {stat.label}
              </h4>

              {/* Description */}
              <p className="text-sky-700 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AboutIPA;
