import * as THREE from 'three';
import { createDeskLampLight } from './lighting.js';

// Random Study Topics
export const STUDY_TOPICS = [
  'Organic Chemistry: SN1 vs SN2 Mechanisms',
  'Astrophysics: Stellar Nucleosynthesis in Red Giants',
  'Ancient Philosophy: Marcus Aurelius & Stoic Ethics',
  'Algorithms: Dijkstra & Graph Minimum Spanning Trees',
  'Architecture: Gothic Ribbed Vaults & Flying Buttresses',
  'Genetics: CRISPR-Cas9 Base Editing Protocols',
  'Neuroscience: Long-Term Potentiation & Synaptic Memory',
  'Literary History: Modernism & Virginia Woolf'
];

// Demo Students
export const DEMO_STUDENTS = [
  { name: 'Aarav', avatar: '🦉', shirtColor: '#3f5a8a', hairColor: '#1e140d' },
  { name: 'Meera', avatar: '🌿', shirtColor: '#4f7a5a', hairColor: '#2b1b11' },
  { name: 'Kabir', avatar: '🐢', shirtColor: '#b9862f', hairColor: '#1a100b' },
  { name: 'Isha', avatar: '📚', shirtColor: '#8a4a3a', hairColor: '#3d2516' },
  { name: 'Rohan', avatar: '☕', shirtColor: '#7a6aa8', hairColor: '#20150f' },
  { name: 'Tara', avatar: '🌙', shirtColor: '#c07a4a', hairColor: '#472b17' }
];

