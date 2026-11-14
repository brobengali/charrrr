import * as THREE from 'three';
import { createDeskLampLight } from './lighting.js';

// Formal Corporate & Professional Project Topics
export const FORMAL_TOPICS = [
  'Senior M&A Associate: $2.4B Cross-Border Telecom Acquisition Model',
  'VP of Quantitative Trading: High-Frequency Alpha Execution Engine',
  'Management Consultant: Fortune 50 Enterprise Digital Transformation Deck',
  'Lead Cloud Architect: Multi-Region High-Availability Kubernetes Mesh',
  'Director of Corporate Finance: FY27 Capital Allocation & Liquidity Strategy',
  'Principal Product Architect: Enterprise AI Autonomous Agent Framework',
  'Corporate Legal Counsel: Series C Preferred Stock Investment Agreement',
  'Senior Cybersecurity Director: Post-Quantum Zero-Trust Protocol Audit',
  'Private Equity VP: LBO Debt Syndication & Portfolio Returns Model',
  'Executive Director: Global Resilient Supply Chain Restructuring',
  'Lead ML Research Scientist: Diffusion Transformer Fine-Tuning Benchmarks',
  'Chief Risk Officer: Basel III Capital Adequacy & Stress Testing',
  'Head of Investor Relations: Annual General Meeting Shareholder Letter',
  'Management Consultant: Commercial Due Diligence & Market Sizing',
  'Senior Data Architect: Lakehouse Event Streaming Pipeline Schema'
];

