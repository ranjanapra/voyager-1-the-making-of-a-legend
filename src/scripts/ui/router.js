/**
 * Vertical Scroll & Section Navigation Controller
 * 
 * Manages:
 * 1. Natural, top-to-bottom vertical scrolling for the 4 core sections:
 *    - 'home'       : Section 01 â€” Home
 *    - 'invitation' : Section 02 â€” The Invitation
 *    - 'explore'    : Section 03 â€” Explore Voyager 1
 *    - 'about'      : Section 04 â€” About Us / Credits
 * 
 * 2. Independent Full-Page Views (Page 2: Build Experience, Page 3: Explore Voyager 1):
 *    - Completely separated from the 4-section main site layout.
 *    - Main website does NOT scroll in the background.
 *    - Top-left â† BACK control restores previous main-page scroll position.
 *    - Full browser Back/Forward and direct URL navigation support (#build, #explore-hub).
 */

/**
 * WP-24: Global ARIA Live Region Announcer for Assistive Technologies
 */
export function announceForScreenReader(message) {
  const el = document.getElementById('sr-announcements');
  if (el) {
    el.textContent = '';
    setTimeout(() => { el.textContent = message; }, 40);
  }
}

export class VerticalScrollController {
  constructor(onSectionChange) {
    this.sectionKeys = ['home', 'invitation', 'explore', 'about'];
    this.currentSection = 'home';
    this.onSectionChange = onSectionChange || (() => {});
    this.navButtons = [];
    this.observer = null;
    this.isManualScrolling = false;

    // Independent full-page state & scroll memory
    this.activeIndependentPage = null; // 'build' | 'explore-hub' | null
    this.lastMainScrollY = 0;

    // Focus trap tracking (WP-24)
    this.focusTrapHandler = null;
    this.activeFocusContainer = null;
  }

  init() {
    this.navButtons = Array.from(document.querySelectorAll('[data-target], [data-route]'));

    // Global click listener for navigation and page routing
    document.addEventListener('click', (e) => {
      // 1. Back button control on independent pages
      const backTrigger = e.target.closest('[data-action="back-to-main"], .btn-page-back');
      if (backTrigger) {
        e.preventDefault();
        this.returnToMainSite();
        return;
      }

      // 2. Open Independent Build Experience
      const buildTrigger = e.target.closest('[data-open-page="build"], #btn-choice-build');
      if (buildTrigger) {
        e.preventDefault();
        this.openIndependentPage('build');
        return;
      }

      // 3. Open Independent Explore Voyager 1 Experience
      const exploreTrigger = e.target.closest('[data-open-page="explore-hub"], #btn-start-explore');
      if (exploreTrigger) {
        e.preventDefault();
        this.openIndependentPage('explore-hub');
        return;
      }

      // 4. Main site section scroll triggers
      const sectionTrigger = e.target.closest('[data-target], [data-route]');
      if (!sectionTrigger) return;

      const rawTarget = sectionTrigger.getAttribute('data-target') || sectionTrigger.getAttribute('data-route');
      if (!rawTarget) return;

      const sectionKey = rawTarget.replace('section-', '');
      if (this.sectionKeys.includes(sectionKey)) {
        e.preventDefault();
        if (this.activeIndependentPage) {
          this.returnToMainSite(sectionKey);
        } else {
          this.scrollToSection(sectionKey);
        }
      }
    });

    // Setup IntersectionObserver for main site natural vertical scrolling
    this.setupIntersectionObserver();

    // Browser back/forward navigation
    window.addEventListener('popstate', () => {
      this.handleRouteFromHash();
    });

    // Check initial URL hash on load
    this.handleRouteFromHash(true);

    // WP-20: Initialize Centralized Keyboard Shortcuts
    this.setupKeyboardShortcuts();
  }

