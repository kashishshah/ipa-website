"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

// Animation variants
const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const BecomeMember = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height: height * 0.6 }); // Wave section is 60% of container height
      }
    };

    // Initial measurement
    updateDimensions();

    // Add resize listener
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Three.js setup for water waves
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      dimensions.width / dimensions.height,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(dimensions.width, dimensions.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create multiple wave lines with improved aesthetics
    const waveLines: THREE.Line[] = [];
    const numLines = 5;
    const segments = Math.min(
      200,
      Math.max(50, Math.floor(dimensions.width / 10))
    ); // Responsive segments
    const width = 120;

    // Create a gradient of colors from light to deep blue
    const colors = [
      0x6ab7ff, // Light blue
      0x4a9eff,
      0x3a8eff,
      0x2a7eff,
      0x1a6eff,
      0x0a5eff,
      0x0050ff, // Deep blue
    ];

    for (let lineIndex = 0; lineIndex < numLines; lineIndex++) {
      const points = [];
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments - 0.5) * width;
        const y = 0;
        points.push(new THREE.Vector3(x, y, 0));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      // Select color based on line index
      const colorIndex = Math.min(
        colors.length - 1,
        Math.floor(lineIndex / (numLines / colors.length))
      );

      const material = new THREE.LineBasicMaterial({
        color: colors[colorIndex],
        linewidth: 2,
        opacity: 0.8 - (lineIndex / numLines) * 0.5,
        transparent: true,
      });

      const waveLine = new THREE.Line(geometry, material);
      waveLine.position.y = -2 + lineIndex * 0.4;
      waveLine.position.z = -lineIndex * 0.2;
      waveLines.push(waveLine);
      scene.add(waveLine);
    }

    camera.position.z = 5;
    camera.position.y = 2;
    camera.lookAt(0, -2, 0);

    // Animate the wave lines with varying speeds and amplitudes
    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      waveLines.forEach((waveLine, lineIndex) => {
        const positions = waveLine.geometry.attributes.position
          .array as Float32Array;
        const speed = 0.8 + (lineIndex / numLines) * 0.4; // Varying speeds
        const amplitude = 0.3 + (lineIndex / numLines) * 0.3; // Varying amplitudes

        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * width;
          const phaseOffset = lineIndex * 0.3;
          // Create more complex wave pattern with multiple sine waves
          const y =
            Math.sin(x * 0.5 + time * speed + phaseOffset) * amplitude +
            Math.sin(x * 1.5 + time * (speed * 0.7) + phaseOffset) *
              (amplitude * 0.3);

          positions[i * 3 + 1] = y;
        }
        waveLine.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;

      const { width, height } = containerRef.current.getBoundingClientRect();
      const waveHeight = height * 0.6;

      renderer.setSize(width, waveHeight);
      camera.aspect = width / waveHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      waveLines.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[300px] md:min-h-[350px] lg:min-h-[400px] overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-blue-100 z-0" />

      {/* Water wave canvas */}
      <div className="absolute bottom-0 left-0 w-full h-[60%] z-10">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 sm:px-6 py-12 text-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={textVariants}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-4 tracking-tight">
            Become an IPA Member
          </h2>
          <p className="text-blue-700 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed text-justify md:text-center">
            Full Membership is for representative organizations in the plumbing
            industry, including trade associations, professional bodies, trade
            unions, registration/licensing bodies and manufacturer/wholesaler
            organizations.
          </p>
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-lg"
          >
            Become a Member
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default BecomeMember;
