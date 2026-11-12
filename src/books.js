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

// Amazon Associates Affiliate Tag (Replace with your actual affiliate tag, e.g. 'hushhall-20')
export const AMAZON_AFFILIATE_TAG = 'hushhall-20';

// Helper to generate Amazon Kindle book affiliate purchase search link
export function getBookAffiliateLink(bookString, affiliateTag = AMAZON_AFFILIATE_TAG) {
  const cleanTitle = bookString.replace(/—.*$/, '').trim();
  const query = encodeURIComponent(`${cleanTitle} kindle edition`);
  return `https://www.amazon.com/s?k=${query}&i=digital-text&tag=${affiliateTag}`;
}

// Curated Bookshelf Genres with Curated Book Lists
export const SHELF_GENRES = [
  // Back Wall
  {
    id: 'bw-1',
    title: 'Economics & Markets',
    icon: '📈',
    location: 'North Gallery · Cabinet I',
    books: [
      'The Intelligent Investor — Benjamin Graham',
      'Principles for Navigating Big Debt Crises — Ray Dalio',
      'Capital in the Twenty-First Century — Thomas Piketty',
      'A Random Walk Down Wall Street — Burton Malkiel'
    ]
  },
  {
    id: 'bw-2',
    title: 'Corporate Law & Governance',
    icon: '⚖️',
    location: 'North Gallery · Cabinet II',
    books: [
      'The Anatomy of Corporate Law — Reinier Kraakman',
      'Mergers, Acquisitions, and Corporate Restructurings — Patrick Gaughan',
      'Securities Regulation: Cases and Materials — James Cox',
      'International Commercial Arbitration — Gary Born'
    ]
  },
  {
    id: 'bw-3',
    title: 'Business Strategy',
    icon: '♟️',
    location: 'North Gallery · Cabinet III',
    books: [
      'Competitive Strategy: Techniques for Analyzing Industries — Michael Porter',
      'Good Strategy Bad Strategy — Richard Rumelt',
      'The Innovator’s Dilemma — Clayton Christensen',
      'Blue Ocean Strategy — W. Chan Kim & Renée Mauborgne'
    ]
  },
  {
    id: 'bw-4',
    title: 'Venture Capital & Startups',
    icon: '🚀',
    location: 'North Gallery · Cabinet IV',
    books: [
      'Zero to One: Notes on Startups — Peter Thiel',
      'The Power Law: Venture Capital and the Making of the Future — Sebastian Mallaby',
      'Venture Deals: Be Smarter Than Your Lawyer and VC — Brad Feld',
      'The Hard Thing About Hard Things — Ben Horowitz'
    ]
  },
  {
    id: 'bw-5',
    title: 'Global Macroeconomics',
    icon: '🌐',
    location: 'North Gallery · Cabinet V',
    books: [
      'Macroeconomics — Olivier Blanchard',
      'Lords of Finance: The Bankers Who Broke the World — Liaquat Ahamed',
      'The Price of Time: The Real Story of Interest — Edward Chancellor',
      'Exchange Rates and International Finance — Laurence Copeland'
    ]
  },
  {
    id: 'bw-6',
    title: 'Coffee & Gastronomy',
    icon: '☕',
    location: 'North Gallery · Barista Reserve Cabinet',
    books: [
      'The World Atlas of Coffee — James Hoffmann',
      'Coffee Roasting: Best Practices — Scott Rao',
      'The Craft and Science of Coffee — Britta Folmer',
      'Water for Coffee — Maxwell Colonna-Dashwood'
    ]
  },

  // West Wall (Technology & Quantitative)
  {
    id: 'ww-1',
    title: 'Artificial Intelligence & ML',
    icon: '🤖',
    location: 'West Wing · Cabinet 1',
    books: [
      'Deep Learning — Ian Goodfellow, Yoshua Bengio, Aaron Courville',
      'Pattern Recognition and Machine Learning — Christopher Bishop',
      'Reinforcement Learning: An Introduction — Richard Sutton & Andrew Barto',
      'Artificial Intelligence: A Modern Approach — Stuart Russell & Peter Norvig'
    ]
  },
  {
    id: 'ww-2',
    title: 'Distributed Systems & Cloud',
    icon: '☁️',
    location: 'West Wing · Cabinet 2',
    books: [
      'Designing Data-Intensive Applications — Martin Kleppmann',
      'Site Reliability Engineering — Niall Richard Murphy et al.',
      'Distributed Systems: Principles and Paradigms — Andrew Tanenbaum',
      'Building Microservices — Sam Newman'
    ]
  },
  {
    id: 'ww-3',
    title: 'Algorithms & Architecture',
    icon: '💻',
    location: 'West Wing · Cabinet 3',
    books: [
      'Introduction to Algorithms (CLRS) — Cormen, Leiserson, Rivest, Stein',
      'Structure and Interpretation of Computer Programs — Abelson & Sussman',
      'Computer Systems: A Programmer’s Perspective — Bryant & O’Hallaron',
      'Computer Architecture: A Quantitative Approach — Hennessy & Patterson'
    ]
  },
  {
    id: 'ww-4',
    title: 'Cybersecurity & Crypto',
    icon: '🛡️',
    location: 'West Wing · Cabinet 4',
    books: [
      'Applied Cryptography: Protocols and Algorithms — Bruce Schneier',
      'Serious Cryptography — Jean-Philippe Aumasson',
      'The Web Application Hacker’s Handbook — Dafydd Stuttard',
      'Security Engineering: A Guide to Building Dependable Distributed Systems — Ross Anderson'
    ]
  },
  {
    id: 'ww-5',
    title: 'Quantum Physics & Math',
    icon: '⚛️',
    location: 'West Wing · Cabinet 5',
    books: [
      'The Principles of Quantum Mechanics — P.A.M. Dirac',
      'Quantum Computation and Quantum Information — Nielsen & Chuang',
      'Linear Algebra Done Right — Sheldon Axler',
      'The Road to Reality: A Complete Guide to the Laws of the Universe — Roger Penrose'
    ]
  },
  {
    id: 'ww-6',
    title: 'Data Science & Statistics',
    icon: '📊',
    location: 'West Wing · Cabinet 6',
    books: [
      'The Elements of Statistical Learning — Hastie, Tibshirani, Friedman',
      'Bayesian Data Analysis — Andrew Gelman et al.',
      'Information Theory, Inference, and Learning Algorithms — David MacKay',
      'Forecasting: Principles and Practice — Rob J Hyndman'
    ]
  },

  // East Wall (Humanities, Philosophy & Architecture)
  {
    id: 'ew-1',
    title: 'Classic Philosophy & Logic',
    icon: '🏛️',
    location: 'East Wing · Cabinet 1',
    books: [
      'Meditations — Marcus Aurelius',
      'Nicomachean Ethics — Aristotle',
      'Critique of Pure Reason — Immanuel Kant',
      'Tractatus Logico-Philosophicus — Ludwig Wittgenstein'
    ]
  },
  {
    id: 'ew-2',
    title: 'Psychology & Decision Making',
    icon: '🧠',
    location: 'East Wing · Cabinet 2',
    books: [
      'Thinking, Fast and Slow — Daniel Kahneman',
      'Judgment Under Uncertainty: Heuristics and Biases — Tversky & Kahneman',
      'The Design of Everyday Things — Don Norman',
      'Predictably Irrational — Dan Ariely'
    ]
  },
  {
    id: 'ew-3',
    title: 'World History & Empires',
    icon: '📜',
    location: 'East Wing · Cabinet 3',
    books: [
      'The Silk Roads: A New History of the World — Peter Frankopan',
      'Guns, Germs, and Steel — Jared Diamond',
      'The Lessons of History — Will & Ariel Durant',
      'Postwar: A History of Europe Since 1945 — Tony Judt'
    ]
  },
  {
    id: 'ew-4',
    title: 'Architecture & Design',
    icon: '📐',
    location: 'East Wing · Cabinet 4',
    books: [
      'A Pattern Language: Towns, Buildings, Construction — Christopher Alexander',
      'Complexity and Contradiction in Architecture — Robert Venturi',
      'The Eyes of the Skin: Architecture and the Senses — Juhani Pallasmaa',
      'Towards a New Architecture — Le Corbusier'
    ]
  },
  {
    id: 'ew-5',
    title: 'Classic Literature & Poetry',
    icon: '✒️',
    location: 'East Wing · Cabinet 5',
    books: [
      'To the Lighthouse — Virginia Woolf',
      'The Brothers Karamazov — Fyodor Dostoevsky',
      'In Search of Lost Time — Marcel Proust',
      'Collected Poems: 1909–1962 — T.S. Eliot'
    ]
  },
  {
    id: 'ew-6',
    title: 'Biotechnology & Genomics',
    icon: '🧬',
    location: 'East Wing · Cabinet 6',
    books: [
      'The Gene: An Intimate History — Siddhartha Mukherjee',
      'Molecular Biology of the Cell — Bruce Alberts et al.',
      'The Code Breaker: Jennifer Doudna and Gene Editing — Walter Isaacson',
      'Genome: The Autobiography of a Species — Matt Ridley'
    ]
  },

  // Freestanding Dividers
  {
    id: 'div-1',
    title: 'Leadership & Management',
    icon: '👔',
    location: 'Central Aisle · West North Cabinet',
    books: [
      'High Output Management — Andrew S. Grove',
      'Turn the Ship Around! — L. David Marquet',
      'Measure What Matters — John Doerr',
      'Principles: Life and Work — Ray Dalio'
    ]
  },
  {
    id: 'div-2',
    title: 'Game Theory & Strategy',
    icon: '🎲',
    location: 'Central Aisle · East North Cabinet',
    books: [
      'Theory of Games and Economic Behavior — John von Neumann & Oskar Morgenstern',
      'Thinking Strategically: The Competitive Edge — Dixit & Nalebuff',
      'The Strategy of Conflict — Thomas Schelling',
      'Game Theory: An Introduction — Steven Tadelis'
    ]
  },
  {
    id: 'div-3',
    title: 'Cognitive Science & Mind',
    icon: '🔬',
    location: 'Central Aisle · West South Cabinet',
    books: [
      'Gödel, Escher, Bach: An Eternal Golden Braid — Douglas Hofstadter',
      'The Master and His Emissary — Iain McGilchrist',
      'Consciousness Explained — Daniel Dennett',
      'Surfing Uncertainty: Prediction, Action, and the Embodied Mind — Andy Clark'
    ]
  },
  {
    id: 'div-4',
    title: 'Political Economy',
    icon: '🏛️',
    location: 'Central Aisle · East South Cabinet',
    books: [
      'The Wealth of Nations — Adam Smith',
      'Why Nations Fail: The Origins of Power, Prosperity, and Poverty — Acemoglu & Robinson',
      'Capitalism and Freedom — Milton Friedman',
      'The Road to Serfdom — Friedrich Hayek'
    ]
  }
];

