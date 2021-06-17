import React, { useEffect } from 'react';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import './App.css';

function App() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    // Get canvas in which the scene will be rendered in
    const canvas = document.querySelector('canvas.webgl');

    // Creating a scene
    const scene = new THREE.Scene();

    // Creating a camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    // Creating a renderer and passing the canvas as an argument
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize( width, height );

    // Creating ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Creating directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    scene.add(directionalLight);

    directionalLight.position.x = -5;
    directionalLight.position.y = 5;

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
        const reactLogoMesh = gltf.scene.children.find((child) => child.name === "React_Logo");
        reactLogoMesh.material = material;
        
        scene.add(gltf.scene);

        animate(reactLogoMesh);
        window.addEventListener("wheel", (event) => updateReactLogo(event, reactLogoMesh));
      }
    );

    // Move camera position
    camera.position.z = 15;

    // Scene animation
    function animate(reactLogo) {
        requestAnimationFrame(() => animate(reactLogo));

        // Rotating logo
        // reactLogo.rotation.x += 0.005;
        // reactLogo.rotation.y += 0.005;

        renderer.render(scene, camera);
    };

    let rotation = true;

    function updateReactLogo(event, reactLogo) {
      const canRotate = reactLogo.rotation.y >= 0;
      const canPosition = reactLogo.position.z >= - Math.PI;

      if (canRotate && rotation) {
        const rotationYValue = reactLogo.rotation.y + event.deltaY * 0.001;

        // Check to see if if the mesh sould continue rotating
        if (rotationYValue < 0) {
          reactLogo.rotation.y = 0;
        } else if (rotationYValue > Math.PI) {
          reactLogo.rotation.y = Math.PI;
          rotation = false;
        } else {
          reactLogo.rotation.y = rotationYValue;
        }
      } else if (canPosition && !rotation) {
        const positionZValue = reactLogo.position.z - event.deltaY * 0.001;

        // Check to see if if the mesh sould continue moving
        if (positionZValue > 0) {
          reactLogo.position.z = 0;
          rotation = true;
        } else if (positionZValue < - Math.PI) {
          reactLogo.position.z = - Math.PI;
        } else {
          reactLogo.position.z  = positionZValue;
        }
      }
    }
  }, [height, width]);

  return (
    <div className="app">
      <canvas className="webgl"></canvas>
    </div>
  );
}

export default App;
