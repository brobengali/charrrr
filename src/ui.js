import * as THREE from 'three';
import { playFocusChime, toggleRainSound } from './audio.js';
import { StudySession } from './timer.js';

// Room Moods & Descriptions
const ROOM_INFO = {
  'main-reading': { name: 'Main Reading Hall', mood: 'Big, quiet, long tables' },
  'science-wing': { name: 'Science Wing', mood: 'Labs, papers, problem sets' },
  'exam-season': { name: 'Exam Season Hall', mood: 'Deadlines and steady pages' },
  'night-owls': { name: 'Night Owls Hall', mood: 'Late-night lamps' }
};

export function setupUI(camera, scene, domElement, controls, furnitureAPI) {
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

  const SHIRT_COLORS = [
    '#4f7a5a', '#3f5a8a', '#b9862f', '#8a4a3a',
    '#7a6aa8', '#c07a4a', '#3a3f4a', '#d6b885'
  ];

  const HAIR_COLORS = [
    '#1a100b', '#2b1b11', '#472b17',
    '#6e4125', '#8f5c32', '#cca568'
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
  const topicAvatar = document.getElementById('topic-avatar');
  const topicSeat = document.getElementById('topic-seat');
  const topicText = document.getElementById('topic-text');

  const wardrobeModal = document.getElementById('wardrobe-modal');
  const shirtSwatches = document.getElementById('shirt-swatches');
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
      hintPill.textContent = `Moved to ${info.name} · Pick a desk to study`;
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

  // 4. Render 2D Simple Floor Grid
  function render2DFloorGrid() {
    if (!desksGrid2D) return;
    desksGrid2D.innerHTML = '';

    furnitureAPI.desksData.forEach(desk => {
      const cell = document.createElement('div');
      cell.className = `desk-cell-2d ${desk.config.occupied ? 'occupied' : 'vacant'}`;

      let studentHtml = '';
      if (desk.config.occupied && desk.studentData) {
        studentHtml = `
          <div class="desk-cell-student">${desk.studentData.avatar || '📖'} ${desk.studentData.name}</div>
          <div class="desk-cell-topic">${desk.studentData.topic || 'Quiet Study'}</div>
        `;
      } else {
        studentHtml = `<div class="desk-cell-topic" style="color: #4f7a5a; font-weight:600;">Vacant · Tap to sit</div>`;
      }

      cell.innerHTML = `
        <div class="desk-cell-id">Desk ${desk.id}</div>
        <div class="desk-cell-status">${desk.config.occupied ? 'Occupied' : 'Available'}</div>
        ${studentHtml}
      `;

      cell.addEventListener('click', () => {
        if (desk.config.occupied) {
          showTopicModal(desk.studentData, desk.id);
        } else {
          openSitModal(desk.id);
        }
      });

      desksGrid2D.appendChild(cell);
    });
  }

  // 5. Sit at Desk Flow
  function openSitModal(seatId) {
    selectedSeatForSit = seatId;
    sitModalTitle.textContent = `Take Desk ${seatId}`;
    inputStudyTopic.value = session.myTopic || '';
    sitModal.style.display = 'flex';
    inputStudyTopic.focus();
  }

  if (btnConfirmSit) {
    btnConfirmSit.addEventListener('click', () => {
      const topic = inputStudyTopic.value.trim() || 'Deep Focus Study Session';
      sitModal.style.display = 'none';

      if (selectedSeatForSit) {
        const success = furnitureAPI.sitPlayerAtDesk(
          selectedSeatForSit,
          session.profile.shirtColor,
          session.profile.hairColor
        );

        if (success) {
          session.mySeat = selectedSeatForSit;
          session.startFocus(topic);
          currentTopicLabel.textContent = `${topic} (Desk ${selectedSeatForSit})`;
          hintPill.textContent = `Sitting at Desk ${selectedSeatForSit} · Studying: ${topic}`;
          btnStandUp.style.display = 'inline-block';

          // Animate Orbit camera towards user's desk
          const desk = furnitureAPI.desksData.find(d => d.id === selectedSeatForSit);
          if (desk) {
            const target = new THREE.Vector3(
              desk.config.x,
              1.1,
              desk.config.z + 1.8 * desk.config.facing
            );
            controls.orbit.target.lerp(target, 0.7);
            controls.orbit.update();
          }

          // If in 2D floor view, switch back to 3D to see your seated avatar
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
        currentTopicLabel.textContent = 'None (Pick a desk to sit)';
        btnStandUp.style.display = 'none';
        hintPill.textContent = "Tap a free desk to sit, or someone's desk to see their topic.";
      }
    });
  }

  // 7. Focus Timer Action
  if (btnTimerAction) {
    btnTimerAction.addEventListener('click', () => {
      if (session.phase === 'idle') {
        session.startFocus(session.myTopic || 'General Study');
      } else if (session.phase === 'focus') {
        session.startBreak();
      } else {
        session.startFocus(session.myTopic || 'General Study');
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
      btnTimerAction.textContent = 'Take break';
      btnTimerAction.className = 'focus-btn primary-action';
    } else if (session.phase === 'break') {
      btnTimerAction.textContent = 'Back to focus';
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
        hintPill.textContent = "Tap a free desk to sit, or someone's desk to see their topic.";
      } else {
        controls.startWalkMode();
        btnWalk.textContent = 'Exit walk';
        btnWalk.classList.add('active');
        crosshair.style.display = 'block';
        hintPill.textContent = 'WASD / Arrows to walk · Shift to sprint · Move mouse to look around · Esc to exit';
      }
    });

    controls.onModeChange = isFP => {
      if (!isFP) {
        btnWalk.textContent = 'Walk around';
        btnWalk.classList.remove('active');
        crosshair.style.display = 'none';
        hintPill.textContent = "Tap a free desk to sit, or someone's desk to see their topic.";
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

  // 11. Study Topic Modal
  function showTopicModal(studentData, seatId) {
    if (!studentData) return;
    topicName.textContent = studentData.name;
    topicAvatar.textContent = studentData.avatar || '📖';
    topicSeat.textContent = `Desk ${seatId}`;
    topicText.textContent = studentData.topic || 'Studying in quiet focus';
    topicModal.style.display = 'flex';
  }

  // 12. Wardrobe Modal
  function buildSwatches(container, colors, selectedColor, onSelect) {
    container.innerHTML = '';
    colors.forEach(hex => {
      const swatch = document.createElement('div');
      swatch.className = `color-swatch ${hex.toLowerCase() === selectedColor.toLowerCase() ? 'selected' : ''}`;
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
      buildSwatches(shirtSwatches, SHIRT_COLORS, session.profile.shirtColor, color => {
        session.saveProfile({ shirtColor: color });
        updatePlayerLook();
      });

      buildSwatches(hairSwatches, HAIR_COLORS, session.profile.hairColor, color => {
        session.saveProfile({ hairColor: color });
        updatePlayerLook();
      });

      wardrobeModal.style.display = 'flex';
    });
  }

  function updatePlayerLook() {
    if (session.mySeat) {
      const desk = furnitureAPI.desksData.find(d => d.id === session.mySeat);
      if (desk && desk.avatarGroup && desk.avatarGroup.userData) {
        if (desk.avatarGroup.userData.shirtMat) {
          desk.avatarGroup.userData.shirtMat.color.set(session.profile.shirtColor);
        }
        if (desk.avatarGroup.userData.hairMat) {
          desk.avatarGroup.userData.hairMat.color.set(session.profile.hairColor);
        }
      }
    }
  }

  // 13. Notes Modal
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
      hintPill.textContent = 'Notes saved to your browser.';
    });
  }

  // 14. Weekly Hours Modal
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
        hoursLogList.innerHTML = '<div class="empty-state">No sessions logged yet. Complete a 25-minute focus session to log hours!</div>';
      }

      hoursModal.style.display = 'flex';
    });
  }

  // 15. Generic Modal Close Listeners
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close');
      const m = document.getElementById(modalId);
      if (m) m.style.display = 'none';
    });
  });

  // 16. Raycast Desk Interaction (3D Scene)
  domElement.addEventListener('pointermove', e => {
    const rect = domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (!controls.isFirstPerson && currentView === '3d') {
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(furnitureAPI.deskClickables, false);
      domElement.style.cursor = hits.length > 0 ? 'pointer' : 'default';
    }
  });

  domElement.addEventListener('click', e => {
    if (controls.isFirstPerson || currentView !== '3d') return;
    if (e.target.closest('.pill-btn, .zoom-btn, .modal-backdrop, .app-header, .focusbar')) return;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(furnitureAPI.deskClickables, false);

    if (hits.length > 0) {
      const hit = hits[0].object;
      const data = hit.userData;

      if (data.occupied) {
        showTopicModal(data.studentData, data.seatId);
      } else {
        openSitModal(data.seatId);
      }
    }
  });

  return {
    session,
    showTopicModal
  };
}
