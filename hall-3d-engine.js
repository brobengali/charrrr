// Hush Hall · 3D Hall Engine (Three.js WebGL)
// High-fidelity replica of the original Hush Hall library hall.

(function(window) {
  'use strict';

  const THREE = window.THREE;
  if (!THREE) {
    console.error('[HushHall] THREE.js is not loaded. Ensure three.min.js loads before hall-3d-engine.js.');
    window.Hall3DEngine = null;
    return;
  }

  // Room Dimensions
  const ROOM = {
    minX: -10.5,
    maxX: 10.5,
    minZ: -7.6,
    maxZ: 7.2,
    height: 6
  };

  // 24 Desks Layout Coordinates (A1..D6)
  const ROWS = ['A', 'B', 'C', 'D'];
  const DESK_Z = [-4.45, -3.55, 1.55, 2.45];
  const FACING = [1, -1, 1, -1];
  const COLS = 6;

  const DESKS = [];
  const DESK_MAP = new Map();

  ROWS.forEach((row, rIdx) => {
    for (let c = 0; c < COLS; c++) {
      const seat = `${row}${c + 1}`;
      const x = (c - (COLS - 1) / 2) * 2.5 + (c >= COLS / 2 ? 0.7 : -0.7);
      const deskZ = DESK_Z[rIdx];
      const facing = FACING[rIdx];
      const chairZ = deskZ - 0.78 * facing;
      const data = { seat, x, deskZ, chairZ, facing };
      DESKS.push(data);
      DESK_MAP.set(seat, data);
    }
  });

  // Collision Obstacles for Walking Character
  const OBSTACLES = [
    // Desks
    ...DESKS.map(d => ({
      x0: d.x - 0.92,
      x1: d.x + 0.92,
      z0: d.deskZ - 0.5,
      z1: d.deskZ + 0.5
    })),
    // Bookcases along North Wall
    { x0: -9.5, x1: -7.3, z0: ROOM.minZ, z1: ROOM.minZ + 0.5 },
    { x0: -3.5, x1: -1.1, z0: ROOM.minZ, z1: ROOM.minZ + 0.5 },
    { x0: 1.1, x1: 3.5, z0: ROOM.minZ, z1: ROOM.minZ + 0.5 },
    { x0: 7.3, x1: 9.5, z0: ROOM.minZ, z1: ROOM.minZ + 0.5 },
    // Bookcases along West Wall
    { x0: ROOM.minX, x1: ROOM.minX + 0.5, z0: -6.5, z1: -3.9 },
    { x0: ROOM.minX, x1: ROOM.minX + 0.5, z0: -2.9, z1: -0.3 },
    { x0: ROOM.minX, x1: ROOM.minX + 0.5, z0: 0.7, z1: 3.3 },
    { x0: ROOM.minX, x1: ROOM.minX + 0.5, z0: 4.3, z1: 6.9 },
    // Potted Plants
    { x0: ROOM.minX + 0.3, x1: ROOM.minX + 1.1, z0: ROOM.minZ + 0.5, z1: ROOM.minZ + 1.3 },
    { x0: -7.0, x1: -6.2, z0: ROOM.minZ + 0.3, z1: ROOM.minZ + 1.1 },
    { x0: 6.2, x1: 7.0, z0: ROOM.minZ + 0.3, z1: ROOM.minZ + 1.1 },
    { x0: ROOM.maxX - 1.2, x1: ROOM.maxX - 0.4, z0: ROOM.minZ + 0.5, z1: ROOM.minZ + 1.3 }
  ];

  const WALK_BOUNDS = {
    minX: ROOM.minX + 0.7,
    maxX: ROOM.maxX - 0.7,
    minZ: ROOM.minZ + 0.7,
    maxZ: ROOM.maxZ - 0.7
  };

  // Color Palettes from Original Hush Hall
  const SKIN_TONES = ['#f3d4b5', '#e9bf98', '#d9a67c', '#c48c62', '#a8724c', '#8c5a3a', '#6e4429'];
  const HAIR_TONES = ['#1a120e', '#2a1a12', '#3a2418', '#4a2e1c', '#20140f', '#5a3820'];
  const EYE_TONES = ['#5a3a22', '#4a2e1c', '#6b4a2a', '#3a2a1a'];
  const HAIR_STYLES = ['short', 'long', 'ponytail', 'bun', 'curly'];
  const OUTFIT_TYPES = ['hoodie', 'kurta', 'sweater'];
  const KNIT_COLORS = ['#4f7a5a', '#b9862f', '#3f5a8a', '#8a4a3a', '#7a6aa8', '#c07a4a', '#5a7a8a', '#6b8a3a'];
  const KURTA_COLORS = ['#efe2c4', '#e0a64a', '#5a8a86', '#c9705a', '#8aa070', '#d8c0e0'];
  const PANTS_COLORS = ['#3a3f4a', '#4a3a30', '#2f3a36', '#45403a'];
  const BOOK_COLORS = ['#7a2e2a', '#2f4a3a', '#8a6a3a', '#3b4a6b', '#5a3a2a', '#a37b4a', '#4d5e3a', '#6b3b4a'];

  // Helper: Create 2D Canvas
  function makeCanvas(w, h) {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const g = c.getContext('2d');
    return { c, g };
  }

  // Helper: Seeded PRNG
  function prng(seed) {
    let s = seed >>> 0;
    return () => {
      s = (1664525 * s + 0x3c6ef35f) >>> 0;
      return s / 0x100000000;
    };
  }

  // Helper: Hash string to int
  function hashStr(str, init = 5381) {
    let h = init;
    for (let i = 0; i < str.length; i++) {
      h = (33 * h + str.charCodeAt(i)) >>> 0;
    }
    return h;
  }

  // Procedural Wood Floor Texture (Original Algorithm)
  function createFloorTexture() {
    const { c, g } = makeCanvas(512, 512);
    const rand = prng(7);
    for (let y = 0; y < 512; y += 64) {
      const factor = 0.82 + 0.22 * rand();
      g.fillStyle = `rgb(${Math.round(120 * factor)},${Math.round(78 * factor)},${Math.round(48 * factor)})`;
      g.fillRect(0, y, 512, 64);
      for (let i = 0; i < 14; i++) {
        g.strokeStyle = `rgba(60,35,20,${0.08 + 0.1 * rand()})`;
        g.beginPath();
        const py = y + 64 * rand();
        g.moveTo(0, py);
        g.bezierCurveTo(170, py + 6 * rand() - 3, 340, py + 6 * rand() - 3, 512, py);
        g.stroke();
      }
      g.fillStyle = 'rgba(40,22,12,0.55)';
      g.fillRect(0, y, 512, 2);
      const seam = 512 * rand();
      g.fillRect(seam, y, 2, 64);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(5, 4);
    tex.anisotropy = 4;
    return tex;
  }

  // Procedural Green Carpet Runner Texture (Original Algorithm)
  function createCarpetTexture() {
    const { c, g } = makeCanvas(256, 256);
    g.fillStyle = '#2f4a3a';
    g.fillRect(0, 0, 256, 256);
    g.strokeStyle = '#7d6840';
    g.lineWidth = 4;
    g.strokeRect(14, 14, 228, 228);
    g.lineWidth = 2;
    g.strokeRect(26, 26, 204, 204);
    g.fillStyle = 'rgba(184,149,90,0.18)';
    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 6; y++) {
        g.beginPath();
        g.arc(48 + 32 * x, 48 + 32 * y, 5, 0, 2 * Math.PI);
        g.fill();
      }
    }
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    return tex;
  }

  // Procedural Night Sky with Rain Window Texture (Original Algorithm)
  function createWindowTexture() {
    const { c, g } = makeCanvas(128, 256);
    const grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#1b2a44');
    grad.addColorStop(1, '#2c3f5c');
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 256);

    const rand = prng(3);
    // Stars / warm city glow
    for (let i = 0; i < 26; i++) {
      g.fillStyle = `rgba(255,220,160,${0.15 + 0.35 * rand()})`;
      g.beginPath();
      g.arc(128 * rand(), 150 + 100 * rand(), 1 + 1.5 * rand(), 0, 2 * Math.PI);
      g.fill();
    }
    // Rain streaks
    for (let i = 0; i < 60; i++) {
      const rx = 128 * rand();
      const ry = 256 * rand();
      g.strokeStyle = `rgba(200,220,255,${0.12 + 0.2 * rand()})`;
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(rx, ry);
      g.lineTo(rx + 2 * rand() - 1, ry + 8 + 18 * rand());
      g.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  // Procedural Radial Light Pool Texture (Original Algorithm)
  function createLightPoolTexture() {
    const { c, g } = makeCanvas(128, 128);
    const rad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    rad.addColorStop(0, 'rgba(255,214,140,0.9)');
    rad.addColorStop(0.4, 'rgba(255,190,110,0.35)');
    rad.addColorStop(1, 'rgba(255,170,90,0)');
    g.fillStyle = rad;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }

  // Procedural Floor Shadow Texture (Original Algorithm)
  function createShadowTexture() {
    const { c, g } = makeCanvas(64, 64);
    const rad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    rad.addColorStop(0, 'rgba(20,10,5,0.55)');
    rad.addColorStop(1, 'rgba(20,10,5,0)');
    g.fillStyle = rad;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }

  // Procedural Brass Desk Number Plate Texture (Original Algorithm)
  function createNumberPlateTexture(seatName) {
    const { c, g } = makeCanvas(128, 64);
    const grad = g.createLinearGradient(0, 0, 0, 64);
    grad.addColorStop(0, '#e9c77b');
    grad.addColorStop(1, '#a9803c');
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 64);
    g.strokeStyle = '#6e4f22';
    g.lineWidth = 4;
    g.strokeRect(4, 4, 120, 56);
    g.fillStyle = '#3b2a12';
    g.font = 'bold 36px Georgia, serif';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(seatName, 64, 35);
    return new THREE.CanvasTexture(c);
  }

  // Procedural Animated Face Texture Cache
  const faceTextureCache = new Map();

  function createFaceTexture(skinColor, mood, hairColor, eyeColor) {
    const key = `${skinColor}|${mood}|${hairColor}|${eyeColor}`;
    if (faceTextureCache.has(key)) return faceTextureCache.get(key);

    const { c, g } = makeCanvas(512, 256);
    g.fillStyle = skinColor;
    g.fillRect(0, 0, 512, 256);

    // Blush
    for (const side of [-1, 1]) {
      const cx = 128 + 36 * side;
      const blush = g.createRadialGradient(cx, 174, 0, cx, 174, 13);
      blush.addColorStop(0, 'rgba(255,120,130,0.45)');
      blush.addColorStop(1, 'rgba(255,120,130,0)');
      g.fillStyle = blush;
      g.beginPath();
      g.ellipse(cx, 174, 15, 8, 0, 0, 2 * Math.PI);
      g.fill();
    }

    // Eyebrows
    g.strokeStyle = hairColor;
    g.lineCap = 'round';
    g.lineWidth = 3.2;
    for (const side of [-1, 1]) {
      g.beginPath();
      const bx = 128 + 30 * side;
      const browOffset = mood === 'happy' ? -3 : (mood === 'down' ? 1 : 0);
      g.moveTo(bx - 11, 129 + browOffset + (side > 0 ? 1 : 3));
      g.quadraticCurveTo(bx, 122 + browOffset, bx + 11, 129 + browOffset + (side > 0 ? 3 : 1));
      g.stroke();
    }

    // Eyes
    for (const side of [-1, 1]) {
      const ex = 128 + 30 * side;
      if (mood === 'happy') {
        g.strokeStyle = '#2a1a12';
        g.lineWidth = 3.5;
        g.beginPath();
        g.moveTo(ex - 13, 156);
        g.quadraticCurveTo(ex, 142, ex + 13, 156);
        g.stroke();
        continue;
      }

      g.save();
      g.beginPath();
      g.ellipse(ex, 152, 13.5, mood === 'down' ? 10 : 16.5, 0, 0, 2 * Math.PI);
      g.clip();

      // Sclera
      g.fillStyle = '#fffaf3';
      g.fillRect(ex - 15, 134, 30, 36);

      // Iris
      const eyeY = mood === 'down' ? 156 : 153;
      const eyeGrad = g.createLinearGradient(0, eyeY - 10, 0, eyeY + 10);
      eyeGrad.addColorStop(0, '#1a0f0a');
      eyeGrad.addColorStop(1, eyeColor);
      g.fillStyle = eyeGrad;
      g.beginPath();
      g.ellipse(ex, eyeY, 10.5, 13.5, 0, 0, 2 * Math.PI);
      g.fill();

      // Pupil
      g.fillStyle = '#120a06';
      g.beginPath();
      g.ellipse(ex, eyeY, 4.4, 5.6, 0, 0, 2 * Math.PI);
      g.fill();

      // Highlights
      g.fillStyle = '#ffffff';
      g.beginPath();
      g.arc(ex - 4, eyeY - 5, 3.4, 0, 2 * Math.PI);
      g.fill();
      g.beginPath();
      g.arc(ex + 4, eyeY + 5, 1.6, 0, 2 * Math.PI);
      g.fill();

      if (mood === 'down') {
        g.fillStyle = skinColor;
        g.fillRect(ex - 15, 134, 30, 12);
      }
      g.restore();

      // Upper Eyelash
      g.strokeStyle = '#1e120c';
      g.lineWidth = 3.4;
      g.beginPath();
      const eyTop = mood === 'down' ? 147 : 139;
      g.moveTo(ex - 13, 152 - (mood === 'down' ? 1 : 4));
      g.quadraticCurveTo(ex, eyTop - 3, ex + 13, 152 - (mood === 'down' ? 1 : 4));
      g.stroke();
    }

    // Nose
    g.strokeStyle = 'rgba(120,60,40,0.45)';
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(129, 168);
    g.quadraticCurveTo(131, 173, 127, 174);
    g.stroke();

    // Mouth
    g.strokeStyle = '#8a3a34';
    g.lineWidth = 2.4;
    if (mood === 'happy') {
      g.fillStyle = '#9a3e3a';
      g.beginPath();
      g.moveTo(120, 184);
      g.quadraticCurveTo(128, 196, 136, 184);
      g.closePath();
      g.fill();
      g.fillStyle = '#f08a8a';
      g.beginPath();
      g.ellipse(128, 190, 3.5, 2, 0, 0, 2 * Math.PI);
      g.fill();
    } else {
      g.beginPath();
      g.moveTo(122, 185);
      g.quadraticCurveTo(128, mood === 'down' ? 186 : 189, 134, 185);
      g.stroke();
    }

    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    faceTextureCache.set(key, tex);
    return tex;
  }

  // Hall3DEngine Class
  class Hall3DEngine {
    constructor(container, options = {}) {
      this.container = container;
      this.options = options;
      this.hallId = options.hallId || 'main-reading';
      this.onDeskClick = options.onDeskClick || (() => {});
      this.onDeskHover = options.onDeskHover || (() => {});
      this.onMove = options.onMove || (() => {});

      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2(-999, -999);

      this.isWalking = false;
      this.isFloorSitting = false;
      this.mySeat = null;
      this.zoomLevel = 1.0;

      // Character & Walking State
      this.playerPos = { x: 0, z: 5.4, ry: Math.PI };
      this.playerSpeed = 0;
      this.keys = new Set();
      this.yaw = Math.PI;
      this.pitch = 0.34;
      this.camDist = 3.2;
      this.isPointerDown = false;
      this.lastPointer = { x: 0, y: 0 };

      // Desks Clickables Map for Raycasting
      this.deskClickables = [];
      this.hoveredSeat = null;

      // Interactive Occupants & Dynamic Props
      this.occupants = new Map();
      this.avatarMeshes = new Map();
      this.deskLamps = new Map();
      this.deskProps = new Map();
      this.deskChairs = new Map();

      // Default Camera (Original Hush Hall Specs)
      this.defaultCam = {
        pos: new THREE.Vector3(5, 5.9, 8.4),
        look: new THREE.Vector3(0.2, 0.8, -1),
        fov: 48
      };
      this.currentCamLook = this.defaultCam.look.clone();

      this.init();
    }

    init() {
      // 1. Scene & Warm Fog
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color('#2a1b12');
      this.scene.fog = new THREE.Fog('#2a1b12', 22, 42);

      // 2. Camera with Safe Dimensions
      const w = this.container.clientWidth || 960;
      const h = this.container.clientHeight || 600;
      const aspect = h > 0 ? (w / h) : (16 / 9);
      this.camera = new THREE.PerspectiveCamera(this.defaultCam.fov, aspect, 0.05, 80);
      this.camera.position.copy(this.defaultCam.pos);
      this.camera.lookAt(this.defaultCam.look);

      // 3. WebGL Renderer
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      this.renderer.domElement.style.display = 'block';
      this.renderer.domElement.style.width = '100%';
      this.renderer.domElement.style.height = '100%';
      this.container.appendChild(this.renderer.domElement);

      // 4. Lights
      this.setupLights();

      // 5. Room Architecture (Floors, Walls, Windows, Bookcases, Plants)
      this.buildRoom();

      // 6. 24 Desks, Chairs, Lamps, Book Stacks & Shadows
      this.buildFurniture();

      // 7. Walking Player Avatar
      this.buildPlayer();

      // 8. Event Listeners & ResizeObserver
      this.bindEvents();

      // 9. Start Animation Render Loop
      this.animate = this.animate.bind(this);
      this.lastFrameTime = performance.now();
      requestAnimationFrame(this.animate);
    }

    setupLights() {
      // Ambient Hemisphere Light
      const hemiLight = new THREE.HemisphereLight('#ffe2b0', '#4a2e1c', 1.3);
      this.scene.add(hemiLight);

      // Primary Warm Directional Light
      const dirLight1 = new THREE.DirectionalLight('#ffd59a', 1.4);
      dirLight1.position.set(6, 12, 8);
      this.scene.add(dirLight1);

      // Cool Secondary Window Fill Light
      const dirLight2 = new THREE.DirectionalLight('#8fa6d6', 0.35);
      dirLight2.position.set(-4, 6, -10);
      this.scene.add(dirLight2);

      // Wall Sconce Point Lights
      const ptLight1 = new THREE.PointLight('#ffbf70', 9, 9, 1.6);
      ptLight1.position.set(-6.5, 4.2, -6.6);
      this.scene.add(ptLight1);

      const ptLight2 = new THREE.PointLight('#ffbf70', 9, 9, 1.6);
      ptLight2.position.set(6.5, 4.2, -6.6);
      this.scene.add(ptLight2);

      // Seated Player Desk Lamp Accent Light
      this.myDeskLight = new THREE.PointLight('#ffd08a', 0, 3, 1.5);
      this.scene.add(this.myDeskLight);
    }

    buildRoom() {
      const roomW = ROOM.maxX - ROOM.minX;
      const roomD = ROOM.maxZ - ROOM.minZ;
      const midX = (ROOM.maxX + ROOM.minX) / 2;
      const midZ = (ROOM.maxZ + ROOM.minZ) / 2;

      // 1. Wood Floor
      const floorTex = createFloorTexture();
      const floorGeo = new THREE.PlaneGeometry(roomW, roomD);
      const floorMat = new THREE.MeshLambertMaterial({ map: floorTex });
      const floorMesh = new THREE.Mesh(floorGeo, floorMat);
      floorMesh.rotation.x = -Math.PI / 2;
      floorMesh.position.set(midX, 0, midZ);
      this.scene.add(floorMesh);

      // 2. Green Library Carpet Runners (Two long runners under each row pair)
      const carpetTex = createCarpetTexture();
      const carpetGeo = new THREE.PlaneGeometry(16.5, 4.6);
      const carpetMat = new THREE.MeshLambertMaterial({ map: carpetTex });

      const carpetNorth = new THREE.Mesh(carpetGeo, carpetMat);
      carpetNorth.rotation.x = -Math.PI / 2;
      carpetNorth.position.set(0, 0.005, -4);
      this.scene.add(carpetNorth);

      const carpetSouth = new THREE.Mesh(carpetGeo, carpetMat);
      carpetSouth.rotation.x = -Math.PI / 2;
      carpetSouth.position.set(0, 0.005, 2);
      this.scene.add(carpetSouth);

      // 3. Walls & Trim
      const wallMat = new THREE.MeshLambertMaterial({ color: '#4a3020' });
      const trimMat = new THREE.MeshLambertMaterial({ color: '#3a2416' });

      // North Wall
      const northWall = new THREE.Mesh(new THREE.BoxGeometry(roomW, ROOM.height, 0.2), wallMat);
      northWall.position.set(midX, ROOM.height / 2, ROOM.minZ);
      this.scene.add(northWall);

      const northTrim = new THREE.Mesh(new THREE.BoxGeometry(roomW, 0.08, 0.06), trimMat);
      northTrim.position.set(midX, 1, ROOM.minZ + 0.12);
      this.scene.add(northTrim);

      // West Wall
      const westWall = new THREE.Mesh(new THREE.BoxGeometry(0.2, ROOM.height, roomD), wallMat);
      westWall.position.set(ROOM.minX, ROOM.height / 2, midZ);
      this.scene.add(westWall);

      // East Wall
      const eastWall = new THREE.Mesh(new THREE.BoxGeometry(0.2, ROOM.height, roomD), wallMat);
      eastWall.position.set(ROOM.maxX, ROOM.height / 2, midZ);
      this.scene.add(eastWall);

      // South Wall
      const southWall = new THREE.Mesh(new THREE.BoxGeometry(roomW, ROOM.height, 0.2), wallMat);
      southWall.position.set(midX, ROOM.height / 2, ROOM.maxZ);
      this.scene.add(southWall);

      // Ceiling
      const ceiling = new THREE.Mesh(
        new THREE.PlaneGeometry(roomW, roomD),
        new THREE.MeshLambertMaterial({ color: '#3a2618' })
      );
      ceiling.rotation.x = Math.PI / 2;
      ceiling.position.set(midX, ROOM.height, midZ);
      this.scene.add(ceiling);

      // 4. Arched Windows with Rainy Night Sky
      this.windowTex = createWindowTexture();
      [-4.6, 0, 4.6].forEach(x => {
        this.buildWindow([x, 1.3, ROOM.minZ + 0.11], 0);
      });

      // 5. Bookcases
      // North Wall Bookcases
      [-8.4, -2.3, 2.3, 8.4].forEach(x => {
        const w = (x === -2.3 || x === 2.3) ? 2.2 : 3.4;
        this.buildBookcase([x, 0, ROOM.minZ + 0.32], 0, w, 4.2);
      });

      // West Wall Bookcases
      [-5.2, -1.6, 2, 5.6].forEach(z => {
        this.buildBookcase([ROOM.minX + 0.32, 0, z], Math.PI / 2, 3.4, 4.2);
      });

      // South Wall Bookcases
      [-7.5, -3.8, 3.8, 7.5].forEach(x => {
        this.buildBookcase([x, 0, ROOM.maxZ - 0.32], Math.PI, 3.4, 4.2);
      });

      // 6. Wall Sconces
      [-3.4, 3.8].forEach(z => {
        this.buildSconce([ROOM.minX + 0.14, 4.6, z], Math.PI / 2);
      });
      [-6.5, 6.5].forEach(x => {
        this.buildSconce([x, 4.6, ROOM.minZ + 0.14], 0);
      });

      // 7. Potted Ficus Plants
      this.buildPlant([ROOM.minX + 0.7, 0, ROOM.minZ + 0.9], 1.3);
      this.buildPlant([-6.6, 0, ROOM.minZ + 0.7], 1.0);
      this.buildPlant([6.6, 0, ROOM.minZ + 0.7], 1.0);
      this.buildPlant([ROOM.maxX - 0.8, 0, ROOM.minZ + 0.9], 1.2);
    }

    buildWindow(pos, ry) {
      const group = new THREE.Group();
      group.position.set(...pos);
      group.rotation.y = ry;

      const glassMat = new THREE.MeshBasicMaterial({ map: this.windowTex, toneMapped: false });
      const frameMat = new THREE.MeshLambertMaterial({ color: '#3a2416' });

      // Lower Glass Pane
      const pane = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 2.6), glassMat);
      pane.position.set(0, 1.3, 0);
      group.add(pane);

      // Arch Upper Glass
      const arch = new THREE.Mesh(new THREE.CircleGeometry(0.9, 24, 0, Math.PI), glassMat);
      arch.position.set(0, 2.6, 0);
      group.add(arch);

      // Frame Wood Trim
      const sill = new THREE.Mesh(new THREE.BoxGeometry(2, 0.12, 0.12), frameMat);
      sill.position.set(0, -0.05, 0.03);
      group.add(sill);

      const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.6, 0.1), frameMat);
      sideL.position.set(-0.95, 1.3, 0.03);
      group.add(sideL);

      const sideR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.6, 0.1), frameMat);
      sideR.position.set(0.95, 1.3, 0.03);
      group.add(sideR);

      // Mullions
      const centerMullion = new THREE.Mesh(new THREE.BoxGeometry(0.05, 3.4, 0.05), frameMat);
      centerMullion.position.set(0, 1.7, 0.03);
      group.add(centerMullion);

      [0.6, 1.3, 2.0].forEach(y => {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.04, 0.05), frameMat);
        bar.position.set(0, y, 0.03);
        group.add(bar);
      });

      this.scene.add(group);
    }

    buildBookcase(pos, ry, width = 3.2, height = 4.2) {
      const group = new THREE.Group();
      group.position.set(...pos);
      group.rotation.y = ry;

      const caseMat = new THREE.MeshLambertMaterial({ color: '#6b4428' });
      const backMat = new THREE.MeshLambertMaterial({ color: '#3a2416' });

      // Backboard
      const back = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.04), backMat);
      back.position.set(0, height / 2, -0.17);
      group.add(back);

      // Left & Right Panels
      const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.08, height, 0.38), caseMat);
      sideL.position.set(-width / 2, height / 2, 0);
      group.add(sideL);

      const sideR = new THREE.Mesh(new THREE.BoxGeometry(0.08, height, 0.38), caseMat);
      sideR.position.set(width / 2, height / 2, 0);
      group.add(sideR);

      // Shelves
      const shelvesCount = 7;
      for (let s = 0; s < shelvesCount; s++) {
        const shelf = new THREE.Mesh(new THREE.BoxGeometry(width, 0.05, 0.38), caseMat);
        shelf.position.set(0, 0.04 + (height / 6) * s, 0);
        group.add(shelf);
      }

      // Procedural Colored Books
      const rand = prng(Math.abs(Math.round(13 * pos[0] + 7 * pos[2])) + 1);
      for (let s = 0; s < 6; s++) {
        let curX = -width / 2 + 0.12;
        const shelfY = 0.08 + (height / 6) * s;
        while (curX < width / 2 - 0.2) {
          const bw = 0.07 + 0.07 * rand();
          const bh = 0.38 + 0.2 * rand();
          if (rand() > 0.06) {
            const color = BOOK_COLORS[Math.floor(rand() * BOOK_COLORS.length)];
            const bookMat = new THREE.MeshLambertMaterial({ color });
            const book = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, 0.28), bookMat);
            book.position.set(curX + bw / 2, shelfY + bh / 2, 0);
            group.add(book);
          }
          curX += bw + 0.008;
        }
      }

      this.scene.add(group);
    }

    buildSconce(pos, ry) {
      const group = new THREE.Group();
      group.position.set(...pos);
      group.rotation.y = ry;

      const plate = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.3, 0.04),
        new THREE.MeshLambertMaterial({ color: '#a9803c' })
      );
      group.add(plate);

      const bulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 10, 8),
        new THREE.MeshBasicMaterial({ color: '#ffd28a', toneMapped: false })
      );
      bulb.position.set(0, 0.12, 0.14);
      group.add(bulb);

      const shade = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.12, 0.14, 10, 1, true),
        new THREE.MeshLambertMaterial({ color: '#e8c88a', side: THREE.DoubleSide, emissive: '#a06a20' })
      );
      shade.position.set(0, 0.2, 0.14);
      group.add(shade);

      this.scene.add(group);
    }

    buildPlant(pos, scale = 1.0) {
      const group = new THREE.Group();
      group.position.set(...pos);
      group.scale.setScalar(scale);

      // Terra Cotta Pot
      const pot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.2, 0.5, 10),
        new THREE.MeshLambertMaterial({ color: '#8a5236' })
      );
      pot.position.set(0, 0.25, 0);
      group.add(pot);

      // Low-poly Ficus Foliage Clumps
      const clumps = [
        [0, 0.75, 0, 0.32],
        [0.18, 0.95, 0.05, 0.24],
        [-0.16, 0.9, -0.06, 0.26],
        [0.02, 1.15, 0, 0.2]
      ];
      clumps.forEach(([cx, cy, cz, cr], idx) => {
        const leafMat = new THREE.MeshLambertMaterial({
          color: idx % 2 === 0 ? '#3e6638' : '#4f7a43',
          flatShading: true
        });
        const leaf = new THREE.Mesh(new THREE.IcosahedronGeometry(cr, 0), leafMat);
        leaf.position.set(cx, cy, cz);
        group.add(leaf);
      });

      this.scene.add(group);
    }

    buildFurniture() {
      const shadowTex = createShadowTexture();
      const lightPoolTex = createLightPoolTexture();

      // Materials
      const deskTopMat = new THREE.MeshLambertMaterial({ color: '#8a5a34' });
      const deskGableMat = new THREE.MeshLambertMaterial({ color: '#6e4426' });
      const deskDividerMat = new THREE.MeshLambertMaterial({ color: '#5e3a20' });
      const chairCushionMat = new THREE.MeshLambertMaterial({ color: '#3f5f45' });
      const chairWoodMat = new THREE.MeshLambertMaterial({ color: '#5a3720' });
      const brassMat = new THREE.MeshLambertMaterial({ color: '#c49a4a', emissive: '#3a2508' });

      DESKS.forEach(desk => {
        const hash = hashStr(desk.seat);

        // 1. Under-Desk Floor Shadow
        const shadow = new THREE.Mesh(
          new THREE.PlaneGeometry(2.3, 2.0),
          new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
        );
        shadow.rotation.x = -Math.PI / 2;
        shadow.position.set(desk.x, 0.01, (desk.deskZ + desk.chairZ) / 2);
        this.scene.add(shadow);

        // 2. Desk Assembly
        const deskGroup = new THREE.Group();

        // Table Top (1.7 x 0.07 x 0.86)
        const tableTop = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.07, 0.86), deskTopMat);
        tableTop.position.set(desk.x, 0.76, desk.deskZ);
        deskGroup.add(tableTop);

        // Gable Legs (Left & Right)
        [-1, 1].forEach(side => {
          const gable = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.76, 0.8), deskGableMat);
          gable.position.set(desk.x + 0.79 * side, 0.38, desk.deskZ);
          deskGroup.add(gable);
        });

        // Center Privacy Divider (1.7 x 0.26 x 0.05)
        const divider = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.26, 0.05), deskDividerMat);
        divider.position.set(desk.x, 0.89, desk.deskZ + 0.41 * desk.facing);
        deskGroup.add(divider);

        // Brass Number Plate (A1..D6)
        const plateTex = createNumberPlateTexture(desk.seat);
        const plateMat = new THREE.MeshBasicMaterial({ map: plateTex, toneMapped: false });
        const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.12), plateMat);
        plate.position.set(desk.x + 0.66, 0.86, desk.deskZ + 0.33 * desk.facing);
        plate.rotation.y = desk.facing > 0 ? 0 : Math.PI;
        deskGroup.add(plate);

        // Double-sided plate reverse
        const plateRev = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.12), plateMat);
        plateRev.position.set(desk.x + 0.66, 0.86, desk.deskZ + 0.33 * desk.facing);
        plateRev.rotation.y = desk.facing > 0 ? Math.PI : 0;
        deskGroup.add(plateRev);

        // 3. Banker's Lamp
        const lampGroup = new THREE.Group();
        const lampX = desk.x - 0.55;
        const lampZ = desk.deskZ + 0.22 * desk.facing;

        // Brass Base & Stem
        const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.03, 10), brassMat);
        lampBase.position.set(lampX, 0.81, lampZ);
        lampGroup.add(lampBase);

        const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.3, 10), brassMat);
        lampStem.position.set(lampX, 0.96, lampZ);
        lampGroup.add(lampStem);

        // Emerald Shade
        const shadeGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.38, 10, 1, false, 0, Math.PI);
        const shadeMat = new THREE.MeshLambertMaterial({
          color: '#2c4a36',
          emissive: '#0d1f14',
          side: THREE.DoubleSide
        });
        const shade = new THREE.Mesh(shadeGeo, shadeMat);
        shade.position.set(lampX, 1.13, desk.deskZ + 0.18 * desk.facing);
        shade.rotation.z = Math.PI / 2;
        shade.scale.set(1, 1, 0.7);
        lampGroup.add(shade);

        // Bulb
        const bulb = new THREE.Mesh(
          new THREE.SphereGeometry(0.045, 8, 6),
          new THREE.MeshBasicMaterial({ color: '#ffe2a0', toneMapped: false })
        );
        bulb.position.set(lampX, 1.09, desk.deskZ + 0.18 * desk.facing);
        bulb.visible = false;
        lampGroup.add(bulb);

        // Desktop Light Pool
        const lightPool = new THREE.Mesh(
          new THREE.PlaneGeometry(1.6, 1.1),
          new THREE.MeshBasicMaterial({
            map: lightPoolTex,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            toneMapped: false
          })
        );
        lightPool.rotation.x = -Math.PI / 2;
        lightPool.position.set(desk.x - 0.25, 0.802, desk.deskZ);
        lightPool.visible = false;
        deskGroup.add(lightPool);

        this.deskLamps.set(desk.seat, { shade, shadeMat, bulb, lightPool });
        deskGroup.add(lampGroup);

        // 4. Stacks of Books
        const bookStackGroup = new THREE.Group();
        const bookX = desk.x + 0.55;
        const bookZ = desk.deskZ + 0.2 * desk.facing;
        const bookRot1 = (hash % 7) * 0.05;
        const bookRot2 = -((hash % 5) * 0.06);

        const bColor1 = BOOK_COLORS[hash % 4];
        const bColor2 = BOOK_COLORS[(hash + 1) % 4];

        const book1 = new THREE.Mesh(
          new THREE.BoxGeometry(0.32, 0.06, 0.24),
          new THREE.MeshLambertMaterial({ color: bColor1 })
        );
        book1.position.set(bookX, 0.83, bookZ);
        book1.rotation.y = bookRot1;
        bookStackGroup.add(book1);

        const book2 = new THREE.Mesh(
          new THREE.BoxGeometry(0.28, 0.05, 0.22),
          new THREE.MeshLambertMaterial({ color: bColor2 })
        );
        book2.position.set(bookX + 0.01, 0.89, bookZ);
        book2.rotation.y = bookRot2;
        bookStackGroup.add(book2);
        deskGroup.add(bookStackGroup);

        this.scene.add(deskGroup);

        // 5. Library Chair
        const chairGroup = new THREE.Group();
        // Vacant chairs start pulled out slightly with a natural angle
        const chairZ = desk.chairZ - desk.facing * 0.25;
        const chairRotY = ((hash % 5) - 2) * 0.08;
        chairGroup.position.set(desk.x + 0.1, 0, chairZ);
        chairGroup.rotation.y = chairRotY;

        // Seat Cushion
        const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.48), chairCushionMat);
        cushion.position.set(0, 0.48, 0);
        chairGroup.add(cushion);

        // Backrest
        const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.05), chairWoodMat);
        backrest.position.set(0, 0.82, -0.24 * desk.facing);
        chairGroup.add(backrest);

        // Left & Right Leg Side Panels
        [-0.22, 0.22].forEach(lx => {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.46, 0.44), chairWoodMat);
          leg.position.set(lx, 0.23, 0);
          chairGroup.add(leg);
        });

        this.deskChairs.set(desk.seat, chairGroup);
        this.scene.add(chairGroup);

        // 6. Invisible Hit Box for Raycasting Click/Hover
        const hitBox = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 1.4, 1.4),
          new THREE.MeshBasicMaterial({ visible: false })
        );
        hitBox.position.set(desk.x, 0.7, (desk.deskZ + desk.chairZ) / 2);
        hitBox.userData = { seat: desk.seat };
        this.deskClickables.push(hitBox);
        this.scene.add(hitBox);
      });
    }

    buildPlayer() {
      this.playerGroup = new THREE.Group();
      this.playerGroup.position.set(this.playerPos.x, 0, this.playerPos.z);
      this.playerGroup.visible = false;

      const skinMat = new THREE.MeshLambertMaterial({ color: '#e8c39e' });
      const outfitMat = new THREE.MeshLambertMaterial({ color: '#4f7a5a' });
      const pantsMat = new THREE.MeshLambertMaterial({ color: '#3a3f4a' });
      const hairMat = new THREE.MeshLambertMaterial({ color: '#2a1a12' });

      // Torso
      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.16, 0.6, 10), outfitMat);
      torso.position.set(0, 0.9, 0);
      this.playerGroup.add(torso);

      // Head
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), skinMat);
      head.position.set(0, 1.32, 0);
      this.playerGroup.add(head);

      // Hair
      const hair = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), hairMat);
      hair.position.set(0, 1.34, -0.02);
      this.playerGroup.add(hair);

      // Legs
      this.leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.5), pantsMat);
      this.leftLeg.position.set(-0.08, 0.35, 0);
      this.playerGroup.add(this.leftLeg);

      this.rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.5), pantsMat);
      this.rightLeg.position.set(0.08, 0.35, 0);
      this.playerGroup.add(this.rightLeg);

      this.scene.add(this.playerGroup);
    }

    // Set Active Occupants & Instantiate Faithful 3D Student Avatars
    setOccupants(occupantsList = []) {
      this.occupants.clear();

      // Reset all lamps & props
      this.deskLamps.forEach(lamp => {
        lamp.shadeMat.color.set('#2c4a36');
        lamp.shadeMat.emissive.set('#0d1f14');
        lamp.bulb.visible = false;
        lamp.lightPool.visible = false;
      });

      // Clear existing avatars & dynamic props
      this.avatarMeshes.forEach(mesh => { this.scene.remove(mesh); });
      this.avatarMeshes.clear();
      this.deskProps.forEach(mesh => { this.scene.remove(mesh); });
      this.deskProps.clear();

      // Reset chair positions
      DESKS.forEach(d => {
        const chair = this.deskChairs.get(d.seat);
        if (chair) {
          const hash = hashStr(d.seat);
          chair.position.set(d.x + 0.1, 0, d.chairZ - d.facing * 0.25);
          chair.rotation.y = ((hash % 5) - 2) * 0.08;
        }
      });

      // Add each occupant
      occupantsList.forEach(occ => {
        if (!occ.seat) return;
        this.occupants.set(occ.seat, occ);

        // Turn on banker's lamp & light pool
        const lamp = this.deskLamps.get(occ.seat);
        if (lamp) {
          lamp.shadeMat.color.set('#3a9a60');
          lamp.shadeMat.emissive.set('#1f6e40');
          lamp.bulb.visible = true;
          lamp.lightPool.visible = true;
        }

        const desk = DESK_MAP.get(occ.seat);
        if (!desk) return;

        // Tuck chair in under desk
        const chair = this.deskChairs.get(occ.seat);
        if (chair) {
          chair.position.set(desk.x, 0, desk.chairZ);
          chair.rotation.y = 0;
        }

        // Add Open Laptop or Open Book Prop
        const prop = this.createStudyProp(desk, occ);
        this.deskProps.set(occ.seat, prop);
        this.scene.add(prop);

        // Build Faithful Procedural Student Avatar
        const avatar = this.createStudentAvatar(occ, desk);
        this.avatarMeshes.set(occ.seat, avatar);
        this.scene.add(avatar);
      });

      this.updateMyDeskLight();
    }

    createStudyProp(desk, occ) {
      const group = new THREE.Group();
      const hash = hashStr(desk.seat);
      const propZ = desk.deskZ - 0.08 * desk.facing;
      group.position.set(desk.x + 0.05, 0.8, propZ);
      group.rotation.y = desk.facing > 0 ? 0 : Math.PI;

      if (hash % 3 === 0) {
        // Open Laptop
        const base = new THREE.Mesh(
          new THREE.BoxGeometry(0.42, 0.02, 0.3),
          new THREE.MeshLambertMaterial({ color: '#5c5f66' })
        );
        group.add(base);

        const screenLid = new THREE.Mesh(
          new THREE.BoxGeometry(0.42, 0.28, 0.015),
          new THREE.MeshLambertMaterial({ color: '#4a4d54' })
        );
        screenLid.position.set(0, 0.14, 0.15);
        screenLid.rotation.x = -0.25;
        group.add(screenLid);

        const screenGlow = new THREE.Mesh(
          new THREE.PlaneGeometry(0.38, 0.24),
          new THREE.MeshBasicMaterial({ color: '#cfe0f0', toneMapped: false })
        );
        screenGlow.position.set(0, 0.14, 0.14);
        screenGlow.rotation.set(-0.25, Math.PI, 0);
        group.add(screenGlow);
      } else {
        // Open Study Book with Curved Pages
        const pageL = new THREE.Mesh(
          new THREE.BoxGeometry(0.26, 0.015, 0.34),
          new THREE.MeshLambertMaterial({ color: '#f3ead6' })
        );
        pageL.position.set(-0.13, 0, 0);
        pageL.rotation.z = 0.08;
        group.add(pageL);

        const pageR = new THREE.Mesh(
          new THREE.BoxGeometry(0.26, 0.015, 0.34),
          new THREE.MeshLambertMaterial({ color: '#f6eedc' })
        );
        pageR.position.set(0.13, 0, 0);
        pageR.rotation.z = -0.08;
        group.add(pageR);

        const cover = new THREE.Mesh(
          new THREE.BoxGeometry(0.56, 0.01, 0.37),
          new THREE.MeshLambertMaterial({ color: '#6b2f28' })
        );
        cover.position.set(0, -0.012, 0);
        group.add(cover);
      }

      return group;
    }

    // Procedural Low-Poly 3D Student Avatar (Faithful replica of cY)
    createStudentAvatar(occ, desk) {
      const group = new THREE.Group();
      group.position.set(desk.x, 0, desk.chairZ);
      group.rotation.y = desk.facing > 0 ? 0 : Math.PI;
      group.scale.setScalar(1.12);

      const hash = hashStr(occ.id || occ.name || desk.seat, 5381);
      const skinColor = SKIN_TONES[hash % SKIN_TONES.length];
      const hairColor = HAIR_TONES[(hash >>> 3) % HAIR_TONES.length];
      const eyeColor = EYE_TONES[(hash >>> 5) % EYE_TONES.length];
      const style = HAIR_STYLES[(hash >>> 7) % HAIR_STYLES.length];
      const outfit = OUTFIT_TYPES[(hash >>> 10) % OUTFIT_TYPES.length];
      const knitColor = KNIT_COLORS[(hash >>> 12) % KNIT_COLORS.length];
      const kurtaColor = KURTA_COLORS[(hash >>> 14) % KURTA_COLORS.length];
      const pantsColor = PANTS_COLORS[(hash >>> 16) % PANTS_COLORS.length];
      const outfitColor = outfit === 'kurta' ? kurtaColor : (occ.color || knitColor);
      const mood = occ.phase === 'break' ? 'happy' : (occ.phase === 'focus' ? 'down' : 'open');

      const hairMat = new THREE.MeshLambertMaterial({ color: hairColor });
      const outfitMat = new THREE.MeshLambertMaterial({ color: outfitColor });
      const pantsMat = new THREE.MeshLambertMaterial({ color: pantsColor });
      const skinMat = new THREE.MeshLambertMaterial({ color: skinColor });

      // 1. Pants / Seated Pelvis
      const hips = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.12, 0.38), pantsMat);
      hips.position.set(0, 0.56, 0.16);
      group.add(hips);

      // Thighs
      const legs = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.5, 0.1), pantsMat);
      legs.position.set(0, 0.28, 0.34);
      group.add(legs);

      // 2. Torso Group
      const torsoGroup = new THREE.Group();
      torsoGroup.position.set(0, 0.6, 0);

      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.155, 0.2, 0.44, 12), outfitMat);
      torso.position.set(0, 0.22, 0);
      torsoGroup.add(torso);

      // Outfit Details
      if (outfit === 'hoodie') {
        const collar = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.045, 8, 16), outfitMat);
        collar.position.set(0, 0.42, -0.06);
        collar.rotation.x = Math.PI / 2 - 0.3;
        torsoGroup.add(collar);

        // Kangaroo Pocket
        const pocket = new THREE.Mesh(
          new THREE.BoxGeometry(0.2, 0.08, 0.02),
          new THREE.MeshLambertMaterial({ color: new THREE.Color(outfitColor).multiplyScalar(0.85) })
        );
        pocket.position.set(0, 0.12, 0.145);
        torsoGroup.add(pocket);
      } else if (outfit === 'kurta') {
        const placket = new THREE.Mesh(
          new THREE.BoxGeometry(0.025, 0.16, 0.01),
          new THREE.MeshLambertMaterial({ color: '#b08a4a' })
        );
        placket.position.set(0, 0.3, 0.152);
        torsoGroup.add(placket);

        const mandarinCollar = new THREE.Mesh(
          new THREE.TorusGeometry(0.07, 0.018, 6, 14),
          new THREE.MeshLambertMaterial({ color: '#b08a4a' })
        );
        mandarinCollar.position.set(0, 0.43, 0);
        mandarinCollar.rotation.x = Math.PI / 2;
        torsoGroup.add(mandarinCollar);
      } else {
        // Sweater Ribbed Collar
        const collar = new THREE.Mesh(
          new THREE.TorusGeometry(0.075, 0.025, 6, 14),
          new THREE.MeshLambertMaterial({ color: '#f3ead6' })
        );
        collar.position.set(0, 0.43, 0);
        collar.rotation.x = Math.PI / 2;
        torsoGroup.add(collar);
      }

      // Neck
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.08, 8), skinMat);
      neck.position.set(0, 0.46, 0);
      torsoGroup.add(neck);

      // 3. Head & Face Group
      const headGroup = new THREE.Group();
      headGroup.position.set(0, 0.66, 0.01);

      const faceTex = createFaceTexture(skinColor, mood, hairColor, eyeColor);
      const headMat = new THREE.MeshLambertMaterial({ map: faceTex });
      const headGeo = new THREE.SphereGeometry(0.19, 28, 22);
      const head = new THREE.Mesh(headGeo, headMat);
      headGroup.add(head);

      // Procedural Hair
      const hairCap = new THREE.Mesh(
        new THREE.SphereGeometry(0.202, 20, 12, 0, 2 * Math.PI, 0, 0.4 * Math.PI),
        hairMat
      );
      hairCap.position.set(0, 0.006, -0.004);
      headGroup.add(hairCap);

      const backLength = style === 'long' ? 0.78 : (style === 'short' ? 0.6 : 0.66);
      const hairBack = new THREE.Mesh(
        new THREE.SphereGeometry(0.204, 18, 14, Math.PI, Math.PI, 0, Math.PI * backLength),
        hairMat
      );
      headGroup.add(hairBack);

      if (style === 'bun') {
        const bun = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), hairMat);
        bun.position.set(0, 0.2, -0.1);
        bun.scale.setScalar(1.45);
        headGroup.add(bun);
      } else if (style === 'ponytail') {
        const pony = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3, 8), hairMat);
        pony.position.set(0, -0.12, -0.25);
        pony.rotation.x = 0.35;
        headGroup.add(pony);
      }

      torsoGroup.add(headGroup);

      // 4. Arms Resting on Desk
      [-1, 1].forEach(side => {
        const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3, 8), outfitMat);
        arm.position.set(0.2 * side, 0.3, 0.12);
        arm.rotation.set(-1.05, 0, 0.12 * side);
        torsoGroup.add(arm);

        const hand = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), skinMat);
        hand.position.set(0.2 * side, 0.22, 0.26);
        torsoGroup.add(hand);
      });

      // Lean Forward in Focus
      torsoGroup.rotation.x = mood === 'focus' ? 0.12 : 0.02;
      headGroup.rotation.x = mood === 'focus' ? 0.38 : 0.08;

      group.add(torsoGroup);
      return group;
    }

    setMySeat(seat) {
      this.mySeat = seat;
      this.updateMyDeskLight();
    }

    updateMyDeskLight() {
      if (this.mySeat && DESK_MAP.has(this.mySeat)) {
        const d = DESK_MAP.get(this.mySeat);
        this.myDeskLight.position.set(d.x - 0.5, 1.15, d.deskZ);
        this.myDeskLight.intensity = 2.2;
      } else {
        this.myDeskLight.intensity = 0;
      }
    }

    startWalking() {
      this.isWalking = true;
      this.isFloorSitting = false;
      this.playerGroup.visible = true;
      this.playerPos = { x: 0, z: 5.4, ry: Math.PI };
      this.yaw = Math.PI;
      this.pitch = 0.34;
      this.container.classList.add('walking');
    }

    stopWalking() {
      this.isWalking = false;
      this.isFloorSitting = false;
      this.playerGroup.visible = false;
      this.container.classList.remove('walking');
    }

    toggleFloorSitting() {
      this.isFloorSitting = !this.isFloorSitting;
      if (this.isFloorSitting) {
        this.playerGroup.position.y = -0.3;
      } else {
        this.playerGroup.position.y = 0;
      }
    }

    setZoom(level) {
      this.zoomLevel = Math.max(0.45, Math.min(1.4, level));
    }

    resize() {
      if (!this.container || !this.renderer || !this.camera) return;
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      if (w > 0 && h > 0) {
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
      }
    }

    bindEvents() {
      const updateSize = () => this.resize();

      window.addEventListener('resize', updateSize);
      if (typeof ResizeObserver !== 'undefined') {
        this._resizeObserver = new ResizeObserver(() => updateSize());
        this._resizeObserver.observe(this.container);
      }

      this.container.addEventListener('pointerdown', e => {
        if (e.target.closest('.frame-ctl, .zoom3d, .hud3d, .veil, select, button')) return;
        this.isPointerDown = true;
        this.lastPointer = { x: e.clientX, y: e.clientY };
      });

      window.addEventListener('pointerup', () => {
        this.isPointerDown = false;
      });

      this.container.addEventListener('pointermove', e => {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        if (this.isWalking && this.isPointerDown) {
          const dx = e.clientX - this.lastPointer.x;
          const dy = e.clientY - this.lastPointer.y;
          this.yaw -= dx * 0.005;
          this.pitch = Math.max(0.05, Math.min(1.2, this.pitch + dy * 0.005));
          this.lastPointer = { x: e.clientX, y: e.clientY };
        }
      });

      this.container.addEventListener('wheel', e => {
        e.preventDefault();
        this.setZoom(this.zoomLevel + Math.sign(e.deltaY) * 0.08);
      }, { passive: false });

      this.container.addEventListener('click', e => {
        if (e.target.closest('.frame-ctl, .zoom3d, .hud3d, .veil, select, button')) return;
        this.raycastDesk(seat => {
          if (seat) this.onDeskClick(seat);
        });
      });

      window.addEventListener('keydown', e => {
        this.keys.add(e.code);
        if (e.code === 'KeyG' && this.isWalking) {
          this.toggleFloorSitting();
        }
      });

      window.addEventListener('keyup', e => {
        this.keys.delete(e.code);
      });
    }

    raycastDesk(callback) {
      if (!this.camera) return;
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const hits = this.raycaster.intersectObjects(this.deskClickables, false);
      if (hits.length > 0) {
        callback(hits[0].object.userData.seat);
      } else {
        callback(null);
      }
    }

    updateWalking(dt) {
      if (!this.isWalking) return;

      const isSprint = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight');
      const speed = isSprint ? 3.4 : 1.9;

      let mx = 0;
      let mz = 0;
      if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) mz += 1;
      if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) mz -= 1;
      if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) mx -= 1;
      if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) mx += 1;
      if (this.keys.has('KeyQ')) this.yaw += 1.8 * dt;
      if (this.keys.has('KeyE')) this.yaw -= 1.8 * dt;

      const len = Math.hypot(mx, mz);
      if (len > 0.01) {
        if (this.isFloorSitting) this.toggleFloorSitting();
        mx /= len;
        mz /= len;

        const sin = Math.sin(this.yaw);
        const cos = Math.cos(this.yaw);
        const forwardX = -sin * mz + cos * mx;
        const forwardZ = -cos * mz - sin * mx;

        const nextX = THREE.MathUtils.clamp(this.playerPos.x + forwardX * speed * dt, WALK_BOUNDS.minX, WALK_BOUNDS.maxX);
        const nextZ = THREE.MathUtils.clamp(this.playerPos.z + forwardZ * speed * dt, WALK_BOUNDS.minZ, WALK_BOUNDS.maxZ);

        // Check Collisions
        const collision = OBSTACLES.some(obs => (
          nextX >= obs.x0 && nextX <= obs.x1 && nextZ >= obs.z0 && nextZ <= obs.z1
        ));

        if (!collision) {
          this.playerPos.x = nextX;
          this.playerPos.z = nextZ;
        }

        this.playerPos.ry = Math.atan2(forwardX, forwardZ);
        this.playerSpeed = speed;

        // Leg Swing Animation
        const swing = Math.sin(performance.now() * 0.01 * (isSprint ? 1.6 : 1.0)) * 0.6;
        if (this.leftLeg) this.leftLeg.rotation.x = swing;
        if (this.rightLeg) this.rightLeg.rotation.x = -swing;

        if (this.onMove) {
          this.onMove(this.playerPos.x, this.playerPos.z);
        }
      } else {
        this.playerSpeed = 0;
        if (this.leftLeg) this.leftLeg.rotation.x = 0;
        if (this.rightLeg) this.rightLeg.rotation.x = 0;
      }

      this.playerGroup.position.set(this.playerPos.x, this.playerGroup.position.y, this.playerPos.z);
      this.playerGroup.rotation.y = this.playerPos.ry;
    }

    updateCamera(dt) {
      const lerpFactor = 1 - Math.exp(-6 * dt);

      if (this.isWalking) {
        const dist = this.camDist;
        const camX = this.playerPos.x - Math.sin(this.yaw) * dist * Math.cos(this.pitch);
        const camY = Math.max(0.6, 1.4 + Math.sin(this.pitch) * dist);
        const camZ = this.playerPos.z - Math.cos(this.yaw) * dist * Math.cos(this.pitch);

        this.camera.position.lerp(new THREE.Vector3(camX, camY, camZ), lerpFactor);
        const targetLook = new THREE.Vector3(this.playerPos.x, 1.2, this.playerPos.z);
        this.currentCamLook.lerp(targetLook, lerpFactor);
        this.camera.lookAt(this.currentCamLook);

      } else if (this.mySeat && DESK_MAP.has(this.mySeat)) {
        const d = DESK_MAP.get(this.mySeat);
        const seatedCamPos = new THREE.Vector3(d.x, 1.42, d.chairZ - 0.05 * d.facing);
        const seatedCamLook = new THREE.Vector3(d.x, 1.0, d.deskZ + 3.6 * d.facing);

        this.camera.position.lerp(seatedCamPos, lerpFactor);
        this.currentCamLook.lerp(seatedCamLook, lerpFactor);
        this.camera.lookAt(this.currentCamLook);
        this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, 62, lerpFactor);
        this.camera.updateProjectionMatrix();

      } else {
        const basePos = this.defaultCam.pos.clone().multiplyScalar(this.zoomLevel);
        basePos.y = Math.max(3.5, basePos.y);

        this.camera.position.lerp(basePos, lerpFactor);
        this.currentCamLook.lerp(this.defaultCam.look, lerpFactor);
        this.camera.lookAt(this.currentCamLook);
        this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, this.defaultCam.fov, lerpFactor);
        this.camera.updateProjectionMatrix();
      }
    }

    projectToScreen(pos) {
      const v = new THREE.Vector3(pos.x, pos.y, pos.z);
      v.project(this.camera);

      if (v.z < -1 || v.z > 1 || Math.abs(v.x) > 1.2 || Math.abs(v.y) > 1.2) {
        return { visible: false, x: 0, y: 0 };
      }

      const rect = this.container.getBoundingClientRect();
      const x = ((v.x + 1) / 2) * rect.width;
      const y = ((-v.y + 1) / 2) * rect.height;

      return { visible: true, x, y };
    }

    animate() {
      const now = performance.now();
      const dt = Math.min((now - this.lastFrameTime) / 1000, 0.1);
      this.lastFrameTime = now;

      // Animate window rain streaks
      if (this.windowTex) {
        this.windowTex.offset.y += 0.08 * dt;
      }

      this.updateWalking(dt);
      this.updateCamera(dt);

      // Desk Raycast Hover Check
      if (!this.isWalking) {
        this.raycastDesk(seat => {
          if (seat !== this.hoveredSeat) {
            this.hoveredSeat = seat;
            this.container.style.cursor = seat ? 'pointer' : 'default';
            if (this.onDeskHover) this.onDeskHover(seat);
          }
        });
      }

      this.renderer.render(this.scene, this.camera);

      if (this.options.onRender) {
        this.options.onRender(this);
      }

      requestAnimationFrame(this.animate);
    }
  }

  window.Hall3DEngine = Hall3DEngine;
  window.HALL_DESKS = DESKS;
  window.HALL_DESK_MAP = DESK_MAP;

})(window);
