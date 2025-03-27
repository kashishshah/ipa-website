"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as THREE from "three";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Three.js Water Simulation
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    // Water particles setup
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      // Random initial positions
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Random initial velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;

      // Random sizes
      sizes[i] = Math.random() * 0.5 + 0.1;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Create shader material for better water particles
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0xd2ebfc) },
      },
      vertexShader: `
            attribute float size;
            uniform float time;
            varying vec3 vPosition;
            
            void main() {
              vPosition = position;
              vec3 pos = position;
              pos.y += sin(time * 0.5 + position.x) * 0.2;
              pos.x += cos(time * 0.3 + position.z) * 0.1;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
      fragmentShader: `
            uniform vec3 color;
            varying vec3 vPosition;
            
            void main() {
              // Create circular particles
              vec2 center = gl_PointCoord - vec2(0.5);
              float dist = length(center);
              if (dist > 0.5) discard;
              
              // Add radial gradient
              float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
              
              // Add some color variation based on position
              vec3 finalColor = color + vec3(vPosition.x * 0.01, vPosition.y * 0.01, vPosition.z * 0.01);
              
              gl_FragColor = vec4(finalColor, alpha * 0.7);
            }
          `,
      transparent: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    camera.position.z = 10;

    // Resize handler
    const resizeRenderer = () => {
      const width = canvasRef.current?.clientWidth || window.innerWidth;
      const height = canvasRef.current?.clientHeight || 600;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Update time uniform for shader
      const elapsedTime = clock.getElapsedTime();
      particlesMaterial.uniforms.time.value = elapsedTime;

      // Animate particles
      const positionAttribute = particlesGeometry.getAttribute("position");
      for (let i = 0; i < particlesCount; i++) {
        // Update particle positions
        positionAttribute.array[i * 3] += velocities[i * 3];
        positionAttribute.array[i * 3 + 1] += velocities[i * 3 + 1];
        positionAttribute.array[i * 3 + 2] += velocities[i * 3 + 2];

        // Bounce off boundaries
        if (Math.abs(positionAttribute.array[i * 3]) > 25)
          velocities[i * 3] *= -1;
        if (Math.abs(positionAttribute.array[i * 3 + 1]) > 10)
          velocities[i * 3 + 1] *= -1;
        if (Math.abs(positionAttribute.array[i * 3 + 2]) > 5)
          velocities[i * 3 + 2] *= -1;
      }
      positionAttribute.needsUpdate = true;

      // Rotate the entire particle system slightly
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

      renderer.render(scene, camera);
    };

    // Initial setup
    resizeRenderer();
    animate();

    // Add resize listener
    window.addEventListener("resize", resizeRenderer);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeRenderer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

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
    <div className="relative w-full h-[200px] md:h-[350px] lg:h-[550px]">
      {/* Water background animation */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 z-10" />

      {/* Carousel content */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-[85%] h-full flex items-center justify-center z-20">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full h-full flex flex-col items-center justify-center"
            >
              <div className="relative w-full h-full overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={images[currentIndex].src || "/placeholder.svg"}
                  alt={images[currentIndex].alt}
                  fill
                  className="object-cover"
                  priority
                />
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
            className="absolute left-1 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-1 md:p-3 rounded-full shadow-lg z-30"
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
            className="absolute right-1 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-1 md:p-3 rounded-full shadow-lg z-30"
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
    </div>
  );
};

export default Carousel;
