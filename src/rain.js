import * as THREE from 'three';

export function buildWindowsAndRain(scene) {
  const windowGroup = new THREE.Group();
  const rainStreaks = [];

  const frameMat = new THREE.MeshStandardMaterial({
    color: '#382012',
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true
  });

  const skyMat = new THREE.MeshBasicMaterial({
    color: '#121c2e'
  });

  const glassMat = new THREE.MeshStandardMaterial({
    color: '#2a4263',
    roughness: 0.15,
    metalness: 0.1,
    transparent: true,
    opacity: 0.65,
    flatShading: true
  });

  const rainMat = new THREE.MeshBasicMaterial({
    color: '#9fc2ea',
    transparent: true,
    opacity: 0.72
  });

  // Three tall arched window positions on the back wall (Z = -7.2)
  const windowXPositions = [-2.0, 0, 2.0];
  const windowWidth = 1.45;
  const windowHeight = 2.8;
  const windowBottomY = 1.2;
  const archRadius = windowWidth / 2;

  windowXPositions.forEach((wx, wIdx) => {
    const singleWin = new THREE.Group();
    singleWin.position.set(wx, windowBottomY, -7.2);

    // 1. Dark Blue Night Sky Backdrop
    const sky = new THREE.Mesh(
      new THREE.PlaneGeometry(windowWidth + 0.3, windowHeight + archRadius + 0.3),
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
      new THREE.CircleGeometry(archRadius, 20, 0, Math.PI),
      glassMat
    );
    archGlass.position.set(0, windowHeight, 0);
    singleWin.add(archGlass);

    // 4. Wooden Window Sill & Surrounding Trims
    const sill = new THREE.Mesh(
      new THREE.BoxGeometry(windowWidth + 0.25, 0.12, 0.16),
      frameMat
    );
    sill.position.set(0, -0.06, 0.05);
    sill.castShadow = true;
    singleWin.add(sill);

    // Left & Right Outer Frame Stile
    const sideFrameGeo = new THREE.BoxGeometry(0.08, windowHeight, 0.1);
    const leftSide = new THREE.Mesh(sideFrameGeo, frameMat);
    leftSide.position.set(-windowWidth / 2 - 0.04, windowHeight / 2, 0.03);
    singleWin.add(leftSide);

    const rightSide = new THREE.Mesh(sideFrameGeo, frameMat);
    rightSide.position.set(windowWidth / 2 + 0.04, windowHeight / 2, 0.03);
    singleWin.add(rightSide);

    // Mullions (Grid Bars)
    const vertMullion = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, windowHeight + archRadius * 0.7, 0.04),
      frameMat
    );
    vertMullion.position.set(0, (windowHeight + archRadius * 0.7) / 2, 0.02);
    singleWin.add(vertMullion);

    [0.7, 1.4, 2.1].forEach(hy => {
      const horizMullion = new THREE.Mesh(
        new THREE.BoxGeometry(windowWidth, 0.04, 0.04),
        frameMat
      );
      horizMullion.position.set(0, hy, 0.02);
      singleWin.add(horizMullion);
    });

    // 5. Stylized Low-Poly Rain Streaks Sliding Down the Glass
    const numStreaks = 24;
    for (let r = 0; r < numStreaks; r++) {
      const streakLength = 0.12 + Math.random() * 0.22;
      const streakGeo = new THREE.CylinderGeometry(0.007, 0.005, streakLength, 4);
      const streak = new THREE.Mesh(streakGeo, rainMat);

      const rx = (Math.random() - 0.5) * (windowWidth - 0.1);
      const ry = Math.random() * (windowHeight + archRadius * 0.8);
      streak.position.set(rx, ry, 0.015);

      singleWin.add(streak);
      rainStreaks.push({
        mesh: streak,
        speed: 1.2 + Math.random() * 1.6,
        length: streakLength,
        minY: 0.05,
        maxY: windowHeight + archRadius * 0.85,
        widthSpan: windowWidth - 0.1
      });
    }

    windowGroup.add(singleWin);
  });

  scene.add(windowGroup);

  // Animation function called each frame
  function updateRain(delta) {
    rainStreaks.forEach(item => {
      item.mesh.position.y -= item.speed * delta;
      if (item.mesh.position.y < item.minY) {
        item.mesh.position.y = item.maxY;
        item.mesh.position.x = (Math.random() - 0.5) * item.widthSpan;
      }
    });
  }

  return {
    windowGroup,
    updateRain
  };
}

