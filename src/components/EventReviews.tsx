/* eslint-disable @typescript-eslint/no-explicit-any */
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

const EventReviews = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Water ripple effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = 600);

    const ripples: any[] = [];
    const maxRipples = 10;

    class Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 1;
        this.maxRadius = Math.random() * 80 + 20;
        this.speed = Math.random() * 0.8 + 0.2;
        this.alpha = 1;
      }

      update() {
        this.radius += this.speed;
        this.alpha = 1 - this.radius / this.maxRadius;

        return this.radius <= this.maxRadius;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(173, 216, 230, ${this.alpha * 0.5})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    const addRipple = () => {
      if (ripples.length < maxRipples) {
        ripples.push(new Ripple());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Add new ripple occasionally
      if (Math.random() < 0.03) {
        addRipple();
      }

      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (!ripples[i].update()) {
          ripples.splice(i, 1);
        } else {
          ripples[i].draw(ctx);
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

    // Initial ripples
    for (let i = 0; i < 3; i++) {
      addRipple();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Review data
  const reviews = [
    {
      image: "https://indianplumbing.org/wp-content/uploads/2023/09/test1.jpg",
      quote:
        "This is an important Exhibition for Water, Plumbing and Sanitation related services.",
      name: "Shri Hardeep Singh Puri",
      title: "Hon. Minister, Ministry of Housing and urban Affairs",
    },
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2023/09/test1-1.jpg",
      quote:
        "Water Conservation and optimal use of water is crucial and plumbing industry is playing an important role in this daunting task.",
      name: "Dr. C. N. Ashwathnarayan",
      title: "Deputy Chief Minister of Karnataka",
    },
    {
      image: "https://indianplumbing.org/wp-content/uploads/2023/09/test3.jpg",
      quote:
        "We can manufacture pipes and taps, we cannot manufacture water. Therefore, we need to adopt Bharat Tap to minimise water usage. Bharat Tap should become the name for efficiency.",
      name: "Smt. D. Thara",
      title:
        "Additional Secretary, Ministry of Housing and Urban Affairs, and Mission Director, AMRUT 2.0",
    },
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2023/09/test2-1.jpg",
      quote:
        "IPA along with IAPMO has made a tremendous effort in introducing plumbing codes among the Indian Plumbing and Building fraternity.",
      name: "Tushar Giri Nath",
      title: "Chairman - BWSSB (Bangaluru Water Supply and Sewerage Board)",
    },
  ];

  return (
    <div className="relative w-full py-16 overflow-hidden">
      {/* Water ripple background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-30 z-0"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/80 to-white/90 z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Title with water drop decoration */}
        <div className="relative mb-16 text-center">
          <h2 className="text-4xl font-bold text-sky-900 inline-block">
            Event Reviews
          </h2>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-sky-300 to-blue-500 rounded-full"></div>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center border border-sky-100 shadow-lg relative overflow-hidden group"
            >
              {/* Water drop decoration in corner */}
              <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-sky-100 opacity-50 group-hover:opacity-80 transition-opacity"></div>

              {/* Reviewer Image */}
              <div className="w-24 h-24 relative mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-200 to-blue-300 animate-pulse"></div>
                <Image
                  src={review.image || "/placeholder.svg"}
                  alt={review.name}
                  width={96}
                  height={96}
                  className="rounded-full border-2 border-sky-300 object-cover relative z-10"
                />
              </div>

              {/* Review Quote */}
              <div className="relative mb-4">
                <div className="absolute -top-3 -left-1 text-sky-200 text-4xl">
                  &quot;
                </div>
                <p className="text-sky-700 text-sm italic px-4 relative">
                  {review.quote}
                </p>
                <div className="absolute -bottom-3 -right-1 text-sky-200 text-4xl">
                  &quot;
                </div>
              </div>

              {/* Reviewer Name and Title */}
              <h3 className="text-lg font-semibold text-sky-900">
                {review.name}
              </h3>
              <p className="text-sm text-sky-600">{review.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Read More Button */}
        <div className="text-center mt-12">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="group bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center mx-auto"
          >
            Read More
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

export default EventReviews;
