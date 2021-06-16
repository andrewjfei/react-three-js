import React, { useEffect } from 'react';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './App.css';

function App() {
  const width = 500;
  const height = 500;

  useEffect(() => {
    // Get canvas in which the scene will be rendered in
    const canvas = document.querySelector('canvas.webgl');

    // Creating a scene
    const scene = new THREE.Scene();

    // Creating a camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    // Creating a renderer and passing the canvas as an argument
    // Setting alpha to true makes the renderer background transparent
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize( width, height );

    // Creating ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Creating directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    scene.add(directionalLight);

    directionalLight.position.x = -5;
    directionalLight.position.y = 5;

    // Directional light helper
    // const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
    // scene.add(directionalLightHelper);  

    // Creating material to use on model
    const material = new THREE.MeshStandardMaterial( { color: 0x61dbfb } );

    // Create DRACO loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('draco/');

    // Create GLTF loader
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    // Load GLTF model
    gltfLoader.load(
      'react-logo.glb',
      (gltf) => {
        console.log(gltf);
        const reactLogoMesh = gltf.scene.children.find((child) => child.name === "React_Logo");
        reactLogoMesh.material = material;
        
        scene.add(gltf.scene);

        animate(reactLogoMesh);
      }
    );

    // Move camera position
    camera.position.z = 10;

    // Add controls to scene
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    // Scene animation
    function animate(reactLogo) {
        requestAnimationFrame(() => animate(reactLogo));

        // Update controls
        controls.update();

        // Rotating logo
        reactLogo.rotation.x += 0.005;
        reactLogo.rotation.y += 0.005;

        renderer.render(scene, camera);
    };
  }, []);

  return (
    <div className="app">
      <canvas className="webgl"></canvas>
    </div>
  );
}

export default App;
