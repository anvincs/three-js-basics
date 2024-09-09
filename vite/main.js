import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { emissive } from "three/webgpu";
// import { OrbitControls } from "three/examples/jsm/Addons.js";

const canvas = document.getElementById("canvas");

// 1. Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#F0F0F0");

// 2. Camera
const camera = new THREE.PerspectiveCamera(
  25,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// 3. Object
const dodecahedronGeometry = new THREE.DodecahedronGeometry();
// const dodecahedronMaterial = new THREE.MeshBasicMaterial({ color: "#468585" });
// const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
const dodecahedronMaterial = new THREE.MeshLambertMaterial({
  color: "#468585",
  emissive: "#468585",
});
const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);

const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
// const boxMaterial = new THREE.MeshBasicMaterial({ color: "#B4B4B3" });
// const box = new THREE.Mesh(boxGeometry, boxMaterial);
const boxMaterial = new THREE.MeshStandardMaterial({
  color: "#B4B4B3",
  emissive: "#B4B4B3",
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = -1.5;

scene.add(dodecahedron);
scene.add(box);

// 4. Light
const light = new THREE.SpotLight(0x006769, 100);
light.position.set(1, 1, 1);
scene.add(light);

// 5. Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 6. Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

// 7. Animations
function animate() {
  requestAnimationFrame(animate);

  dodecahedron.rotation.x += 0.01;
  dodecahedron.rotation.y += 0.01;

  box.rotation.y += 0.005;

  controls.update();

  renderer.render(scene, camera);
}

animate();