// Helper to format clean, clickable LinkedIn profile URLs
export function formatLinkedInUrl(idOrUrl) {
  if (!idOrUrl) return '';
  const trimmed = String(idOrUrl).trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  const cleanId = trimmed
    .replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//i, '')
    .replace(/^in\//i, '')
    .replace(/^@/, '')
    .replace(/^\/+|\/+$/g, '');
  return `https://www.linkedin.com/in/${encodeURIComponent(cleanId)}`;
}

// Formal Office Colleagues with Verified LinkedIn Profiles
export const FORMAL_COLLEAGUES = [
  { name: 'Alexander Wright', role: 'Partner, Private Equity', linkedin: 'alexander-wright-pe', avatar: '💼', suit: '#1e2838', shirt: '#f4f6fa', tie: '#8a2420', hair: '#1c1510' },
  { name: 'Eleanor Vance', role: 'Director of Corporate Legal', linkedin: 'eleanor-vance-legal', avatar: '⚖️', suit: '#2a2e36', shirt: '#e8edf5', tie: '#243a5e', hair: '#2a1a12' },
  { name: 'Marcus Sterling', role: 'Principal Systems Architect', linkedin: 'marcus-sterling-arch', avatar: '💻', suit: '#242c36', shirt: '#f0f4fc', tie: '#9e7924', hair: '#120d09' },
  { name: 'Sophia Chen', role: 'VP, Quantitative Strategies', linkedin: 'sophia-chen-quant', avatar: '📈', suit: '#1c222e', shirt: '#ffffff', tie: '#7e2624', hair: '#0e0b09' },
  { name: 'David Hastings', role: 'Senior Strategy Consultant', linkedin: 'david-hastings-strategy', avatar: '📊', suit: '#353a42', shirt: '#eaf0f8', tie: '#204632', hair: '#352418' },
  { name: 'Claire Fontaine', role: 'Chief Financial Analyst', linkedin: 'claire-fontaine-cfa', avatar: '📑', suit: '#292b34', shirt: '#f6f7fb', tie: '#82442a', hair: '#22150f' },
  { name: 'Jonathan Thorne', role: 'Senior Managing Director', linkedin: 'jonathan-thorne-md', avatar: '🏛️', suit: '#1b2028', shirt: '#ffffff', tie: '#882220', hair: '#403834' },
  { name: 'Maya Patel', role: 'Head of Enterprise Product', linkedin: 'maya-patel-product', avatar: '💡', suit: '#212a38', shirt: '#f2f6ff', tie: '#264b6e', hair: '#150f0b' },
  { name: 'Vikram Malhotra', role: 'Principal Risk Consultant', linkedin: 'vikram-malhotra-risk', avatar: '🛡️', suit: '#30343c', shirt: '#edf2f7', tie: '#a07c2e', hair: '#16100c' },
  { name: 'Beatrice Ward', role: 'Corporate Treasury Counsel', linkedin: 'beatrice-ward-treasury', avatar: '🪙', suit: '#262d38', shirt: '#ffffff', tie: '#6f2d29', hair: '#332014' },
  { name: 'Julian Hayes', role: 'Global Markets Strategist', linkedin: 'julian-hayes-markets', avatar: '🌐', suit: '#1f2530', shirt: '#e6eef8', tie: '#1c3e5a', hair: '#251b14' },
  { name: 'Rachel Bennett', role: 'Lead Infrastructure Engineer', linkedin: 'rachel-bennett-infra', avatar: '⚙️', suit: '#2f343d', shirt: '#f5f7fc', tie: '#285840', hair: '#1a120e' }
];

export function buildFurniture(scene) {
  const desksData = [];
  const deskClickables = [];

  // Materials for Tables and Props
  const tableWoodTopMat = new THREE.MeshStandardMaterial({
    color: '#633c20',
    roughness: 0.72,
    metalness: 0.08,
    flatShading: true
  });

  const tableLegMat = new THREE.MeshStandardMaterial({
    color: '#281a11',
    roughness: 0.85,
    metalness: 0.15,
    flatShading: true
  });

  const chairWoodMat = new THREE.MeshStandardMaterial({
    color: '#3d2414',
    roughness: 0.8,
    metalness: 0.05,
    flatShading: true
  });

  const chairLeatherMat = new THREE.MeshStandardMaterial({
    color: '#242a33', // Charcoal executive leather
    roughness: 0.6,
    metalness: 0.1,
    flatShading: true
  });

  const brassLampMat = new THREE.MeshStandardMaterial({
    color: '#d4aa54',
    roughness: 0.35,
    metalness: 0.75,
    flatShading: true
  });

  const lampShadeOn = new THREE.MeshStandardMaterial({
    color: '#2d6d45',
    emissive: '#134024',
    roughness: 0.45,
    metalness: 0.2,
    flatShading: true
  });

  const lampShadeOff = new THREE.MeshStandardMaterial({
    color: '#1f452d',
    emissive: '#081a10',
    roughness: 0.65,
    metalness: 0.1,
    flatShading: true
  });

  const laptopBaseMat = new THREE.MeshStandardMaterial({
    color: '#9aa0a6',
    roughness: 0.35,
    metalness: 0.8,
    flatShading: true
  });

  const laptopScreenMat = new THREE.MeshBasicMaterial({
    color: '#d4e6ff'
  });

  const coffeeCupMat = new THREE.MeshStandardMaterial({
    color: '#f0ebe1',
    roughness: 0.4,
    flatShading: true
  });

  const coffeeLiquidMat = new THREE.MeshStandardMaterial({
    color: '#321d12',
    roughness: 0.3,
    flatShading: true
  });

  // GENERATE 56 CAFE TABLES WITH BOTH-SIDE SEATING (AT LEAST 50 TABLES)
  // 8 Columns (4 West Wing, 4 East Wing) x 7 Rows = 56 Tables
  const colX = [
    -14.2, -10.6, -7.0, -3.4, // West Wing
     3.4,   7.0,  10.6,  14.2  // East Wing
  ];

  const rowZ = [
    -9.2, -5.8, -2.4, 1.0, 4.4, 7.8, 11.2 // 7 Rows
  ];

  let tableNumber = 1;

  for (let c = 0; c < colX.length; c++) {
    for (let r = 0; r < rowZ.length; r++) {
      const tx = colX[c];
      const tz = rowZ[r];
      const tableId = `T${tableNumber < 10 ? '0' + tableNumber : tableNumber}`;
      tableNumber++;

      const tableGroup = new THREE.Group();

      // 1. Table Top (1.55m x 0.07m x 0.95m)
      const top = new THREE.Mesh(
        new THREE.BoxGeometry(1.55, 0.07, 0.95),
        tableWoodTopMat
      );
      top.position.set(tx, 0.76, tz);
      top.castShadow = true;
      top.receiveShadow = true;
      tableGroup.add(top);

      // 2. Dual Side Legs / Trestles with Brass Foot Accents
      [-0.66, 0.66].forEach(lx => {
        const leg = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 0.76, 0.78),
          tableLegMat
        );
        leg.position.set(tx + lx, 0.38, tz);
        leg.castShadow = true;
        leg.receiveShadow = true;
        tableGroup.add(leg);

        const foot = new THREE.Mesh(
          new THREE.BoxGeometry(0.1, 0.06, 0.82),
          brassLampMat
        );
        foot.position.set(tx + lx, 0.03, tz);
        tableGroup.add(foot);
      });

      // 3. Central Stretcher Bar
      const stretcher = new THREE.Mesh(
        new THREE.BoxGeometry(1.24, 0.05, 0.05),
        tableLegMat
      );
      stretcher.position.set(tx, 0.22, tz);
      tableGroup.add(stretcher);

      // 4. Brass Banker's Lamp with Green Shade on Desk
      const lampX = tx - 0.48;
      const lampZ = tz;
      const lampGroup = new THREE.Group();

      const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.03, 8), brassLampMat);
      lampBase.position.set(lampX, 0.81, lampZ);
      lampGroup.add(lampBase);

      const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.26, 6), brassLampMat);
      lampStem.position.set(lampX, 0.94, lampZ);
      lampGroup.add(lampStem);

      const shadeGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.32, 10, 1, false, 0, Math.PI);
      const shade = new THREE.Mesh(shadeGeo, lampShadeOn);
      shade.position.set(lampX, 1.08, lampZ);
      shade.rotation.z = Math.PI / 2;
      shade.scale.set(1, 1, 0.75);
      lampGroup.add(shade);

      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), new THREE.MeshBasicMaterial({ color: '#ffe6a8' }));
      bulb.position.set(lampX, 1.05, lampZ);
      lampGroup.add(bulb);
      tableGroup.add(lampGroup);

      // 5. Office Laptop & Ceramic Coffee Cups with Saucers on Both Sides
      // Side A (North) Props
      const laptopGroupA = createLaptop(laptopBaseMat, laptopScreenMat);
      laptopGroupA.position.set(tx + 0.18, 0.805, tz - 0.18);
      laptopGroupA.rotation.y = Math.PI; // Screen faces North chair
      tableGroup.add(laptopGroupA);

      const cupA = createCoffeeCup(coffeeCupMat, coffeeLiquidMat);
      cupA.position.set(tx + 0.52, 0.805, tz - 0.22);
      tableGroup.add(cupA);

      // Side B (South) Props
      const laptopGroupB = createLaptop(laptopBaseMat, laptopScreenMat);
      laptopGroupB.position.set(tx + 0.18, 0.805, tz + 0.18);
      laptopGroupB.rotation.y = 0; // Screen faces South chair
      tableGroup.add(laptopGroupB);

      const cupB = createCoffeeCup(coffeeCupMat, coffeeLiquidMat);
      cupB.position.set(tx + 0.52, 0.805, tz + 0.22);
      tableGroup.add(cupB);

      scene.add(tableGroup);

      // 6. BOTH-SIDE SEATING (North Seat facing South, South Seat facing North)
      // All seats start completely vacant and ready for real users and internet visitors
      const seatSides = [
        { side: 'N', name: 'North', facing: 1, zOffset: -0.76 },
        { side: 'S', name: 'South', facing: -1, zOffset: 0.76 }
      ];

      seatSides.forEach(s => {
        const seatId = `${tableId}-${s.side}`;
        const occupied = false;
        let colleagueData = null;
        let avatarGroup = null;

        // Chair on this side - pulled out slightly in vacant ready-to-sit position
        const chairGroup = createExecutiveChair(chairWoodMat, chairLeatherMat);
        const chairZ = tz + s.zOffset * 1.15;
        chairGroup.position.set(tx, 0, chairZ);
        chairGroup.rotation.y = s.facing > 0 ? 0 : Math.PI;
        tableGroup.add(chairGroup);

        // Invisible Hitbox for Raycasting this exact seat
        const hitBox = new THREE.Mesh(
          new THREE.BoxGeometry(1.4, 1.4, 0.85),
          new THREE.MeshBasicMaterial({ visible: false })
        );
        hitBox.position.set(tx, 0.7, tz + s.zOffset * 0.7);
        hitBox.userData = {
          seatId,
          tableId,
          side: s.side,
          occupied,
          chairPosition: new THREE.Vector3(tx, 0, tz + s.zOffset),
          deskPosition: new THREE.Vector3(tx, 0.76, tz),
          facing: s.facing,
          studentData: colleagueData
        };
        deskClickables.push(hitBox);
        tableGroup.add(hitBox);

        desksData.push({
          id: seatId,
          tableId,
          side: s.side,
          tableGroup,
          chairGroup,
          avatarGroup,
          hitBox,
          occupied,
          studentData: colleagueData,
          facing: s.facing,
          tx,
          tz,
          zOffset: s.zOffset
        });
      });
    }
  }

  // Helper to sit a user or colleague at any free seat on either side of any table
  function sitPlayerAtDesk(seatId, playerSuitColor = '#1e2838', playerHairColor = '#1c1510', playerTieColor = '#8a2420', playerName = 'You (Executive)', playerLinkedin = '', playerTopic = 'Personal Deep Work & Strategic Review', role = 'Executive Member') {
    const targetSeat = desksData.find(d => d.id === seatId);
    if (!targetSeat) return false;

    // If already occupied by someone else, vacate previous avatar before placing new one
    if (targetSeat.avatarGroup) {
      targetSeat.tableGroup.remove(targetSeat.avatarGroup);
      targetSeat.avatarGroup = null;
    }

    targetSeat.occupied = true;
    targetSeat.hitBox.userData.occupied = true;
    targetSeat.studentData = {
      name: playerName || 'Executive Member',
      avatar: '💼',
      role: role || 'Executive Member',
      topic: playerTopic || 'Personal Deep Work & Strategic Review',
      linkedin: playerLinkedin || '',
      suit: playerSuitColor,
      shirt: '#ffffff',
      tie: playerTieColor,
      hair: playerHairColor
    };
    targetSeat.hitBox.userData.studentData = targetSeat.studentData;

    // Tuck chair into desk
    targetSeat.chairGroup.position.z = targetSeat.tz + targetSeat.zOffset;
    targetSeat.chairGroup.rotation.y = targetSeat.facing > 0 ? 0 : Math.PI;

    // Create formal avatar
    const playerAvatar = createFormalOfficeAvatar(
      playerSuitColor,
      '#ffffff',
      playerTieColor,
      playerHairColor,
      false
    );
    playerAvatar.position.set(targetSeat.tx, 0, targetSeat.tz + targetSeat.zOffset);
    playerAvatar.rotation.y = targetSeat.facing > 0 ? 0 : Math.PI;
    targetSeat.tableGroup.add(playerAvatar);
    targetSeat.avatarGroup = playerAvatar;

    return true;
  }

  // Helper to vacate a seat when someone stands up
  function vacateSeat(seatId) {
    const targetSeat = desksData.find(d => d.id === seatId);
    if (!targetSeat) return false;

    if (targetSeat.avatarGroup) {
      targetSeat.tableGroup.remove(targetSeat.avatarGroup);
      targetSeat.avatarGroup = null;
    }

    targetSeat.occupied = false;
    targetSeat.studentData = null;
    targetSeat.hitBox.userData.occupied = false;
    targetSeat.hitBox.userData.studentData = null;

    // Pull chair out slightly into vacant ready-to-sit position
    targetSeat.chairGroup.position.z = targetSeat.tz + targetSeat.zOffset * 1.15;
    targetSeat.chairGroup.rotation.y = targetSeat.facing > 0 ? 0 : Math.PI;

    return true;
  }

  // Synchronize live seats from server/network
  function syncRemoteSeats(remoteSeatsMap = {}, mySeatId = null) {
    desksData.forEach(seat => {
      // Never overwrite the local user's own seat
      if (mySeatId && seat.id === mySeatId) return;

      const remote = remoteSeatsMap[seat.id];
      if (remote) {
        // Seat is occupied by a live internet patron
        sitPlayerAtDesk(
          seat.id,
          remote.suit || '#1e2838',
          remote.hair || '#1c1510',
          remote.tie || '#8a2420',
          remote.name || 'Cafe Patron',
          remote.linkedin || '',
          remote.topic || 'Deep Focus',
          remote.role || 'Cafe Patron'
        );
      } else if (seat.occupied) {
        // Remote patron stood up or disconnected
        vacateSeat(seat.id);
      }
    });
  }

  return {
    desksData,
    deskClickables,
    sitPlayerAtDesk,
    vacateSeat,
    syncRemoteSeats
  };
}

