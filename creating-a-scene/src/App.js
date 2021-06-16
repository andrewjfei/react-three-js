import React, { useEffect } from 'react';
import * as THREE from 'three';

import './App.css';

function App() {
  useEffect(() => {
    // Get canvas in which the scene will be rendered in
    const canvas = document.querySelector('canvas.webgl');

    // Creating a scene
    const scene = new THREE.Scene();

    // Creating a camera
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    // Creating a renderer and passing the canvas as an argument
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize( window.innerWidth, window.innerHeight );

    // Creating cube mesh object
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );

    // Add cube mesh to scene
    scene.add( cube );

    // Move camera position
    camera.position.z = 5;

    // Scene animation
    function animate() {
        requestAnimationFrame( animate );

        // Rotating cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render( scene, camera );
    };

    animate();
  }, []);

  return (
    <div className="App">
      <canvas className="webgl"></canvas>
    </div>
  );
}

export default App;
