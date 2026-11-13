import * as THREE from 'three';
import { playFocusChime, toggleRainSound } from './audio.js';
import { StudySession } from './timer.js';
import { getBookAffiliateLink } from './books.js';
import { AUDIOBOOK_GENRES, getAudiobookAffiliateLink, getAudibleDirectLink } from './audiobooks.js';

// Room Moods & Descriptions
const ROOM_INFO = {
  'main-reading': { name: 'Grand Study Cafe', mood: '56 tables · face-to-face seating · curated genre shelves & audiobook lounge' },
  'science-wing': { name: 'Executive Work Lounge', mood: 'Quiet analysis · coffee roasts · strategy decks' },
  'exam-season': { name: 'High-Focus Library Cafe', mood: 'Deadlines · deep problem sets · quiet laptops' },
  'night-owls': { name: 'Midnight Espresso Hall', mood: 'Late-night steam · dim lamps · calm focus' }
};

export function setupUI(camera, scene, domElement, controls, furnitureAPI, booksAPI = null, libraryAPI = null) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(-999, -999);

  // Initialize Study Session (Pomodoro timer & profile state)
  const session = new StudySession({
    onTick: () => updateTimerDisplay(),
    onPhaseChange: (phase) => {
      playFocusChime();
      updateFocusBarState();
    }
  });

  // Formal Office Attire Palette
  const SUIT_COLORS = [
    '#1e2838', // Midnight Navy
    '#2a2e36', // Charcoal Grey
    '#161c24', // Deep Onyx
    '#383f4a', // Slate Steel
    '#443328', // Tweed Espresso
    '#3c2226'  // Burgundy Wool
  ];

  const TIE_COLORS = [
    '#8a2420', // Crimson Silk
    '#1e385c', // Royal Navy
    '#a07c2e', // Gold Stripe
    '#224835', // British Racing Green
    '#2c3038'  // Classic Charcoal
  ];

  const HAIR_COLORS = [
    '#120d09', // Jet Black
    '#1c1510', // Dark Espresso
    '#352418', // Chestnut Brown
    '#542b1a', // Auburn
    '#a38c6d', // Ash Blonde
    '#6a6d75'  // Distinguished Silver
  ];

  // DOM Elements
  const roomSelector = document.getElementById('room-selector');
  const roomMood = document.getElementById('room-mood');
  const btnToggleRain = document.getElementById('btn-toggle-rain');
  const rainStatus = document.getElementById('rain-status');
  const btnToggleView = document.getElementById('btn-toggle-view');
  const floor2D = document.getElementById('floor-view-2d');
  const desksGrid2D = document.getElementById('desks-grid-2d');

  const btnWalk = document.getElementById('btn-walk');
  const btnWardrobe = document.getElementById('btn-wardrobe');
  const btnAudiobooks = document.getElementById('btn-audiobooks');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const hintPill = document.getElementById('hint-pill');
  const crosshair = document.getElementById('crosshair');

  const timerDisplay = document.getElementById('timer-display');
  const currentTopicLabel = document.getElementById('current-topic-label');
  const btnTimerAction = document.getElementById('btn-timer-action');
  const btnOpenNotes = document.getElementById('btn-open-notes');
  const btnOpenHours = document.getElementById('btn-open-hours');
  const btnStandUp = document.getElementById('btn-stand-up');

  // Modals
  const sitModal = document.getElementById('sit-modal');
  const sitModalTitle = document.getElementById('sit-modal-title');
  const inputStudyTopic = document.getElementById('input-study-topic');
  const btnConfirmSit = document.getElementById('btn-confirm-sit');

  const topicModal = document.getElementById('topic-modal');
  const topicName = document.getElementById('topic-name');
  const topicRole = document.getElementById('topic-role');
  const topicAvatar = document.getElementById('topic-avatar');
  const topicSeat = document.getElementById('topic-seat');
  const topicText = document.getElementById('topic-text');

  // Bookshelf Genre Modal
  const genreModal = document.getElementById('genre-modal');
  const genreIcon = document.getElementById('genre-icon');
  const genreTitle = document.getElementById('genre-title');
  const genreLocation = document.getElementById('genre-location');
  const genreBookList = document.getElementById('genre-book-list');
  const btnReadGenreBook = document.getElementById('btn-read-genre-book');
  let activeGenreData = null;

  // Audiobook Section Modal
  const audiobookModal = document.getElementById('audiobook-modal');
  const audiobookGenreTabs = document.getElementById('audiobook-genre-tabs');
  const audiobookList = document.getElementById('audiobook-list');

  const wardrobeModal = document.getElementById('wardrobe-modal');
  const suitSwatches = document.getElementById('suit-swatches');
  const tieSwatches = document.getElementById('tie-swatches');
  const hairSwatches = document.getElementById('hair-swatches');

  const notesModal = document.getElementById('notes-modal');
  const notesTextarea = document.getElementById('notes-textarea');
  const btnSaveNotes = document.getElementById('btn-save-notes');

  const hoursModal = document.getElementById('hours-modal');
  const hoursLogList = document.getElementById('hours-log-list');
  const hoursTotalBadge = document.getElementById('hours-total-badge');

  let currentView = '3d';
  let isRainOn = false;
  let selectedSeatForSit = null;

  // 1. Header: Room Selection
  if (roomSelector) {
    roomSelector.addEventListener('change', () => {
      const selectedRoom = roomSelector.value;
      const info = ROOM_INFO[selectedRoom] || ROOM_INFO['main-reading'];
      if (roomMood) roomMood.textContent = info.mood;
      render2DFloorGrid();
      hintPill.textContent = `Moved to ${info.name} · Pick any chair or book rack`;
    });
  }

  // 2. Header: Rain Audio Toggle
  if (btnToggleRain) {
    btnToggleRain.addEventListener('click', () => {
      isRainOn = !isRainOn;
      toggleRainSound(isRainOn);
      rainStatus.textContent = isRainOn ? 'On' : 'Off';
      btnToggleRain.classList.toggle('active', isRainOn);
    });
  }

  // 3. Header: View Toggle (3D vs 2D)
  if (btnToggleView) {
    btnToggleView.addEventListener('click', () => {
      if (currentView === '3d') {
        currentView = '2d';
        floor2D.style.display = 'flex';
        btnToggleView.textContent = '3D Hall View';
        render2DFloorGrid();
      } else {
        currentView = '3d';
        floor2D.style.display = 'none';
        btnToggleView.textContent = 'Simple 2D View';
      }
    });
  }

  // 4. Render 2D Simple Floor Grid (56 Tables, 112 Seats)
  function render2DFloorGrid() {
    if (!desksGrid2D) return;
    desksGrid2D.innerHTML = '';

    const tablesMap = new Map();
    furnitureAPI.desksData.forEach(seat => {
      if (!tablesMap.has(seat.tableId)) {
        tablesMap.set(seat.tableId, []);
      }
      tablesMap.get(seat.tableId).push(seat);
    });

    tablesMap.forEach((seats, tId) => {
      const tableCard = document.createElement('div');
      tableCard.className = 'table-card-2d';

      const northSeat = seats.find(s => s.side === 'N') || seats[0];
      const southSeat = seats.find(s => s.side === 'S') || seats[1];

      tableCard.innerHTML = `
        <div class="table-card-header">Table ${tId}</div>
        <div class="table-seats-row">
          <div class="seat-badge-2d ${northSeat.occupied ? 'occupied' : 'vacant'}" data-seat="${northSeat.id}">
            <b>North Chair:</b> ${northSeat.occupied ? (northSeat.studentData?.name || 'Occupied') : 'Vacant · Sit'}
          </div>
          <div class="seat-badge-2d ${southSeat.occupied ? 'occupied' : 'vacant'}" data-seat="${southSeat.id}">
            <b>South Chair:</b> ${southSeat.occupied ? (southSeat.studentData?.name || 'Occupied') : 'Vacant · Sit'}
          </div>
        </div>
      `;

      tableCard.querySelectorAll('[data-seat]').forEach(seatEl => {
        seatEl.addEventListener('click', () => {
          const sId = seatEl.getAttribute('data-seat');
          const seatObj = furnitureAPI.desksData.find(s => s.id === sId);
          if (seatObj) {
            if (seatObj.occupied) {
              showTopicModal(seatObj.studentData, seatObj.id, seatObj.tableId, seatObj.side);
            } else {
              openSitModal(seatObj.id, seatObj.tableId, seatObj.side);
            }
          }
        });
      });

      desksGrid2D.appendChild(tableCard);
    });
  }

  // 5. Sit at Desk Flow
  function openSitModal(seatId, tableId = '', side = '') {
    selectedSeatForSit = seatId;
    const sideName = side === 'N' ? 'North Chair (Facing South)' : 'South Chair (Facing North)';
    sitModalTitle.textContent = `Take Seat ${seatId} (${sideName})`;
    inputStudyTopic.value = session.myTopic || '';
    sitModal.style.display = 'flex';
    inputStudyTopic.focus();
  }

  if (btnConfirmSit) {
    btnConfirmSit.addEventListener('click', () => {
      const topic = inputStudyTopic.value.trim() || 'Personal Deep Focus & Strategy Review';
      sitModal.style.display = 'none';

      if (selectedSeatForSit) {
        const success = furnitureAPI.sitPlayerAtDesk(
          selectedSeatForSit,
          session.profile.suitColor || '#1e2838',
          session.profile.hairColor || '#1c1510',
          session.profile.tieColor || '#8a2420'
        );

        if (success) {
          session.mySeat = selectedSeatForSit;
          session.startFocus(topic);
          currentTopicLabel.textContent = `${topic} (${selectedSeatForSit})`;
          hintPill.textContent = `Sitting at ${selectedSeatForSit} · Project: ${topic}`;
          btnStandUp.style.display = 'inline-block';

          const seatObj = furnitureAPI.desksData.find(d => d.id === selectedSeatForSit);
          if (seatObj) {
            const target = new THREE.Vector3(
              seatObj.tx,
              1.1,
              seatObj.tz
            );
            controls.orbit.target.lerp(target, 0.7);
            controls.orbit.update();
          }

          if (currentView === '2d') {
            currentView = '3d';
            floor2D.style.display = 'none';
            btnToggleView.textContent = 'Simple 2D View';
          }
        }
      }
    });
  }

  // 6. Stand Up
  if (btnStandUp) {
    btnStandUp.addEventListener('click', () => {
      if (session.mySeat) {
        session.reset();
        session.mySeat = null;
        currentTopicLabel.textContent = 'None (Pick a chair to sit)';
        btnStandUp.style.display = 'none';
        hintPill.textContent = "Tap any chair to sit, someone's desk to view their topic, or a locked glass bookcase to browse its genre.";
      }
    });
  }

  // 7. Focus Timer Action
  if (btnTimerAction) {
    btnTimerAction.addEventListener('click', () => {
      if (session.phase === 'idle') {
        session.startFocus(session.myTopic || 'General Deep Work');
      } else if (session.phase === 'focus') {
        session.startBreak();
      } else {
        session.startFocus(session.myTopic || 'General Deep Work');
      }
    });
  }

  function updateTimerDisplay() {
    if (timerDisplay) {
      timerDisplay.textContent = session.getFormattedTime();
    }
  }

  function updateFocusBarState() {
    updateTimerDisplay();
    if (session.phase === 'focus') {
      btnTimerAction.textContent = 'Take coffee break';
      btnTimerAction.className = 'focus-btn primary-action';
    } else if (session.phase === 'break') {
      btnTimerAction.textContent = 'Back to work';
      btnTimerAction.className = 'focus-btn';
    } else {
      btnTimerAction.textContent = 'Start focus';
      btnTimerAction.className = 'focus-btn primary-action';
    }
  }

  // 8. 3D Frame Controls: Walk Around
  if (btnWalk) {
    btnWalk.addEventListener('click', () => {
      if (controls.isFirstPerson) {
        controls.stopWalkMode();
        btnWalk.textContent = 'Walk around';
        btnWalk.classList.remove('active');
        crosshair.style.display = 'none';
        hintPill.textContent = "Tap any chair to sit, someone's desk to view their topic, or a locked glass bookcase to browse its genre.";
      } else {
        controls.startWalkMode();
        btnWalk.textContent = 'Exit walk';
        btnWalk.classList.add('active');
        crosshair.style.display = 'block';
        hintPill.textContent = 'WASD / Arrows to stroll cafe aisles · Shift to sprint · Esc to exit';
      }
    });

    controls.onModeChange = isFP => {
      if (!isFP) {
        btnWalk.textContent = 'Walk around';
        btnWalk.classList.remove('active');
        crosshair.style.display = 'none';
        hintPill.textContent = "Tap any chair to sit, someone's desk to view their topic, or a locked glass bookcase to browse its genre.";
      }
    };
  }

  // 9. Full Screen
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  // 10. Zoom Buttons
  if (btnZoomIn) btnZoomIn.addEventListener('click', () => controls.zoomIn());
  if (btnZoomOut) btnZoomOut.addEventListener('click', () => controls.zoomOut());

  // 11. Colleague Topic Modal
  function showTopicModal(colleagueData, seatId, tableId = '', side = '') {
    if (!colleagueData) return;
    topicName.textContent = colleagueData.name;
    if (topicRole) topicRole.textContent = colleagueData.role || 'Executive Member';
    topicAvatar.textContent = colleagueData.avatar || '💼';
    const sideDesc = side === 'N' ? 'North Chair' : (side === 'S' ? 'South Chair' : '');
    topicSeat.textContent = `${seatId} ${sideDesc ? '· ' + sideDesc : ''}`;
    topicText.textContent = colleagueData.topic || 'Reviewing strategic company initiatives';
    topicModal.style.display = 'flex';
  }

  // 12. Bookshelf Genre Modal
  function showGenreModal(genreData) {
    if (!genreData) return;
    activeGenreData = genreData;

    if (genreIcon) genreIcon.textContent = genreData.icon || '📚';
    if (genreTitle) genreTitle.textContent = genreData.title;
    if (genreLocation) genreLocation.textContent = genreData.location || 'Cafe Library';

    if (genreBookList) {
      genreBookList.innerHTML = '';
      (genreData.books || []).forEach(bTitle => {
        const affiliateLink = getBookAffiliateLink(bTitle);
        const li = document.createElement('li');
        li.className = 'genre-book-item';
        li.innerHTML = `
          <div class="genre-book-info">
            <span class="genre-book-icon">📖</span>
            <span class="genre-book-title">${bTitle}</span>
          </div>
          <div class="genre-book-actions">
            <button class="genre-study-btn" title="Set this book as your active study topic">Study Here</button>
            <a href="${affiliateLink}" target="_blank" rel="noopener noreferrer" class="genre-kindle-btn" title="Purchase Kindle ebook on Amazon to study in real life">
              Kindle ↗
            </a>
          </div>
        `;

        const studyBtn = li.querySelector('.genre-study-btn');
        studyBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          genreModal.style.display = 'none';
          applyBookTopic(bTitle, genreData.title);
        });

        // Clicking row also studies the book
        li.addEventListener('click', (e) => {
          if (e.target.closest('a')) return; // let affiliate link open normally
          genreModal.style.display = 'none';
          applyBookTopic(bTitle, genreData.title);
        });

        genreBookList.appendChild(li);
      });
    }

    if (genreModal) {
      genreModal.style.display = 'flex';
    }
  }

  function applyBookTopic(bookTitle, genreName) {
    if (session.mySeat) {
      session.startFocus(bookTitle);
      currentTopicLabel.textContent = `${bookTitle} (${session.mySeat})`;
      hintPill.textContent = `Reading from ${genreName}: ${bookTitle}`;
    } else {
      const vacantSeat = furnitureAPI.desksData.find(d => !d.occupied);
      if (vacantSeat) {
        selectedSeatForSit = vacantSeat.id;
        openSitModal(vacantSeat.id, vacantSeat.tableId, vacantSeat.side);
        inputStudyTopic.value = bookTitle;
      }
    }
  }

  if (btnReadGenreBook) {
    btnReadGenreBook.addEventListener('click', () => {
      if (activeGenreData && activeGenreData.books.length > 0) {
        const randomBook = activeGenreData.books[Math.floor(Math.random() * activeGenreData.books.length)];
        genreModal.style.display = 'none';
        applyBookTopic(randomBook, activeGenreData.title);
      }
    });
  }

  // 13. Dedicated Audiobook Listening Lounge & Multi-Genre Archive
  let currentAudiobookGenre = 'all';

  function showAudiobookModal(genreId = 'all') {
    currentAudiobookGenre = genreId;
    renderAudiobookGenreTabs();
    renderAudiobookList();
    if (audiobookModal) {
      audiobookModal.style.display = 'flex';
    }
  }

  function renderAudiobookGenreTabs() {
    if (!audiobookGenreTabs) return;
    audiobookGenreTabs.innerHTML = '';

    const tabs = [
      { id: 'all', name: 'All Curated Genres', icon: '🎧' },
      ...AUDIOBOOK_GENRES.map(g => ({ id: g.id, name: g.name, icon: g.icon }))
    ];

    tabs.forEach(tab => {
      const btn = document.createElement('button');
      btn.className = `audiobook-tab ${currentAudiobookGenre === tab.id ? 'active' : ''}`;
      btn.innerHTML = `<span>${tab.icon}</span> <span>${tab.name}</span>`;
      btn.addEventListener('click', () => {
        currentAudiobookGenre = tab.id;
        renderAudiobookGenreTabs();
        renderAudiobookList();
      });
      audiobookGenreTabs.appendChild(btn);
    });
  }

  function renderAudiobookList() {
    if (!audiobookList) return;
    audiobookList.innerHTML = '';

    let displayedBooks = [];
    if (currentAudiobookGenre === 'all') {
      AUDIOBOOK_GENRES.forEach(g => {
        g.audiobooks.forEach(b => {
          displayedBooks.push({ ...b, genreName: g.name, genreIcon: g.icon });
        });
      });
    } else {
      const targetGenre = AUDIOBOOK_GENRES.find(g => g.id === currentAudiobookGenre);
      if (targetGenre) {
        displayedBooks = targetGenre.audiobooks.map(b => ({
          ...b,
          genreName: targetGenre.name,
          genreIcon: targetGenre.icon
        }));
      }
    }

    displayedBooks.forEach(book => {
      const affiliateLink = getAudiobookAffiliateLink(book.title, book.author);
      const audibleLink = getAudibleDirectLink(book.title, book.author);

      const card = document.createElement('div');
      card.className = 'audiobook-card';
      card.innerHTML = `
        <div class="audiobook-card-header">
          <div class="audiobook-badge" style="background:${book.coverColor || '#1c2838'};">
            <span class="audio-waves">
              <span></span><span></span><span></span><span></span>
            </span>
            <span class="ab-icon">🎧</span>
          </div>
          <div class="audiobook-meta">
            <div class="audiobook-genre-tag">${book.genreIcon} ${book.genreName}</div>
            <h4 class="audiobook-title">${book.title}</h4>
            <div class="audiobook-author">by <b>${book.author}</b></div>
            <div class="audiobook-credits">
              <span>🎙️ ${book.narrator}</span>
              <span>⏱️ ${book.duration}</span>
            </div>
          </div>
        </div>
        <p class="audiobook-tagline">“${book.tagline}”</p>
        <div class="audiobook-actions">
          <button class="audio-study-btn" title="Set this audiobook as your current study topic">
            Set as Focus Audio
          </button>
          <a href="${affiliateLink}" target="_blank" rel="noopener noreferrer" class="audio-listen-btn primary-audible" title="Run & listen to audiobook on Amazon Audible">
            Listen on Audible 🎧
          </a>
          <a href="${audibleLink}" target="_blank" rel="noopener noreferrer" class="audio-listen-btn outline-audible" title="Search in Audible Store">
            Audible App ↗
          </a>
        </div>
      `;

      card.querySelector('.audio-study-btn').addEventListener('click', () => {
        audiobookModal.style.display = 'none';
        applyBookTopic(`${book.title} (Audiobook) — ${book.author}`, book.genreName);
      });

      audiobookList.appendChild(card);
    });
  }

  if (btnAudiobooks) {
    btnAudiobooks.addEventListener('click', () => {
      showAudiobookModal('all');
    });
  }

  // 14. Wardrobe Modal (Formal Office Attire)
  function buildSwatches(container, colors, selectedColor, onSelect) {
    if (!container) return;
    container.innerHTML = '';
    colors.forEach(hex => {
      const swatch = document.createElement('div');
      swatch.className = `color-swatch ${hex.toLowerCase() === (selectedColor || '').toLowerCase() ? 'selected' : ''}`;
      swatch.style.backgroundColor = hex;
      swatch.addEventListener('click', () => {
        container.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
        onSelect(hex);
      });
      container.appendChild(swatch);
    });
  }

  if (btnWardrobe) {
    btnWardrobe.addEventListener('click', () => {
      buildSwatches(suitSwatches, SUIT_COLORS, session.profile.suitColor || '#1e2838', color => {
        session.saveProfile({ suitColor: color });
      });

      buildSwatches(tieSwatches, TIE_COLORS, session.profile.tieColor || '#8a2420', color => {
        session.saveProfile({ tieColor: color });
      });

      buildSwatches(hairSwatches, HAIR_COLORS, session.profile.hairColor || '#1c1510', color => {
        session.saveProfile({ hairColor: color });
      });

      wardrobeModal.style.display = 'flex';
    });
  }

  // 14. Notes Modal
  if (btnOpenNotes) {
    btnOpenNotes.addEventListener('click', () => {
      notesTextarea.value = session.loadNotes();
      notesModal.style.display = 'flex';
    });
  }

  if (btnSaveNotes) {
    btnSaveNotes.addEventListener('click', () => {
      session.saveNotes(notesTextarea.value);
      notesModal.style.display = 'none';
      hintPill.textContent = 'Executive notes saved to your browser.';
    });
  }

  // 15. Weekly Hours Modal
  if (btnOpenHours) {
    btnOpenHours.addEventListener('click', () => {
      const mins = session.getWeeklyFocusMinutes();
      const hrs = (mins / 60).toFixed(1);
      hoursTotalBadge.textContent = `${hrs} hrs this week (${mins} mins)`;

      const records = JSON.parse(localStorage.getItem('hh.weeklyHours') || '[]');
      if (records.length > 0) {
        hoursLogList.innerHTML = records.map(r => `
          <div class="hours-entry">
            <span><b>${r.topic}</b> (${r.seat})</span>
            <span><b>+${r.minutes}m</b> · ${new Date(r.date).toLocaleDateString()}</span>
          </div>
        `).join('');
      } else {
        hoursLogList.innerHTML = '<div class="empty-state">No sessions logged yet. Complete a 25-minute focus round to log hours!</div>';
      }

      hoursModal.style.display = 'flex';
    });
  }

  // 16. Generic Modal Close Listeners
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close');
      const m = document.getElementById(modalId);
      if (m) m.style.display = 'none';
    });
  });

  // 17. Raycast Interaction (Desks, Locked Cabinets & 3D Audiobook Station)
  const getAllClickables = () => {
    const list = [
      ...furnitureAPI.deskClickables,
      ...(booksAPI?.shelfClickables || [])
    ];
    if (libraryAPI?.audioHitBox) {
      list.push(libraryAPI.audioHitBox);
    }
    return list;
  };

  domElement.addEventListener('pointermove', e => {
    const rect = domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (!controls.isFirstPerson && currentView === '3d') {
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(getAllClickables(), false);
      domElement.style.cursor = hits.length > 0 ? 'pointer' : 'default';
    }
  });

  domElement.addEventListener('click', e => {
    if (controls.isFirstPerson || currentView !== '3d') return;
    if (e.target.closest('.pill-btn, .zoom-btn, .modal-backdrop, .app-header, .focusbar')) return;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(getAllClickables(), false);

    if (hits.length > 0) {
      const hit = hits[0].object;
      const data = hit.userData;

      if (data.isAudiobookStation) {
        showAudiobookModal('all');
      } else if (data.isShelf) {
        showGenreModal(data.genreData);
      } else if (data.occupied) {
        showTopicModal(data.studentData, data.seatId, data.tableId, data.side);
      } else {
        openSitModal(data.seatId, data.tableId, data.side);
      }
    }
  });

  return {
    session,
    showTopicModal,
    showGenreModal,
    showAudiobookModal
  };
}