// Helper: Open Laptop with illuminated screen
function createLaptop(baseMat, screenMat) {
  const group = new THREE.Group();

  // Laptop Base / Chassis
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.015, 0.25), baseMat);
  base.castShadow = true;
  group.add(base);

  // Keyboard Area
  const keyboard = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.002, 0.13),
    new THREE.MeshStandardMaterial({ color: '#272b30', roughness: 0.85, flatShading: true })
  );
  keyboard.position.set(0, 0.0085, -0.025);
  group.add(keyboard);

  // Trackpad
  const trackpad = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.002, 0.065),
    new THREE.MeshStandardMaterial({ color: '#787e85', roughness: 0.4, flatShading: true })
  );
  trackpad.position.set(0, 0.0085, 0.08);
  group.add(trackpad);

  // Laptop Screen Lid (Opened at exactly 88 degree angle relative to the keyboard base)
  const lid = new THREE.Group();
  lid.position.set(0, 0.008, -0.125);
  const openAngleDeg = 88;
  lid.rotation.x = (90 - openAngleDeg) * (Math.PI / 180);

  const lidBack = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.24, 0.012), baseMat);
  lidBack.position.set(0, 0.12, 0);
  lid.add(lidBack);

  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.20), screenMat);
  screen.position.set(0, 0.12, 0.008);
  lid.add(screen);

  group.add(lid);
  return group;
}

