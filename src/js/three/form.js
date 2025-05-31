import * as THREE from 'three';

export function createSimpleShape() {
  // Cube Creation
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.4 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  return mesh;
}