// Helper: Seeded pseudo-random generator
function createPRNG(seed = 12345) {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 0x3c6ef35f) >>> 0;
    return s / 0x100000000;
  };
}

// Helper: Create a prominent canvas texture written CLEARLY & BIG directly onto the glass pane
function createGlassGenreCanvasTexture(title, icon = '✦') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');

  // Clear transparent background so books inside the cabinet remain visible
  ctx.clearRect(0, 0, 1024, 384);

  // Semi-translucent frosted glass backing plate for high contrast
  ctx.fillStyle = 'rgba(24, 16, 10, 0.58)';
  if (ctx.roundRect) {
    ctx.roundRect(32, 40, 960, 304, 28);
    ctx.fill();
  } else {
    ctx.fillRect(32, 40, 960, 304);
  }

  // Double Gilded Gold Filigree Border on the Glass
  ctx.strokeStyle = 'rgba(218, 172, 80, 0.95)';
  ctx.lineWidth = 6;
  ctx.strokeRect(44, 52, 936, 280);

  ctx.strokeStyle = 'rgba(168, 126, 45, 0.8)';
  ctx.lineWidth = 2;
  ctx.strokeRect(56, 64, 912, 256);

  // Four Gold Corner Rosettes
  const corners = [
    [56, 64], [968, 64], [56, 320], [968, 320]
  ];
  corners.forEach(([cx, cy]) => {
    ctx.fillStyle = '#ffdf85';
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fill();
  });

  // Top Badge: LOCKED RESERVE ARCHIVE
  ctx.fillStyle = '#f0d2a8';
  ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🔒 LOCKED RESERVE · CURATED ARCHIVE', 512, 106);

  // MAIN CLEAR BIG NAME WRITTEN ON GLASS
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 54px Georgia, "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 4;
  ctx.fillText(title.toUpperCase(), 512, 192);

  // Reset shadow for bottom subline
  ctx.shadowColor = 'transparent';
  ctx.fillStyle = '#dfb564';
  ctx.font = '20px Georgia, serif';
  ctx.fillText(`— ${icon} AUTHORIZED FACULTY VOLUMES ${icon} —`, 512, 268);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function buildBookshelves(scene) {
  // Rich Walnut Wood for Cabinet Frame
  const shelfWoodMat = new THREE.MeshStandardMaterial({
    color: '#422714',
    roughness: 0.8,
    metalness: 0.05,
    flatShading: true
  });

  const shelfBackMat = new THREE.MeshStandardMaterial({
    color: '#2a170d',
    roughness: 0.92,
    metalness: 0.04,
    flatShading: true
  });

  // Polished Brass for Escutcheon Locks, Hinges & Handles
  const brassLockMat = new THREE.MeshStandardMaterial({
    color: '#deb358',
    roughness: 0.3,
    metalness: 0.85,
    flatShading: true
  });

  // Clear Translucent Glass Pane Material (Books visible inside)
  const cabinetGlassMat = new THREE.MeshStandardMaterial({
    color: '#cde4f7',
    roughness: 0.1,
    metalness: 0.15,
    transparent: true,
    opacity: 0.42,
    flatShading: true
  });

  const bookSlots = [];
  const shelfClickables = [];

  // Helper to build a Glass-Enclosed Locked Bookshelf Cabinet with Big Name on Glass
  function createShelfUnit(genreObj, x, y, z, rotY, width, height, depth, numShelves, doubleSided = false) {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.rotation.y = rotY;

    // 1. Back panel
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
      new THREE.BoxGeometry(width + 0.04, 0.16, depth + 0.06),
      shelfWoodMat
    );
    plinth.position.set(0, 0.08, 0.01);
    plinth.castShadow = true;
    group.add(plinth);

    const crownHeight = 0.26;
    const crown = new THREE.Mesh(
      new THREE.BoxGeometry(width + 0.08, crownHeight, depth + 0.08),
      shelfWoodMat
    );
    crown.position.set(0, height - crownHeight / 2, 0.02);
    crown.castShadow = true;
    group.add(crown);

    // 4. Horizontal Shelves & Book Slot Locations Inside Cabinet
    const doorHeight = height - crownHeight - 0.16;
    const shelfSpacing = (doorHeight - 0.1) / numShelves;
    const shelfGeo = new THREE.BoxGeometry(width - 0.08, 0.04, depth - 0.06);

    for (let i = 0; i < numShelves; i++) {
      const shelfY = 0.18 + (i * shelfSpacing);
      const shelf = new THREE.Mesh(shelfGeo, shelfWoodMat);
      shelf.position.set(0, shelfY, -0.02);
      shelf.castShadow = true;
      shelf.receiveShadow = true;
      group.add(shelf);

      bookSlots.push({
        origin: new THREE.Vector3(x, y + shelfY + 0.02, z),
        rotY,
        width: width - 0.22,
        depth: depth - 0.14,
        maxHeight: shelfSpacing - 0.08,
        seed: Math.abs(Math.round(x * 123 + z * 77 + i * 31)) + 1
      });
    }

    // 5. LOCKED GLASS CABINET ENCLOSURE (Front of the shelf unit)
    const glassZ = depth / 2 + 0.01;
    const doorCenterY = 0.16 + doorHeight / 2;

    // Outer Wooden Door Frame Trim
    // Left & Right Stiles
    [-width / 2 + 0.04, width / 2 - 0.04].forEach(fx => {
      const stile = new THREE.Mesh(new THREE.BoxGeometry(0.06, doorHeight, 0.04), shelfWoodMat);
      stile.position.set(fx, doorCenterY, glassZ);
      group.add(stile);
    });

    // Center Vertical Meeting Astragal (Seam between two doors)
    const centerAstragal = new THREE.Mesh(new THREE.BoxGeometry(0.05, doorHeight, 0.045), shelfWoodMat);
    centerAstragal.position.set(0, doorCenterY, glassZ);
    group.add(centerAstragal);

    // Top & Bottom Door Rails
    const topRail = new THREE.Mesh(new THREE.BoxGeometry(width - 0.08, 0.06, 0.04), shelfWoodMat);
    topRail.position.set(0, 0.16 + doorHeight - 0.03, glassZ);
    group.add(topRail);

    const bottomRail = new THREE.Mesh(new THREE.BoxGeometry(width - 0.08, 0.06, 0.04), shelfWoodMat);
    bottomRail.position.set(0, 0.16 + 0.03, glassZ);
    group.add(bottomRail);

    // Two Clear Glass Panes (Left Door & Right Door)
    const singlePaneW = (width - 0.24) / 2;
    const paneH = doorHeight - 0.08;

    [-singlePaneW / 2 - 0.03, singlePaneW / 2 + 0.03].forEach(px => {
      const glassPane = new THREE.Mesh(new THREE.PlaneGeometry(singlePaneW, paneH), cabinetGlassMat);
      glassPane.position.set(px, doorCenterY, glassZ + 0.005);
      group.add(glassPane);
    });

    // 6. POLISHED BRASS LOCK & CABINET HANDLES (Showing it is locked!)
    const lockY = doorCenterY - 0.15;

    // Brass Lock Escutcheon Plate at center seam
    const escutcheon = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.018, 12), brassLockMat);
    escutcheon.rotation.x = Math.PI / 2;
    escutcheon.position.set(0, lockY, glassZ + 0.026);
    group.add(escutcheon);

    // Keyhole Slot (Dark cutout)
    const keyhole = new THREE.Mesh(
      new THREE.BoxGeometry(0.012, 0.032, 0.01),
      new THREE.MeshBasicMaterial({ color: '#100c08' })
    );
    keyhole.position.set(0, lockY, glassZ + 0.036);
    group.add(keyhole);

    // Dual Brass Handles / Teardrop Pulls on Left & Right Doors
    [-0.065, 0.065].forEach(hx => {
      const handleStem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.03, 6), brassLockMat);
      handleStem.rotation.x = Math.PI / 2;
      handleStem.position.set(hx, lockY, glassZ + 0.03);
      group.add(handleStem);

      const handleRing = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.006, 6, 12), brassLockMat);
      handleRing.position.set(hx, lockY - 0.025, glassZ + 0.045);
      group.add(handleRing);
    });

    // 7. CLEAR BIG NAME WRITTEN DIRECTLY ON THE GLASS
    const namePlaneW = Math.min(width - 0.22, 2.7);
    const namePlaneH = 0.98;
    const nameY = height * 0.62;

    const glassDecalTexture = createGlassGenreCanvasTexture(genreObj.title, genreObj.icon);
    const glassDecalMat = new THREE.MeshBasicMaterial({
      map: glassDecalTexture,
      transparent: true,
      opacity: 0.96
    });

    const glassNamePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(namePlaneW, namePlaneH),
      glassDecalMat
    );
    glassNamePlane.position.set(0, nameY, glassZ + 0.018);
    group.add(glassNamePlane);

    // 8. Raycast Hitbox for Clicking/Hovering this Locked Shelf
    const hitBox = new THREE.Mesh(
      new THREE.BoxGeometry(width + 0.2, height, depth + 0.6),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitBox.position.set(0, height / 2, 0.25);
    hitBox.userData = {
      isShelf: true,
      isLocked: true,
      genreData: genreObj
    };
    shelfClickables.push(hitBox);
    group.add(hitBox);

    scene.add(group);
  }

  // BUILD ALL 22 LOCKED GLASS BOOKCASES:

  // 1. Back Wall Bookshelves (6 Shelf Units)
  createShelfUnit(SHELF_GENRES[0], -16.4, 0, -14.6, 0, 3.0, 5.0, 0.52, 7);
  createShelfUnit(SHELF_GENRES[1], -12.0, 0, -14.6, 0, 2.4, 5.0, 0.52, 7);
  createShelfUnit(SHELF_GENRES[2], -6.8, 0, -14.6, 0, 2.8, 5.0, 0.52, 7);
  createShelfUnit(SHELF_GENRES[3], 6.8, 0, -14.6, 0, 2.8, 5.0, 0.52, 7);
  createShelfUnit(SHELF_GENRES[4], 12.0, 0, -14.6, 0, 2.4, 5.0, 0.52, 7);
  createShelfUnit(SHELF_GENRES[5], 16.4, 0, -14.6, 0, 3.0, 5.0, 0.52, 7);

  // 2. West Wall Bookshelves (6 Shelf Units)
  createShelfUnit(SHELF_GENRES[6], -17.6, 0, -11.0, Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(SHELF_GENRES[7], -17.6, 0, -6.5, Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(SHELF_GENRES[8], -17.6, 0, -2.0, Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(SHELF_GENRES[9], -17.6, 0, 2.5, Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(SHELF_GENRES[10], -17.6, 0, 7.0, Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(SHELF_GENRES[11], -17.6, 0, 11.5, Math.PI / 2, 3.4, 5.0, 0.52, 7);

  // 3. East Wall Bookshelves (6 Shelf Units)
  createShelfUnit(SHELF_GENRES[12], 17.6, 0, -11.0, -Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(SHELF_GENRES[13], 17.6, 0, -6.5, -Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(SHELF_GENRES[14], 17.6, 0, -2.0, -Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(SHELF_GENRES[15], 17.6, 0, 2.5, -Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(SHELF_GENRES[16], 17.6, 0, 7.0, -Math.PI / 2, 3.4, 5.0, 0.52, 7);
  createShelfUnit(SHELF_GENRES[17], 17.6, 0, 11.5, -Math.PI / 2, 3.4, 5.0, 0.52, 7);

  // 4. Free-Standing Room Partition Bookshelves (4 Shelf Units)
  createShelfUnit(SHELF_GENRES[18], -8.6, 0, -11.8, 0, 3.2, 2.6, 0.5, 4);
  createShelfUnit(SHELF_GENRES[19], 8.6, 0, -11.8, 0, 3.2, 2.6, 0.5, 4);
  createShelfUnit(SHELF_GENRES[20], -8.6, 0, 12.8, 0, 3.2, 2.6, 0.5, 4);
  createShelfUnit(SHELF_GENRES[21], 8.6, 0, 12.8, 0, 3.2, 2.6, 0.5, 4);

  // 5. Populate Thousands of Procedural Books Visible Behind the Glass
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
    totalBooks: bookIndex,
    shelfClickables,
    genresData: SHELF_GENRES
  };
}
