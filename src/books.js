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
  '#3d3126', // Espresso
  '#4a3b59', // Muted plum
  '#5c5346'  // Slate olive
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
    color: '#301c10',
    roughness: 0.9,
    metalness: 0.05,
    flatShading: true
  });

  // Collect book slot placement specifications to build with InstancedMesh
  const bookSlots = [];

  // Helper to build a single standalone wooden bookshelf unit
  function createShelfUnit(x, y, z, rotY, width, height, depth, numShelves, doubleSided = false) {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.rotation.y = rotY;

    // 1. Back panel (only if not open double-sided partition)
    if (!doubleSided) {
      const back = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, 0.04),
        shelfBackMat
      );
      back.position.set(0, height / 2, -depth / 2 + 0.02);
      back.receiveShadow = true;
      group.add(back);
    }

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
      new THREE.BoxGeometry(width + 0.04, 0.14, depth + 0.04),
      shelfWoodMat
    );
    plinth.position.set(0, 0.07, 0);
    plinth.castShadow = true;
    group.add(plinth);

    const crown = new THREE.Mesh(
      new THREE.BoxGeometry(width + 0.08, 0.16, depth + 0.08),
      shelfWoodMat
    );
    crown.position.set(0, height - 0.08, 0);
    crown.castShadow = true;
    group.add(crown);

    // 4. Horizontal Shelves & Book Slot Locations
    const shelfSpacing = (height - 0.32) / numShelves;
    const shelfGeo = new THREE.BoxGeometry(width - 0.08, 0.04, depth - 0.02);

    for (let i = 0; i < numShelves; i++) {
      const shelfY = 0.18 + (i * shelfSpacing);
      const shelf = new THREE.Mesh(shelfGeo, shelfWoodMat);
      shelf.position.set(0, shelfY, 0);
      shelf.castShadow = true;
      shelf.receiveShadow = true;
      group.add(shelf);

      // Store shelf span for book population
      bookSlots.push({
        origin: new THREE.Vector3(x, y + shelfY + 0.02, z),
        rotY,
        width: width - 0.2,
        depth: depth - 0.1,
        maxHeight: shelfSpacing - 0.08,
        seed: Math.abs(Math.round(x * 123 + z * 77 + i * 31)) + 1
      });
    }

    scene.add(group);
  }

  // MULTIPLE BOOKSHELVES:

  // 1. Back Wall Bookshelves (Left & Right flanking windows and barista counter)
  // Back Wall is at Z = -14.6
  createShelfUnit(-16.4, 0, -14.6, 0, 3.0, 5.0, 0.52, 7);
  createShelfUnit(-12.0, 0, -14.6, 0, 2.4, 5.0, 0.52, 7);
  createShelfUnit(-6.8, 0, -14.6, 0, 2.8, 5.0, 0.52, 7);
  createShelfUnit(6.8, 0, -14.6, 0, 2.8, 5.0, 0.52, 7);
  createShelfUnit(12.0, 0, -14.6, 0, 2.4, 5.0, 0.52, 7);
  createShelfUnit(16.4, 0, -14.6, 0, 3.0, 5.0, 0.52, 7);

  // 2. West Wall Bookshelves (Entire Left Wall)
  // X = -17.6, facing East (rotY = Math.PI / 2)
  createShelfUnit(-17.6, 0, -11.0, Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(-17.6, 0, -6.5, Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(-17.6, 0, -2.0, Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(-17.6, 0, 2.5, Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(-17.6, 0, 7.0, Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(-17.6, 0, 11.5, Math.PI / 2, 3.4, 5.0, 0.52, 7);

  // 3. East Wall Bookshelves (Entire Right Wall)
  // X = 17.6, facing West (rotY = -Math.PI / 2)
  createShelfUnit(17.6, 0, -11.0, -Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(17.6, 0, -6.5, -Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(17.6, 0, -2.0, -Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(17.6, 0, 2.5, -Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(17.6, 0, 7.0, -Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(17.6, 0, 11.5, -Math.PI / 2, 3.4, 5.0, 0.52, 7);

  // 4. Free-Standing Room Partition Bookshelves (Dividing center avenue and table zones)
  // Mid-height library partition shelving units (height 2.4m, 4 shelves)
  createShelfUnit(-8.6, 0, -11.8, 0, 3.2, 2.4, 0.5, 4);
  createShelfUnit(8.6, 0, -11.8, 0, 3.2, 2.4, 0.5, 4);
  createShelfUnit(-8.6, 0, 12.8, 0, 3.2, 2.4, 0.5, 4);
  createShelfUnit(8.6, 0, 12.8, 0, 3.2, 2.4, 0.5, 4);

  // 5. Populate Thousands of Procedural Books using THREE.InstancedMesh
  const totalEstimatedBooks = 2400;
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
      const bThickness = 0.055 + rand() * 0.07;
      const bHeight = THREE.MathUtils.clamp(0.26 + rand() * 0.22, 0.22, slot.maxHeight);
      const bDepth = THREE.MathUtils.clamp(0.24 + rand() * 0.06, 0.2, slot.depth);

      const hasTilt = rand() > 0.84;
      const tiltAngle = hasTilt ? (rand() - 0.5) * 0.22 : 0;

      const localX = curX + bThickness / 2;
      const localY = bHeight / 2;
      const localZ = (rand() - 0.5) * 0.03;

      dummy.position.set(localX, localY, localZ);
      dummy.rotation.set(0, 0, tiltAngle);
      dummy.scale.set(bThickness, bHeight, bDepth);

      dummy.rotateY(slot.rotY);
      const worldPos = new THREE.Vector3(localX, localY, localZ)
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), slot.rotY)
        .add(slot.origin);
      dummy.position.copy(worldPos);

      dummy.updateMatrix();
      instancedBooks.setMatrixAt(bookIndex, dummy.matrix);

      const hex = BOOK_PALETTE[Math.floor(rand() * BOOK_PALETTE.length)];
      color.set(hex);
      instancedBooks.setColorAt(bookIndex, color);

      bookIndex++;
      curX += bThickness + 0.012;
    }
  });

  instancedBooks.instanceMatrix.needsUpdate = true;
  if (instancedBooks.instanceColor) {
    instancedBooks.instanceColor.needsUpdate = true;
  }
  scene.add(instancedBooks);

  return {
    instancedBooks,
    totalBooks: bookIndex
  };
}
