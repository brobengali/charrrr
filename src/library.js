import * as THREE from 'three';
import { createSconceLight } from './lighting.js';

export function buildLibraryRoom(scene) {
  const roomGroup = new THREE.Group();

  // Room Bounds
  const ROOM = {
    width: 21,
    depth: 15,
    height: 6,
    minX: -10.5,
    maxX: 10.5,
    minZ: -7.5,
    maxZ: 7.5
  };

  // Materials
  const wallWoodMat = new THREE.MeshStandardMaterial({
    color: '#3e2617',
    roughness: 0.88,
    metalness: 0.04,
    flatShading: true
  });

  const trimWoodMat = new THREE.MeshStandardMaterial({
    color: '#2d1b0f',
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true
  });

  // 1. Hardwood Plank Floor with Alternating Wood Tones (No textures, true low-poly geometry)
  const floorPlankGroup = new THREE.Group();
  const PLANK_COLORS = ['#5a351c', '#673c20', '#4f2e18', '#704223', '#492a15'];
  const plankMaterials = PLANK_COLORS.map(c => new THREE.MeshStandardMaterial({
    color: c,
    roughness: 0.78,
    metalness: 0.05,
    flatShading: true
  }));

  const plankWidth = 0.42;
  const plankThickness = 0.04;
  const numRows = Math.ceil(ROOM.depth / plankWidth);

  for (let r = 0; r < numRows; r++) {
    const pZ = ROOM.minZ + (r * plankWidth) + plankWidth / 2;
    let curX = ROOM.minX;

    while (curX < ROOM.maxX) {
      const pLen = THREE.MathUtils.clamp(1.4 + Math.sin(r * 3.7 + curX * 2.1) * 0.8 + 0.6, 1.0, 3.2);
      const actualLen = Math.min(pLen, ROOM.maxX - curX);

      const matIdx = Math.abs(Math.round(r * 5 + curX * 7)) % plankMaterials.length;
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
    new THREE.BoxGeometry(ROOM.width, ROOM.height, 0.2),
    wallWoodMat
  );
  northWall.position.set(0, ROOM.height / 2, ROOM.minZ);
  northWall.receiveShadow = true;
  roomGroup.add(northWall);

  // West Wall (Left)
  const westWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, ROOM.height, ROOM.depth),
    wallWoodMat
  );
  westWall.position.set(ROOM.minX, ROOM.height / 2, 0);
  westWall.receiveShadow = true;
  roomGroup.add(westWall);

  // East Wall (Right)
  const eastWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, ROOM.height, ROOM.depth),
    wallWoodMat
  );
  eastWall.position.set(ROOM.maxX, ROOM.height / 2, 0);
  eastWall.receiveShadow = true;
  roomGroup.add(eastWall);

  // South Wall (Front - low partition for camera visibility)
  const southWall = new THREE.Mesh(
    new THREE.BoxGeometry(ROOM.width, ROOM.height, 0.2),
    wallWoodMat
  );
  southWall.position.set(0, ROOM.height / 2, ROOM.maxZ);
  roomGroup.add(southWall);

  // Trims: Wainscot Chair Rail & Baseboards
  const baseboardNorth = new THREE.Mesh(
    new THREE.BoxGeometry(ROOM.width, 0.18, 0.08),
    trimWoodMat
  );
  baseboardNorth.position.set(0, 0.09, ROOM.minZ + 0.1);
  roomGroup.add(baseboardNorth);

  const chairRailNorth = new THREE.Mesh(
    new THREE.BoxGeometry(ROOM.width, 0.09, 0.08),
    trimWoodMat
  );
  chairRailNorth.position.set(0, 1.15, ROOM.minZ + 0.1);
  roomGroup.add(chairRailNorth);

  // 3. Big Green Center Rug with Gold Double-Line Border and Subtle Medallion
  const rugGroup = new THREE.Group();
  const rugW = 10.8;
  const rugD = 7.4;
  const rugY = 0.008;

  // Green Rug Base
  const rugBase = new THREE.Mesh(
    new THREE.BoxGeometry(rugW, 0.015, rugD),
    new THREE.MeshStandardMaterial({
      color: '#264230',
      roughness: 0.92,
      metalness: 0.02,
      flatShading: true
    })
  );
  rugBase.position.set(0, rugY, 0);
  rugBase.receiveShadow = true;
  rugGroup.add(rugBase);

  // Gold Border Material
  const goldBorderMat = new THREE.MeshStandardMaterial({
    color: '#cfa244',
    roughness: 0.55,
    metalness: 0.25,
    flatShading: true
  });

  // Outer Gold Double-Line Border
  const outerBorderWidth = rugW - 0.4;
  const outerBorderDepth = rugD - 0.4;
  const borderThickness = 0.05;

  function createRectBorder(w, d, thickness, yOffset) {
    const bGroup = new THREE.Group();
    // Top & Bottom
    [-d / 2, d / 2].forEach(pz => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(w, 0.004, thickness), goldBorderMat);
      bar.position.set(0, yOffset, pz);
      bGroup.add(bar);
    });
    // Left & Right
    [-w / 2, w / 2].forEach(px => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(thickness, 0.004, d), goldBorderMat);
      bar.position.set(px, yOffset, 0);
      bGroup.add(bar);
    });
    return bGroup;
  }

  rugGroup.add(createRectBorder(outerBorderWidth, outerBorderDepth, 0.06, rugY + 0.009));
  rugGroup.add(createRectBorder(outerBorderWidth - 0.28, outerBorderDepth - 0.28, 0.03, rugY + 0.009));

  // Subtle Center Gold Geometric Oval / Medallion
  const medallionRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.6, 0.025, 6, 24),
    goldBorderMat
  );
  medallionRing.rotation.x = Math.PI / 2;
  medallionRing.scale.set(1.4, 0.9, 1);
  medallionRing.position.set(0, rugY + 0.009, 0);
  rugGroup.add(medallionRing);

  roomGroup.add(rugGroup);

  // 4. Wall Sconces with Warm PointLights & Glowing Bulbs
  const sconcePositions = [
    new THREE.Vector3(-6.2, 3.8, ROOM.minZ + 0.16),
    new THREE.Vector3(6.2, 3.8, ROOM.minZ + 0.16),
    new THREE.Vector3(ROOM.minX + 0.16, 3.8, -3.2),
    new THREE.Vector3(ROOM.minX + 0.16, 3.8, 3.8),
    new THREE.Vector3(ROOM.maxX - 0.16, 3.8, -3.2),
    new THREE.Vector3(ROOM.maxX - 0.16, 3.8, 3.8)
  ];

  sconcePositions.forEach(pos => {
    const sconce = createWallSconce(pos);
    roomGroup.add(sconce);
    createSconceLight(scene, new THREE.Vector3(pos.x, pos.y + 0.15, pos.z));
  });

  // 5. Potted Low-Poly Plants
  const plantPositions = [
    new THREE.Vector3(ROOM.minX + 1.1, 0, ROOM.minZ + 1.1),
    new THREE.Vector3(ROOM.maxX - 1.1, 0, ROOM.minZ + 1.1),
    new THREE.Vector3(ROOM.minX + 1.1, 0, ROOM.maxZ - 1.2),
    new THREE.Vector3(ROOM.maxX - 1.1, 0, ROOM.maxZ - 1.2),
    new THREE.Vector3(-3.8, 0, ROOM.minZ + 0.7),
    new THREE.Vector3(3.8, 0, ROOM.minZ + 0.7)
  ];

  plantPositions.forEach((pPos, pIdx) => {
    const plant = createPottedPlant(pPos, 0.95 + (pIdx % 3) * 0.15);
    roomGroup.add(plant);
  });

  scene.add(roomGroup);

  return {
    ROOM,
    roomGroup
  };
}

