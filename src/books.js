import * as THREE from 'three';

// Muted Palette Colors for Books
const BOOK_PALETTE = [
  '#7a2824', // Deep red
  '#274734', // Forest green
  '#283c5e', // Navy blue
  '#a67d32', // Mustard gold
  '#613d22', // Warm brown
  '#84392a', // Rust red
  '#3a483a', // Sage dark
  '#3d3126'  // Espresso
];

// Helper: Seeded pseudo-random generator
function createPRNG(seed = 12345) {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 0x3c6ef35f) >>> 0;
    return s / 0x100000000;
  };
}

export function buildBookshelves(scene) {
  const shelfWoodMat = new THREE.MeshStandardMaterial({
    color: '#462b18',
    roughness: 0.82,
    metalness: 0.05,
    flatShading: true
  });

  const shelfBackMat = new THREE.MeshStandardMaterial({
    color: '#341f12',
    roughness: 0.9,
    metalness: 0.05,
    flatShading: true
  });

  // Collect book slot placement specifications to build with InstancedMesh
  const bookSlots = [];

  // Helper to build a single standalone wooden bookshelf unit
  function createShelfUnit(x, y, z, rotY, width, height, depth, numShelves) {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.rotation.y = rotY;

    // 1. Back panel
    const back = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, 0.04),
      shelfBackMat
    );
    back.position.set(0, height / 2, -depth / 2 + 0.02);
    back.receiveShadow = true;
    group.add(back);

    // 2. Left & Right uprights
    const uprightGeo = new THREE.BoxGeometry(0.08, height, depth);
    const leftUpright = new THREE.Mesh(uprightGeo, shelfWoodMat);
    leftUpright.position.set(-width / 2 + 0.04, height / 2, 0);
    leftUpright.castShadow = true;
    leftUpright.receiveShadow = true;
    group.add(leftUpright);

    const rightUpright = new THREE.Mesh(uprightGeo, shelfWoodMat);
    rightUpright.position.set(width / 2 - 0.04, height / 2, 0);
    rightUpright.castShadow = true;
    rightUpright.receiveShadow = true;
    group.add(rightUpright);

    // 3. Top crown and bottom base plinth
    const plinth = new THREE.Mesh(
      new THREE.BoxGeometry(width, 0.12, depth + 0.04),
      shelfWoodMat
    );
    plinth.position.set(0, 0.06, 0.02);
    plinth.castShadow = true;
    group.add(plinth);

    const crown = new THREE.Mesh(
      new THREE.BoxGeometry(width + 0.08, 0.14, depth + 0.06),
      shelfWoodMat
    );
    crown.position.set(0, height - 0.07, 0.03);
    crown.castShadow = true;
    group.add(crown);

    // 4. Horizontal Shelves & Book Slot Locations
    const shelfSpacing = (height - 0.3) / numShelves;
    const shelfGeo = new THREE.BoxGeometry(width - 0.08, 0.04, depth - 0.02);

    for (let i = 0; i < numShelves; i++) {
      const shelfY = 0.15 + (i * shelfSpacing);
      const shelf = new THREE.Mesh(shelfGeo, shelfWoodMat);
      shelf.position.set(0, shelfY, 0);
      shelf.castShadow = true;
      shelf.receiveShadow = true;
      group.add(shelf);

      // Store shelf span for book population
      bookSlots.push({
        origin: new THREE.Vector3(x, y + shelfY + 0.02, z),
        rotY,
        width: width - 0.22,
        depth: depth - 0.1,
        maxHeight: shelfSpacing - 0.08,
        seed: Math.abs(Math.round(x * 100 + z * 50 + i * 17)) + 1
      });
    }

    scene.add(group);
  }

  // 1. Back Wall Bookshelves (Lining both sides of the 3 central windows)
  // Back Wall is at Z = -7.3
  createShelfUnit(-8.2, 0, -7.1, 0, 3.2, 4.4, 0.5, 6);
  createShelfUnit(-4.6, 0, -7.1, 0, 2.2, 4.4, 0.5, 6);
  createShelfUnit(4.6, 0, -7.1, 0, 2.2, 4.4, 0.5, 6);
  createShelfUnit(8.2, 0, -7.1, 0, 3.2, 4.4, 0.5, 6);

  // 2. Left Wall Bookshelves (Lining the West wall)
  // Left Wall is at X = -10.3, facing into the room (+90 deg)
  createShelfUnit(-10.1, 0, -4.8, Math.PI / 2, 3.2, 4.4, 0.5, 6);
  createShelfUnit(-10.1, 0, -1.2, Math.PI / 2, 3.2, 4.4, 0.5, 6);
  createShelfUnit(-10.1, 0, 2.4, Math.PI / 2, 3.2, 4.4, 0.5, 6);
  createShelfUnit(-10.1, 0, 5.8, Math.PI / 2, 3.0, 4.4, 0.5, 6);

  // 3. Populate Hundreds of Procedural Books using THREE.InstancedMesh
  const totalEstimatedBooks = 750;
  const bookGeo = new THREE.BoxGeometry(1, 1, 1);
  const bookMat = new THREE.MeshStandardMaterial({
    roughness: 0.75,
    metalness: 0.05,
    flatShading: true
  });

  const instancedBooks = new THREE.InstancedMesh(bookGeo, bookMat, totalEstimatedBooks);
  instancedBooks.castShadow = true;
  instancedBooks.receiveShadow = true;

  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  let bookIndex = 0;

  bookSlots.forEach(slot => {
    const rand = createPRNG(slot.seed);
    let curX = -slot.width / 2;

    while (curX < slot.width / 2 - 0.12 && bookIndex < totalEstimatedBooks) {
      // Random book dimensions
      const bThickness = 0.06 + rand() * 0.065;
      const bHeight = THREE.MathUtils.clamp(0.28 + rand() * 0.22, 0.24, slot.maxHeight);
      const bDepth = THREE.MathUtils.clamp(0.24 + rand() * 0.06, 0.2, slot.depth);

      // Random slight tilt
      const hasTilt = rand() > 0.82;
      const tiltAngle = hasTilt ? (rand() - 0.5) * 0.22 : 0;

      // Position in shelf local space
      const localX = curX + bThickness / 2;
      const localY = bHeight / 2;
      const localZ = (rand() - 0.5) * 0.03;

      // Transform to world space
      dummy.position.set(localX, localY, localZ);
      dummy.rotation.set(0, 0, tiltAngle);
      dummy.scale.set(bThickness, bHeight, bDepth);

      // Apply shelf orientation and position
      dummy.rotateY(slot.rotY);
      const worldPos = new THREE.Vector3(localX, localY, localZ)
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), slot.rotY)
        .add(slot.origin);
      dummy.position.copy(worldPos);

      dummy.updateMatrix();
      instancedBooks.setMatrixAt(bookIndex, dummy.matrix);

      // Assign muted palette color
      const hex = BOOK_PALETTE[Math.floor(rand() * BOOK_PALETTE.length)];
      color.set(hex);
      instancedBooks.setColorAt(bookIndex, color);

      curX += bThickness + 0.012;
      bookIndex++;
    }
  });

  instancedBooks.count = bookIndex;
  instancedBooks.instanceMatrix.needsUpdate = true;
  if (instancedBooks.instanceColor) {
    instancedBooks.instanceColor.needsUpdate = true;
  }
  scene.add(instancedBooks);

  return {
    instancedBooks
  };
}

