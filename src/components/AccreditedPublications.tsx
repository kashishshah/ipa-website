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

const AccreditedPublications = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Water bubble animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = 600);

    class Bubble {
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 20;
        this.radius = Math.random() * 10 + 5;
        this.speed = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.y -= this.speed;

        return this.y > -this.radius * 2;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(173, 216, 250, ${this.opacity})`;
        ctx.fill();

        // Highlight
        ctx.beginPath();
        ctx.arc(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          this.radius * 0.2,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 2})`;
        ctx.fill();
      }
    }

    const bubbles: Bubble[] = [];
    const maxBubbles = 50;

    const addBubble = () => {
      if (bubbles.length < maxBubbles) {
        bubbles.push(new Bubble());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Add new bubbles occasionally
      if (Math.random() < 0.1) {
        addBubble();
      }

      // Update and draw bubbles
      for (let i = bubbles.length - 1; i >= 0; i--) {
        if (!bubbles[i].update()) {
          bubbles.splice(i, 1);
        } else {
          bubbles[i].draw(ctx);
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

    // Initial bubbles
    for (let i = 0; i < 10; i++) {
      addBubble();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Publication data
  const publications = [
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2024/03/IPT-2024.png",
      title: "Indian Plumbing Today",
    },
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2023/08/Asset-5.png",
      title: "2022 Uniform Plumbing Code India",
    },
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2023/08/Asset-6.png",
      title: "A Guide to Good Plumbing Practices",
    },
  ];

  return (
    <div className="relative w-full py-16 overflow-hidden">
      {/* Water bubble background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-sky-50 z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Title with water drop decoration */}
        <div className="relative mb-16 text-center">
          <h2 className="text-4xl font-bold text-sky-900 inline-block">
            Accredited Publications
          </h2>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-sky-300 to-blue-500 rounded-full"></div>
        </div>

        {/* Publication Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((publication, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className="bg-white/80 backdrop-blur-sm rounded-xl p-8 flex flex-col items-center text-center shadow-lg border border-sky-100 relative group"
            >
              {/* Water drop decoration */}
              <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-sky-100 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="absolute -bottom-10 -left-10 w-16 h-16 rounded-full bg-blue-100 opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

              {/* Publication Image with reflection effect */}
              <div className="w-40 h-48 relative mb-6">
                <Image
                  src={publication.image || "/placeholder.svg"}
                  alt={publication.title}
                  width={160}
                  height={192}
                  className="object-contain drop-shadow-xl"
                />

                {/* Reflection effect */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-sky-100/30 transform scale-y-[-1] opacity-30 blur-sm"></div>
              </div>

              {/* Publication Title */}
              <h3 className="text-lg font-semibold text-sky-900 mb-6">
                {publication.title}
              </h3>

              {/* Know More Button */}
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="group bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-2 rounded-full shadow-lg flex items-center"
              >
                Know More
                <LucideChevronRight
                  className="ml-1 group-hover:translate-x-1 transition-transform"
                  size={16}
                />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccreditedPublications;
