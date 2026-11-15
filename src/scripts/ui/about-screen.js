import { ABOUT_DATA } from '../story/about-data.js';

/**
 * Section 04 — About Us & Credits Controller
 * 
 * Renders the project placeholders, vision deck,
 * team member profile placeholders, and verified archival credits/references.
 */

export function initAboutScreen() {
  const metaContainer = document.getElementById('about-meta-deck');
  const visionContainer = document.getElementById('about-vision-deck');
  const teamContainer = document.getElementById('about-team-grid');
  const creditsContainer = document.getElementById('about-credits-grid');

  // 0. Render Verified Pale Blue Dot Perspective Indicator (NASA PIA00452)
  // [AUTHENTIC NASA SCAN VERIFIED: /assets/images/story/pale-blue-dot-pia00452.png]
  const dotIndicator = document.querySelector('.pale-blue-dot-indicator');
  if (dotIndicator) {
    dotIndicator.innerHTML = `
      <div class="pbd-card-container" style="display: flex; gap: 1.5rem; align-items: center; text-align: left; width: 100%; flex-wrap: wrap;">
        <button 
          type="button" 
          id="btn-open-pbd-modal" 
          class="pbd-thumbnail-btn"
          aria-label="Click to enlarge authentic Pale Blue Dot archival photograph (NASA PIA00452)"
          style="position: relative; flex-shrink: 0; width: 220px; height: 160px; border-radius: 6px; overflow: hidden; border: 1.5px solid rgba(56, 189, 248, 0.6); box-shadow: 0 0 20px rgba(56, 189, 248, 0.25); background: #020409; cursor: pointer; padding: 0; display: block;"
        >
          <img 
            src="/assets/images/story/pale-blue-dot-pia00452.png" 
            alt="The Pale Blue Dot (NASA Catalog PIA00452)" 
            style="width: 100%; height: 100%; object-fit: contain; display: block; transition: transform 0.25s ease;" 
            class="pbd-thumb-img"
          />
          <div style="position: absolute; top: 0; left: 0; right: 0; background: rgba(3, 7, 18, 0.85); padding: 4px 8px; border-bottom: 1px solid rgba(56, 189, 248, 0.4); font-family: var(--font-mono); font-size: 0.65rem; color: #38bdf8; font-weight: 700; letter-spacing: 0.05em; text-align: center;">
            NASA VOYAGER 1 // PIA00452
          </div>
          <span style="position: absolute; bottom: 6px; right: 6px; font-family: var(--font-mono); font-size: 0.6rem; color: #38bdf8; background: rgba(0,0,0,0.85); padding: 2px 6px; border-radius: 2px; border: 1px solid rgba(56, 189, 248, 0.3);">
            &oplus; CLICK TO ENLARGE
          </span>
        </button>
        <div style="flex: 1; min-width: 280px;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
            <span class="dot-beacon" aria-hidden="true"></span>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #38bdf8; letter-spacing: 0.08em; font-weight: 700;">
              REMOTELY OBSERVING EARTH &bull; VOYAGER 1 DEPARTURE VECTOR (~24 BILLION KM)
            </span>
          </div>
          <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.6; margin: 0 0 0.5rem 0;">
            <em>&ldquo;Look again at that dot. That's here. That's home. That's us.&rdquo;</em> Captured February 14, 1990 from 6.0 billion km (40.5 AU) away, Earth occupies just 0.12 pixel in a beam of scattered sunlight as Voyager 1 turned its camera back toward the Sun for the iconic Solar System Family Portrait.
          </p>
          <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #94a3b8;">
            <span style="color: #38bdf8; font-weight: 700;">Status:</span> AUTHENTIC NASA ARCHIVE &bull; NASA/JPL-Caltech Catalog PIA00452 &bull; Narrow-Angle Camera
          </div>
        </div>
      </div>

      <!-- Centered Lightbox Modal for Full Viewport Pale Blue Dot -->
      <div 
        id="pbd-lightbox-modal" 
        class="pbd-lightbox" 
        role="dialog" 
        aria-modal="true" 
        aria-label="Enlarged Authentic NASA Pale Blue Dot Archive (PIA00452)" 
        hidden
      >
        <div class="pbd-lightbox-backdrop" id="pbd-lightbox-backdrop"></div>
        <div class="pbd-lightbox-content" role="document">
          <div class="pbd-lightbox-header font-mono">
            <div class="pbd-lightbox-title">
              <span class="spec-led" aria-hidden="true"></span>
              <span>VOYAGER 1 NARROW-ANGLE CAMERA // PALE BLUE DOT (NASA PIA00452)</span>
            </div>
            <button type="button" id="pbd-lightbox-close" class="pbd-lightbox-close-btn" aria-label="Close enlarged Pale Blue Dot view">
              CLOSE [ESC] &times;
            </button>
          </div>
          <div class="pbd-lightbox-body">
            <img 
              src="/assets/images/story/pale-blue-dot-pia00452.png" 
              alt="Authentic Voyager 1 Pale Blue Dot (NASA Catalog PIA00452)" 
              class="pbd-enlarged-img"
              id="pbd-enlarged-img"
              tabindex="0"
              title="Click image or press Escape to return"
            />
          </div>
          <div class="pbd-lightbox-footer font-mono">
            <span>FEBRUARY 14, 1990 &bull; DISTANCE: 6.0 BILLION KM (40.5 AU) &bull; SOLAR SYSTEM FAMILY PORTRAIT</span>
            <span class="pbd-footer-hint">CLICK IMAGE OR PRESS ESC TO RETURN</span>
          </div>
        </div>
      </div>
    `;

    // Setup Lightbox Event Handlers
    const btnOpen = document.getElementById('btn-open-pbd-modal');
    const lightboxModal = document.getElementById('pbd-lightbox-modal');
    const btnClose = document.getElementById('pbd-lightbox-close');
    const backdrop = document.getElementById('pbd-lightbox-backdrop');
    const enlargedImg = document.getElementById('pbd-enlarged-img');

    function openPbdLightbox() {
      if (!lightboxModal) return;
      lightboxModal.removeAttribute('hidden');
      lightboxModal.classList.add('active');
      document.body.classList.add('pbd-modal-open');
      if (btnClose) btnClose.focus();
    }

    function closePbdLightbox() {
      if (!lightboxModal) return;
      lightboxModal.setAttribute('hidden', '');
      lightboxModal.classList.remove('active');
      document.body.classList.remove('pbd-modal-open');
      if (btnOpen) btnOpen.focus();
    }

    if (btnOpen) {
      btnOpen.addEventListener('click', openPbdLightbox);
      btnOpen.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPbdLightbox();
        }
      });
    }

    if (btnClose) {
      btnClose.addEventListener('click', closePbdLightbox);
    }

    if (backdrop) {
      backdrop.addEventListener('click', closePbdLightbox);
    }

    if (enlargedImg) {
      enlargedImg.addEventListener('click', closePbdLightbox);
      enlargedImg.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
          e.preventDefault();
          closePbdLightbox();
        }
      });
    }

    // Escape Key Handler
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal && !lightboxModal.hasAttribute('hidden')) {
        closePbdLightbox();
      }
    });
  }

  // 1. Render Configurable Placeholders Deck
  if (metaContainer) {
    metaContainer.innerHTML = `
      <div class="meta-placeholder-card">
        <span class="placeholder-label">WEBSITE / PROJECT TITLE:</span>
        <span class="placeholder-value">${ABOUT_DATA.placeholders.websiteTitle}</span>
      </div>
      <div class="meta-placeholder-card">
        <span class="placeholder-label">TEAM / INSTITUTION PLACEHOLDER:</span>
        <span class="placeholder-value">${ABOUT_DATA.placeholders.teamName}</span>
      </div>
      <div class="meta-placeholder-card">
        <span class="placeholder-label">MAKER / DEVELOPER PLACEHOLDER:</span>
        <span class="placeholder-value">${ABOUT_DATA.placeholders.makerName}</span>
      </div>
    `;
  }

  // 2. Render Vision Deck & Mission Dignity Commitment
  if (visionContainer) {
    visionContainer.innerHTML = `
      <div class="vision-card">
        <h4 class="vision-card-title">WHY WE CHOSE VOYAGER 1</h4>
        <p class="vision-card-text">${ABOUT_DATA.vision.whyVoyager}</p>
      </div>
      <div class="vision-card">
        <h4 class="vision-card-title">WHAT WE WANT VISITORS TO EXPERIENCE</h4>
        <p class="vision-card-text">${ABOUT_DATA.vision.experienceGoal}</p>
      </div>
      <div class="vision-card" style="border-left: 3px solid #fbbf24; background: rgba(245, 158, 11, 0.08);">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <span class="spec-led" aria-hidden="true"></span>
          <h4 class="vision-card-title" style="margin: 0; color: #fbbf24;">MISSION DIGNITY &amp; OPERATIONAL REALITY</h4>
        </div>
        <p class="vision-card-text" style="color: #f8fafc; font-weight: 500;">
          ${ABOUT_DATA.vision.missionDignity}
        </p>
      </div>
    `;
  }

  // 3. Render Team Member Placeholders
  if (teamContainer) {
    teamContainer.innerHTML = ABOUT_DATA.teamMembers.map((member) => `
      <div class="team-card" data-member-id="${member.id}">
        <div class="team-card-header">
          <span class="team-callsign">[${member.callsign}]</span>
          <span class="spec-led" aria-hidden="true"></span>
        </div>
        <h4 class="team-member-name">${member.name}</h4>
        <div class="team-member-role">${member.role}</div>
        <p class="team-member-bio">${member.bio}</p>
        <ul class="team-resp-list">
          ${member.responsibilities.map(resp => `
            <li class="team-resp-item">${resp}</li>
          `).join('')}
        </ul>
      </div>
    `).join('');
  }

  // 4. Render Archival Credits & Documentation References
  if (creditsContainer) {
    creditsContainer.innerHTML = ABOUT_DATA.credits.map((item) => `
      <div class="credit-card">
        <div class="credit-org">${item.organization}</div>
        <p class="credit-desc">${item.description}</p>
      </div>
    `).join('');
  }
}
