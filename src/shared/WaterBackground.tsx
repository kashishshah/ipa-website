"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface WaterBackgroundProps {
  height?: number;
}

export default function WaterBackground({
  height = 400,
}: WaterBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / height,
      0.1,
      1000
    );
    camera.position.set(0, 10, 30);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x99ccff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Water surface
    const waterGeometry = new THREE.PlaneGeometry(100, 100, 64, 64);
    const waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e90ff,
      roughness: 0.3,
      metalness: 0.6,
      side: THREE.DoubleSide,
    });
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI / 2;
    scene.add(water);

    // Floating bubbles
    const bubblesCount = 80;
    const bubblesGeometry = new THREE.BufferGeometry();
    const bubblePositions = new Float32Array(bubblesCount * 3);
    const bubbleVelocities = new Float32Array(bubblesCount);

    for (let i = 0; i < bubblesCount; i++) {
      bubblePositions[i * 3] = (Math.random() - 0.5) * 80;
      bubblePositions[i * 3 + 1] = Math.random() * 10;
      bubblePositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
      bubbleVelocities[i] = 0.02 + Math.random() * 0.05; // Random rising speed
    }

    bubblesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(bubblePositions, 3)
    );

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Simulate water movement
      water.geometry.attributes.position.array.forEach((_, i) => {
        const x = i % 10;
        const y = Math.floor(i / 10);
        water.geometry.attributes.position.array[i * 3 + 2] =
          Math.sin(elapsedTime * 1.5 + x * 0.2) * 0.5 +
          Math.cos(elapsedTime * 1.2 + y * 0.3) * 0.5;
      });
      water.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, [height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none"
    />
  );
}
