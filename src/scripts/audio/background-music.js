/**
 * Voyager 1 — Continuous Looping Background Audio System
 * 
 * Integrates "space commission.mp3" into a persistent, site-wide
 * background music engine.
 * 
 * Features:
 * - Single shared HTMLAudioElement singleton across all four pages.
 * - Seamless looping: automatically restarts at the end without stopping.
 * - Page navigation does NOT interrupt or restart playback.
 * - Respects modern browser autoplay restrictions via interaction unlock.
 * - Elegant, professional HUD ON/OFF toggle button with live animated waveform.
 * - Calibrated ambient background volume (0.35) preventing acoustic fatigue.
 */

import { getAssetUrl } from '../../config/assets.js';

class BackgroundMusicController {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.userInitiated = false;
    this.volume = 0.35;
    this.trackUrl = getAssetUrl('/assets/audio/space commission.mp3');
    this.fallbackUrl = getAssetUrl('/assets/audio/space-ambient.mp3..mp3');
    this.buttonEl = null;
    this.labelEl = null;
    this.unlocked = false;
  }

  init() {
    if (this.audio) return; // Prevent duplicate initialization

    // 1. Create singleton audio element
    this.audio = new Audio();
    this.audio.src = this.trackUrl;
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.volume = this.volume;

    // Fallback error handler if encoded path fails
    this.audio.addEventListener('error', (e) => {
      console.warn('[Background Audio] Primary track load failed, attempting fallback URL...', e);
      if (this.audio.src !== this.fallbackUrl) {
        this.audio.src = this.fallbackUrl;
        if (this.isPlaying) {
          this.audio.play().catch(err => console.warn('[Background Audio] Fallback play error:', err));
        }
      }
    });

    // Double assurance for continuous looping
    this.audio.addEventListener('ended', () => {
      this.audio.currentTime = 0;
      this.audio.play().catch(() => {});
    });

    // Track play / pause state accurately
    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.updateUI();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updateUI();
    });

    // 2. Setup HUD Button
    this.bindHUDButton();

    // 3. Browser Autoplay Handling: unlock audio on first user interaction if enabled
    const unlockHandler = () => {
      if (this.unlocked) return;
      this.unlocked = true;

      // Check if user previously disabled audio
      const savedPref = localStorage.getItem('voyager1_bg_audio_enabled');
      if (savedPref === 'false') {
        // User explicitly turned it off previously; respect preference
        return;
      }

      // Autoplay attempt following user interaction
      this.play();

      // Clean up global listeners
      window.removeEventListener('pointerdown', unlockHandler);
      window.removeEventListener('keydown', unlockHandler);
      window.removeEventListener('touchstart', unlockHandler);
    };

    window.addEventListener('pointerdown', unlockHandler, { once: true, passive: true });
    window.addEventListener('keydown', unlockHandler, { once: true, passive: true });
    window.addEventListener('touchstart', unlockHandler, { once: true, passive: true });
  }

  bindHUDButton() {
    const buttons = document.querySelectorAll('.btn-audio-toggle');
    buttons.forEach((btn) => {
      if (!btn.dataset.audioBound) {
        btn.dataset.audioBound = 'true';
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggle();
        });
      }
    });

    this.updateUI();
  }

  play() {
    if (!this.audio) return;
    this.audio.play()
      .then(() => {
        this.isPlaying = true;
        localStorage.setItem('voyager1_bg_audio_enabled', 'true');
        this.updateUI();
      })
      .catch((err) => {
        // Autoplay policy or user cancellation
        console.log('[Background Audio] Play waiting for user interaction:', err?.message || err);
        this.isPlaying = false;
        this.updateUI();
      });
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    localStorage.setItem('voyager1_bg_audio_enabled', 'false');
    this.updateUI();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  updateUI() {
    const buttons = document.querySelectorAll('.btn-audio-toggle');
    buttons.forEach((btn) => {
      if (this.isPlaying) {
        btn.classList.add('audio-active');
        btn.setAttribute('aria-pressed', 'true');
        btn.title = 'Continuous Background Music: ON (Click to Mute)';
      } else {
        btn.classList.remove('audio-active');
        btn.setAttribute('aria-pressed', 'false');
        btn.title = 'Continuous Background Music: OFF (Click to Play)';
      }
      const label = btn.querySelector('.audio-toggle-label') || btn.closest('.hud-audio-controls')?.querySelector('.audio-toggle-label');
      if (label) {
        label.textContent = this.isPlaying ? 'AUDIO: ON' : 'AUDIO: OFF';
      }
    });

    // Also update any standalone audio labels
    document.querySelectorAll('.audio-toggle-label').forEach((label) => {
      label.textContent = this.isPlaying ? 'AUDIO: ON' : 'AUDIO: OFF';
    });
  }
}

// Global Singleton Instance
export const bgAudioEngine = new BackgroundMusicController();
