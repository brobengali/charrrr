// Connect Cafe · Focus Timer & Study Session State

const STORAGE_KEYS = {
  PROFILE: 'hh.profile',
  NOTES: 'hh.deskNotes',
  HOURS: 'hh.weeklyHours',
  TIMETABLE: 'hh.timetable'
};

export class StudySession {
  constructor(options = {}) {
    this.onTick = options.onTick || (() => {});
    this.onPhaseChange = options.onPhaseChange || (() => {});

    this.phase = 'idle'; // 'idle' | 'focus' | 'break'
    this.focusDuration = 25 * 60; // 25 mins in seconds
    this.breakDuration = 5 * 60;  // 5 mins in seconds
    this.remainingSeconds = this.focusDuration;
    this.timerInterval = null;
    this.mySeat = null;
    this.myTopic = '';

    this.profile = this.loadProfile();
  }

  loadProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (data) return JSON.parse(data);
    } catch (e) {}
    const defaultProfile = {
      name: 'Executive Member',
      avatar: '💼',
      suitColor: '#1e2838',
      tieColor: '#8a2420',
      shirtColor: '#ffffff',
      hairColor: '#1c1510'
    };
    this.saveProfile(defaultProfile);
    return defaultProfile;
  }

  saveProfile(p) {
    this.profile = { ...this.profile, ...p };
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(this.profile));
    } catch (e) {}
  }

  startFocus(topic = '') {
    if (topic) this.myTopic = topic;
    this.phase = 'focus';
    this.remainingSeconds = this.focusDuration;
    this.startInterval();
    this.onPhaseChange(this.phase, this.remainingSeconds);
  }

  startBreak() {
    this.phase = 'break';
    this.remainingSeconds = this.breakDuration;
    this.startInterval();
    this.onPhaseChange(this.phase, this.remainingSeconds);
  }

  pause() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  resume() {
    if (this.phase !== 'idle' && !this.timerInterval) {
      this.startInterval();
    }
  }

  reset() {
    this.pause();
    this.phase = 'idle';
    this.remainingSeconds = this.focusDuration;
    this.onTick(this.remainingSeconds);
    this.onPhaseChange(this.phase, this.remainingSeconds);
  }

  startInterval() {
    this.pause();
    this.timerInterval = setInterval(() => {
      this.remainingSeconds--;
      this.onTick(this.remainingSeconds);

      if (this.remainingSeconds <= 0) {
        if (this.phase === 'focus') {
          this.logCompletedFocusMinutes(Math.round(this.focusDuration / 60));
          this.startBreak();
        } else {
          this.reset();
        }
      }
    }, 1000);
  }

  getFormattedTime() {
    const mins = Math.floor(this.remainingSeconds / 60);
    const secs = this.remainingSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  logCompletedFocusMinutes(minutes) {
    try {
      const records = JSON.parse(localStorage.getItem(STORAGE_KEYS.HOURS) || '[]');
      records.unshift({
        date: new Date().toISOString(),
        minutes,
        topic: this.myTopic || 'General Study',
        seat: this.mySeat || 'Desk'
      });
      localStorage.setItem(STORAGE_KEYS.HOURS, JSON.stringify(records.slice(0, 100)));
    } catch (e) {}
  }

  getWeeklyFocusMinutes() {
    try {
      const records = JSON.parse(localStorage.getItem(STORAGE_KEYS.HOURS) || '[]');
      const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      return records
        .filter(r => new Date(r.date).getTime() > oneWeekAgo)
        .reduce((sum, r) => sum + (r.minutes || 0), 0);
    } catch (e) {
      return 0;
    }
  }

  loadNotes() {
    try {
      return localStorage.getItem(STORAGE_KEYS.NOTES) || '';
    } catch (e) {
      return '';
    }
  }

  saveNotes(text) {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES, text);
    } catch (e) {}
  }
}

