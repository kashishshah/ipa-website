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

const SocialMedia = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Social media data
  const socialMediaPosts = [
    {
      platform: "LinkedIn",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
      followers: "6,803 followers",
      time: "11mo",
      content:
        "An opportunity that you would not like to miss. The PLUMBEX 2024 brings a chance for the exhibitors to learn from industry experts and grow. Mark your calendars and be part of the future of plumbing innovation!",
      link: "https://www.linkedin.com/company/officialipa",
    },
    {
      platform: "X",
      handle: "@OfficialIPA",
      content:
        "Nothing here - yet. When they post, their posts will show up here.",
      link: "https://x.com/OfficialIPA",
    },
    {
      platform: "Facebook",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      followers: "28K likes • 29K followers",
      content:
        "IPA is the apex body of plumbing professionals in India. Building Materials Page",
      link: "https://www.facebook.com/IndianPlumbingAssociation",
    },
  ];

  // Three.js Background Effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    // Particles setup
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 250;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      // Random initial positions
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Random initial velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xb3e5fc,
      size: 0.3,
      transparent: true,
      opacity: 0.5,
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
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

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
    };
  }, []);

  return (
    <div className="relative w-full py-12">
      {/* Background Animation */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-20 z-0"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
          Social Media
        </h2>

        {/* Social Media Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialMediaPosts.map((post, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className="bg-white rounded-lg p-6 flex flex-col shadow-lg border border-blue-100"
            >
              {/* Platform and Icon */}
              <div className="flex items-center mb-4">
                {post.icon && (
                  <div className="w-8 h-8 mr-3 relative">
                    <Image
                      src={post.icon}
                      alt={`${post.platform} icon`}
                      width={32}
                      height={32}
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-blue-900">
                  {post.platform}
                </h3>
                {post.handle && (
                  <p className="ml-2 text-sm text-gray-500">{post.handle}</p>
                )}
              </div>

              {/* Followers and Time */}
              {(post.followers || post.time) && (
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  {post.followers && <span>{post.followers}</span>}
                  {post.followers && post.time && (
                    <span className="mx-2">•</span>
                  )}
                  {post.time && <span>{post.time}</span>}
                </div>
              )}

              {/* Content */}
              <p className="text-base text-gray-700 mb-4 flex-grow">
                {post.content}
              </p>

              {/* View on Platform Button */}
              <motion.a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={`inline-block px-4 py-2 rounded-full text-white shadow-lg transition ${
                  post.platform === "LinkedIn"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : post.platform === "Facebook"
                    ? "bg-blue-800 hover:bg-blue-900"
                    : "bg-gray-600 hover:bg-gray-700"
                }`}
              >
                View on {post.platform}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
