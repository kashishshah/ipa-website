"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

// Animation variants for buttons
const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

// Animation for the thumbnail
const thumbnailVariants = {
  hover: { scale: 1.03, transition: { duration: 0.3 } },
};

const AboutSection = () => {
  const canvasRef = useRef(null);

  // Three.js setup for water effect background
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

    // Create a plane for the water effect
    const geometry = new THREE.PlaneGeometry(50, 10, 50, 50);
    const material = new THREE.MeshBasicMaterial({
      color: 0x1e90ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 5;

    // Animate the water effect
    const animate = () => {
      requestAnimationFrame(animate);
      plane.rotation.x += 0.01;
      plane.rotation.y += 0.01;
      const time = Date.now() * 0.001;
      const positions = plane.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        positions.setZ(
          i,
          Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 0.5
        );
      }
      positions.needsUpdate = true;
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
    <div className="relative w-full bg-blue-50 overflow-hidden py-10 md:py-16">
      {/* Three.js water effect background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-20"
      />

      {/* Main content */}
      <div className="relative flex flex-col md:flex-row items-center justify-center lg:px-16 xl:px-24 max-w-7xl mx-auto">
        {/* Left: Text Section */}
        <div className="w-full md:w-1/2 p-4 md:p-6 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-4">
            Indian Plumbing Association
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-blue-700 mb-6 leading-relaxed text-justify">
            {`Indian Plumbing Association is the NGO and an apex body of plumbing
            professionals in India. Established in 1993, with the objective to
            promote development of plumbing and building services industry, IPA
            membership is open to everyone engaged directly or indirectly with
            the construction industry. Indian Plumbing Association (IPA) has
            5000+ members, across the country from every segment of the building
            industry including Consultancy, Manufacturing, Contracting, Trading,
            Academia and Architecture.`}
          </p>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="border border-blue-600 text-blue-600 hover:text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            Know More
          </motion.button>
        </div>

        {/* Right: Video Section */}
        <div className="w-full md:w-1/2 flex justify-center p-4 md:p-6">
          <motion.div
            variants={thumbnailVariants}
            whileHover="hover"
            className="w-full max-w-lg"
          >
            {/* Video Thumbnail */}
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/asp8ixCdmzY?si=j-65oUg306uFyOoE"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="rounded-lg shadow-lg"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
