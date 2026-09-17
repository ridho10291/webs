"use client";

/**
 * Generative ambient music engine (Web Audio).
 *
 * Synthesises a gentle Am–F–C–G pad with a sparse pentatonic bell melody,
 * a breathing low-pass filter and a soft feedback delay for space. No audio
 * assets required — keeps the site dependency-free and cheap.
 */

type Listener = (playing: boolean) => void;

const midiToFreq = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

// Warm, low register chords: Am – F – C – G.
const CHORDS: number[][] = [
  [45, 52, 57, 60], // A2 E3 A3 C4
  [41, 48, 53, 57], // F2 C3 F3 A3
  [48, 55, 60, 64], // C3 G3 C4 E4
  [43, 50, 55, 59], // G2 D3 G3 B3
];

// A minor pentatonic, upper register, for the bell melody.
const MELODY = [69, 72, 74, 76, 79, 81];

const CHORD_INTERVAL_MS = 6000;
const MELODY_INTERVAL_MS = 2300;

class AmbientEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private bus: BiquadFilterNode | null = null;
  private chordTimer: number | null = null;
  private melodyTimer: number | null = null;
  private chordIndex = 0;
  private playing = false;
  private starting = false;
  private listeners = new Set<Listener>();

  isPlaying() {
    return this.playing;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    listener(this.playing);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    for (const listener of this.listeners) listener(this.playing);
  }

  async start() {
    if (this.playing || this.starting || typeof window === "undefined") return;
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;

    this.starting = true;
    try {
      const ctx = this.ctx ?? new Ctor();
      this.ctx = ctx;
      if (ctx.state === "suspended") await ctx.resume();

      const now = ctx.currentTime;

      const master = ctx.createGain();
      master.gain.setValueAtTime(0, now);
      master.gain.linearRampToValueAtTime(0.07, now + 3);

      const bus = ctx.createBiquadFilter();
      bus.type = "lowpass";
      bus.frequency.setValueAtTime(1500, now);
      bus.Q.setValueAtTime(0.4, now);

      // Slow filter drift so the pad breathes.
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.05;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 350;
      lfo.connect(lfoGain);
      lfoGain.connect(bus.frequency);
      lfo.start(now);

      // Soft feedback delay for space.
      const delay = ctx.createDelay(2);
      delay.delayTime.value = 0.45;
      const feedback = ctx.createGain();
      feedback.gain.value = 0.3;
      const wet = ctx.createGain();
      wet.gain.value = 0.3;

      bus.connect(master);
      bus.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(wet);
      wet.connect(master);
      master.connect(ctx.destination);

      this.master = master;
      this.bus = bus;
      this.playing = true;
      this.emit();

      this.chordIndex = 0;
      this.playChord();
      this.chordTimer = window.setInterval(() => this.playChord(), CHORD_INTERVAL_MS);
      this.melodyTimer = window.setInterval(() => {
        if (Math.random() < 0.85) this.playBell();
      }, MELODY_INTERVAL_MS);
    } catch {
      // Audio unavailable / blocked — stay silent.
      this.playing = false;
    } finally {
      this.starting = false;
    }
  }

  private playChord() {
    const ctx = this.ctx;
    const bus = this.bus;
    if (!ctx || !bus || !this.playing) return;

    const freqs = CHORDS[this.chordIndex % CHORDS.length].map(midiToFreq);
    this.chordIndex += 1;
    const t = ctx.currentTime + 0.05;

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 0 ? "triangle" : "sine";
      osc.frequency.value = freq;
      osc.detune.value = i % 2 ? 5 : -5;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.035, t + 2.4);
      gain.gain.setValueAtTime(0.035, t + 4.2);
      gain.gain.linearRampToValueAtTime(0.0001, t + 6.6);

      osc.connect(gain);
      gain.connect(bus);
      osc.start(t);
      osc.stop(t + 6.8);
    });
  }

  private playBell() {
    const ctx = this.ctx;
    const bus = this.bus;
    if (!ctx || !bus || !this.playing) return;

    const t = ctx.currentTime + Math.random() * 0.75;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = midiToFreq(MELODY[Math.floor(Math.random() * MELODY.length)]);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.05, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);

    osc.connect(gain);
    gain.connect(bus);
    osc.start(t);
    osc.stop(t + 3.4);
  }

  stop() {
    if (!this.playing) return;
    this.playing = false;

    if (this.chordTimer != null) {
      clearInterval(this.chordTimer);
      this.chordTimer = null;
    }
    if (this.melodyTimer != null) {
      clearInterval(this.melodyTimer);
      this.melodyTimer = null;
    }

    const ctx = this.ctx;
    const master = this.master;
    if (ctx && master) {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setTargetAtTime(0, now, 0.4);
    }

    this.ctx = null;
    this.master = null;
    this.bus = null;
    window.setTimeout(() => {
      try {
        ctx?.close();
      } catch {
        // already closed
      }
    }, 1200);

    this.emit();
  }
}

let engine: AmbientEngine | null = null;

export function getAmbient(): AmbientEngine {
  if (!engine) engine = new AmbientEngine();
  return engine;
}