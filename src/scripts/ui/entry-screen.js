import { HISTORICAL_CHRONOLOGY, SUBSYSTEM_DOSSIER } from '../story/mission-data.js';

/**
 * Audio Synthesizer for 1977 JPL Telemetry Audio
 * Uses pure Web Audio API without needing external sound files.
 */
class TelemetryAudio {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.carrierOsc = null;
    this.carrierGain = null;
  }

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      this.ctx = new AudioCtx();

      // WP-27: Master Dynamics Compressor / Peak Limiter (-12 dBFS normalized ceiling)
      try {
        this.compressor = this.ctx.createDynamicsCompressor();
        this.compressor.threshold.setValueAtTime(-14, this.ctx.currentTime); // dB
        this.compressor.knee.setValueAtTime(12, this.ctx.currentTime);
        this.compressor.ratio.setValueAtTime(12, this.ctx.currentTime);
        this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
        this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.75, this.ctx.currentTime);

        this.compressor.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);
      } catch (e) {
        console.warn('[Audio] Dynamics compressor init error', e);
      }

      // Graceful background audio suspension on window blur / tab hide
      document.addEventListener('visibilitychange', () => {
        if (!this.enabled || !this.ctx) return;
        if (document.hidden && this.ctx.state === 'running') {
          this.ctx.suspend();
        } else if (!document.hidden && this.ctx.state === 'suspended' && this.enabled) {
          this.ctx.resume();
        }
      });
    }
  }

  toggle() {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.enabled = !this.enabled;

    if (this.enabled) {
      this.startCarrierHum();
      this.playChirp(660, 0.12);
    } else {
      this.stopCarrierHum();
    }

    return this.enabled;
  }

  startCarrierHum() {
    if (!this.ctx || this.carrierOsc) return;
    try {
      this.carrierOsc = this.ctx.createOscillator();
      this.carrierGain = this.ctx.createGain();

      this.carrierOsc.type = 'sine';
      this.carrierOsc.frequency.setValueAtTime(60, this.ctx.currentTime); // 60Hz grounding hum

      this.carrierGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.carrierGain.gain.exponentialRampToValueAtTime(0.012, this.ctx.currentTime + 1.2);

      this.carrierOsc.connect(this.carrierGain);
      this.carrierGain.connect(this.compressor || this.ctx.destination);
      this.carrierOsc.start();
    } catch (e) {
      console.warn('[Audio] Carrier init failed', e);
    }
  }

  stopCarrierHum() {
    if (!this.carrierGain || !this.carrierOsc) return;
    try {
      this.carrierGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
      setTimeout(() => {
        if (this.carrierOsc) {
          this.carrierOsc.stop();
          this.carrierOsc.disconnect();
          this.carrierOsc = null;
          this.carrierGain = null;
        }
      }, 350);
    } catch (e) {
      this.carrierOsc = null;
      this.carrierGain = null;
    }
  }

  playChirp(freq = 880, duration = 0.08) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.compressor || this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration + 0.05);
    } catch (e) {
      // Audio not permitted yet
    }
  }
}

/**
 * Section 01 — Home Controller
 */
export function initEntryScreen(scrollController) {
  const audio = new TelemetryAudio();
  const audioToggleBtn = document.getElementById('btn-audio-toggle');
  const audioStatusText = document.getElementById('audio-status');

  const enterMissionBtn = document.getElementById('btn-enter-mission');
  const briefingBtn = document.getElementById('btn-briefing');
  const briefingModal = document.getElementById('briefing-modal');
  const closeModalBtn = document.getElementById('btn-close-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');

  const tabBtnChronology = document.getElementById('tab-btn-chronology');
  const tabBtnDossier = document.getElementById('tab-btn-dossier');
  const viewChronology = document.getElementById('view-chronology');
  const viewDossier = document.getElementById('view-dossier');

  // 1. Audio Toggle
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      const isEnabled = audio.toggle();
      audioToggleBtn.setAttribute('aria-pressed', isEnabled ? 'true' : 'false');
      audioToggleBtn.classList.toggle('active', isEnabled);
      if (audioStatusText) {
        audioStatusText.textContent = isEnabled ? 'AUDIO: 1977 CARRIER ON' : 'AUDIO: MUTED';
      }
    });
  }

  // 2. Clear Invitation to Continue Exploring (Smooth Scroll to Section 02)
  if (enterMissionBtn) {
    enterMissionBtn.addEventListener('click', () => {
      audio.playChirp(750, 0.1);
      if (scrollController && typeof scrollController.scrollToSection === 'function') {
        scrollController.scrollToSection('invitation');
      } else {
        document.getElementById('section-invitation')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 3. Historical Briefing Modal Controls
  const openModal = () => {
    if (!briefingModal) return;
    briefingModal.classList.add('active');
    briefingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    audio.playChirp(900, 0.08);
    closeModalBtn?.focus();
  };

  const closeModal = () => {
    if (!briefingModal) return;
    briefingModal.classList.remove('active');
    briefingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    briefingBtn?.focus();
  };

  if (briefingBtn) briefingBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && briefingModal?.classList.contains('active')) {
      closeModal();
    }
  });

  // Modal Tab Switching
  if (tabBtnChronology && tabBtnDossier && viewChronology && viewDossier) {
    tabBtnChronology.addEventListener('click', () => {
      tabBtnChronology.classList.add('active');
      tabBtnChronology.setAttribute('aria-selected', 'true');
      tabBtnDossier.classList.remove('active');
      tabBtnDossier.setAttribute('aria-selected', 'false');
      viewChronology.style.display = 'block';
      viewDossier.style.display = 'none';
      audio.playChirp(600, 0.05);
    });

    tabBtnDossier.addEventListener('click', () => {
      tabBtnDossier.classList.add('active');
      tabBtnDossier.setAttribute('aria-selected', 'true');
      tabBtnChronology.classList.remove('active');
      tabBtnChronology.setAttribute('aria-selected', 'false');
      viewDossier.style.display = 'block';
      viewChronology.style.display = 'none';
      audio.playChirp(720, 0.05);
    });
  }

  // Populate Chronology List inside Modal
  const chronologyList = document.getElementById('modal-chronology');
  if (chronologyList) {
    chronologyList.innerHTML = HISTORICAL_CHRONOLOGY.map(item => `
      <li class="chronology-item">
        <div class="chronology-year">${item.year}</div>
        <div class="chronology-body">
          <div class="chronology-event">${item.event || item.milestone || ''}</div>
          <div class="chronology-desc">${item.desc || item.summary || ''}</div>
        </div>
      </li>
    `).join('');
  }

  // Populate Subsystem Dossier List inside Modal
  const dossierList = document.getElementById('modal-dossier');
  if (dossierList) {
    dossierList.innerHTML = SUBSYSTEM_DOSSIER.map(item => `
      <li class="dossier-item">
        <div class="dossier-title-row">
          <span class="dossier-system-name">${item.system || item.title || ''}</span>
          <span class="dossier-system-tag">${item.tag || 'SUBSYSTEM'}</span>
        </div>
        <p class="dossier-desc">${item.description || item.summary || ''}</p>
        <div class="dossier-specs-badge">BASELINE: ${item.specs || 'FLIGHT BASELINE 1977'}</div>
      </li>
    `).join('');
  }
}