export function buildFurniture(scene) {
  const desksData = [];
  const deskClickables = [];

  // Materials
  const woodTopMat = new THREE.MeshStandardMaterial({
    color: '#764928',
    roughness: 0.78,
    metalness: 0.05,
    flatShading: true
  });

  const woodGableMat = new THREE.MeshStandardMaterial({
    color: '#5b3419',
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true
  });

  const dividerMat = new THREE.MeshStandardMaterial({
    color: '#4d2a13',
    roughness: 0.88,
    metalness: 0.04,
    flatShading: true
  });

  const brassMat = new THREE.MeshStandardMaterial({
    color: '#cfa24b',
    roughness: 0.35,
    metalness: 0.7,
    flatShading: true
  });

  const lampShadeMatOn = new THREE.MeshStandardMaterial({
    color: '#2d6d45',
    emissive: '#134024',
    roughness: 0.45,
    metalness: 0.2,
    side: THREE.DoubleSide,
    flatShading: true
  });

  const lampShadeMatOff = new THREE.MeshStandardMaterial({
    color: '#214730',
    emissive: '#091d12',
    roughness: 0.6,
    metalness: 0.1,
    side: THREE.DoubleSide,
    flatShading: true
  });

  const chairWoodMat = new THREE.MeshStandardMaterial({
    color: '#4e2d17',
    roughness: 0.82,
    metalness: 0.05,
    flatShading: true
  });

  const chairCushionMat = new THREE.MeshStandardMaterial({
    color: '#34523c',
    roughness: 0.9,
    metalness: 0.02,
    flatShading: true
  });

  // Desk Layout Configuration: Two Groups of 4 Desks (North Row & South Row)
  const deskConfigs = [
    // Group 1 (North Bank - facing South, facing = 1)
    { id: 'A1', x: -4.5, z: -3.2, facing: 1, occupied: true, studentIdx: 0 },
    { id: 'A2', x: -1.5, z: -3.2, facing: 1, occupied: false },
    { id: 'A3', x: 1.5, z: -3.2, facing: 1, occupied: true, studentIdx: 1 },
    { id: 'A4', x: 4.5, z: -3.2, facing: 1, occupied: false },

    // Group 2 (South Bank - facing North, facing = -1)
    { id: 'B1', x: -4.5, z: 2.5, facing: -1, occupied: true, studentIdx: 2 },
    { id: 'B2', x: -1.5, z: 2.5, facing: -1, occupied: true, studentIdx: 3 },
    { id: 'B3', x: 1.5, z: 2.5, facing: -1, occupied: false },
    { id: 'B4', x: 4.5, z: 2.5, facing: -1, occupied: true, studentIdx: 4 }
  ];

  deskConfigs.forEach(cfg => {
    const group = new THREE.Group();

    // 1. Table Top (1.8m x 0.08m x 0.92m)
    const tableTop = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.08, 0.92),
      woodTopMat
    );
    tableTop.position.set(cfg.x, 0.76, cfg.z);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    group.add(tableTop);

    // 2. Wooden Side Gable Legs
    [-1, 1].forEach(side => {
      const leg = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.76, 0.84),
        woodGableMat
      );
      leg.position.set(cfg.x + 0.82 * side, 0.38, cfg.z);
      leg.castShadow = true;
      leg.receiveShadow = true;
      group.add(leg);
    });

    // 3. Modesty / Privacy Backboard
    const divider = new THREE.Mesh(
      new THREE.BoxGeometry(1.78, 0.28, 0.05),
      dividerMat
    );
    divider.position.set(cfg.x, 0.9, cfg.z + 0.435 * cfg.facing);
    divider.castShadow = true;
    group.add(divider);

    // 4. Brass Banker's Lamp
    const lampGroup = new THREE.Group();
    const lampX = cfg.x - 0.55;
    const lampZ = cfg.z + 0.22 * cfg.facing;

    // Base
    const lampBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.09, 0.03, 8),
      brassMat
    );
    lampBase.position.set(lampX, 0.815, lampZ);
    lampGroup.add(lampBase);

    // Stem
    const lampStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.28, 6),
      brassMat
    );
    lampStem.position.set(lampX, 0.96, lampZ);
    lampGroup.add(lampStem);

    // Emerald Green Shade
    const shadeMat = cfg.occupied ? lampShadeMatOn : lampShadeMatOff;
    const shadeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.36, 10, 1, false, 0, Math.PI);
    const shade = new THREE.Mesh(shadeGeo, shadeMat);
    shade.position.set(lampX, 1.12, lampZ);
    shade.rotation.z = Math.PI / 2;
    shade.scale.set(1, 1, 0.75);
    lampGroup.add(shade);

    // Glowing Bulb inside Lamp
    const bulbMat = new THREE.MeshBasicMaterial({
      color: cfg.occupied ? '#ffe6a8' : '#8f774e'
    });
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 6), bulbMat);
    bulb.position.set(lampX, 1.09, lampZ);
    lampGroup.add(bulb);

    group.add(lampGroup);

    // Warm PointLight for Banker's Lamp (when occupied or turned on)
    let lampLight = null;
    if (cfg.occupied) {
      lampLight = createDeskLampLight(scene, new THREE.Vector3(lampX, 1.05, lampZ));
    }

    // 5. Small Book or Book Stack on Desk
    const bookColors = ['#7c2b23', '#2d4766', '#355239', '#856328'];
    const bookColor = bookColors[Math.abs(Math.round(cfg.x * 3 + cfg.z * 5)) % bookColors.length];

    const bookMat = new THREE.MeshStandardMaterial({
      color: bookColor,
      roughness: 0.75,
      metalness: 0.05,
      flatShading: true
    });
    const pagesMat = new THREE.MeshStandardMaterial({
      color: '#f6eedc',
      roughness: 0.9,
      flatShading: true
    });

    const bookGroup = new THREE.Group();
    const bookCover = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.035, 0.32),
      bookMat
    );
    bookCover.castShadow = true;
    bookGroup.add(bookCover);

    const bookPages = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.03, 0.3),
      pagesMat
    );
    bookPages.position.set(0.005, 0.002, 0);
    bookGroup.add(bookPages);

    bookGroup.position.set(cfg.x + 0.35, 0.82, cfg.z - 0.1 * cfg.facing);
    bookGroup.rotation.y = (Math.sin(cfg.x * 2) * 0.25);
    group.add(bookGroup);

    // 6. Chair at Desk
    const chairGroup = new THREE.Group();
    // Vacant chairs start pulled out slightly; occupied chairs are tucked in
    const chairZ = cfg.z - (cfg.occupied ? 0.78 : 0.98) * cfg.facing;
    const chairRotY = cfg.facing > 0 ? 0 : Math.PI;
    const chairAngle = cfg.occupied ? 0 : (Math.sin(cfg.x * 4) * 0.12);

    chairGroup.position.set(cfg.x, 0, chairZ);
    chairGroup.rotation.y = chairRotY + chairAngle;

    // Seat Cushion
    const cushion = new THREE.Mesh(
      new THREE.BoxGeometry(0.52, 0.08, 0.48),
      chairCushionMat
    );
    cushion.position.set(0, 0.48, 0);
    cushion.castShadow = true;
    chairGroup.add(cushion);

    // High Backrest with Spindles
    const backTop = new THREE.Mesh(
      new THREE.BoxGeometry(0.52, 0.07, 0.05),
      chairWoodMat
    );
    backTop.position.set(0, 0.92, -0.22);
    backTop.castShadow = true;
    chairGroup.add(backTop);

    // 3 Backrest Spindles
    [-0.16, 0, 0.16].forEach(sx => {
      const spindle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.014, 0.014, 0.38, 6),
        chairWoodMat
      );
      spindle.position.set(sx, 0.71, -0.22);
      chairGroup.add(spindle);
    });

    // 4 Chair Legs
    [
      [-0.22, -0.2],
      [0.22, -0.2],
      [-0.22, 0.2],
      [0.22, 0.2]
    ].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.014, 0.46, 6),
        chairWoodMat
      );
      leg.position.set(lx, 0.23, lz);
      leg.castShadow = true;
      chairGroup.add(leg);
    });

    group.add(chairGroup);

    // 7. Seated Low-Poly Character (if occupied)
    let avatarGroup = null;
    let studentData = null;

    if (cfg.occupied) {
      studentData = DEMO_STUDENTS[cfg.studentIdx % DEMO_STUDENTS.length];
      const topic = STUDY_TOPICS[cfg.studentIdx % STUDY_TOPICS.length];
      studentData = { ...studentData, topic };

      avatarGroup = createSeatedAvatar(studentData.shirtColor, studentData.hairColor);
      avatarGroup.position.set(cfg.x, 0, cfg.z - 0.78 * cfg.facing);
      avatarGroup.rotation.y = cfg.facing > 0 ? 0 : Math.PI;
      group.add(avatarGroup);
    }

    // 8. Invisible Clickable Box for Precise Raycasting
    const hitBox = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 1.4, 1.5),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitBox.position.set(cfg.x, 0.7, cfg.z - 0.4 * cfg.facing);
    hitBox.userData = {
      seatId: cfg.id,
      occupied: cfg.occupied,
      deskPosition: new THREE.Vector3(cfg.x, 0.76, cfg.z),
      chairPosition: new THREE.Vector3(cfg.x, 0, cfg.z - 0.78 * cfg.facing),
      facing: cfg.facing,
      studentData
    };
    deskClickables.push(hitBox);
    group.add(hitBox);

    scene.add(group);

    desksData.push({
      id: cfg.id,
      deskGroup: group,
      chairGroup,
      avatarGroup,
      hitBox,
      config: cfg,
      studentData,
      lampLight,
      lampShade: shade,
      bulb
    });
  });

  // Helper to sit the player at a desk
  function sitPlayerAtDesk(deskId, playerShirtColor, playerHairColor) {
    const targetDesk = desksData.find(d => d.id === deskId);
    if (!targetDesk || targetDesk.config.occupied) return false;

    // Create seated avatar for player
    targetDesk.config.occupied = true;
    targetDesk.hitBox.userData.occupied = true;
    targetDesk.hitBox.userData.studentData = {
      name: 'You',
      avatar: '📖',
      topic: 'Personal Focus & Deep Study Session',
      shirtColor: playerShirtColor,
      hairColor: playerHairColor
    };

    // Tuck chair in
    targetDesk.chairGroup.position.z = targetDesk.config.z - 0.78 * targetDesk.config.facing;
    targetDesk.chairGroup.rotation.y = targetDesk.config.facing > 0 ? 0 : Math.PI;

    // Turn on lamp
    targetDesk.lampShade.material = lampShadeMatOn;
    targetDesk.bulb.material.color.set('#ffe6a8');
    if (!targetDesk.lampLight) {
      targetDesk.lampLight = createDeskLampLight(
        scene,
        new THREE.Vector3(targetDesk.config.x - 0.55, 1.05, targetDesk.config.z + 0.22 * targetDesk.config.facing)
      );
    }

    // Build and add avatar
    const avatar = createSeatedAvatar(playerShirtColor, playerHairColor);
    avatar.position.set(targetDesk.config.x, 0, targetDesk.config.z - 0.78 * targetDesk.config.facing);
    avatar.rotation.y = targetDesk.config.facing > 0 ? 0 : Math.PI;
    targetDesk.deskGroup.add(avatar);
    targetDesk.avatarGroup = avatar;

    return true;
  }

  return {
    desksData,
    deskClickables,
    sitPlayerAtDesk
  };
}

