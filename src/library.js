import * as THREE from 'three';
import { createSconceLight, createChandelierLight } from './lighting.js';

export function buildLibraryRoom(scene) {
  const roomGroup = new THREE.Group();

  // Grand Study Cafe Room Bounds
  const ROOM = {
    width: 36,
    depth: 30,
    height: 7.2,
    minX: -18,
    maxX: 18,
    minZ: -15,
    maxZ: 15
  };

  // Materials
  const wallWoodMat = new THREE.MeshStandardMaterial({
    color: '#341f12',
    roughness: 0.88,
    metalness: 0.04,
    flatShading: true
  });

  const upperWallMat = new THREE.MeshStandardMaterial({
    color: '#28170c',
    roughness: 0.92,
    metalness: 0.02,
    flatShading: true
  });

  const trimWoodMat = new THREE.MeshStandardMaterial({
    color: '#24140a',
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true
  });

  const brassMat = new THREE.MeshStandardMaterial({
    color: '#caa352',
    roughness: 0.35,
    metalness: 0.7,
    flatShading: true
  });

  const marbleMat = new THREE.MeshStandardMaterial({
    color: '#eae5db',
    roughness: 0.35,
    metalness: 0.1,
    flatShading: true
  });

  // 1. Hardwood Plank Floor with Alternating Cafe Walnut & Chestnut Tones
  const floorPlankGroup = new THREE.Group();
  const PLANK_COLORS = ['#4e321e', '#5a3821', '#422816', '#633e24', '#3c2312'];
  const plankMaterials = PLANK_COLORS.map(c => new THREE.MeshStandardMaterial({
    color: c,
    roughness: 0.76,
    metalness: 0.05,
    flatShading: true
  }));

  const plankWidth = 0.45;
  const plankThickness = 0.04;
  const numRows = Math.ceil(ROOM.depth / plankWidth);

  for (let r = 0; r < numRows; r++) {
    const pZ = ROOM.minZ + (r * plankWidth) + plankWidth / 2;
    let curX = ROOM.minX;

    while (curX < ROOM.maxX) {
      const pLen = THREE.MathUtils.clamp(1.8 + Math.sin(r * 2.3 + curX * 1.7) * 1.1 + 0.8, 1.2, 4.2);
      const actualLen = Math.min(pLen, ROOM.maxX - curX);

      const matIdx = Math.abs(Math.round(r * 7 + curX * 5)) % plankMaterials.length;
      const plank = new THREE.Mesh(
        new THREE.BoxGeometry(actualLen - 0.008, plankThickness, plankWidth - 0.006),
        plankMaterials[matIdx]
      );
      plank.position.set(curX + actualLen / 2, -plankThickness / 2, pZ);
      plank.receiveShadow = true;
      floorPlankGroup.add(plank);

      curX += actualLen;
    }
  }
  roomGroup.add(floorPlankGroup);

  // 2. Room Walls & Moldings
  // North Wall (Back)
  const northWall = new THREE.Mesh(
    new THREE.BoxGeometry(ROOM.width, ROOM.height, 0.25),
    wallWoodMat
  );
  northWall.position.set(0, ROOM.height / 2, ROOM.minZ);
  northWall.receiveShadow = true;
  roomGroup.add(northWall);

  // West Wall (Left)
  const westWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, ROOM.height, ROOM.depth),
    wallWoodMat
  );
  westWall.position.set(ROOM.minX, ROOM.height / 2, 0);
  westWall.receiveShadow = true;
  roomGroup.add(westWall);

  // East Wall (Right)
  const eastWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, ROOM.height, ROOM.depth),
    wallWoodMat
  );
  eastWall.position.set(ROOM.maxX, ROOM.height / 2, 0);
  eastWall.receiveShadow = true;
  roomGroup.add(eastWall);

  // South Wall (Front - low boundary wall for camera view)
  const southWall = new THREE.Mesh(
    new THREE.BoxGeometry(ROOM.width, ROOM.height, 0.25),
    wallWoodMat
  );
  southWall.position.set(0, ROOM.height / 2, ROOM.maxZ);
  roomGroup.add(southWall);

  // Baseboards & Chair Rails
  const baseboardNorth = new THREE.Mesh(
    new THREE.BoxGeometry(ROOM.width, 0.22, 0.1),
    trimWoodMat
  );
  baseboardNorth.position.set(0, 0.11, ROOM.minZ + 0.12);
  roomGroup.add(baseboardNorth);

  const chairRailNorth = new THREE.Mesh(
    new THREE.BoxGeometry(ROOM.width, 0.1, 0.1),
    trimWoodMat
  );
  chairRailNorth.position.set(0, 1.25, ROOM.minZ + 0.12);
  roomGroup.add(chairRailNorth);

  // 3. Cafe Espresso Bar & Barista Counter
  const barGroup = new THREE.Group();
  const barX = 0;
  const barZ = -13.2;

  // Main Dark Wood Counter Base
  const counterBase = new THREE.Mesh(
    new THREE.BoxGeometry(9.6, 1.05, 1.4),
    wallWoodMat
  );
  counterBase.position.set(barX, 0.525, barZ);
  counterBase.castShadow = true;
  counterBase.receiveShadow = true;
  barGroup.add(counterBase);

  // Polished Marble Countertop
  const counterTop = new THREE.Mesh(
    new THREE.BoxGeometry(9.9, 0.08, 1.55),
    marbleMat
  );
  counterTop.position.set(barX, 1.09, barZ);
  counterTop.castShadow = true;
  counterTop.receiveShadow = true;
  barGroup.add(counterTop);

  // Espresso Machine (Commercial dual-group machine in chrome & dark bronze)
  const espressoMat = new THREE.MeshStandardMaterial({
    color: '#8b8f96',
    metalness: 0.85,
    roughness: 0.25,
    flatShading: true
  });
  const espressoAccentMat = new THREE.MeshStandardMaterial({
    color: '#b03b29',
    metalness: 0.3,
    roughness: 0.4,
    flatShading: true
  });

  const espressoBody = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.65, 0.7), espressoMat);
  espressoBody.position.set(barX - 1.8, 1.45, barZ);
  espressoBody.castShadow = true;
  barGroup.add(espressoBody);

  const espressoTop = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.1, 0.72), espressoAccentMat);
  espressoTop.position.set(barX - 1.8, 1.8, barZ);
  barGroup.add(espressoTop);

  // Cups stacked on top of espresso machine
  const cupMat = new THREE.MeshStandardMaterial({
    color: '#f5efe6',
    roughness: 0.4,
    flatShading: true
  });
  [-0.3, -0.1, 0.1, 0.3].forEach(cx => {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.035, 0.07, 8), cupMat);
    cup.position.set(barX - 1.8 + cx, 1.89, barZ);
    barGroup.add(cup);
  });

  // Coffee Bean Hopper / Grinder
  const grinderBase = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.5, 0.34), espressoMat);
  grinderBase.position.set(barX - 2.8, 1.38, barZ);
  barGroup.add(grinderBase);

  const hopper = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.06, 0.36, 10), new THREE.MeshStandardMaterial({
    color: '#2a1a10',
    roughness: 0.4,
    transparent: true,
    opacity: 0.85
  }));
  hopper.position.set(barX - 2.8, 1.76, barZ);
  barGroup.add(hopper);

  // Glass Pastry Case with Croissants
  const pastryCaseMat = new THREE.MeshStandardMaterial({
    color: '#b8d6ea',
    transparent: true,
    opacity: 0.45,
    roughness: 0.1,
    metalness: 0.2
  });
  const pastryCase = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.55, 0.8), pastryCaseMat);
  pastryCase.position.set(barX + 2.2, 1.4, barZ);
  barGroup.add(pastryCase);

  const pastryMat = new THREE.MeshStandardMaterial({
    color: '#c98a3c',
    roughness: 0.8,
    flatShading: true
  });
  [-0.5, 0, 0.5].forEach(px => {
    const croissant = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.045, 6, 12, Math.PI * 0.9), pastryMat);
    croissant.rotation.x = Math.PI / 2;
    croissant.position.set(barX + 2.2 + px, 1.2, barZ);
    barGroup.add(croissant);
  });

  // Chalkboard Cafe Menu behind counter
  const chalkboardMat = new THREE.MeshStandardMaterial({
    color: '#1b2221',
    roughness: 0.95,
    metalness: 0.02,
    flatShading: true
  });
  const menuFrame = new THREE.Mesh(new THREE.BoxGeometry(6.4, 1.8, 0.06), trimWoodMat);
  menuFrame.position.set(barX, 3.8, ROOM.minZ + 0.16);
  barGroup.add(menuFrame);

  const menuBoard = new THREE.Mesh(new THREE.BoxGeometry(6.1, 1.55, 0.04), chalkboardMat);
  menuBoard.position.set(barX, 3.8, ROOM.minZ + 0.2);
  barGroup.add(menuBoard);

  // Cafe Name Plaque in Brass with "☕ CONNECT CAFE ☕"
  const plaqueCanvas = document.createElement('canvas');
  plaqueCanvas.width = 1024;
  plaqueCanvas.height = 256;
  const pCtx = plaqueCanvas.getContext('2d');
  pCtx.fillStyle = '#1c150e';
  pCtx.fillRect(0, 0, 1024, 256);
  pCtx.strokeStyle = '#deb358';
  pCtx.lineWidth = 12;
  pCtx.strokeRect(16, 16, 992, 224);
  pCtx.strokeStyle = '#ffd782';
  pCtx.lineWidth = 4;
  pCtx.strokeRect(28, 28, 968, 200);
  pCtx.fillStyle = '#ffdf99';
  pCtx.font = 'bold 64px Georgia, serif';
  pCtx.textAlign = 'center';
  pCtx.textBaseline = 'middle';
  pCtx.fillText('☕ CONNECT CAFE ☕', 512, 128);

  const plaqueTex = new THREE.CanvasTexture(plaqueCanvas);
  plaqueTex.colorSpace = THREE.SRGBColorSpace;
  const plaqueMat = new THREE.MeshStandardMaterial({
    map: plaqueTex,
    roughness: 0.35,
    metalness: 0.65,
    flatShading: true
  });
  const plaque = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.65, 0.04), plaqueMat);
  plaque.position.set(barX, 4.88, ROOM.minZ + 0.22);
  barGroup.add(plaque);

  // Hanging Pendant Lights over Espresso Bar
  [-2.8, -0.9, 0.9, 2.8].forEach(px => {
    const pendantCord = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 2.4, 6), brassMat);
    pendantCord.position.set(barX + px, 5.0, barZ);
    barGroup.add(pendantCord);

    const shadeGeo = new THREE.ConeGeometry(0.24, 0.22, 10, 1, true);
    const shade = new THREE.Mesh(shadeGeo, brassMat);
    shade.position.set(barX + px, 3.75, barZ);
    barGroup.add(shade);

    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), new THREE.MeshBasicMaterial({ color: '#ffde99' }));
    bulb.position.set(barX + px, 3.65, barZ);
    barGroup.add(bulb);
  });

  roomGroup.add(barGroup);

  // 4. Emerald & Gold Cafe Area Rugs spanning the seating wings
  const rugMat = new THREE.MeshStandardMaterial({
    color: '#223d2c',
    roughness: 0.92,
    metalness: 0.02,
    flatShading: true
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: '#caa352',
    roughness: 0.5,
    metalness: 0.3,
    flatShading: true
  });

  // Two massive grand rugs covering the Left & Right cafe seating wings
  [
    { x: -8.6, z: 0.6, w: 14.5, d: 23 },
    { x: 8.6, z: 0.6, w: 14.5, d: 23 }
  ].forEach(r => {
    const rug = new THREE.Mesh(new THREE.BoxGeometry(r.w, 0.015, r.d), rugMat);
    rug.position.set(r.x, 0.008, r.z);
    rug.receiveShadow = true;
    roomGroup.add(rug);

    // Double Gold Border
    [-1, 1].forEach(side => {
      const bOuterX = new THREE.Mesh(new THREE.BoxGeometry(r.w - 0.4, 0.005, 0.06), goldMat);
      bOuterX.position.set(r.x, 0.018, r.z + (r.d / 2 - 0.25) * side);
      roomGroup.add(bOuterX);

      const bOuterZ = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.005, r.d - 0.4), goldMat);
      bOuterZ.position.set(r.x + (r.w / 2 - 0.25) * side, 0.018, r.z);
      roomGroup.add(bOuterZ);

      const bInnerX = new THREE.Mesh(new THREE.BoxGeometry(r.w - 0.9, 0.005, 0.035), goldMat);
      bInnerX.position.set(r.x, 0.018, r.z + (r.d / 2 - 0.5) * side);
      roomGroup.add(bInnerX);

      const bInnerZ = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.005, r.d - 0.9), goldMat);
      bInnerZ.position.set(r.x + (r.w / 2 - 0.5) * side, 0.018, r.z);
      roomGroup.add(bInnerZ);
    });
  });

  // 5. Warm Wall Sconces around perimeter
  const sconcePositions = [
    new THREE.Vector3(-12.5, 4.2, ROOM.minZ + 0.16),
    new THREE.Vector3(12.5, 4.2, ROOM.minZ + 0.16),
    new THREE.Vector3(ROOM.minX + 0.16, 4.2, -9),
    new THREE.Vector3(ROOM.minX + 0.16, 4.2, -3),
    new THREE.Vector3(ROOM.minX + 0.16, 4.2, 3),
    new THREE.Vector3(ROOM.minX + 0.16, 4.2, 9),
    new THREE.Vector3(ROOM.maxX - 0.16, 4.2, -9),
    new THREE.Vector3(ROOM.maxX - 0.16, 4.2, -3),
    new THREE.Vector3(ROOM.maxX - 0.16, 4.2, 3),
    new THREE.Vector3(ROOM.maxX - 0.16, 4.2, 9),
    new THREE.Vector3(-9, 4.2, ROOM.maxZ - 0.16),
    new THREE.Vector3(9, 4.2, ROOM.maxZ - 0.16)
  ];

  sconcePositions.forEach(pos => {
    const sconce = createWallSconce(pos);
    roomGroup.add(sconce);
    createSconceLight(scene, new THREE.Vector3(pos.x, pos.y + 0.15, pos.z));
  });

  // 6. Central Chandelier Pendants for the grand cafe
  const chandelierPositions = [
    new THREE.Vector3(-8.6, 5.8, -4.5),
    new THREE.Vector3(-8.6, 5.8, 5.5),
    new THREE.Vector3(8.6, 5.8, -4.5),
    new THREE.Vector3(8.6, 5.8, 5.5),
    new THREE.Vector3(0, 5.8, 0.5)
  ];

  chandelierPositions.forEach(cPos => {
    const ch = createCafeChandelier(cPos);
    roomGroup.add(ch);
    createChandelierLight(scene, cPos);
  });

  // 7. Potted Low-Poly Cafe Plants (Fiddle-Leaf Figs, Palms, Monsteras)
  const plantPositions = [
    new THREE.Vector3(ROOM.minX + 1.2, 0, ROOM.minZ + 1.2),
    new THREE.Vector3(ROOM.maxX - 1.2, 0, ROOM.minZ + 1.2),
    new THREE.Vector3(ROOM.minX + 1.2, 0, ROOM.maxZ - 1.2),
    new THREE.Vector3(ROOM.maxX - 1.2, 0, ROOM.maxZ - 1.2),
    new THREE.Vector3(-5.2, 0, -12.5),
    new THREE.Vector3(5.2, 0, -12.5),
    new THREE.Vector3(-2.8, 0, 13.2), // Flanking Audiobook Lounge
    new THREE.Vector3(2.8, 0, 13.2),  // Flanking Audiobook Lounge
    new THREE.Vector3(ROOM.minX + 1.2, 0, 0),
    new THREE.Vector3(ROOM.maxX - 1.2, 0, 0)
  ];

  plantPositions.forEach((pPos, pIdx) => {
    const plant = createPottedPlant(pPos, 1.0 + (pIdx % 3) * 0.2);
    roomGroup.add(plant);
  });

  // 8. Dedicated 3D Audiobook Listening Lounge Station
  const audioStationGroup = new THREE.Group();
  const stationX = 0;
  const stationZ = 13.2;

  // Acoustic Fluted Walnut Console Base
  const consoleBase = new THREE.Mesh(
    new THREE.BoxGeometry(4.4, 1.05, 1.3),
    wallWoodMat
  );
  consoleBase.position.set(stationX, 0.525, stationZ);
  consoleBase.castShadow = true;
  consoleBase.receiveShadow = true;
  audioStationGroup.add(consoleBase);

  // Polished Marble & Brass Countertop
  const consoleTop = new THREE.Mesh(
    new THREE.BoxGeometry(4.6, 0.08, 1.45),
    marbleMat
  );
  consoleTop.position.set(stationX, 1.09, stationZ);
  consoleTop.castShadow = true;
  consoleTop.receiveShadow = true;
  audioStationGroup.add(consoleTop);

  // Audio Turntable / Master Console unit
  const audioUnit = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 0.12, 0.6),
    new THREE.MeshStandardMaterial({ color: '#2b231d', metalness: 0.7, roughness: 0.3, flatShading: true })
  );
  audioUnit.position.set(stationX, 1.18, stationZ);
  audioStationGroup.add(audioUnit);

  // Glowing VU Meter Display on Audio Console
  const meterMat = new THREE.MeshBasicMaterial({ color: '#ffb347' });
  const meter = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.08), meterMat);
  meter.position.set(stationX, 1.25, stationZ + 0.28);
  meter.rotation.x = -Math.PI / 6;
  audioStationGroup.add(meter);

  // Two Brass Headphone Stands with Studio Over-Ear Headphones
  [-1.2, 1.2].forEach(hx => {
    // Stand
    const standBase = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.03, 10), brassMat);
    standBase.position.set(stationX + hx, 1.14, stationZ);
    audioStationGroup.add(standBase);

    const standStem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.34, 6), brassMat);
    standStem.position.set(stationX + hx, 1.31, stationZ);
    audioStationGroup.add(standStem);

    const standTop = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.012, 6, 12, Math.PI), brassMat);
    standTop.position.set(stationX + hx, 1.48, stationZ);
    audioStationGroup.add(standTop);

    // Headphones (Black leather ear-cups + brass headband)
    const hpMat = new THREE.MeshStandardMaterial({ color: '#1a1816', roughness: 0.6, metalness: 0.3, flatShading: true });
    [-0.08, 0.08].forEach(side => {
      const earCup = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.04, 10), hpMat);
      earCup.rotation.z = Math.PI / 2;
      earCup.position.set(stationX + hx + side, 1.44, stationZ);
      audioStationGroup.add(earCup);
    });
  });

  // Overhead Illuminated Glass Sign: "🎧 AUDIOBOOK LOUNGE · AUDIBLE ARCHIVE"
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 1024;
  signCanvas.height = 256;
  const sCtx = signCanvas.getContext('2d');
  sCtx.clearRect(0, 0, 1024, 256);
  sCtx.fillStyle = 'rgba(26, 18, 12, 0.88)';
  if (sCtx.roundRect) {
    sCtx.roundRect(40, 30, 944, 196, 24);
    sCtx.fill();
  } else {
    sCtx.fillRect(40, 30, 944, 196);
  }
  sCtx.strokeStyle = '#deb358';
  sCtx.lineWidth = 6;
  sCtx.strokeRect(52, 42, 920, 172);
  sCtx.fillStyle = '#ffdf99';
  sCtx.font = 'bold 36px Georgia, serif';
  sCtx.textAlign = 'center';
  sCtx.textBaseline = 'middle';
  sCtx.fillText('🎧 AUDIOBOOK LOUNGE · AUDIBLE ARCHIVE', 512, 104);
  sCtx.fillStyle = '#dfcaa0';
  sCtx.font = '22px system-ui, sans-serif';
  sCtx.fillText('TAP TO BROWSE AUDIOBOOKS BY GENRE & LISTEN ON AUDIBLE', 512, 162);

  const signTex = new THREE.CanvasTexture(signCanvas);
  signTex.colorSpace = THREE.SRGBColorSpace;
  const signMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(4.0, 1.0),
    new THREE.MeshBasicMaterial({ map: signTex, transparent: true, opacity: 0.98 })
  );
  signMesh.position.set(stationX, 2.6, stationZ - 0.1);
  signMesh.rotation.y = 0; // Face into the hall
  audioStationGroup.add(signMesh);

  // Brass support poles from console to sign
  [-1.6, 1.6].forEach(px => {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.7, 6), brassMat);
    pole.position.set(stationX + px, 1.9, stationZ);
    audioStationGroup.add(pole);
  });

  // Invisible Clickable Hitbox for Raycasting the Audiobook Lounge
  const audioHitBox = new THREE.Mesh(
    new THREE.BoxGeometry(4.8, 2.8, 2.2),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  audioHitBox.position.set(stationX, 1.4, stationZ);
  audioHitBox.userData = { isAudiobookStation: true };
  audioStationGroup.add(audioHitBox);

  roomGroup.add(audioStationGroup);

  scene.add(roomGroup);

  return {
    ROOM,
    roomGroup,
    audioHitBox
  };
}

