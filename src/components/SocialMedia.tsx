"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import {
  LucideLinkedin,
  LucideTwitter,
  LucideFacebook,
  LucideExternalLink,
} from "lucide-react";

// Card hover animation
const cardVariants = {
  hover: {
    scale: 1.03,
    y: -5,
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

const SocialMedia = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Social media data
  const socialMediaPosts = [
    {
      platform: "LinkedIn",
      icon: <LucideLinkedin className="text-blue-700" size={24} />,
      followers: "6,803 followers",
      time: "11mo",
      content:
        "An opportunity that you would not like to miss. The PLUMBEX 2024 brings a chance for the exhibitors to learn from industry experts and grow. Mark your calendars and be part of the future of plumbing innovation!",
      link: "https://www.linkedin.com/company/officialipa",
      color: "from-blue-600 to-blue-800",
    },
    {
      platform: "X",
      icon: <LucideTwitter className="text-gray-800" size={24} />,
      handle: "@OfficialIPA",
      content:
        "Nothing here - yet. When they post, their posts will show up here.",
      link: "https://x.com/OfficialIPA",
      color: "from-gray-700 to-gray-900",
    },
    {
      platform: "Facebook",
      icon: <LucideFacebook className="text-blue-800" size={24} />,
      followers: "28K likes • 29K followers",
      content:
        "IPA is the apex body of plumbing professionals in India. Building Materials Page",
      link: "https://www.facebook.com/IndianPlumbingAssociation",
      color: "from-blue-800 to-blue-900",
    },
  ];

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
    const particlesCount = 250;
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
        color: { value: new THREE.Color(0x0000ff) },
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

  return (
    <div className="relative w-full py-16 overflow-hidden">
      {/* Three.js Water Animation Background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-sky-50/80 backdrop-blur-sm z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title with water drop decoration */}
        <div className="relative mb-16 text-center">
          <h2 className="text-4xl font-bold text-sky-900 inline-block">
            Social Media
          </h2>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-sky-300 to-blue-500 rounded-full"></div>
        </div>

        {/* Social Media Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {socialMediaPosts.map((post, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 flex flex-col shadow-lg border border-sky-100 relative overflow-hidden h-full"
            >
              {/* Decorative water drops */}
              <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-sky-100 opacity-30"></div>
              <div className="absolute -bottom-10 -left-10 w-16 h-16 rounded-full bg-blue-100 opacity-20"></div>

              {/* Platform Header */}
              <div className="flex items-center mb-4 pb-3 border-b border-sky-100">
                <div className="mr-3">{post.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-sky-900">
                    {post.platform}
                  </h3>
                  {post.handle && (
                    <p className="text-sm text-gray-500">{post.handle}</p>
                  )}
                </div>
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
              <p className="text-base text-gray-700 mb-6 flex-grow">
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
                className={`inline-flex items-center px-4 py-2 rounded-full text-white shadow-lg transition bg-gradient-to-r ${post.color}`}
              >
                View on {post.platform}
                <LucideExternalLink className="ml-2" size={16} />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