// Helper: Create a stylized low-poly seated character
export function createSeatedAvatar(shirtColor = '#3f5a8a', hairColor = '#24170e') {
  const avatar = new THREE.Group();

  const skinMat = new THREE.MeshStandardMaterial({
    color: '#e5b993',
    roughness: 0.8,
    metalness: 0.02,
    flatShading: true
  });

  const shirtMat = new THREE.MeshStandardMaterial({
    color: shirtColor,
    roughness: 0.75,
    metalness: 0.05,
    flatShading: true
  });

  const pantsMat = new THREE.MeshStandardMaterial({
    color: '#363c45',
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true
  });

  const hairMat = new THREE.MeshStandardMaterial({
    color: hairColor,
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true
  });

  // 1. Pants / Seated Legs
  const hips = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.12, 0.36), pantsMat);
  hips.position.set(0, 0.52, 0.12);
  hips.castShadow = true;
  avatar.add(hips);

  const legs = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.44, 0.12), pantsMat);
  legs.position.set(0, 0.24, 0.28);
  legs.castShadow = true;
  avatar.add(legs);

  // 2. Box Torso (Leaning slightly forward in studious focus)
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.48, 0.22), shirtMat);
  torso.position.set(0, 0.78, 0.05);
  torso.rotation.x = 0.14;
  torso.castShadow = true;
  avatar.add(torso);

  // 3. Neck
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.08, 6), skinMat);
  neck.position.set(0, 1.04, 0.08);
  avatar.add(neck);

  // 4. Low-Poly Sphere Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), skinMat);
  head.position.set(0, 1.18, 0.12);
  head.castShadow = true;
  avatar.add(head);

  // 5. Stylized Low-Poly Hair
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 7), hairMat);
  hair.position.set(0, 1.22, 0.1);
  hair.scale.set(1.02, 0.95, 1.05);
  avatar.add(hair);

  // 6. Arms resting on desk
  [-1, 1].forEach(side => {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.1, 0.32), shirtMat);
    arm.position.set(0.2 * side, 0.78, 0.22);
    arm.rotation.x = -0.45;
    avatar.add(arm);

    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 6), skinMat);
    hand.position.set(0.2 * side, 0.73, 0.36);
    avatar.add(hand);
  });

  avatar.userData = {
    shirtMat,
    hairMat
  };

  return avatar;
}