// Helper: Brass Wall Sconce
function createWallSconce(position) {
  const group = new THREE.Group();
  group.position.copy(position);

  const brassMat = new THREE.MeshStandardMaterial({
    color: '#caa352',
    roughness: 0.35,
    metalness: 0.65,
    flatShading: true
  });

  const glowingBulbMat = new THREE.MeshBasicMaterial({
    color: '#ffdf99'
  });

  const backplate = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.36, 0.04), brassMat);
  group.add(backplate);

  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.26, 6), brassMat);
  arm.position.set(0, 0.05, 0.14);
  arm.rotation.x = Math.PI / 4;
  group.add(arm);

  const socket = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.035, 0.08, 8), brassMat);
  socket.position.set(0, 0.16, 0.24);
  group.add(socket);

  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 8), glowingBulbMat);
  bulb.position.set(0, 0.24, 0.24);
  group.add(bulb);

  return group;
}

// Helper: Cafe Chandelier
function createCafeChandelier(pos) {
  const group = new THREE.Group();
  group.position.copy(pos);

  const brassMat = new THREE.MeshStandardMaterial({
    color: '#d4aa58',
    roughness: 0.35,
    metalness: 0.7,
    flatShading: true
  });

  // Stem from ceiling
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.4, 6), brassMat);
  stem.position.set(0, 0.7, 0);
  group.add(stem);

  // Central ring
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.035, 6, 18), brassMat);
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  // 6 Radial Arms with Glowing Amber Bulbs
  const bulbMat = new THREE.MeshBasicMaterial({ color: '#ffde99' });
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const bx = Math.cos(angle) * 0.7;
    const bz = Math.sin(angle) * 0.7;

    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.2, 6), brassMat);
    arm.position.set(bx, 0.1, bz);
    group.add(arm);

    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), bulbMat);
    bulb.position.set(bx, 0.22, bz);
    group.add(bulb);
  }

  return group;
}

