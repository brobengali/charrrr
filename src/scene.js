import * as THREE from 'three';

export function createScene(container) {
  // 1. Scene & Warm Atmospheric Cafe Fog
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#19110a');
  scene.fog = new THREE.Fog('#19110a', 28, 85);

  // 2. Camera Setup (Elevated isometric perspective over the cafe hall)
  const camera = new THREE.PerspectiveCamera(
    46,
    container.clientWidth / container.clientHeight,
    0.1,
    180
  );
  camera.position.set(22, 17, 24);

  // 3. WebGL Renderer with ACESFilmic Tone Mapping and Soft Shadows
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  // 4. Handle Resizing
  function onWindowResize() {
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', onWindowResize);

  return {
    scene,
    camera,
    renderer,
    onWindowResize
  };
}