// Helper: Create a decorative brass wall sconce
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

  // Wall Backplate
  const backplate = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.32, 0.04),
    brassMat
  );
  group.add(backplate);

  // Curved Stem
  const arm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.018, 0.018, 0.22, 6),
    brassMat
  );
  arm.position.set(0, -0.04, 0.09);
  arm.rotation.x = Math.PI / 4;
  group.add(arm);

  // Shade Cup
  const cup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.12, 0.14, 8, 1, true),
    new THREE.MeshStandardMaterial({
      color: '#e2be7a',
      roughness: 0.5,
      metalness: 0.3,
      side: THREE.DoubleSide,
      flatShading: true
    })
  );
  cup.position.set(0, 0.12, 0.15);
  group.add(cup);

  // Glowing Bulb
  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.055, 8, 6),
    glowingBulbMat
  );
  bulb.position.set(0, 0.13, 0.15);
  group.add(bulb);

  return group;
}

// Helper: Create a stylized low-poly potted plant
function createPottedPlant(position, scale = 1.0) {
  const group = new THREE.Group();
  group.position.copy(position);
  group.scale.setScalar(scale);

  // Terra-cotta Pot
  const potMat = new THREE.MeshStandardMaterial({
    color: '#9e5636',
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true
  });

  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.22, 0.55, 8),
    potMat
  );
  pot.position.set(0, 0.275, 0);
  pot.castShadow = true;
  group.add(pot);

  // Soil
  const soil = new THREE.Mesh(
    new THREE.CircleGeometry(0.3, 8),
    new THREE.MeshStandardMaterial({ color: '#2b1b11', roughness: 0.95, flatShading: true })
  );
  soil.rotation.x = -Math.PI / 2;
  soil.position.set(0, 0.54, 0);
  group.add(soil);

  // Foliage Clumps (Icosahedrons with varying greens)
  const foliageLeaves = [
    { p: [0, 0.85, 0], r: 0.36, c: '#3e6638' },
    { p: [0.18, 1.1, 0.08], r: 0.28, c: '#4d7d44' },
    { p: [-0.16, 1.05, -0.06], r: 0.29, c: '#365930' },
    { p: [0.03, 1.35, 0.02], r: 0.24, c: '#54874b' }
  ];

  foliageLeaves.forEach(leaf => {
    const leafMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(leaf.r, 0),
      new THREE.MeshStandardMaterial({
        color: leaf.c,
        roughness: 0.82,
        metalness: 0.02,
        flatShading: true
      })
    );
    leafMesh.position.set(...leaf.p);
    leafMesh.castShadow = true;
    group.add(leafMesh);
  });

  return group;
}

