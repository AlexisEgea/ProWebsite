import * as THREE from 'three';
import { createSimpleShape } from './form.js';

const scene = new THREE.Scene();
const container = document.getElementById('three-container');
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 3;

// Use a stronger and more neutral lighting so the shape appears truly white
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x000000);
container.appendChild(renderer.domElement);

// Intense white directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Strong white ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const mesh = createSimpleShape();
// Ensure the material is truly white and not affected by light color
if (mesh.material) {
  mesh.material.color.set(0xffffff);
  mesh.material.metalness = 0;
  mesh.material.roughness = 0.2;
}
scene.add(mesh);

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.01;
  mesh.rotation.x += 0.01;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}); 