"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import Image from "next/image";

// Card hover animation
const cardVariants = {
  hover: { scale: 1.05, y: -10, transition: { duration: 0.3 } },
  initial: { scale: 1, y: 0 },
};

// Button animation
const buttonVariants = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

const EventCards = () => {
  const canvasRef = useRef(null);

  // Event data (from the image)
  const events = [
    {
      logo: "https://indianplumbing.org/wp-content/uploads/2024/02/Plumbex.jpg", // Replace with actual logo path
      title: "PlumbexIndia 2025",
      date: "24th, 25th & 26th April 2025",
      location: "Hall No. 5, Bharat Mandapam, New Delhi",
      buttonText: "Know More",
    },
    {
      logo: "https://indianplumbing.org/wp-content/uploads/2025/01/31st_IPC_logo1-1024x914.png", // Replace with actual logo path
      title: "31st Indian Plumbing Conference",
      date: "13th, 14th & 15th November 2025",
      location: "Biswa Bangla Mela Prangan, Kolkata",
      buttonText: "Know More",
    },
    {
      logo: "https://indianplumbing.org/wp-content/uploads/2024/03/IPPL-2024-1.png", // Replace with actual logo path
      title: "1st IPL 2024",
      date: "1st August to 30th October 2025",
      location: "",
      buttonText: "Know More",
    },
    {
      logo: "https://indianplumbing.org/wp-content/uploads/2024/03/Neerathon-2024.png", // Replace with actual logo path
      title: "IPA Neerathon",
      date: "16th February 2025",
      location: "Sabarmati Riverfront, Ahmedabad",
      buttonText: "Know More",
    },
  ];

  // Three.js setup for circular water drop bubble animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / 400,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, 400);

    // Create a circular texture for the particles
    const createCircleTexture = () => {
      const size = 32;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");

      // Check if context is null
      if (!context) {
        // Return a default texture or handle the error as needed
        return new THREE.Texture();
      }

      // Draw a circle
      context.beginPath();
      context.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
      context.fillStyle = "#ffffff";
      context.fill();

      return new THREE.CanvasTexture(canvas);
    };

    // Create particles for water drops
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
      velocities[i * 3] = (Math.random() - 0.5) * 0.05; // x velocity
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05; // y velocity
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05; // z velocity
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x1e90ff, // Blue color for water drops
      size: 0.5,
      transparent: true,
      opacity: 0.6,
      map: createCircleTexture(), // Apply circular texture
      alphaTest: 0.5, // Ensure transparency works correctly
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 10;

    // Animate the particles
    const animate = () => {
      requestAnimationFrame(animate);
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Reset particles if they go too far
        if (
          Math.abs(positions[i * 3]) > 25 ||
          Math.abs(positions[i * 3 + 1]) > 10
        ) {
          positions[i * 3] = (Math.random() - 0.5) * 50;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, 400);
      camera.aspect = window.innerWidth / 400;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Three.js water drop bubble animation */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-20"
      />

      {/* Event cards */}
      <div className="relative flex justify-center items-center h-full px-6 space-x-6">
        {events.map((event, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            className="relative bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 w-64 h-[360px] flex flex-col items-center justify-between shadow-lg border border-blue-200"
          >
            {/* Event Logo */}
            <div className="w-32 h-16 relative">
              <Image
                src={event.logo}
                alt={event.title}
                layout="fill"
                objectFit="contain"
                className="rounded"
              />
            </div>

            {/* Event Details */}
            <div className="text-center">
              <h3 className="text-lg font-bold text-blue-900">{event.title}</h3>
              <p className="text-sm text-blue-600 mt-2 font-semibold">
                {event.date}
              </p>
              {event.location && (
                <p className="text-sm text-blue-600 mt-1">{event.location}</p>
              )}
            </div>

            {/* Know More Button */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="border border-blue-600 text-blue-600 hover:text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition"
            >
              {event.buttonText}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventCards;