  /**
   * Handle route based on current URL hash (e.g. on load or popstate)
   */
  handleRouteFromHash(isInitialLoad = false) {
    const hash = window.location.hash.replace('#', '').toLowerCase();

    const buildSubroutes = [
      'build', 'dashboard', 'tasks', 'assembly', 'components',
      'decisions', 'labs', 'datalab', 'codelab', 'aimllab',
      'completion', 'mission-report', 'launch'
    ];

    if (buildSubroutes.includes(hash)) {
      this.openIndependentPage('build', false);
    } else if (hash === 'explore-hub' || hash === 'explore-page') {
      this.openIndependentPage('explore-hub', false);
    } else if (hash === 'silent-archive' || hash === 'the-silent-hardware-archive') {
      this.openIndependentPage('explore-hub', false);
      if (typeof window.__switchExploreTab === 'function') {
        window.__switchExploreTab('silent-archive');
      }
    } else {
      // Route is on the main website
      const sectionKey = this.sectionKeys.includes(hash.replace('section-', '')) 
        ? hash.replace('section-', '') 
        : 'home';

      if (this.activeIndependentPage) {
        this.returnToMainSite(sectionKey, false);
      } else if (isInitialLoad && sectionKey !== 'home') {
        setTimeout(() => {
          this.scrollToSection(sectionKey, false);
        }, 120);
      } else if (isInitialLoad) {
        this.updateActiveNav('home');
        this.onSectionChange('home');
      }
    }
  }