// Helper: Ceramic Coffee Cup and Saucer
function createCoffeeCup(cupMat, coffeeMat) {
  const group = new THREE.Group();

  // Saucer
  const saucer = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.05, 0.012, 12), cupMat);
  saucer.position.set(0, 0.006, 0);
  group.add(saucer);

  // Cup
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.035, 0.065, 10), cupMat);
  cup.position.set(0, 0.045, 0);
  cup.castShadow = true;
  group.add(cup);

  // Liquid
  const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.005, 10), coffeeMat);
  liquid.position.set(0, 0.072, 0);
  group.add(liquid);

  return group;
}

// Helper: Executive Office Chair with leather cushion and wooden frame
function createExecutiveChair(woodMat, leatherMat) {
  const chair = new THREE.Group();

  // Padded Leather Cushion
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.09, 0.5), leatherMat);
  seat.position.set(0, 0.47, 0);
  seat.castShadow = true;
  chair.add(seat);

  // High Executive Leather Backrest
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.52, 0.08), leatherMat);
  back.position.set(0, 0.74, -0.22);
  back.rotation.x = -0.06;
  back.castShadow = true;
  chair.add(back);

  // Polished Wood Armrests
  [-0.24, 0.24].forEach(ax => {
    const armRest = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.03, 0.36), woodMat);
    armRest.position.set(ax, 0.65, -0.02);
    chair.add(armRest);

    const armPost = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.18, 6), woodMat);
    armPost.position.set(ax, 0.56, 0.1);
    chair.add(armPost);
  });

  // 4 Chair Legs with Brass Casters
  [
    [-0.2, -0.18],
    [0.2, -0.18],
    [-0.2, 0.18],
    [0.2, 0.18]
  ].forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.014, 0.45, 6), woodMat);
    leg.position.set(lx, 0.225, lz);
    leg.castShadow = true;
    chair.add(leg);
  });

  return chair;
}

