"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Animation variants for the image transition
const imageVariants = {
  enter: { opacity: 0, x: 100 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const Carousel = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of images for the carousel
  const images = [
    {
      src: "https://indianplumbing.org/wp-content/uploads/2025/01/02-IPT-March-2025-web-pointer-768x401.jpg",
      alt: "IPT March 2025",
    },
    {
      src: "https://indianplumbing.org/wp-content/uploads/2024/03/Plumbex_web_banner_02-768x400.jpg",
      alt: "Plumbex Web Banner",
    },
  ];

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
      color: 0x1e90ff, // Blue color for water
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

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Handle pagination dot click
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-[85%] h-[550px] bg-white overflow-hidden rounded-lg">
      {/* Three.js water effect background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-20"
      />

      {/* Carousel content */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              width={900}
              height={900}
              className="rounded-lg object-fill w-full h-full"
            />
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots */}
        <div className="absolute bottom-4 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index ? "bg-blue-600 scale-125" : "bg-blue-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
