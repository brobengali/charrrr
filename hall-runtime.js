/**
 * Connect Cafe · Complete Client Runtime
 * Authentic standalone implementation: 2D floor, focus timer, Web Audio chimes & rain,
 * notes, hours chart, timetable, Spotify embed, multi-tab sync, and 3D hall.
 */
(function (global) {
  const AVATARS = ["🦉", "📖", "🌿", "☕", "🐢", "🌙", "🪴", "🦊", "🐼", "✏️"];
  const COLORS = ["#e9d8a6", "#d4a373", "#ccd5ae", "#b7c4cf", "#e6ccb2", "#c9ada7"];
  const ROWS = ["A", "B", "C", "D"];
  const DESKS_PER_ROW = 6;
  const HALLS = [
    { id: "main-reading", name: "Main Reading Hall", mood: "Big, quiet, long tables", rule: "Silent. Nods only." },
    { id: "science-wing", name: "Science Wing", mood: "Labs, papers, problem sets", rule: "Silent. Diagrams welcome." },
    { id: "exam-season", name: "Exam Season Hall", mood: "Deadlines and steady pages", rule: "Silent. One topic per desk." },
    { id: "night-owls", name: "Night Owls", mood: "Late-night lamps", rule: "Silent. Be kind to tired eyes." }
  ];

  const DEMO_STUDENTS = [
    { name: "Aarav", avatar: "🦉", topic: "Organic chem: SN1 vs SN2" },
    { name: "Meera", avatar: "🌿", topic: "GATE BT: enzyme kinetics" },
    { name: "Kabir", avatar: "🐢", topic: "DSA: graphs" },
    { name: "Isha", avatar: "📚", topic: "Thesis lit review" },
    { name: "Rohan", avatar: "☕", topic: "Linear algebra ch. 4" },
    { name: "Tara", avatar: "🌙", topic: "UPSC: polity notes" },
    { name: "Zoya", avatar: "🪴", topic: "Bioprocess eng. problem set" }
  ];

  // Keys
  const PROFILE_KEY = "hh.profile";
  const TAB_PROFILE_KEY = "hh.tabProfile";
  const HISTORY_KEY = "hh.history";
  const USUAL_SEATS_KEY = "hh.usualSeat";
  const NOTES_KEY = "hh.deskNotes";
  const TIMETABLE_KEY = "hh.timetable";
  const SPOTIFY_KEY = "hh.spotifyUrl";
  const SHOW_HOURS_KEY = "hh.showWeeklyHours";
  const VIEW_KEY = "hh.view";

  function getProfile() {
    try {
      const tab = sessionStorage.getItem(TAB_PROFILE_KEY);
      if (tab) return JSON.parse(tab);
      const loc = localStorage.getItem(PROFILE_KEY);
      if (loc) return JSON.parse(loc);
    } catch (e) {}
    const p = {
      id: "me-" + Math.random().toString(36).slice(2, 10),
      name: "Reader",
      avatar: "📖",
      color: "#e9d8a6",
      hideFromRequests: false,
      focusMin: 25,
      breakMin: 5,
      chime: false,
      look: { top: "orig", neck: "on", shoes: "on" }
    };
    saveProfile(p);
    return p;
  }

  function saveProfile(p) {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
      sessionStorage.setItem(TAB_PROFILE_KEY, JSON.stringify(p));
    } catch (e) {}
  }

  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveHistoryItem(item) {
    try {
      const h = getHistory();
      h.unshift(item);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, 500)));
    } catch (e) {}
  }

  function getUsualSeat(hallId) {
    try {
      const u = JSON.parse(localStorage.getItem(USUAL_SEATS_KEY) || "{}");
      return u[hallId] || null;
    } catch (e) {
      return null;
    }
  }

  function setUsualSeat(hallId, seat) {
    try {
      const u = JSON.parse(localStorage.getItem(USUAL_SEATS_KEY) || "{}");
      u[hallId] = seat;
      localStorage.setItem(USUAL_SEATS_KEY, JSON.stringify(u));
    } catch (e) {}
  }

  // Web Audio Chimes & Murmur
  let audioCtx = null;
  let rainSource = null;
  let rainGain = null;

  function playChime() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [523.25, 659.25].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        const start = ctx.currentTime + 0.35 * idx;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.08, start + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.2);
        osc.connect(gain).connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 1.3);
      });
    } catch (e) {}
  }

  function toggleRain(enable) {
    if (!enable) {
      if (rainGain && audioCtx) {
        try {
          rainGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);
          setTimeout(() => {
            if (audioCtx) { audioCtx.close(); audioCtx = null; }
            rainSource = null;
            rainGain = null;
          }, 1600);
        } catch (e) {}
      }
      return;
    }
    if (audioCtx) return;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const length = 2 * audioCtx.sampleRate;
      const buffer = audioCtx.createBuffer(1, length, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < length; i++) {
        last = (last + 0.02 * (2 * Math.random() - 1)) / 1.02;
        data[i] = 3.5 * last;
      }
      rainSource = audioCtx.createBufferSource();
      rainSource.buffer = buffer;
      rainSource.loop = true;
      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1200;
      rainGain = audioCtx.createGain();
      rainGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      rainGain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 3);
      rainSource.connect(filter).connect(rainGain).connect(audioCtx.destination);
      rainSource.start();
    } catch (e) {}
  }

  function formatTime(ms) {
    const totalSec = Math.max(0, Math.ceil(ms / 1000));
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function formatDuration(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h} h`;
    return `${h} h ${m} min`;
  }

  // Main Hall Controller
  function initHall(hallId) {
    const currentHall = HALLS.find(h => h.id === hallId) || HALLS[0];
    let profile = getProfile();
    let usualSeat = getUsualSeat(hallId);

    // State
    let mySeat = null;
    let myTopic = "";
    let phase = "idle"; // 'focus' | 'break' | 'idle'
    let phaseEndsAt = null;
    let phaseStartedAt = null;
    let accumulatedFocusedMs = 0;
    let focusMin = profile.focusMin || 25;
    let breakMin = profile.breakMin || 5;
    let rainEnabled = false;
    const urlParams = new URLSearchParams(window.location.search);
    let currentView = urlParams.get("view") || localStorage.getItem(VIEW_KEY) || "3d";

    // Modals state
    let selectedSeatForSit = null;
    let selectedMemberForProfile = null;
    let sittingId = null;

    // Seed Occupants deterministically
    const occupants = new Map();
    function seedOccupants() {
      occupants.clear();
      let seed = 0;
      for (let ch of hallId) seed = (31 * seed + ch.charCodeAt(0)) >>> 0;
      const count = 4 + (seed % 3);
      const usedSeats = new Set();
      const allSeats = ROWS.flatMap(r => Array.from({ length: DESKS_PER_ROW }, (_, i) => `${r}${i + 1}`));

      for (let i = 0; i < count; i++) {
        const student = DEMO_STUDENTS[(seed + 3 * i) % DEMO_STUDENTS.length];
        let seatIdx = (seed + 7 * i) % allSeats.length;
        while (usedSeats.has(allSeats[seatIdx])) seatIdx = (seatIdx + 1) % allSeats.length;
        usedSeats.add(allSeats[seatIdx]);

        occupants.set(allSeats[seatIdx], {
          id: `demo-${hallId}-${i}`,
          name: student.name,
          avatar: student.avatar,
          color: COLORS[(seed + i) % COLORS.length],
          seat: allSeats[seatIdx],
          topic: student.topic,
          phase: i % 4 === 3 ? "break" : "focus",
          weekMinutes: 180 + (i * 45),
          hideFromRequests: i === 1,
          isDemo: true
        });
      }
    }
    seedOccupants();

    // Multi-tab BroadcastChannel
    let broadcast = null;
    try {
      broadcast = new BroadcastChannel(`connect-cafe:${hallId}`);
      broadcast.onmessage = (e) => {
        const msg = e.data;
        if (!msg) return;
        if (msg.kind === "sit" && msg.member) {
          occupants.set(msg.member.seat, msg.member);
          renderFloor();
        } else if (msg.kind === "stand" && msg.seat) {
          occupants.delete(msg.seat);
          renderFloor();
        } else if (msg.kind === "state" && msg.member) {
          occupants.set(msg.member.seat, msg.member);
          renderFloor();
        }
      };
    } catch (e) {}

    function notify(text) {
      let toast = document.querySelector(".toast");
      if (!toast) {
        toast = document.createElement("div");
        toast.className = "toast";
        document.body.appendChild(toast);
      }
      toast.textContent = text;
      toast.style.display = "block";
      clearTimeout(toast._timer);
      toast._timer = setTimeout(() => {
        toast.style.display = "none";
      }, 3500);
    }

    // 2D Floor Rendering
    function renderFloor() {
      if (typeof update3DEngineOccupants === "function") update3DEngineOccupants();
      const floorContainer = document.getElementById("hall-floor");
      if (!floorContainer) return;
      floorContainer.innerHTML = "";

      // Occupants count
      const totalTaken = occupants.size + (mySeat ? 1 : 0);
      const countEl = document.getElementById("desks-taken-count");
      if (countEl) countEl.textContent = `${totalTaken} of ${ROWS.length * DESKS_PER_ROW} desks taken`;

      ROWS.forEach(rowLetter => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "desk-row";

        const label = document.createElement("div");
        label.className = "row-label";
        label.textContent = rowLetter;
        rowDiv.appendChild(label);

        for (let num = 1; num <= DESKS_PER_ROW; num++) {
          const seatId = `${rowLetter}${num}`;
          const isMine = seatId === mySeat;
          const isUsual = seatId === usualSeat && !mySeat;
          const occupant = isMine ? {
            name: profile.name,
            avatar: profile.avatar,
            color: profile.color,
            topic: myTopic,
            phase: phase,
            weekMinutes: 0
          } : occupants.get(seatId);

          const deskBtn = document.createElement("button");
          deskBtn.type = "button";

          if (occupant) {
            deskBtn.className = `desk${isMine ? " mine" : ""}`;
            deskBtn.setAttribute("aria-label", `Desk ${seatId}, ${occupant.name} studying ${occupant.topic}`);
            deskBtn.innerHTML = `
              <span class="num">${seatId}</span>
              <span class="who">
                <span class="ava" style="background:${occupant.color}">${occupant.avatar}</span>
                ${isMine ? "You" : occupant.name}
              </span>
              <span class="state">
                <span class="lamp ${occupant.phase}"></span>
                ${occupant.phase === "focus" ? "focusing" : occupant.phase === "break" ? "on a short break" : "settling in"}
              </span>
              <span class="topic" title="${occupant.topic}">${occupant.topic || "…"}</span>
              ${occupant.weekMinutes ? `<span class="small muted">${formatDuration(occupant.weekMinutes)} this week</span>` : ""}
            `;
            deskBtn.addEventListener("click", () => {
              if (isMine) return;
              openProfileModal(occupant);
            });
          } else {
            deskBtn.className = `desk vacant${isUsual ? " usual" : ""}`;
            deskBtn.setAttribute("aria-label", `Desk ${seatId}, vacant`);
            deskBtn.innerHTML = `
              <span class="num">${seatId}</span>
              <span class="hint">${isUsual ? "Your usual desk" : "Vacant · take this seat"}</span>
            `;
            deskBtn.addEventListener("click", () => {
              if (mySeat) {
                notify("You already have a desk. Stand up first to move.");
                return;
              }
              openSitModal(seatId);
            });
          }

          rowDiv.appendChild(deskBtn);

          // Add center aisle after desk 3
          if (num === 3) {
            const aisle = document.createElement("div");
            aisle.className = "aisle";
            rowDiv.appendChild(aisle);
          }
        }

        floorContainer.appendChild(rowDiv);
      });
    }

    // Sit Down Modal
    function openSitModal(seatId) {
      selectedSeatForSit = seatId;
      const modal = document.getElementById("sit-modal");
      if (!modal) return;
      document.getElementById("sit-seat-title").textContent = `Desk ${seatId}`;
      const topicInput = document.getElementById("sit-topic-input");
      topicInput.value = "";
      document.getElementById("sit-plan-select").value = `${focusMin}/${breakMin}`;
      document.getElementById("sit-usual-check").checked = seatId === usualSeat;
      modal.style.display = "grid";
      setTimeout(() => topicInput.focus(), 50);
    }

    function closeSitModal() {
      const modal = document.getElementById("sit-modal");
      if (modal) modal.style.display = "none";
      selectedSeatForSit = null;
    }

    // Standing Up Modal
    function openStandModal() {
      const modal = document.getElementById("stand-modal");
      if (!modal) return;
      const focusedMins = Math.round(accumulatedFocusedMs / 60000);
      document.getElementById("stand-recap-text").innerHTML = `
        ${focusedMins} min of focus on <b>${myTopic}</b>. ${focusedMins > 0 ? "That counts." : "Showing up counts too."}
      `;
      document.getElementById("stand-note-input").value = "";
      modal.style.display = "grid";
    }

    function closeStandModal() {
      const modal = document.getElementById("stand-modal");
      if (modal) modal.style.display = "none";
    }

    // Member Profile Modal
    function openProfileModal(member) {
      selectedMemberForProfile = member;
      const modal = document.getElementById("profile-modal");
      if (!modal) return;
      document.getElementById("prof-ava").textContent = member.avatar;
      document.getElementById("prof-ava").style.background = member.color;
      document.getElementById("prof-name").textContent = member.name;
      document.getElementById("prof-topic").textContent = `Studying: ${member.topic}`;
      document.getElementById("prof-week").textContent = member.weekMinutes ? `${formatDuration(member.weekMinutes)} this week` : "";
      document.getElementById("prof-note-input").value = "";
      modal.style.display = "grid";
    }

    function closeProfileModal() {
      const modal = document.getElementById("profile-modal");
      if (modal) modal.style.display = "none";
      selectedMemberForProfile = null;
    }

    // Focus Bar & Timer
    function startFocusRound(mins) {
      phase = "focus";
      const now = Date.now();
      phaseStartedAt = now;
      phaseEndsAt = now + mins * 60 * 1000;
      updateFocusBar();
      broadcastState();
    }

    function startBreakRound(mins) {
      phase = "break";
      const now = Date.now();
      phaseStartedAt = now;
      phaseEndsAt = now + mins * 60 * 1000;
      updateFocusBar();
      broadcastState();
      openBreakModal();
    }

    function openBreakModal() {
      const modal = document.getElementById("break-modal");
      if (modal) modal.style.display = "grid";
    }

    function closeBreakModal() {
      const modal = document.getElementById("break-modal");
      if (modal) modal.style.display = "none";
    }

    function updateFocusBar() {
      const bar = document.getElementById("focusbar");
      if (!bar) return;
      if (!mySeat) {
        bar.style.display = "none";
        return;
      }
      bar.style.display = "block";
      document.getElementById("fb-desk-info").textContent = `Desk ${mySeat} · ${phase === "focus" ? "Focusing" : phase === "break" ? "Break" : "Ready when you are"}`;
      document.getElementById("fb-topic").textContent = myTopic;

      const progress = document.getElementById("fb-progress");
      const progressBar = document.getElementById("fb-progress-bar");
      const clock = document.getElementById("fb-clock");
      const actionBtn = document.getElementById("fb-action-btn");

      if (phase === "focus") {
        progress.className = "progress";
        actionBtn.className = "ghost";
        actionBtn.textContent = "Take a break";
      } else if (phase === "break") {
        progress.className = "progress break";
        actionBtn.className = "sage";
        actionBtn.textContent = "Back to focus";
      } else {
        progress.className = "progress";
        actionBtn.className = "sage";
        actionBtn.textContent = "Start next round";
      }

      if (phaseEndsAt) {
        const remaining = Math.max(0, phaseEndsAt - Date.now());
        clock.textContent = formatTime(remaining);
        const totalDuration = phaseEndsAt - phaseStartedAt;
        const pct = Math.min(100, Math.max(0, ((totalDuration - remaining) / totalDuration) * 100));
        progressBar.style.width = `${pct}%`;
      } else {
        clock.textContent = "--:--";
        progressBar.style.width = "0%";
      }
    }

    function broadcastState() {
      if (!broadcast || !mySeat) return;
      try {
        broadcast.postMessage({
          kind: "state",
          member: {
            id: profile.id,
            name: profile.name,
            avatar: profile.avatar,
            color: profile.color,
            seat: mySeat,
            topic: myTopic,
            phase: phase,
            weekMinutes: 0
          }
        });
      } catch (e) {}
    }

    // Timer Interval
    setInterval(() => {
      if (!mySeat) return;
      if (phase === "focus" && phaseEndsAt) {
        accumulatedFocusedMs += 1000;
        if (Date.now() >= phaseEndsAt) {
          if (profile.chime) playChime();
          startBreakRound(breakMin);
        }
      } else if (phase === "break" && phaseEndsAt) {
        if (Date.now() >= phaseEndsAt) {
          if (profile.chime) playChime();
          phase = "idle";
          phaseEndsAt = null;
          closeBreakModal();
        }
      }
      updateFocusBar();
    }, 1000);

    // Event Bindings
    function bindEvents() {
      // Sit form submission
      const sitForm = document.getElementById("sit-form");
      if (sitForm) {
        sitForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const topic = document.getElementById("sit-topic-input").value.trim();
          if (!topic) return;
          const plan = document.getElementById("sit-plan-select").value.split("/").map(Number);
          focusMin = plan[0];
          breakMin = plan[1];
          const isUsual = document.getElementById("sit-usual-check").checked;

          mySeat = selectedSeatForSit;
          myTopic = topic;
          accumulatedFocusedMs = 0;
          if (isUsual) {
            setUsualSeat(hallId, mySeat);
            usualSeat = mySeat;
          }

          profile.focusMin = focusMin;
          profile.breakMin = breakMin;
          saveProfile(profile);

          closeSitModal();
          startFocusRound(focusMin);
          renderFloor();
          notify(`Seated at desk ${mySeat}. Focus begins.`);

          if (broadcast) {
            broadcast.postMessage({
              kind: "sit",
              member: {
                id: profile.id,
                name: profile.name,
                avatar: profile.avatar,
                color: profile.color,
                seat: mySeat,
                topic: myTopic,
                phase: "focus",
                weekMinutes: 0
              }
            });
          }
        });
      }

      document.getElementById("sit-cancel-btn")?.addEventListener("click", closeSitModal);

      // Stand form submission
      const standForm = document.getElementById("stand-form");
      if (standForm) {
        standForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const recap = document.getElementById("stand-note-input").value.trim();
          const focusedMinutes = Math.round(accumulatedFocusedMs / 60000);

          saveHistoryItem({
            id: `sitting-${Date.now()}`,
            at: Date.now(),
            hallId: hallId,
            seat: mySeat,
            topic: myTopic,
            minutes: focusedMinutes,
            note: recap
          });

          if (broadcast) {
            broadcast.postMessage({ kind: "stand", seat: mySeat });
          }

          const oldSeat = mySeat;
          mySeat = null;
          myTopic = "";
          phase = "idle";
          phaseEndsAt = null;
          accumulatedFocusedMs = 0;

          closeStandModal();
          updateFocusBar();
          renderFloor();
          notify(focusedMinutes > 0 ? `Saved: ${focusedMinutes} min on ${recap || "your session"}.` : "Saved. See you soon.");
        });
      }

      document.getElementById("stand-cancel-btn")?.addEventListener("click", closeStandModal);

      // Focusbar Actions
      document.getElementById("fb-action-btn")?.addEventListener("click", () => {
        if (phase === "focus") {
          startBreakRound(breakMin);
        } else {
          startFocusRound(focusMin);
          closeBreakModal();
        }
      });

      document.getElementById("fb-stand-btn")?.addEventListener("click", openStandModal);

      // Break modal buttons
      document.getElementById("break-hide-btn")?.addEventListener("click", closeBreakModal);
      document.getElementById("break-focus-btn")?.addEventListener("click", () => {
        closeBreakModal();
        startFocusRound(focusMin);
      });

      // Topbar Toggles
      const chimeCheck = document.getElementById("chime-toggle");
      if (chimeCheck) {
        chimeCheck.checked = !!profile.chime;
        chimeCheck.addEventListener("change", (e) => {
          profile.chime = e.target.checked;
          saveProfile(profile);
        });
      }

      const rainCheck = document.getElementById("rain-toggle");
      if (rainCheck) {
        rainCheck.addEventListener("change", (e) => {
          rainEnabled = e.target.checked;
          toggleRain(rainEnabled);
        });
      }

      const hideCheck = document.getElementById("hide-req-toggle");
      if (hideCheck) {
        hideCheck.checked = !!profile.hideFromRequests;
        hideCheck.addEventListener("change", (e) => {
          profile.hideFromRequests = e.target.checked;
          saveProfile(profile);
        });
      }

      // Hall Hop Selector
      const hallSelect = document.getElementById("hall-select");
      if (hallSelect) {
        hallSelect.value = hallId;
        hallSelect.addEventListener("change", (e) => {
          if (mySeat) {
            notify("Stand up before hopping to another hall.");
            hallSelect.value = hallId;
            return;
          }
          window.location.href = `/hall/${e.target.value}`;
        });
      }

      // View switcher (2D / 3D)
      const viewBtn = document.getElementById("view-toggle-btn");
      if (viewBtn) {
        viewBtn.addEventListener("click", () => {
          currentView = currentView === "2d" ? "3d" : "2d";
          localStorage.setItem(VIEW_KEY, currentView);
          applyView();
        });
      }

      // Notes Modal
      document.getElementById("fb-notes-btn")?.addEventListener("click", openNotesModal);
      document.getElementById("notes-close-btn")?.addEventListener("click", closeNotesModal);

      // Hours Modal
      document.getElementById("fb-hours-btn")?.addEventListener("click", openHoursModal);
      document.getElementById("hours-close-btn")?.addEventListener("click", closeHoursModal);

      // Timetable Modal
      document.getElementById("fb-timetable-btn")?.addEventListener("click", openTimetableModal);
      document.getElementById("timetable-close-btn")?.addEventListener("click", closeTimetableModal);

      // Profile modal actions
      document.getElementById("prof-close-btn")?.addEventListener("click", closeProfileModal);
      document.getElementById("prof-send-req-btn")?.addEventListener("click", () => {
        if (!selectedMemberForProfile) return;
        const note = document.getElementById("prof-note-input").value.trim();
        const target = selectedMemberForProfile;
        closeProfileModal();
        notify(`Request sent to ${target.name}.`);
        setTimeout(() => {
          notify(`${target.name} accepted. You’re in a quiet study room now.`);
          showRoomBanner(`${target.name} & ${profile.name}`);
        }, 2200);
      });
      document.getElementById("prof-block-btn")?.addEventListener("click", () => {
        if (!selectedMemberForProfile) return;
        occupants.delete(selectedMemberForProfile.seat);
        closeProfileModal();
        renderFloor();
        notify("Student blocked. They won't appear on your desks.");
      });
      document.getElementById("prof-report-btn")?.addEventListener("click", () => {
        closeProfileModal();
        notify("Report received. Our moderators will review it.");
      });

      // Spotify desk player toggle
      setupSpotifyPlayer();
    }

    function showRoomBanner(name) {
      let b = document.getElementById("study-room-banner");
      if (!b) return;
      b.innerHTML = `
        <div class="row" style="justify-content: space-between;">
          <div><b>Study room:</b> ${name} <span class="muted small">· 2 of 4</span></div>
          <button type="button" class="ghost small" id="leave-room-btn">Leave room</button>
        </div>
      `;
      b.style.display = "block";
      document.getElementById("leave-room-btn")?.addEventListener("click", () => {
        b.style.display = "none";
        notify("You left the study room. Your desk is still yours.");
      });
    }

    function applyView() {
      const floorView = document.getElementById("hall-floor");
      const hall3dWrap = document.getElementById("hall-3d-wrap");
      const viewBtn = document.getElementById("view-toggle-btn");
      if (currentView === "3d") {
        if (floorView) floorView.style.display = "none";
        if (hall3dWrap) hall3dWrap.style.display = "block";
        if (viewBtn) viewBtn.textContent = "Simple view";
        init3DCanvas();
        if (engine3d) {
          engine3d.resize();
          update3DEngineOccupants();
        }
      } else {
        if (floorView) floorView.style.display = "block";
        if (hall3dWrap) hall3dWrap.style.display = "none";
        if (viewBtn) viewBtn.textContent = "3D hall";
      }
    }

    // Spotify Embed Setup
    function setupSpotifyPlayer() {
      const toggleBtn = document.getElementById("spotify-toggle-btn");
      const body = document.getElementById("spotify-body");
      const input = document.getElementById("spotify-url-input");
      const useBtn = document.getElementById("spotify-use-btn");
      const clearBtn = document.getElementById("spotify-clear-btn");
      const frameContainer = document.getElementById("spotify-frame-wrap");

      let currentUrl = localStorage.getItem(SPOTIFY_KEY) || "";
      function parseSpotify(val) {
        if (!val) return null;
        const m = /^spotify:(playlist|album|track):([A-Za-z0-9]+)$/.exec(val.trim());
        if (m) return `https://open.spotify.com/embed/${m[1]}/${m[2]}`;
        try {
          const u = new URL(val.trim());
          const parts = u.pathname.split("/").filter(Boolean);
          const type = parts[0]?.startsWith("intl-") ? parts[1] : parts[0];
          const id = (parts[0]?.startsWith("intl-") ? parts[2] : parts[1])?.split("?")[0];
          if (["playlist", "album", "track"].includes(type) && id) {
            return `https://open.spotify.com/embed/${type}/${id}`;
          }
        } catch (e) {}
        return null;
      }

      function renderFrame() {
        if (!frameContainer) return;
        const embed = parseSpotify(currentUrl);
        if (embed) {
          frameContainer.innerHTML = `
            <iframe src="${embed}" width="100%" height="80" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style="border:0; border-radius:8px; margin-top:8px;"></iframe>
          `;
          toggleBtn.textContent = "Music";
        } else {
          frameContainer.innerHTML = "";
          toggleBtn.textContent = "Add music";
        }
      }

      renderFrame();

      toggleBtn?.addEventListener("click", () => {
        const isOpen = body.style.display === "block";
        body.style.display = isOpen ? "none" : "block";
        toggleBtn.textContent = isOpen ? (currentUrl ? "Music" : "Add music") : "Hide music";
      });

      useBtn?.addEventListener("click", () => {
        const val = input.value.trim();
        currentUrl = val;
        localStorage.setItem(SPOTIFY_KEY, val);
        renderFrame();
      });

      clearBtn?.addEventListener("click", () => {
        currentUrl = "";
        input.value = "";
        localStorage.removeItem(SPOTIFY_KEY);
        renderFrame();
      });
    }

    // Desk Notes System
    function openNotesModal() {
      const modal = document.getElementById("notes-modal");
      if (!modal) return;
      modal.style.display = "grid";
      renderNotesList();
    }
    function closeNotesModal() {
      const modal = document.getElementById("notes-modal");
      if (modal) modal.style.display = "none";
    }

    function renderNotesList() {
      const container = document.getElementById("notes-list");
      if (!container) return;
      let notes = [];
      try { notes = JSON.parse(localStorage.getItem(NOTES_KEY) || "[]"); } catch (e) {}
      container.innerHTML = "";
      if (notes.length === 0) {
        container.innerHTML = '<p class="muted small">No notes yet. Open a new note and just start writing.</p>';
        return;
      }
      notes.forEach(n => {
        const li = document.createElement("li");
        li.className = "note-item";
        li.innerHTML = `
          <div class="note-item-title">${n.title || "Untitled"}</div>
          <div class="small muted">${n.source || "No source"} · ${new Date(n.updatedAt).toLocaleDateString()}</div>
          <div class="small" style="margin-top:4px; white-space:pre-wrap;">${n.note.slice(0, 140)}${n.note.length > 140 ? "…" : ""}</div>
        `;
        container.appendChild(li);
      });
    }

    document.getElementById("note-new-btn")?.addEventListener("click", () => {
      const title = prompt("Note title (optional):") || "";
      const body = prompt("Note text:") || "";
      if (!body.trim()) return;
      let notes = [];
      try { notes = JSON.parse(localStorage.getItem(NOTES_KEY) || "[]"); } catch (e) {}
      notes.unshift({
        id: `note-${Date.now()}`,
        title: title || body.slice(0, 30),
        note: body,
        source: "General",
        updatedAt: Date.now()
      });
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      renderNotesList();
      notify("Note saved.");
    });

    // Hours Chart Modal
    function openHoursModal() {
      const modal = document.getElementById("hours-modal");
      if (!modal) return;
      const history = getHistory();
      const today = new Date().toDateString();
      const todayMins = history.filter(s => new Date(s.at).toDateString() === today).reduce((acc, s) => acc + (s.minutes || 0), 0);
      const weekAgo = Date.now() - 7 * 86400000;
      const weekMins = history.filter(s => s.at >= weekAgo).reduce((acc, s) => acc + (s.minutes || 0), 0);

      document.getElementById("hours-today").textContent = formatDuration(todayMins);
      document.getElementById("hours-week").textContent = formatDuration(weekMins);

      // Build 7 bars
      const barsWrap = document.getElementById("hour-bars-wrap");
      if (barsWrap) {
        barsWrap.innerHTML = "";
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayMinutes = [0, 0, 0, 0, 0, 0, 0];
        for (let i = 6; i >= 0; i--) {
          const d = new Date(Date.now() - i * 86400000);
          const dStr = d.toDateString();
          const mins = history.filter(s => new Date(s.at).toDateString() === dStr).reduce((acc, s) => acc + (s.minutes || 0), 0);
          const col = document.createElement("div");
          col.className = "hour-bar-col";
          const barHeight = Math.max(4, Math.min(80, Math.round(mins / 2)));
          col.innerHTML = `
            <div class="hour-bar" style="height:${barHeight}px" title="${d.toLocaleDateString()}: ${formatDuration(mins)}"></div>
            <div class="small muted">${days[d.getDay()]}</div>
          `;
          barsWrap.appendChild(col);
        }
      }
      modal.style.display = "grid";
    }

    function closeHoursModal() {
      const modal = document.getElementById("hours-modal");
      if (modal) modal.style.display = "none";
    }

    // Timetable Modal
    function openTimetableModal() {
      const modal = document.getElementById("timetable-modal");
      if (!modal) return;
      renderTimetableList();
      modal.style.display = "grid";
    }
    function closeTimetableModal() {
      const modal = document.getElementById("timetable-modal");
      if (modal) modal.style.display = "none";
    }

    function renderTimetableList() {
      const list = document.getElementById("timetable-list");
      if (!list) return;
      let slots = [];
      try { slots = JSON.parse(localStorage.getItem(TIMETABLE_KEY) || "[]"); } catch (e) {}
      list.innerHTML = "";
      if (slots.length === 0) {
        list.innerHTML = '<p class="muted small">No slots planned yet. Add a day, time and subject.</p>';
        return;
      }
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      slots.forEach((s, idx) => {
        const li = document.createElement("li");
        li.className = "note-item";
        li.innerHTML = `
          <div class="row" style="justify-content:space-between;">
            <div><b>${days[s.day]}</b> · ${s.start}–${s.end} : ${s.subject}</div>
            <button type="button" class="ghost small remove-slot-btn" data-index="${idx}">Remove</button>
          </div>
        `;
        list.appendChild(li);
      });
      list.querySelectorAll(".remove-slot-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const i = Number(btn.getAttribute("data-index"));
          slots.splice(i, 1);
          localStorage.setItem(TIMETABLE_KEY, JSON.stringify(slots));
          renderTimetableList();
        });
      });
    }

    document.getElementById("tt-add-btn")?.addEventListener("click", () => {
      const day = Number(document.getElementById("tt-day").value);
      const subject = document.getElementById("tt-subject").value.trim();
      const start = document.getElementById("tt-start").value;
      const end = document.getElementById("tt-end").value;
      if (!subject || !start || !end) return;
      let slots = [];
      try { slots = JSON.parse(localStorage.getItem(TIMETABLE_KEY) || "[]"); } catch (e) {}
      slots.push({ day, subject, start, end });
      localStorage.setItem(TIMETABLE_KEY, JSON.stringify(slots));
      document.getElementById("tt-subject").value = "";
      renderTimetableList();
      notify("Slot added to timetable.");
    });

    // 3D Hall Canvas (Three.js WebGL / Canvas)
    let engine3d = null;
    let canvas3dInited = false;

    function init3DCanvas() {
      if (canvas3dInited) return;
      const container = document.getElementById("canvas-3d-container");
      if (!container) return;
      if (!window.Hall3DEngine) {
        // Hall3DEngine may not be ready yet — retry after a short delay (up to 3s)
        const retries = (init3DCanvas._retries = (init3DCanvas._retries || 0) + 1);
        if (retries < 30) {
          setTimeout(init3DCanvas, 100);
        } else {
          console.error("[HushHall] Hall3DEngine failed to load after 3s. Check that /three.min.js and /hall-3d-engine.js are served correctly.");
          if (container) {
            container.style.background = "#2a1b12";
            container.innerHTML = '<div style="color:#e8d6b4;font-family:Georgia,serif;padding:40px;text-align:center"><p style="font-size:1.2rem">⚠️ 3D engine failed to load</p><p style="font-size:.9rem;opacity:.7">Open browser DevTools console for details.<br>Try refreshing the page.</p></div>';
          }
        }
        return;
      }
      canvas3dInited = true;

      engine3d = new window.Hall3DEngine(container, {
        hallId,
        onDeskClick: (seat) => {
          const occ = occupants.get(seat);
          if (occ) {
            openProfileModal(occ);
          } else {
            openSitModal(seat);
          }
        },
        onDeskHover: (seat) => {
          updateHoverLabel(seat);
        },
        onRender: (engine) => {
          update3DLabels(engine);
        }
      });

      update3DEngineOccupants();

      // 3D Controls
      const btnWalk = document.getElementById("btn-3d-walk");
      const btnWardrobe = document.getElementById("btn-3d-wardrobe");
      const btnFloor = document.getElementById("btn-3d-floor");
      const btnPace = document.getElementById("btn-3d-pace");
      const btnFs = document.getElementById("btn-3d-fs");
      const btnZoomIn = document.getElementById("btn-zoom-in");
      const btnZoomOut = document.getElementById("btn-zoom-out");
      const hint3d = document.getElementById("hint-3d");

      if (btnWardrobe) {
        btnWardrobe.addEventListener("click", () => {
          openProfileModal(profile);
        });
      }

      if (btnWalk) {
        btnWalk.addEventListener("click", () => {
          if (engine3d.isWalking) {
            engine3d.stopWalking();
            btnWalk.textContent = "Walk around";
            if (btnFloor) btnFloor.style.display = "none";
            if (btnPace) btnPace.style.display = "none";
            if (hint3d) hint3d.textContent = "Tap a free desk to sit · drag to look around · wheel to zoom";
          } else {
            engine3d.startWalking();
            btnWalk.textContent = "Stop walking";
            if (btnFloor) {
              btnFloor.style.display = "inline-block";
              btnFloor.textContent = "Sit on the floor";
            }
            if (btnPace) btnPace.style.display = "inline-block";
            if (hint3d) hint3d.textContent = "WASD or arrows to walk · Shift for a quicker pace · drag to look · Q/E to turn · G to sit on the floor · tap a free desk to sit";
          }
        });
      }

      if (btnFloor) {
        btnFloor.addEventListener("click", () => {
          engine3d.toggleFloorSitting();
          btnFloor.textContent = engine3d.isFloorSitting ? "Get up" : "Sit on the floor";
          if (hint3d) {
            hint3d.textContent = engine3d.isFloorSitting
              ? "Sitting on the floor · G or any walking key to get up · tap a free desk to move there"
              : "WASD or arrows to walk · Shift for a quicker pace · drag to look · Q/E to turn · G to sit on the floor · tap a free desk to sit";
          }
        });
      }

      if (btnPace) {
        btnPace.addEventListener("click", () => {
          const isQuicker = engine3d.keys.has("ShiftLeft");
          if (isQuicker) {
            engine3d.keys.delete("ShiftLeft");
            btnPace.textContent = "Quicker";
            btnPace.classList.remove("on");
          } else {
            engine3d.keys.add("ShiftLeft");
            btnPace.textContent = "Usual pace";
            btnPace.classList.add("on");
          }
        });
      }

      if (btnFs) {
        btnFs.addEventListener("click", () => {
          const root = document.querySelector(".hall-root") || container;
          if (!document.fullscreenElement) {
            root.requestFullscreen?.().catch(() => {});
          } else {
            document.exitFullscreen?.().catch(() => {});
          }
        });
      }

      if (btnZoomIn) {
        btnZoomIn.addEventListener("click", () => {
          engine3d.setZoom(engine3d.zoomLevel - 0.15);
        });
      }
      if (btnZoomOut) {
        btnZoomOut.addEventListener("click", () => {
          engine3d.setZoom(engine3d.zoomLevel + 0.15);
        });
      }

      // HUD 3D Seated Controls
      document.getElementById("hud-break-btn")?.addEventListener("click", () => {
        if (phase === "focus") {
          startBreakRound(breakMin);
          document.getElementById("hud-break-btn").textContent = "Back to focus";
        } else {
          startFocusRound(focusMin);
          document.getElementById("hud-break-btn").textContent = "Break";
        }
      });

      document.getElementById("hud-notes-btn")?.addEventListener("click", openNotesModal);
      document.getElementById("hud-hours-btn")?.addEventListener("click", openHoursModal);
      document.getElementById("hud-timetable-btn")?.addEventListener("click", openTimetableModal);
      document.getElementById("hud-stand-btn")?.addEventListener("click", openStandModal);
      document.getElementById("hud-walk-btn")?.addEventListener("click", () => {
        openStandModal();
      });
    }

    function update3DEngineOccupants() {
      if (!engine3d) return;
      const list = [];
      occupants.forEach((occ, seat) => {
        list.push({ ...occ, seat });
      });
      if (mySeat) {
        list.push({
          id: profile.id,
          name: profile.name,
          avatar: profile.avatar,
          color: profile.color,
          seat: mySeat,
          topic: myTopic,
          phase: phase,
          weekMinutes: 0
        });
      }
      engine3d.setOccupants(list);
      engine3d.setMySeat(mySeat);

      const hud = document.getElementById("hud3d");
      if (hud) {
        hud.style.display = mySeat && currentView === "3d" ? "block" : "none";
      }
    }

    function updateHoverLabel(seat) {
      const lblHover = document.getElementById("lbl-hover");
      if (!lblHover || !engine3d) return;

      if (!seat) {
        lblHover.style.visibility = "hidden";
        return;
      }

      const occ = occupants.get(seat);
      const deskData = window.HALL_DESK_MAP?.get(seat);
      if (!deskData) return;

      const worldPos = {
        x: deskData.x,
        y: occ ? 2.75 : 1.5,
        z: occ ? deskData.chairZ : deskData.deskZ
      };

      const proj = engine3d.projectToScreen(worldPos);
      if (!proj.visible) {
        lblHover.style.visibility = "hidden";
        return;
      }

      lblHover.style.visibility = "visible";
      lblHover.style.transform = "translate(" + proj.x.toFixed(1) + "px, " + proj.y.toFixed(1) + "px) translate(-50%, -100%)";

      if (occ) {
        lblHover.innerHTML = '<div class="hover3d card-preview">' +
          '<div class="row" style="gap:8px">' +
            '<span class="ava-sm" style="background:' + (occ.color || '#e9d8a6') + '">' + occ.avatar + '</span>' +
            '<b>' + occ.name + '</b>' +
          '</div>' +
          '<div class="small">Studying: ' + (occ.topic || '…') + '</div>' +
          '<div class="small muted">Tap for desk card</div>' +
        '</div>';
      } else {
        lblHover.innerHTML = '<div class="hover3d">Desk ' + seat + ' · vacant · tap to sit</div>';
      }
    }

    function update3DLabels(engine) {
      const layer = document.getElementById("label-layer");
      if (!layer || !window.HALL_DESKS) return;

      window.HALL_DESKS.forEach(desk => {
        let tagEl = document.getElementById("lbl-tag-" + desk.seat);
        let occ = occupants.get(desk.seat);
        if (desk.seat === mySeat) {
          occ = { avatar: profile.avatar, name: 'You', topic: myTopic };
        }

        if (!occ) {
          if (tagEl) tagEl.style.visibility = "hidden";
          return;
        }

        if (!tagEl) {
          tagEl = document.createElement("div");
          tagEl.id = "lbl-tag-" + desk.seat;
          tagEl.className = "lbl";
          layer.appendChild(tagEl);
        }

        const worldPos = { x: desk.x, y: 2.05, z: desk.chairZ };
        const proj = engine.projectToScreen(worldPos);

        if (!proj.visible) {
          tagEl.style.visibility = "hidden";
          return;
        }

        tagEl.style.visibility = "visible";
        tagEl.style.transform = "translate(" + proj.x.toFixed(1) + "px, " + proj.y.toFixed(1) + "px) translate(-50%, -100%)";

        const isDim = engine.hoveredSeat && engine.hoveredSeat !== desk.seat;
        tagEl.innerHTML = '<div class="tag3d ' + (isDim ? 'dim' : '') + '">' +
          '<div class="tag3d-who">' + occ.avatar + ' ' + occ.name + '</div>' +
          '<div class="tag3d-topic">' + (occ.topic || '…') + '</div>' +
        '</div>';
      });

      // Update HUD 3D clock and topic
      if (mySeat) {
        const hudClock = document.getElementById("hud-clock");
        const hudTopic = document.getElementById("hud-topic");
        const hudStatus = document.getElementById("hud-status");
        if (hudClock && phaseEndsAt) {
          const rem = Math.max(0, phaseEndsAt - Date.now());
          const m = Math.floor(rem / 60000);
          const s = Math.floor((rem % 60000) / 1000);
          hudClock.textContent = m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
        }
        if (hudTopic) hudTopic.textContent = myTopic;
        if (hudStatus) {
          const phName = phase === "focus" ? "Deep focus" : "Short break";
          hudStatus.textContent = phName + ' · Desk ' + mySeat;
        }
      }
    }

    // Initialize UI
    bindEvents();
    renderFloor();
    updateFocusBar();
    applyView();
  }

  global.initConnectCafe = initHall;
  global.initHushHall = initHall;
})(window);
