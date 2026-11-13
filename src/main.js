import * as THREE from 'three';
import { createScene } from './scene.js';
import { setupLighting } from './lighting.js';
import { buildLibraryRoom } from './library.js';
import { buildBookshelves } from './books.js';
import { buildWindowsAndRain } from './rain.js';
import { buildFurniture } from './furniture.js';
import { setupControls } from './controls.js';
import { setupUI } from './ui.js';

// Initialize the 3D Cozy Library App
function initApp() {
  const container = document.getElementById('canvas-container');
  if (!container) {
    console.error('[CozyLibrary] canvas-container element not found');
    return;
  }

  // 1. Scene, Camera & WebGL Renderer
  const { scene, camera, renderer } = createScene(container);

  // 2. Lighting Setup (Hemisphere, warm PointLights, soft shadows)
  setupLighting(scene);

  // 3. Library Room & 3D Audiobook Listening Lounge Station
  const libraryAPI = buildLibraryRoom(scene);

  // 4. Bookshelves with Locked Glass Cabinets & Procedural Books via InstancedMesh
  const booksAPI = buildBookshelves(scene);

  // 5. Arched Windows with Rainy Night Sky & Sliding Droplets
  const { updateRain } = buildWindowsAndRain(scene);

  // 6. Furniture (Reading desks, banker's lamps, chairs, seated low-poly avatars, study topics)
  const furnitureAPI = buildFurniture(scene);

  // 7. Controls (OrbitControls default + PointerLock first-person walk mode)
  const controls = setupControls(camera, renderer, renderer.domElement);

  // 8. User Interface & Raycast Interaction (Seats, Bookshelves & Audiobook Lounge)
  setupUI(camera, scene, renderer.domElement, controls, furnitureAPI, booksAPI, libraryAPI);

  // 9. Main Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = Math.min(clock.getDelta(), 0.1);

    // Update controls (Orbit damping or first-person WASD physics)
    controls.update(delta);

    // Update animated window rain streaks
    updateRain(delta);

    // Render 3D Scene
    renderer.render(scene, camera);
  }

  animate();
  console.log('[CozyLibrary] 3D Cozy Library Scene initialized successfully.');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

