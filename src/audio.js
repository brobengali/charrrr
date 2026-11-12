// Hush Hall · Web Audio Soundscapes & Chimes (Pure JS, no external audio files)

let audioCtx = null;
let rainSource = null;
let rainGain = null;
let isRainPlaying = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle meditation focus chime
export function playFocusChime() {
  try {
    const ctx = getAudioContext();
    const chords = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad
    chords.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const start = ctx.currentTime + idx * 0.12;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.06, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 2.0);
    });
  } catch (err) {
    console.warn('Audio chime error:', err);
  }
}

// Procedural soothing library rain sound generator (pink noise filter)
export function toggleRainSound(enable, volume = 0.3) {
  try {
    const ctx = getAudioContext();

    if (!enable) {
      if (rainGain) {
        rainGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        setTimeout(() => {
          if (rainSource) {
            try { rainSource.stop(); } catch (e) {}
            rainSource = null;
          }
          isRainPlaying = false;
        }, 850);
      }
      return false;
    }

    if (isRainPlaying) return true;

    // Generate 5 seconds of looping filtered pink noise
    const bufferSize = ctx.sampleRate * 5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    rainSource = ctx.createBufferSource();
    rainSource.buffer = buffer;
    rainSource.loop = true;

    // Lowpass filter for cozy muffled rain on library glass
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);

    rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    rainGain.gain.exponentialRampToValueAtTime(volume * 0.6, ctx.currentTime + 1.2);

    rainSource.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(ctx.destination);

    rainSource.start(0);
    isRainPlaying = true;
    return true;
  } catch (err) {
    console.warn('Rain sound error:', err);
    return false;
  }
}
