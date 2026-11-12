import * as THREE from 'three';

export function buildWindowsAndRain(scene) {
  const windowGroup = new THREE.Group();
  const rainStreaks = [];

  const frameMat = new THREE.MeshStandardMaterial({
    color: '#341d0e',
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true
  });

  const skyMat = new THREE.MeshBasicMaterial({
    color: '#0f1726'
  });

  const glassMat = new THREE.MeshStandardMaterial({
    color: '#243752',
    roughness: 0.15,
    metalness: 0.1,
    transparent: true,
    opacity: 0.65,
    flatShading: true
  });

  const rainMat = new THREE.MeshBasicMaterial({
    color: '#95bce8',
    transparent: true,
    opacity: 0.75
  });

  // Multiple grand arched windows along the back wall (Z = -14.85)
  // Two on left of espresso bar, two on right of espresso bar
  const windowXPositions = [-14.5, -9.5, 9.5, 14.5];
  const windowWidth = 2.4;
  const windowHeight = 3.6;
  const windowBottomY = 1.4;
  const archRadius = windowWidth / 2;

  windowXPositions.forEach((wx, wIdx) => {
    const singleWin = new THREE.Group();
    singleWin.position.set(wx, windowBottomY, -14.85);

    // 1. Dark Blue Night Sky Backdrop
    const sky = new THREE.Mesh(
      new THREE.PlaneGeometry(windowWidth + 0.4, windowHeight + archRadius + 0.4),
      skyMat
    );
    sky.position.set(0, (windowHeight + archRadius) / 2, -0.06);
    singleWin.add(sky);

    // 2. Rectangular Glass Pane
    const lowerGlass = new THREE.Mesh(
      new THREE.PlaneGeometry(windowWidth, windowHeight),
      glassMat
    );
    lowerGlass.position.set(0, windowHeight / 2, 0);
    singleWin.add(lowerGlass);

    // 3. Arched Top Glass
    const archGlass = new THREE.Mesh(
      new THREE.CircleGeometry(archRadius, 18, 0, Math.PI),
      glassMat
    );
    archGlass.position.set(0, windowHeight, 0);
    singleWin.add(archGlass);

    // 4. Wooden Arched Window Frame & Mullions
    // Outer Frame Borders
    [-windowWidth / 2, windowWidth / 2].forEach(fx => {
      const vertFrame = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, windowHeight, 0.08),
        frameMat
      );
      vertFrame.position.set(fx, windowHeight / 2, 0.02);
      singleWin.add(vertFrame);
    });

    const sill = new THREE.Mesh(
      new THREE.BoxGeometry(windowWidth + 0.3, 0.14, 0.22),
      frameMat
    );
    sill.position.set(0, 0, 0.06);
    singleWin.add(sill);

    // Outer Arch Trim
    const archTrim = new THREE.Mesh(
      new THREE.TorusGeometry(archRadius, 0.06, 6, 18, Math.PI),
      frameMat
    );
    archTrim.position.set(0, windowHeight, 0.02);
    singleWin.add(archTrim);

    // Internal Grid Mullions (2 vertical, 3 horizontal)
    [-windowWidth / 4, windowWidth / 4].forEach(mx => {
      const mullionV = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, windowHeight, 0.04),
        frameMat
      );
      mullionV.position.set(mx, windowHeight / 2, 0.02);
      singleWin.add(mullionV);
    });

    [0.9, 1.8, 2.7].forEach(my => {
      const mullionH = new THREE.Mesh(
        new THREE.BoxGeometry(windowWidth, 0.04, 0.04),
        frameMat
      );
      mullionH.position.set(0, my, 0.02);
      singleWin.add(mullionH);
    });

    // 5. Animated Rain Streaks sliding down the glass
    const numStreaks = 20;
    const streakGeo = new THREE.BoxGeometry(0.016, 0.16, 0.01);

    for (let s = 0; s < numStreaks; s++) {
      const streak = new THREE.Mesh(streakGeo, rainMat);
      const rx = (Math.random() - 0.5) * (windowWidth - 0.15);
      const ry = Math.random() * (windowHeight + archRadius * 0.7);
      streak.position.set(rx, ry, 0.01);

      const speed = 0.6 + Math.random() * 0.9;
      const resetY = windowHeight + archRadius * 0.75;
      const bottomY = 0.05;

      rainStreaks.push({
        mesh: streak,
        speed,
        resetY,
        bottomY
      });

      singleWin.add(streak);
    }

    windowGroup.add(singleWin);
  });

  scene.add(windowGroup);

  // Animation Update Function for Rain Streaks
  function updateRain(delta) {
    for (let i = 0; i < rainStreaks.length; i++) {
      const r = rainStreaks[i];
      r.mesh.position.y -= r.speed * delta;
      if (r.mesh.position.y < r.bottomY) {
        r.mesh.position.y = r.resetY;
        r.speed = 0.6 + Math.random() * 0.9;
      }
    }
  }

  return {
    windowGroup,
    updateRain
  };
}
