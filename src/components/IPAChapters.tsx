"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LucideChevronRight } from "lucide-react";

// Card hover animation
const cardVariants = {
  hover: {
    scale: 1.05,
    y: -10,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 },
  },
  initial: {
    scale: 1,
    y: 0,
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
};

// Button animation
const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

const IPAChapters = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Water droplet animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = 600);

    class Droplet {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = -20;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.y += this.speed;

        return this.y < height + 20;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.size, this.y - this.size * 3);
        ctx.lineTo(this.x + this.size, this.y - this.size * 3);
        ctx.closePath();

        ctx.fillStyle = `rgba(0, 51, 102, ${this.opacity})`;
        ctx.fill();
      }
    }

    const droplets: Droplet[] = [];
    const maxDroplets = 100;

    const addDroplet = () => {
      if (droplets.length < maxDroplets) {
        droplets.push(new Droplet());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Add new droplets occasionally
      if (Math.random() < 0.2) {
        addDroplet();
      }

      // Update and draw droplets
      for (let i = droplets.length - 1; i >= 0; i--) {
        if (!droplets[i].update()) {
          droplets.splice(i, 1);
        } else {
          droplets[i].draw(ctx);
        }
      }

      requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = 600;
    };

    window.addEventListener("resize", handleResize);
    animate();

    // Initial droplets
    for (let i = 0; i < 20; i++) {
      addDroplet();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Chapter data
  const chapters = [
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2023/09/1568017953_ahmedabad.jpg",
      name: "Ahmedabad",
      email: "ahmedabad@indianplumbing.org",
      mobile: "+919925427747",
    },
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2024/03/1711004846_amrv.jpg",
      name: "Amaravati",
      email: "amaravati@indianplumbing.org",
      mobile: "+917030186644",
    },
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2023/09/1568017991_bangaluru.jpg",
      name: "Bengaluru",
      email: "bengaluru@indianplumbing.org",
      mobile: "+919448123319",
    },
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2023/09/1568018027_chandigarh.jpg",
      name: "Chandigarh",
      email: "chandigarh@indianplumbing.org",
      mobile: "+911814627070",
    },
  ];

  return (
    <div className="relative w-full py-16 overflow-hidden">
      {/* Water droplet background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 to-white z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Title with water drop decoration */}
        <div className="relative mb-16 text-center">
          <h2 className="text-4xl font-bold text-sky-900 inline-block">
            IPA Chapters
          </h2>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-sky-300 to-blue-500 rounded-full"></div>
        </div>

        {/* Chapter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chapters.map((chapter, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-sky-100 relative group"
            >
              {/* Water drop decoration */}
              <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-sky-100 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>

              {/* Chapter Image with overlay */}
              <div className="w-full h-40 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sky-900/30 z-10"></div>
                <Image
                  src={chapter.image || "/placeholder.svg"}
                  alt={chapter.name}
                  width={400}
                  height={160}
                  className="w-full h-full object-cover"
                />

                {/* Animated water overlay on hover */}
                <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Chapter Name */}
                <h3 className="text-lg font-semibold text-sky-900 mb-3">
                  {chapter.name}
                </h3>

                {/* Contact Info */}
                <div className="space-y-1 mb-4">
                  <p className="text-sm text-sky-600 flex items-center">
                    <span className="w-6">E:</span> {chapter.email}
                  </p>
                  <p className="text-sm text-sky-600 flex items-center">
                    <span className="w-6">M:</span> {chapter.mobile}
                  </p>
                </div>

                {/* Know More Button */}
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="text-sky-700 flex items-center text-sm font-medium group"
                >
                  Know More
                  <LucideChevronRight
                    className="ml-1 group-hover:translate-x-1 transition-transform"
                    size={16}
                  />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="group bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center mx-auto"
          >
            View More
            <LucideChevronRight
              className="ml-1 group-hover:translate-x-1 transition-transform"
              size={18}
            />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default IPAChapters;
