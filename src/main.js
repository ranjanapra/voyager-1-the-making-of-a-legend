import './styles/main.css';

import { initStarfield } from './scripts/three/stars.js';
import { VerticalScrollController } from './scripts/ui/router.js';
import { initEntryScreen } from './scripts/ui/entry-screen.js';
import { initInvitationScreen } from './scripts/ui/invitation-screen.js';
import { initExploreScreen } from './scripts/ui/explore-screen.js';
import { initBuildScreen } from './scripts/ui/build-screen.js';
import { initAboutScreen } from './scripts/ui/about-screen.js';
import { initSilentArchiveScreen } from './scripts/ui/silent-archive-screen.js';
import { bgAudioEngine } from './scripts/audio/background-music.js';

let isBooted = false;

function bootApplication() {
  if (isBooted) return;
  isBooted = true;

  let starsEngine = null;

  // 1. Initialize Three.js Deep Space Starfield & 3D Voyager 1 Engine
  try {
    starsEngine = initStarfield('bg-canvas');
    window.__starsEngine = starsEngine;
  } catch (err) {
    console.error('[Engine] Starfield initialization error:', err);
  }

  // 2. Initialize Vertical Scroll & Navigation Controller
  const scrollController = new VerticalScrollController((sectionKey) => {
    if (starsEngine && typeof starsEngine.setPageAtmosphere === 'function') {
      starsEngine.setPageAtmosphere(sectionKey);
    }
  });
  window.__scrollController = scrollController;

  // 3. Mobile Navigation Drawer Toggle
  const navToggleBtn = document.getElementById('btn-nav-toggle');
  const navBar = document.getElementById('global-nav-bar');
  if (navToggleBtn && navBar) {
    navToggleBtn.addEventListener('click', () => {
      const isOpen = navBar.classList.toggle('open');
      navToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // 4. Initialize Individual Section Controllers
  try {
    initEntryScreen(scrollController);
  } catch (err) {
    console.error('[UI] Entry screen initialization error:', err);
  }

  try {
    initInvitationScreen(scrollController);
  } catch (err) {
    console.error('[UI] Invitation screen initialization error:', err);
  }

  try {
    initExploreScreen(scrollController);
  } catch (err) {
    console.error('[UI] Explore screen initialization error:', err);
  }

  try {
    initBuildScreen(scrollController);
  } catch (err) {
    console.error('[UI] Build screen initialization error:', err);
  }

  try {
    initAboutScreen();
  } catch (err) {
    console.error('[UI] About screen initialization error:', err);
  }

  try {
    initSilentArchiveScreen();
  } catch (err) {
    console.error('[UI] Silent Archive screen initialization error:', err);
  }

  // 5. Start Scroll Tracking & Hash Observer
  scrollController.init();

  // 6. Initialize Continuous Background Audio Engine
  try {
    bgAudioEngine.init();
    window.__bgAudioEngine = bgAudioEngine;
  } catch (err) {
    console.error('[Audio] Background music initialization error:', err);
  }
}

// Resilient Boot Guard: Execute immediately if DOM is already ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApplication);
} else {
  bootApplication();
}
