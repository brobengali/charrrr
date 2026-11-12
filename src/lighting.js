import * as THREE from 'three';

export function setupLighting(scene) {
  // 1. Ambient & Hemisphere Light (Low, warm base)
  const hemiLight = new THREE.HemisphereLight('#ffe0b2', '#362215', 0.85);
  scene.add(hemiLight);

  const ambientLight = new THREE.AmbientLight('#291910', 0.45);
  scene.add(ambientLight);

  // 2. Primary Shadow-Casting Directional Light (Simulates warm central chandelier / roof lantern)
  const mainLight = new THREE.DirectionalLight('#ffe0ad', 1.3);
  mainLight.position.set(6, 14, 8);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  mainLight.shadow.camera.near = 0.5;
  mainLight.shadow.camera.far = 40;
  mainLight.shadow.camera.left = -15;
  mainLight.shadow.camera.right = 15;
  mainLight.shadow.camera.top = 15;
  mainLight.shadow.camera.bottom = -15;
  mainLight.shadow.bias = -0.0005;
  mainLight.shadow.radius = 2.5;
  scene.add(mainLight);

  // 3. Cool Night Fill Light from Arched Windows
  const windowFillLight = new THREE.DirectionalLight('#5d7ea8', 0.45);
  windowFillLight.position.set(-2, 7, -12);
  scene.add(windowFillLight);

  // 4. Soft Warm Glow on Bookshelves
  const shelfGlowNorth = new THREE.PointLight('#ffbf73', 2.8, 12, 1.6);
  shelfGlowNorth.position.set(0, 3.8, -6.2);
  scene.add(shelfGlowNorth);

  const shelfGlowWest = new THREE.PointLight('#ffbf73', 2.8, 12, 1.6);
  shelfGlowWest.position.set(-8.2, 3.8, 0);
  scene.add(shelfGlowWest);

  return {
    hemiLight,
    mainLight,
    windowFillLight
  };
}

// Helper to create a warm wall sconce PointLight
export function createSconceLight(scene, position) {
  const light = new THREE.PointLight('#ffb359', 3.5, 8.5, 1.8);
  light.position.copy(position);
  scene.add(light);
  return light;
}

// Helper to create a warm banker's lamp desk PointLight
export function createDeskLampLight(scene, position) {
  const light = new THREE.PointLight('#ffd18a', 2.2, 3.8, 1.7);
  light.position.copy(position);
  scene.add(light);
  return light;
}

