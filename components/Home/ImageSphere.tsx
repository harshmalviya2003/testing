"use client"
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BookWithImageProps {
  coverImageUrl: string;
}

const BookWithImage = ({ coverImageUrl }: BookWithImageProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);

    // Texture loader
    const textureLoader = new THREE.TextureLoader();

    // Create book with image cover
    const createBook = () => {
      // Book dimensions
      const width = 2;
      const height = 3;
      const thickness = 0.5;

      // Book cover (front)
      const coverFrontMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        roughness: 0.3,
        metalness: 0.1
      });

      // Load cover image
      textureLoader.load(coverImageUrl, (texture) => {
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        coverFrontMaterial.map = texture;
        coverFrontMaterial.needsUpdate = true;
      });

      // Book cover (back and sides)
      const coverOtherMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513, // Brown color
        roughness: 0.4,
        metalness: 0.2
      });

      // Create cover with different materials for each side
      const coverGeometry = new THREE.BoxGeometry(width, height, thickness);
      const coverMaterials = [
        coverOtherMaterial, // Right side
        coverOtherMaterial, // Left side
        coverOtherMaterial, // Top
        coverOtherMaterial, // Bottom
        coverFrontMaterial, // Front
        coverOtherMaterial  // Back
      ];
      const cover = new THREE.Mesh(coverGeometry, coverMaterials);

      // Book pages
      const pagesGeometry = new THREE.BoxGeometry(width * 0.98, height * 0.98, thickness * 0.9);
      const pagesMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xF5F5DC, // Cream color
        roughness: 0.8,
        side: THREE.DoubleSide
      });
      const pages = new THREE.Mesh(pagesGeometry, pagesMaterial);

      // Combine all parts
      const book = new THREE.Group();
      book.add(cover);
      book.add(pages);

      return book;
    };

    const book = createBook();
    scene.add(book);

    // Position camera
    camera.position.z = 5;
    camera.position.y = 1;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      book.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [coverImageUrl]);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default BookWithImage;