// Helper: Stylized Low-Poly Formal Office Goer Avatar
export function createFormalOfficeAvatar(suitColor = '#1e2838', shirtColor = '#ffffff', tieColor = '#8a2420', hairColor = '#1c1510', hasGlasses = false) {
  const avatar = new THREE.Group();

  const skinMat = new THREE.MeshStandardMaterial({
    color: '#dfb892',
    roughness: 0.8,
    metalness: 0.02,
    flatShading: true
  });

  const suitMat = new THREE.MeshStandardMaterial({
    color: suitColor,
    roughness: 0.65,
    metalness: 0.08,
    flatShading: true
  });

  const shirtMat = new THREE.MeshStandardMaterial({
    color: shirtColor,
    roughness: 0.7,
    metalness: 0.02,
    flatShading: true
  });

  const tieMat = new THREE.MeshStandardMaterial({
    color: tieColor,
    roughness: 0.45,
    metalness: 0.25,
    flatShading: true
  });

  const pantsMat = new THREE.MeshStandardMaterial({
    color: '#282c33', // Formal tailored dress slacks
    roughness: 0.75,
    metalness: 0.05,
    flatShading: true
  });

  const shoeMat = new THREE.MeshStandardMaterial({
    color: '#141210', // Formal Oxford leather dress shoes
    roughness: 0.35,
    metalness: 0.2,
    flatShading: true
  });

  const hairMat = new THREE.MeshStandardMaterial({
    color: hairColor,
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true
  });

  // 1. Formal Trousers / Slacks & Seated Legs
  const hips = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.12, 0.38), pantsMat);
  hips.position.set(0, 0.52, 0.12);
  hips.castShadow = true;
  avatar.add(hips);

  const legs = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.44, 0.14), pantsMat);
  legs.position.set(0, 0.24, 0.28);
  legs.castShadow = true;
  avatar.add(legs);

  // Dress Shoes
  [-0.09, 0.09].forEach(sx => {
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.07, 0.22), shoeMat);
    shoe.position.set(sx, 0.035, 0.36);
    shoe.castShadow = true;
    avatar.add(shoe);
  });

  // 2. Formal Suit Jacket / Blazer Torso
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.48, 0.24), suitMat);
  torso.position.set(0, 0.78, 0.05);
  torso.rotation.x = 0.12;
  torso.castShadow = true;
  avatar.add(torso);

  // 3. Crisp Collared Dress Shirt V-Opening
  const shirtChest = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.26, 0.02), shirtMat);
  shirtChest.position.set(0, 0.88, 0.18);
  shirtChest.rotation.x = 0.12;
  avatar.add(shirtChest);

  // 4. Formal Silk Necktie
  const tie = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.24, 0.025), tieMat);
  tie.position.set(0, 0.86, 0.19);
  tie.rotation.x = 0.12;
  avatar.add(tie);

  // 5. Suit Lapels (Left and Right)
  [-0.08, 0.08].forEach(lx => {
    const lapel = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.26, 0.03), suitMat);
    lapel.position.set(lx, 0.88, 0.18);
    lapel.rotation.x = 0.12;
    avatar.add(lapel);
  });

  // 6. Neck & Head
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.08, 6), skinMat);
  neck.position.set(0, 1.04, 0.08);
  avatar.add(neck);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), skinMat);
  head.position.set(0, 1.18, 0.12);
  head.castShadow = true;
  avatar.add(head);

  // 7. Formal Styled Hair
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 7), hairMat);
  hair.position.set(0, 1.22, 0.1);
  hair.scale.set(1.02, 0.95, 1.06);
  avatar.add(hair);

  // 8. Glasses (if specified)
  if (hasGlasses) {
    const glassesMat = new THREE.MeshStandardMaterial({
      color: '#baa068',
      metalness: 0.8,
      roughness: 0.3
    });
    const glasses = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.04, 0.03), glassesMat);
    glasses.position.set(0, 1.18, 0.24);
    avatar.add(glasses);
  }

  // 9. Suit Sleeves & Hands resting on laptop/table
  [-1, 1].forEach(side => {
    const sleeve = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.1, 0.34), suitMat);
    sleeve.position.set(0.21 * side, 0.78, 0.22);
    sleeve.rotation.x = -0.42;
    avatar.add(sleeve);

    // White shirt cuff peek
    const cuff = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.09, 0.03), shirtMat);
    cuff.position.set(0.21 * side, 0.72, 0.35);
    avatar.add(cuff);

    // Hand
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.042, 6, 6), skinMat);
    hand.position.set(0.21 * side, 0.71, 0.38);
    avatar.add(hand);
  });

  return avatar;
}