  /**
   * Open an Independent Full Page (#build or #explore-hub)
   */
  openIndependentPage(pageKey, updateHistory = true) {
    if (this.activeIndependentPage === pageKey) {
      return;
    }

    const mainSite = document.getElementById('view-main-site');
    const buildView = document.getElementById('view-page-build');
    const exploreView = document.getElementById('view-page-explore');

    // Save main site vertical scroll position before hiding
    if (!this.activeIndependentPage) {
      this.lastMainScrollY = window.scrollY || window.pageYOffset || 0;
    }

    // Hide main site completely so it cannot scroll in background
    if (mainSite) {
      mainSite.style.display = 'none';
      mainSite.setAttribute('aria-hidden', 'true');
    }

    // Toggle independent page views
    if (pageKey === 'build') {
      document.documentElement.classList.remove('route-explore');
      document.documentElement.classList.add('route-build');
      if (buildView) {
        buildView.style.display = 'block';
        buildView.setAttribute('aria-hidden', 'false');
        this.setupFocusTrap(buildView);
      }
      if (exploreView) {
        exploreView.style.display = 'none';
        exploreView.setAttribute('aria-hidden', 'true');
      }
      this.activeIndependentPage = 'build';
      if (updateHistory && window.location.hash !== '#build') {
        history.pushState({ page: 'build' }, '', '#build');
      }
      this.onSectionChange('invitation');
      announceForScreenReader('Switched to Build With Us Workspace: 1977 Spacecraft Assembly & Flight Qualification');
    } else if (pageKey === 'explore-hub') {
      document.documentElement.classList.remove('route-build');
      document.documentElement.classList.add('route-explore');
      if (exploreView) {
        exploreView.style.display = 'block';
        exploreView.setAttribute('aria-hidden', 'false');
        this.setupFocusTrap(exploreView);
      }
      if (buildView) {
        buildView.style.display = 'none';
        buildView.setAttribute('aria-hidden', 'true');
      }
      this.activeIndependentPage = 'explore-hub';
      if (updateHistory && window.location.hash !== '#explore-hub') {
        history.pushState({ page: 'explore-hub' }, '', '#explore-hub');
      }
      this.onSectionChange('explore');
      announceForScreenReader('Switched to Explore Voyager 1 Hub: Interactive Archives & Visualizers');
    }

    // Reset scroll to top of the independent page
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /**
   * Return from Independent Page to Main Website
   */
  returnToMainSite(targetSection = null, updateHistory = true) {
    this.removeFocusTrap();
    const mainSite = document.getElementById('view-main-site');
    const buildView = document.getElementById('view-page-build');
    const exploreView = document.getElementById('view-page-explore');

    const prevPage = this.activeIndependentPage;
    this.activeIndependentPage = null;
    document.documentElement.classList.remove('route-build', 'route-explore');

    // Hide all independent pages
    if (buildView) {
      buildView.style.display = 'none';
      buildView.setAttribute('aria-hidden', 'true');
    }
    if (exploreView) {
      exploreView.style.display = 'none';
      exploreView.setAttribute('aria-hidden', 'true');
    }

    // Reveal main website
    if (mainSite) {
      mainSite.style.display = 'block';
      mainSite.removeAttribute('aria-hidden');
    }

    // Announce return to screen reader
    announceForScreenReader('Returned to Main Mission Storyline');

    // Determine target section
    const fallbackSection = prevPage === 'build' ? 'invitation' : (prevPage === 'explore-hub' ? 'explore' : 'home');
    const destination = targetSection || fallbackSection;

    // If returning to previously scrolled position without a specific new target section
    if (!targetSection && this.lastMainScrollY > 0) {
      window.scrollTo({ top: this.lastMainScrollY, behavior: 'instant' });
      if (updateHistory) {
        history.replaceState(null, '', `#${destination}`);
      }
      this.currentSection = destination;
      this.updateActiveNav(destination);
      this.onSectionChange(destination);
    } else {
      // Scroll to target section
      setTimeout(() => {
        this.scrollToSection(destination, updateHistory);
      }, 50);
    }
  }

  scrollToSection(sectionKey, updateHash = true) {
    if (!this.sectionKeys.includes(sectionKey)) return;

    const targetEl = document.getElementById(`section-${sectionKey}`);
    if (!targetEl) return;

    this.isManualScrolling = true;
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (updateHash) {
      history.replaceState(null, '', `#${sectionKey}`);
    }

    this.updateActiveNav(sectionKey);
    this.currentSection = sectionKey;
    this.onSectionChange(sectionKey);

    setTimeout(() => {
      this.isManualScrolling = false;
    }, 800);
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: [0.1, 0.3, 0.6]
    };

    this.observer = new IntersectionObserver((entries) => {
      if (this.isManualScrolling || this.activeIndependentPage) return;

      let bestEntry = null;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry;
          }
        }
      });

      if (bestEntry) {
        const id = bestEntry.target.id;
        const sectionKey = id.replace('section-', '');
        if (this.sectionKeys.includes(sectionKey) && sectionKey !== this.currentSection) {
          this.currentSection = sectionKey;
          this.updateActiveNav(sectionKey);
          this.onSectionChange(sectionKey);
          history.replaceState(null, '', `#${sectionKey}`);
        }
      }
    }, options);

    this.sectionKeys.forEach((key) => {
      const el = document.getElementById(`section-${key}`);
      if (el) this.observer.observe(el);
    });
  }

  updateActiveNav(activeKey) {
    this.navButtons.forEach((btn) => {
      const target = (btn.getAttribute('data-target') || btn.getAttribute('data-route') || '').replace('section-', '');
      const isActive = target === activeKey;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  /**
   * WP-20: Setup Centralized Keyboard Shortcuts & Accessible Help Modal
   */
  setupKeyboardShortcuts() {
    // Mount shortcuts modal if not already present in DOM
    if (!document.getElementById('keyboard-shortcuts-modal')) {
      const modalEl = document.createElement('div');
      modalEl.id = 'keyboard-shortcuts-modal';
      modalEl.style.cssText = 'display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.78); backdrop-filter: blur(6px); z-index: 9999; align-items: center; justify-content: center;';
      modalEl.setAttribute('role', 'dialog');
      modalEl.setAttribute('aria-modal', 'true');
      modalEl.setAttribute('aria-label', 'Keyboard Shortcuts');
      modalEl.innerHTML = `
        <div class="shortcuts-modal-card" style="background: rgba(6, 10, 20, 0.96); border: 1px solid rgba(245, 158, 11, 0.45); border-radius: 6px; padding: 1.75rem; max-width: 520px; width: 92%; box-shadow: 0 16px 40px rgba(0,0,0,0.85);">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(245, 158, 11, 0.25); padding-bottom: 0.75rem; margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="phase-led" style="background: #fbbf24; box-shadow: 0 0 8px #fbbf24;"></span>
              <h4 style="font-family: var(--font-heading); font-size: 1.15rem; color: #ffffff; margin: 0;">KEYBOARD SHORTCUTS</h4>
            </div>
            <button id="btn-close-shortcuts-modal" type="button" aria-label="Close shortcuts modal" style="background: none; border: none; color: #94a3b8; font-size: 1.35rem; cursor: pointer; padding: 0 4px; line-height: 1;">&times;</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.45rem; font-family: var(--font-mono); font-size: 0.775rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.4rem 0.6rem; background: rgba(255,255,255,0.03); border-radius: 3px;">
              <span style="color: #cbd5e1;"><kbd style="background: rgba(245,158,11,0.2); border: 1px solid #fbbf24; padding: 1px 6px; border-radius: 2px; color: #fbbf24;">1</kbd> Home Section</span>
              <span style="color: #94a3b8;">Section 01 // Mission Inception</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.4rem 0.6rem; background: rgba(255,255,255,0.03); border-radius: 3px;">
              <span style="color: #cbd5e1;"><kbd style="background: rgba(245,158,11,0.2); border: 1px solid #fbbf24; padding: 1px 6px; border-radius: 2px; color: #fbbf24;">2</kbd> Invitation Section</span>
              <span style="color: #94a3b8;">Section 02 // Build With Us</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.4rem 0.6rem; background: rgba(255,255,255,0.03); border-radius: 3px;">
              <span style="color: #cbd5e1;"><kbd style="background: rgba(245,158,11,0.2); border: 1px solid #fbbf24; padding: 1px 6px; border-radius: 2px; color: #fbbf24;">3</kbd> Explore Section</span>
              <span style="color: #94a3b8;">Section 03 // Explore Overview</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.4rem 0.6rem; background: rgba(255,255,255,0.03); border-radius: 3px;">
              <span style="color: #cbd5e1;"><kbd style="background: rgba(245,158,11,0.2); border: 1px solid #fbbf24; padding: 1px 6px; border-radius: 2px; color: #fbbf24;">4</kbd> About Section</span>
              <span style="color: #94a3b8;">Section 04 // Credits &amp; Team</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.4rem 0.6rem; background: rgba(255,255,255,0.03); border-radius: 3px;">
              <span style="color: #cbd5e1;"><kbd style="background: rgba(245,158,11,0.2); border: 1px solid #fbbf24; padding: 1px 6px; border-radius: 2px; color: #fbbf24;">B</kbd> Build Experience</span>
              <span style="color: #38bdf8;">Hardware Build Workspace</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.4rem 0.6rem; background: rgba(255,255,255,0.03); border-radius: 3px;">
              <span style="color: #cbd5e1;"><kbd style="background: rgba(245,158,11,0.2); border: 1px solid #fbbf24; padding: 1px 6px; border-radius: 2px; color: #fbbf24;">E</kbd> Explore Experience</span>
              <span style="color: #38bdf8;">Dedicated Explore Hub</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.4rem 0.6rem; background: rgba(255,255,255,0.03); border-radius: 3px;">
              <span style="color: #cbd5e1;"><kbd style="background: rgba(245,158,11,0.2); border: 1px solid #fbbf24; padding: 1px 6px; border-radius: 2px; color: #fbbf24;">Esc</kbd> Close / Dismiss</span>
              <span style="color: #94a3b8;">Close Dialogs &amp; Overlays</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.4rem 0.6rem; background: rgba(255,255,255,0.03); border-radius: 3px;">
              <span style="color: #cbd5e1;"><kbd style="background: rgba(245,158,11,0.2); border: 1px solid #fbbf24; padding: 1px 6px; border-radius: 2px; color: #fbbf24;">?</kbd> Cheat Sheet</span>
              <span style="color: #fbbf24;">Toggle This Help Panel</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.4rem 0.6rem; background: rgba(255,255,255,0.03); border-radius: 3px;">
              <span style="color: #cbd5e1;"><kbd style="background: rgba(245,158,11,0.2); border: 1px solid #fbbf24; padding: 1px 6px; border-radius: 2px; color: #fbbf24;">C</kbd> Contrast Mode</span>
              <span style="color: #ffff00;">Toggle High Contrast Theme</span>
            </div>
          </div>
          <div style="margin-top: 1.25rem; text-align: center;">
            <button id="btn-close-shortcuts-bottom" type="button" style="padding: 0.45rem 1.25rem; font-family: var(--font-mono); font-size: 0.75rem; background: rgba(245,158,11,0.15); border: 1px solid #fbbf24; color: #fbbf24; border-radius: 3px; cursor: pointer;">
              CLOSE SHORTCUTS TERMINAL
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modalEl);

      modalEl.querySelector('#btn-close-shortcuts-modal')?.addEventListener('click', () => this.closeShortcutsModal());
      modalEl.querySelector('#btn-close-shortcuts-bottom')?.addEventListener('click', () => this.closeShortcutsModal());
      modalEl.addEventListener('click', (e) => {
        if (e.target === modalEl) this.closeShortcutsModal();
      });
    }

    // Connect header toggle button if present
    document.getElementById('btn-shortcuts-toggle')?.addEventListener('click', () => {
      this.toggleShortcutsModal();
    });

    // Connect high-contrast button if present (WP-23)
    document.getElementById('btn-toggle-contrast')?.addEventListener('click', () => {
      this.toggleHighContrast();
    });

    // Centralized Keydown Listener
    document.addEventListener('keydown', (e) => {
      // Guard against typing in form inputs, textareas, selects
      const tag = (e.target.tagName || '').toLowerCase();
      const isInput = tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable;
      if (isInput) return;

      if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        e.preventDefault();
        this.toggleShortcutsModal();
      } else if ((e.key === 'c' || e.key === 'C') && (e.ctrlKey || e.metaKey)) {
        // Ctrl+C / Cmd+C must remain available for normal text copying.
        // High contrast is handled by its visible button.
      } else if (e.key === 'Escape') {
        this.closeShortcutsModal();
        // Also close any open modals or overlays
        document.querySelectorAll('.modal.active, .modal-open, .gr-hotspot-overlay').forEach(m => {
          m.style.display = 'none';
          m.classList.remove('active', 'modal-open');
        });
      } else if (e.key === '1') {
        e.preventDefault();
        if (this.activeIndependentPage) this.returnToMainSite('home');
        else this.scrollToSection('home');
      } else if (e.key === '2') {
        e.preventDefault();
        if (this.activeIndependentPage) this.returnToMainSite('invitation');
        else this.scrollToSection('invitation');
      } else if (e.key === '3') {
        e.preventDefault();
        if (this.activeIndependentPage) this.returnToMainSite('explore');
        else this.scrollToSection('explore');
      } else if (e.key === '4') {
        e.preventDefault();
        if (this.activeIndependentPage) this.returnToMainSite('about');
        else this.scrollToSection('about');
      } else if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        this.openIndependentPage('build');
      } else if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        this.openIndependentPage('explore-hub');
      }
    });
  }

  toggleHighContrast() {
    const isNowHigh = document.body.classList.toggle('theme-high-contrast');
    const toggleBtn = document.getElementById('btn-toggle-contrast');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', isNowHigh ? 'true' : 'false');
      toggleBtn.classList.toggle('active', isNowHigh);
    }
    announceForScreenReader(isNowHigh ? 'High-contrast mode enabled' : 'Standard theme restored');
    return isNowHigh;
  }

  setupFocusTrap(container) {
    this.removeFocusTrap();
    if (!container) return;
    this.activeFocusContainer = container;
    this.focusTrapHandler = (e) => {
      if (e.key !== 'Tab') return;
      const focusables = Array.from(container.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter(el => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first || !container.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || !container.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', this.focusTrapHandler);
    setTimeout(() => {
      const first = container.querySelector('button, [href], input, [tabindex="0"]');
      first?.focus();
    }, 60);
  }

  removeFocusTrap() {
    if (this.focusTrapHandler) {
      document.removeEventListener('keydown', this.focusTrapHandler);
      this.focusTrapHandler = null;
      this.activeFocusContainer = null;
    }
  }

  toggleShortcutsModal() {
    const modal = document.getElementById('keyboard-shortcuts-modal');
    if (!modal) return;
    const isVisible = modal.style.display === 'flex';
    modal.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) {
      announceForScreenReader('Keyboard shortcuts panel opened');
      this.setupFocusTrap(modal);
    } else {
      this.removeFocusTrap();
    }
  }

  closeShortcutsModal() {
    const modal = document.getElementById('keyboard-shortcuts-modal');
    if (modal) {
      modal.style.display = 'none';
      this.removeFocusTrap();
      announceForScreenReader('Keyboard shortcuts panel closed');
    }
  }
}

