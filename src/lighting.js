import * as THREE from 'three';

export function setupLighting(scene) {
  // 1. Warm Base Ambient & Hemisphere Light
  const hemiLight = new THREE.HemisphereLight('#ffe6c7', '#342115', 0.95);
  scene.add(hemiLight);

  const ambientLight = new THREE.AmbientLight('#26170d', 0.55);
  scene.add(ambientLight);

  // 2. Main Warm Directional Light (Simulates grand skylight & chandeliers)
  const mainLight = new THREE.DirectionalLight('#ffe5b8', 1.4);
  mainLight.position.set(12, 22, 14);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  mainLight.shadow.camera.near = 1;
  mainLight.shadow.camera.far = 70;
  mainLight.shadow.camera.left = -22;
  mainLight.shadow.camera.right = 22;
  mainLight.shadow.camera.top = 22;
  mainLight.shadow.camera.bottom = -22;
  mainLight.shadow.bias = -0.0004;
  mainLight.shadow.radius = 2.0;
  scene.add(mainLight);

  // 3. Cool Rainy Window Fill Light
  const windowFillLight = new THREE.DirectionalLight('#4d6e99', 0.5);
  windowFillLight.position.set(-6, 12, -22);
  scene.add(windowFillLight);

  // 4. Soft Cafe Barista Warm Glow
  const barGlow = new THREE.PointLight('#ffbb66', 3.2, 16, 1.6);
  barGlow.position.set(0, 4.2, -12.5);
  scene.add(barGlow);

  return {
    hemiLight,
    mainLight,
    windowFillLight
  };
}

// Helper to create a warm wall sconce PointLight
export function createSconceLight(scene, position) {
  const light = new THREE.PointLight('#ffb359', 2.8, 9.5, 1.8);
  light.position.copy(position);
  scene.add(light);
  return light;
}

// Helper to create a chandelier PointLight
export function createChandelierLight(scene, position) {
  const light = new THREE.PointLight('#ffd18a', 3.5, 16, 1.5);
  light.position.copy(position);
  scene.add(light);
  return light;
}

// Helper to create a warm desk/table PointLight
export function createDeskLampLight(scene, position) {
  const light = new THREE.PointLight('#ffd699', 2.0, 4.2, 1.8);
  light.position.copy(position);
  scene.add(light);
  return light;
}
