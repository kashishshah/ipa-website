"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

// Button animation
const buttonVariants = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

const BecomeMember = () => {
  const canvasRef = useRef(null);

  // Three.js setup for multiple lines of water waves at the bottom
  useEffect(() => {
    if (!canvasRef.current) {
      console.error("Canvas ref is not available");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / 150,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    // Set the renderer size to match the container
    const containerWidth = window.innerWidth;
    const containerHeight = 150; // Half of the component height (300px / 2)
    renderer.setSize(containerWidth, containerHeight);

    // Create multiple wave lines
    const waveLines: THREE.Line<
      THREE.BufferGeometry<THREE.NormalBufferAttributes>,
      THREE.LineBasicMaterial,
      THREE.Object3DEventMap
    >[] = [];
    const numLines = 20; // Number of wave lines
    const segments = 200; // Number of points in each line for smoothness
    const width = 100; // Width of the wave lines (increased to span full width)

    for (let lineIndex = 0; lineIndex < numLines; lineIndex++) {
      const points = [];
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments - 0.5) * width; // Spread points across the width
        const y = 0; // Initial y position (will be animated)
        points.push(new THREE.Vector3(x, y, 0));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x1e90ff, // Blue color for the wave
        linewidth: 2, // Thickness of the line
        opacity: 0.7 - lineIndex * 0.1, // Vary opacity for depth effect
        transparent: true,
      });
      const waveLine = new THREE.Line(geometry, material);
      // Position each line slightly offset in the y and z direction
      waveLine.position.y = -2 + lineIndex * 0.5; // Stack lines vertically
      waveLine.position.z = -lineIndex * 0.2; // Add depth for layering
      waveLines.push(waveLine);
      scene.add(waveLine);
    }

    camera.position.z = 5;
    camera.position.y = 2;
    camera.lookAt(0, -2, 0);

    // Animate the wave lines
    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      waveLines.forEach((waveLine, lineIndex) => {
        const positions = waveLine.geometry.attributes.position.array;
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * width;
          // Add a phase offset for each line to create a layered effect
          const phaseOffset = lineIndex * 0.5;
          const y = Math.sin(x * 1 + time + phaseOffset) * 0.5; // Sine wave for the y position
          positions[i * 3 + 1] = y; // Update y coordinate
        }
        waveLine.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      renderer.setSize(newWidth, containerHeight);
      camera.aspect = newWidth / containerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Log for debugging
    console.log(
      "Three.js setup complete, renderer size:",
      containerWidth,
      containerHeight
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[300px] bg-white overflow-hidden">
      {/* White background for the top half */}
      <div className="absolute top-0 left-0 w-full h-[40%] bg-white z-10" />

      {/* Water wave lines at the bottom half */}
      <div className="absolute bottom-0 left-0 w-full h-[60%] z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ background: "transparent" }} // Ensure canvas background is transparent
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">
          Become an IPA Member
        </h2>
        <p className="text-blue-600 text-lg max-w-2xl mb-6">
          Full Membership is for representative organizations in the plumbing
          industry, including trade associations, professional bodies, trade
          unions, registration/licensing bodies and manufacturer/wholesaler
          organizations.
        </p>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          Become a Member
        </motion.button>
      </div>
    </div>
  );
};

export default BecomeMember;