// Helper: Potted Plant
function createPottedPlant(position, scale = 1.0) {
  const group = new THREE.Group();
  group.position.copy(position);
  group.scale.set(scale, scale, scale);

  const potMat = new THREE.MeshStandardMaterial({
    color: '#8b5a38',
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true
  });

  const soilMat = new THREE.MeshStandardMaterial({
    color: '#281c13',
    roughness: 0.95,
    flatShading: true
  });

  const leafMatA = new THREE.MeshStandardMaterial({
    color: '#2d633b',
    roughness: 0.7,
    flatShading: true
  });

  const leafMatB = new THREE.MeshStandardMaterial({
    color: '#397849',
    roughness: 0.65,
    flatShading: true
  });

  // Ceramic Terracotta Pot
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.22, 0.6, 10), potMat);
  pot.position.set(0, 0.3, 0);
  pot.castShadow = true;
  pot.receiveShadow = true;
  group.add(pot);

  // Soil
  const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.04, 10), soilMat);
  soil.position.set(0, 0.58, 0);
  group.add(soil);

  // Faceted Low-Poly Foliage Clusters
  const leafClusters = [
    { x: 0, y: 0.9, z: 0, r: 0.38, mat: leafMatA },
    { x: -0.16, y: 1.15, z: 0.1, r: 0.32, mat: leafMatB },
    { x: 0.18, y: 1.2, z: -0.08, r: 0.3, mat: leafMatA },
    { x: 0, y: 1.45, z: 0.05, r: 0.26, mat: leafMatB }
  ];

  leafClusters.forEach(c => {
    const cluster = new THREE.Mesh(new THREE.DodecahedronGeometry(c.r, 1), c.mat);
    cluster.position.set(c.x, c.y, c.z);
    cluster.castShadow = true;
    group.add(cluster);
  });

  return group;
}
