import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

export function setupControls(camera, renderer, domElement) {
  // 1. OrbitControls (Default elevated isometric perspective)
  const orbit = new OrbitControls(camera, domElement);
  orbit.enableDamping = true;
  orbit.dampingFactor = 0.05;
  orbit.minDistance = 5;
  orbit.maxDistance = 28;
  orbit.maxPolarAngle = Math.PI / 2 - 0.06; // Prevent going below floor
  orbit.target.set(0, 1.2, 0);

  // Default Orbit Camera Pose
  const defaultOrbitPos = new THREE.Vector3(13, 10.5, 14.5);
  const defaultOrbitTarget = new THREE.Vector3(0, 1.2, 0);

  // 2. PointerLockControls for First-Person Walk Mode
  const fpControls = new PointerLockControls(camera, domElement);
  let isFirstPerson = false;

  // First-Person Movement State
  const moveState = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false
  };

  const velocity = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const playerHeight = 1.65;
  let headBobTimer = 0;

  // Collision Obstacle Bounding Boxes [minX, maxX, minZ, maxZ]
  const COLLIDERS = [
    // Outer Room Walls
    { minX: -100, maxX: -9.4, minZ: -100, maxZ: 100 },
    { minX: 9.4, maxX: 100, minZ: -100, maxZ: 100 },
    { minX: -100, maxX: 100, minZ: -100, maxZ: -6.4 },
    { minX: -100, maxX: 100, minZ: 6.6, maxZ: 100 },

    // Desks North Bank
    { minX: -5.6, maxX: 5.6, minZ: -4.3, maxZ: -2.1 },

    // Desks South Bank
    { minX: -5.6, maxX: 5.6, minZ: 1.4, maxZ: 3.6 }
  ];

  function checkCollision(x, z, radius = 0.35) {
    for (const b of COLLIDERS) {
      if (
        x + radius > b.minX &&
        x - radius < b.maxX &&
        z + radius > b.minZ &&
        z - radius < b.maxZ
      ) {
        return true;
      }
    }
    return false;
  }

  // Key Listeners
  window.addEventListener('keydown', e => {
    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        moveState.forward = true;
        break;
      case 'KeyS':
      case 'ArrowDown':
        moveState.backward = true;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        moveState.left = true;
        break;
      case 'KeyD':
      case 'ArrowRight':
        moveState.right = true;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        moveState.sprint = true;
        break;
    }
  });

  window.addEventListener('keyup', e => {
    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        moveState.forward = false;
        break;
      case 'KeyS':
      case 'ArrowDown':
        moveState.backward = false;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        moveState.left = false;
        break;
      case 'KeyD':
      case 'ArrowRight':
        moveState.right = false;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        moveState.sprint = false;
        break;
    }
  });

  // Switch to Walk Around First-Person Mode
  function startWalkMode(startPos = null) {
    if (isFirstPerson) return;
    isFirstPerson = true;
    orbit.enabled = false;

    if (startPos) {
      camera.position.set(startPos.x, playerHeight, startPos.z);
    } else {
      camera.position.set(0, playerHeight, 5.2);
    }
    camera.lookAt(0, playerHeight, 0);

    fpControls.lock();
  }

  // Exit First-Person Mode and return to Overview
  function stopWalkMode() {
    if (!isFirstPerson) return;
    isFirstPerson = false;
    fpControls.unlock();

    orbit.enabled = true;
    camera.position.copy(defaultOrbitPos);
    orbit.target.copy(defaultOrbitTarget);
    orbit.update();
  }

  // PointerLock unlock event listener
  fpControls.addEventListener('unlock', () => {
    if (isFirstPerson) {
      stopWalkMode();
      // Notify UI
      if (controlsAPI.onModeChange) {
        controlsAPI.onModeChange(false);
      }
    }
  });

  // Zoom Helpers
  function zoomIn() {
    if (isFirstPerson) return;
    const dir = new THREE.Vector3().subVectors(orbit.target, camera.position).normalize();
    if (camera.position.distanceTo(orbit.target) > orbit.minDistance + 0.8) {
      camera.position.addScaledVector(dir, 1.5);
    }
  }

  function zoomOut() {
    if (isFirstPerson) return;
    const dir = new THREE.Vector3().subVectors(camera.position, orbit.target).normalize();
    if (camera.position.distanceTo(orbit.target) < orbit.maxDistance - 0.8) {
      camera.position.addScaledVector(dir, 1.5);
    }
  }

  // Update loop called every frame
  function update(delta) {
    if (isFirstPerson) {
      // Damping velocity
      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;

      direction.z = Number(moveState.forward) - Number(moveState.backward);
      direction.x = Number(moveState.right) - Number(moveState.left);
      direction.normalize();

      const speed = moveState.sprint ? 4.2 : 2.4;

      if (moveState.forward || moveState.backward) {
        velocity.z -= direction.z * speed * 12.0 * delta;
      }
      if (moveState.left || moveState.right) {
        velocity.x -= direction.x * speed * 12.0 * delta;
      }

      // Compute next intended position
      const prevX = camera.position.x;
      const prevZ = camera.position.z;

      fpControls.moveRight(-velocity.x * delta);
      fpControls.moveForward(-velocity.z * delta);

      // Collision Resolution
      if (checkCollision(camera.position.x, camera.position.z)) {
        // Try sliding on X
        if (!checkCollision(camera.position.x, prevZ)) {
          camera.position.z = prevZ;
        } else if (!checkCollision(prevX, camera.position.z)) {
          // Try sliding on Z
          camera.position.x = prevX;
        } else {
          // Revert both
          camera.position.x = prevX;
          camera.position.z = prevZ;
        }
      }

      // Subtle Head Bobbing when moving
      const isMoving = Math.abs(velocity.x) > 0.1 || Math.abs(velocity.z) > 0.1;
      if (isMoving) {
        headBobTimer += delta * (moveState.sprint ? 14 : 9);
        camera.position.y = playerHeight + Math.sin(headBobTimer) * 0.04;
      } else {
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, playerHeight, 0.1);
      }
    } else {
      orbit.update();
    }
  }

  const controlsAPI = {
    orbit,
    fpControls,
    get isFirstPerson() { return isFirstPerson; },
    startWalkMode,
    stopWalkMode,
    zoomIn,
    zoomOut,
    update,
    onModeChange: null
  };

  return controlsAPI;
}

