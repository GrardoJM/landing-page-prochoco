"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ChocolateBar3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    let animationFrameId: number;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 2.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Chocolate Bar Geometry
    const mainBarGeometry = new THREE.BoxGeometry(1.5, 3, 0.2);
    
    // Chocolate Material
    const chocolateMaterial = new THREE.MeshStandardMaterial({
      color: 0x4b3621, // A dark chocolate color matching the theme
      roughness: 0.6,
      metalness: 0.2,
    });
    
    const chocolateBar = new THREE.Mesh(mainBarGeometry, chocolateMaterial);
    scene.add(chocolateBar);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      chocolateBar.rotation.y += (mouseX * 0.5 - chocolateBar.rotation.y) * 0.05;
      chocolateBar.rotation.x += (-mouseY * 0.5 - chocolateBar.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousemove', onMouseMove);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      mainBarGeometry.dispose();
      chocolateMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[400px] md:min-h-[600px] cursor-grab" />;
};

export default ChocolateBar3D;
