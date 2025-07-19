// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// const Cattle3D = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     canvasRef.current.appendChild(renderer.domElement);

//     const geometry = new THREE.BoxGeometry(1, 1, 1);
//     const material = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Brown color
//     const cow = new THREE.Mesh(geometry, material);
//     scene.add(cow);

//     const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5);
//     for (let i = 0; i < 4; i++) {
//       const leg = new THREE.Mesh(legGeometry, material);
//       leg.position.set(i % 2 === 0 ? -0.5 : 0.5, -0.5, i < 2 ? -0.3 : 0.3);
//       cow.add(leg);
//     }

//     camera.position.z = 5;

//     const cattleIds = ["1", "2", "3", "4", "5"];
//     const statuses = ["safe", "alerted", "stolen"];
//     const BASE_URL = "http://localhost:3000/api";
//     const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjA3NzMyNjU1MzAiLCJpYXQiOjE3NTI5MjA2NzEsImV4cCI6MTc1MjkyNDI3MX0.OVnSlMo7Bc4Rj14q7VEnJr5ILdbbx3LgQJiuV3ZHQ3A"; // Expires 02:28 PM EAT today

//     function simulate() {
//       requestAnimationFrame(simulate);

//       cow.rotation.y += 0.01;
//       cow.position.x = Math.sin(Date.now() * 0.001) * 2;
//       cow.position.z = Math.cos(Date.now() * 0.001) * 2;

//       cattleIds.forEach(cattleId => {
//         const latitude = cow.position.x + Math.random() * 0.1 - 0.05;
//         const longitude = cow.position.z + Math.random() * 0.1 - 0.05;
//         const status = statuses[Math.floor(Math.random() * statuses.length)];
//         const last_updated = new Date().toISOString();

//         // Update location with URLSearchParams
//         const params = new URLSearchParams({
//           cattle_id: cattleId,
//           latitude,
//           longitude,
//           status,
//           last_updated
//         });
//         fetch(`${BASE_URL}/cattle/map-data?${params.toString()}`, {
//           method: 'GET',
//           headers: { Authorization: `Bearer ${TOKEN}` }
//         }).catch(err => console.log(`GPS update failed for ${cattleId}:`, err));

//         // Check geofence
//         fetch(`${BASE_URL}/geofences/check-position`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
//           body: JSON.stringify({ cattle_id: cattleId, latitude, longitude })
//         }).catch(err => console.log(`Geofence check failed for ${cattleId}:`, err));

//         // Create alert if not safe
//         if (status !== "safe") {
//           fetch(`${BASE_URL}/alerts`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
//             body: JSON.stringify({ cattle_id: cattleId, message: `${status} detected for ${cattleId}` })
//           }).catch(err => console.log(`Alert creation failed for ${cattleId}:`, err));
//         }
//       });

//       renderer.render(scene, camera);
//     }

//     simulate();

//     // Cleanup
//     return () => {
//       if (canvasRef.current && renderer.domElement) {
//         canvasRef.current.removeChild(renderer.domElement);
//       }
//     };
//   }, []);

//   return (
//     <div
//       ref={canvasRef}
//       className="w-full h-screen bg-gray-100"
//     />
//   );
// };

// export default Cattle3D; 

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Cattle3D = ({ darkMode }) => {
  const canvasRef = useRef(null);
  const [isMounted, setIsMounted] = useState(true); // Track mount state
  const animationFrameId = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Set background based on darkMode
    scene.background = new THREE.Color(darkMode ? 0x1a1a1a : 0xffffff);

    // Load 3D cow model
    const loader = new GLTFLoader();
    let cow, mixer;
    loader.load('/cow_3d_animated_model_free_download/scene.gltf', (gltf) => {
      cow = gltf.scene;
      scene.add(cow);

      // Adjust position and scale
      cow.position.set(0, 0, 0);
      cow.scale.set(0.01, 0.01, 0.01); // Adjust scale based on model

      // If the model has animations
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(cow);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
      }
    }, undefined, (error) => {
      console.error('Error loading model:', error);
      // Fallback to simple cow if model fails
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
      cow = new THREE.Mesh(geometry, material);
      scene.add(cow);

      const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5);
      for (let i = 0; i < 4; i++) {
        const leg = new THREE.Mesh(legGeometry, material);
        leg.position.set(i % 2 === 0 ? -0.5 : 0.5, -0.5, i < 2 ? -0.3 : 0.3);
        cow.add(leg);
      }
    });

    camera.position.z = 5;

    const cattleIds = ["1", "2", "3", "4", "5"];
    const statuses = ["safe", "alerted", "stolen"];
    const BASE_URL = "http://localhost:3000/api";
    const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjA3NzMyNjU1MzAiLCJpYXQiOjE3NTI5MjA2NzEsImV4cCI6MTc1MjkyNDI3MX0.OVnSlMo7Bc4Rj14q7VEnJr5ILdbbx3LgQJiuV3ZHQ3A"; // Expires 02:28 PM EAT today

    function simulate(time) {
      if (!isMounted) return; // Stop if unmounted

      animationFrameId.current = requestAnimationFrame(simulate);

      if (cow && mixer) mixer.update(time * 0.001); // Update animation if available
      if (cow) {
        cow.rotation.y += 0.01;
        cow.position.x = Math.sin(Date.now() * 0.001) * 2;
        cow.position.z = Math.cos(Date.now() * 0.001) * 2;

        cattleIds.forEach(cattleId => {
          const latitude = cow.position.x + Math.random() * 0.1 - 0.05;
          const longitude = cow.position.z + Math.random() * 0.1 - 0.05;
          const status = statuses[Math.floor(Math.random() * statuses.length)];
          const last_updated = new Date().toISOString();

          const params = new URLSearchParams({
            cattle_id: cattleId,
            latitude,
            longitude,
            status,
            last_updated
          });
          fetch(`${BASE_URL}/cattle/map-data?${params.toString()}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${TOKEN}` }
          }).catch(err => console.log(`GPS update failed for ${cattleId}:`, err));

          fetch(`${BASE_URL}/geofences/check-position`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
            body: JSON.stringify({ cattle_id: cattleId, latitude, longitude })
          }).catch(err => console.log(`Geofence check failed for ${cattleId}:`, err));

          if (status !== "safe") {
            fetch(`${BASE_URL}/alerts`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
              body: JSON.stringify({ cattle_id: cattleId, message: `${status} detected for ${cattleId}` })
            }).catch(err => console.log(`Alert creation failed for ${cattleId}:`, err));
          }
        });
      }

      renderer.render(scene, camera);
    }

    animationFrameId.current = requestAnimationFrame(simulate);

    // Cleanup
    return () => {
      setIsMounted(false); // Mark as unmounted
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (canvasRef.current && renderer.domElement) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, [darkMode]); // Re-run if darkMode changes

  return (
    <div
      ref={canvasRef}
      className={`w-full h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
    />
  );
};

export default Cattle3D;