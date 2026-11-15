import {
  CHALLENGE_ALIGNMENT_INFO,
  SILENT_INSTRUMENTS,
  OPERATING_INTERSTELLAR_INSTRUMENTS
} from '../story/silent-hardware-data.js';

/**
 * Controller for Section 04 — The Silent Hardware Archive
 * Historical & Scientific Flight Hardware Reconstruction
 * 
 * Preserved in Interstellar Space: The Dormant Instruments of Voyager 1
 */

export function renderSilentArchiveInto(container) {
  if (!container) return;

  let activeFilter = 'all'; // 'all' | 'silent' | 'active'

  function render() {
    const totalPowerSaved = SILENT_INSTRUMENTS.reduce((sum, inst) => sum + (inst.powerSavedWatts || 0), 0);
    
    let instrumentsToDisplay = [];
    if (activeFilter === 'all') {
      instrumentsToDisplay = [
        ...SILENT_INSTRUMENTS.map(i => ({ ...i, isActive: false })),
        ...OPERATING_INTERSTELLAR_INSTRUMENTS.map(i => ({ ...i, isActive: true }))
      ];
    } else if (activeFilter === 'silent') {
      instrumentsToDisplay = SILENT_INSTRUMENTS.map(i => ({ ...i, isActive: false }));
    } else if (activeFilter === 'active') {
      instrumentsToDisplay = OPERATING_INTERSTELLAR_INSTRUMENTS.map(i => ({ ...i, isActive: true }));
    }

    container.innerHTML = `
      <div class="section-container">
        <!-- Section Header -->
        <header class="about-header-deck" style="margin-bottom: 2rem;">
          <div class="about-badge" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.5);">
            <span class="spec-led" style="background: #f59e0b; box-shadow: 0 0 8px #f59e0b;" aria-hidden="true"></span>
            <span>NASA / JPL HISTORICAL ARCHIVE // INSTRUMENT STATUS</span>
          </div>
          <h2 class="about-main-title">THE SILENT HARDWARE ARCHIVE</h2>
          <div class="about-tagline" style="color: #fbbf24;">
            Dormant Instruments of Voyager 1 &bull; Preserved in Interstellar Space
          </div>

          <!-- Archival Framing & Thesis -->
          <div style="background: rgba(8, 12, 22, 0.95); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 6px; padding: 1.5rem; margin: 1.5rem 0; text-align: left;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
              <span class="phase-led" style="background: #38bdf8; box-shadow: 0 0 8px #38bdf8;"></span>
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #38bdf8; font-weight: 700; letter-spacing: 0.08em;">
                HISTORICAL FLIGHT HARDWARE RECONSTRUCTION &bull; NASA NSSDCA 1977-084A
              </span>
            </div>
            
            <p style="font-size: 0.95rem; color: #f8fafc; line-height: 1.6; margin-bottom: 1rem;">
              ${CHALLENGE_ALIGNMENT_INFO.coreThesis}
            </p>

            <div style="background: rgba(245, 158, 11, 0.12); border-left: 3px solid #f59e0b; padding: 0.85rem 1rem; margin-bottom: 1rem;">
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; font-weight: 700; margin-bottom: 0.25rem;">
                SCIENTIFIC MISSION DISTINCTION:
              </div>
              <div style="font-size: 0.875rem; color: #ffffff; line-height: 1.5;">
                &ldquo;${CHALLENGE_ALIGNMENT_INFO.distinction}&rdquo;
              </div>
            </div>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; font-family: var(--font-mono); font-size: 0.75rem;">
              <a href="${CHALLENGE_ALIGNMENT_INFO.catalogUrl}" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: none; display: inline-flex; align-items: center; gap: 0.3rem;">
                <span>NASA NSSDCA SPACECRAFT DOSSIER // 1977-084A</span> &UpperRightArrow;
              </a>
            </div>
          </div>
        </header>

        <!-- Power Triage Budget Strip -->
        <div class="mass-budget-strip" style="margin-bottom: 2rem;">
          <div class="mass-metric-card">
            <div class="mass-metric-label">LAUNCH ELECTRICAL OUTPUT</div>
            <div class="mass-metric-value" style="color: #f59e0b;">470 W</div>
            <div class="mass-metric-desc">3 MHW-RTGs powered by 24 plutonium-238 oxide spheres each (Sept 1977)</div>
          </div>
          <div class="mass-metric-card">
            <div class="mass-metric-label">TOTAL POWER SAVED BY RETIREMENT</div>
            <div class="mass-metric-value" style="color: #10b981;">~${totalPowerSaved.toFixed(0)} W</div>
            <div class="mass-metric-desc">Gained by selectively turning off cameras, spectrometers, and tape recorder</div>
          </div>
          <div class="mass-metric-card">
            <div class="mass-metric-label">CURRENT RTG POWER LEVEL</div>
            <div class="mass-metric-value" style="color: #38bdf8;">~220 W</div>
            <div class="mass-metric-desc">Declining by ~4 Watts per year due to radioactive half-life and thermocouple aging</div>
          </div>
          <div class="mass-metric-card">
            <div class="mass-metric-label">OPERATING INTERSTELLAR LIFETIME</div>
            <div class="mass-metric-value" style="color: #fbbf24;">49 YEARS</div>
            <div class="mass-metric-desc">Continuously operating deep-space exploration since September 5, 1977</div>
          </div>
        </div>

        <!-- Filter Controls -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button class="subnav-tab-btn btn-archive-filter ${activeFilter === 'all' ? 'active' : ''}" data-filter="all" type="button">
              ALL INSTRUMENTS (11)
            </button>
            <button class="subnav-tab-btn btn-archive-filter ${activeFilter === 'silent' ? 'active' : ''}" data-filter="silent" type="button">
              SILENT RETIRED SENSORS (7)
            </button>
            <button class="subnav-tab-btn btn-archive-filter ${activeFilter === 'active' ? 'active' : ''}" data-filter="active" type="button">
              ACTIVE INTERSTELLAR SENSORS (4)
            </button>
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #94a3b8;">
            Displaying ${instrumentsToDisplay.length} Flight Subsystems
          </span>
        </div>

        <!-- Instruments Grid -->
        <div class="assembly-stages-grid" style="margin-bottom: 3rem;">
          ${instrumentsToDisplay.map((inst) => `
            <article class="assembly-stage-card" style="border-color: ${inst.isActive ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.35)'};">
              <div>
                <div class="stage-card-header">
                  <span class="stage-number-badge" style="background: ${inst.isActive ? '#10b981' : '#f59e0b'}; color: #020409;">
                    ${inst.acronym}
                  </span>
                  <span class="stage-component-tag" style="background: ${inst.isActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)'}; color: ${inst.isActive ? '#6ee7b7' : '#fbbf24'};">
                    ${inst.isActive ? 'OPERATING IN INTERSTELLAR SPACE' : 'SILENT RETIRED SENSOR'}
                  </span>
                </div>

                <h3 class="stage-card-title" style="margin-top: 0.5rem;">
                  ${inst.name}
                </h3>

                <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #fbbf24; margin-bottom: 0.75rem;">
                  Principal Investigator: <strong>${inst.pi}</strong>
                </div>

                ${inst.isActive ? `
                  <p class="stage-card-desc">
                    ${inst.currentFunction}
                  </p>
                  <div class="stage-spec-box" style="border-left-color: #10b981;">
                    <div class="stage-spec-label" style="color: #6ee7b7;">ACTIVE MEASUREMENT STATUS:</div>
                    <div class="stage-spec-val">Transmitting continuous interstellar scientific telemetry at 160 bits/second to the NASA Deep Space Network.</div>
                  </div>
                ` : `
                  <p class="stage-card-desc">
                    <strong>Discoveries:</strong> ${inst.discoveries}
                  </p>
                  <div class="stage-spec-box" style="margin-bottom: 0.75rem; border-left-color: #f59e0b;">
                    <div class="stage-spec-label">REASON FOR DEACTIVATION:</div>
                    <div class="stage-spec-val">${inst.shutdownReason}</div>
                  </div>
                  <div class="stage-spec-box" style="border-left-color: #38bdf8;">
                    <div class="stage-spec-label" style="color: #38bdf8;">ENDURING LEGACY:</div>
                    <div class="stage-spec-val">${inst.legacyContribution}</div>
                  </div>
                `}

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.08); font-family: var(--font-mono); font-size: 0.725rem;">
                  <span style="color: ${inst.isActive ? '#10b981' : '#f59e0b'};">
                    ${inst.isActive ? '&check; ONLINE &bull; 24h Signal Latency' : `Deactivated: ${inst.deactivationDate} &bull; Saved ${inst.powerSavedWatts} W`}
                  </span>
                  <a href="${inst.nssdcaUrl}" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: none;">
                    NSSDCA ${inst.nssdcaId} &UpperRightArrow;
                  </a>
                </div>
              </div>
            </article>
          `).join('')}
        </div>

        <!-- Continuation Section: Future Hardware Triage & Interstellar Trajectory -->
        <section class="archive-continuation-panel" style="background: radial-gradient(circle at 10% 20%, rgba(30, 58, 138, 0.2) 0%, rgba(8, 12, 22, 0.95) 100%); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 6px; padding: 2rem; margin-bottom: 3.5rem;">
          <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.75rem;">
            <span class="phase-led" style="background: #38bdf8; box-shadow: 0 0 8px #38bdf8;"></span>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #38bdf8; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">
              CONTINUATION OF THE SILENT HARDWARE ARCHIVE // MISSION HORIZON &amp; END-OF-LIFE TRIAGE
            </span>
          </div>
          <h3 style="font-family: var(--font-heading); font-size: 1.35rem; color: #ffffff; margin: 0 0 1rem 0; font-weight: 700;">
            The Final Instrument Shutdowns and the Endless Silent Cruise (2025–Beyond)
          </h3>
          <p style="font-size: 0.9rem; color: #cbd5e1; line-height: 1.65; margin-bottom: 1.25rem;">
            As the electrical power supplied by Voyager 1's three Radioisotope Thermoelectric Generators (RTGs) continues to drop by approximately 4 Watts per year, NASA JPL mission controllers execute periodic power-triage commands. Between 2025 and 2030, the remaining four active interstellar instruments (PWS, CRS, LECP, and MAG) will be progressively turned off one by one to keep the central computer and radio transmitter alive.
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin-top: 1.5rem;">
            <div style="background: rgba(14, 18, 30, 0.85); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 4px; padding: 1.2rem;">
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #f59e0b; font-weight: 700; margin-bottom: 0.35rem;">
                FINAL INSTRUMENT TRIAGE (~2025–2030)
              </div>
              <p style="font-size: 0.825rem; color: #94a3b8; line-height: 1.55; margin: 0;">
                The Magnetometer (MAG) and Plasma Wave Subsystem (PWS) are projected to be the final operating sensors. Once total RTG output drops below ~190 Watts, science operations will terminate, transitioning all 11 scientific instruments into permanent archival silence.
              </p>
            </div>
            <div style="background: rgba(14, 18, 30, 0.85); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 4px; padding: 1.2rem;">
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #38bdf8; font-weight: 700; margin-bottom: 0.35rem;">
                ENGINEERING TELEMETRY LOSS (~2032–2036)
              </div>
              <p style="font-size: 0.825rem; color: #94a3b8; line-height: 1.55; margin: 0;">
                Even after science instruments are dormant, Voyager 1 may continue sending low-rate engineering housekeeping data to the NASA Deep Space Network until around 2036, when radio signal power will fall below receiver thresholds.
              </p>
            </div>
            <div style="background: rgba(14, 18, 30, 0.85); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 4px; padding: 1.2rem;">
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #10b981; font-weight: 700; margin-bottom: 0.35rem;">
                PERPETUAL INTERSTELLAR CRUISE (+40,000 YEARS)
              </div>
              <p style="font-size: 0.825rem; color: #94a3b8; line-height: 1.55; margin: 0;">
                Coasting at ~61,000 km/h (17 km/s) relative to the Sun, Voyager 1 will pass within 1.6 light-years of the red dwarf star Gliese 445 (AC+79 3888) in Ursa Minor in ~40,000 years, carrying the Golden Record intact for billions of years across the Milky Way.
              </p>
            </div>
          </div>
          <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; font-family: var(--font-mono); font-size: 0.75rem;">
            <span style="color: #94a3b8;">
              Source: NASA JPL Voyager Interstellar Mission &bull; NASA Facts FS-2012-08-011-JPL
            </span>
            <a href="https://voyager.jpl.nasa.gov/mission/interstellar-mission/" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: none;">
              JPL INTERSTELLAR MISSION STATUS &UpperRightArrow;
            </a>
          </div>
        </section>
      </div>
    `;

    // Filter Listeners
    container.querySelectorAll('.btn-archive-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.getAttribute('data-filter');
        render();
      });
    });
  }

  render();
}

export function initSilentArchiveScreen() {
  const exploreContainer = document.getElementById('explore-pane-silent-archive');
  if (exploreContainer && !exploreContainer.dataset.rendered) {
    renderSilentArchiveInto(exploreContainer);
    exploreContainer.dataset.rendered = 'true';
  }
}
