/**
 * VOYAGER 1 — THE GOLDEN RECORD INTERACTIVE EXPLORER
 * "THE GOLDEN RECORD — A MESSAGE FROM EARTH"
 * 
 * Features:
 * - 3 Switchable Archival Visual Views:
 *   1. Engraved Aluminum Cover (`voyager-record-cover-446eb9.jpg.jpeg`)
 *   2. Gold-Plated Copper Disc (`voyager-gold-record-front.jpg.jpeg`)
 *   3. 1977 JPL Cleanroom Mounting (`pia21740-golden-record-installation.jpg`)
 * - 7 Deep Archival Exploration Chapters:
 *   1. The Cover & Playback Instructions (Binary Clock, 16 2/3 RPM, Cartridge)
 *   2. Greetings to the Universe (55 Languages + Whale Greeting)
 *   3. Sounds of Earth (21 Audio Soundscapes)
 *   4. Music of Earth (27 Global Masterpieces)
 *   5. Images of Earth (115 Analog Photographs)
 *   6. Pulsar Map (14 Galactic Pulsar Vectors)
 *   7. Hydrogen Atom (Fundamental Physical Time & Distance Benchmark)
 * - Built-in Web Audio harmonic frequency synthesizer for authentic acoustic demonstration.
 */

export const GOLDEN_RECORD_VIEWS = [
  {
    id: 'cover',
    title: 'PROTECTIVE COVER (ENGRAVED)',
    image: '/assets/images/voyager-record-cover-446eb9.jpg.jpeg',
    badge: 'ALUMINUM COVER // ELECTROPLATED 24K GOLD',
    caption: 'Engraved aluminum protective cover with binary playback instructions, pulsar map, and hydrogen atom transition (NASA/JPL).'
  },
  {
    id: 'disc',
    title: 'GOLDEN PHONOGRAPH DISC',
    image: '/assets/images/voyager-gold-record-front.jpg.jpeg',
    badge: '12-INCH COPPER PHONOGRAPH DISC // GOLD-PLATED',
    caption: '12-inch gold-plated copper record containing sounds, greetings, music, and analog images from humanity (NASA/JPL).'
  },
  {
    id: 'install',
    title: '1977 JPL CLEANROOM INSTALLATION',
    image: '/assets/images/pia21740-golden-record-installation.jpg',
    badge: 'AUTHENTIC JPL ARCHIVAL PHOTOGRAPH (PIA21740)',
    caption: 'Technicians at the Jet Propulsion Laboratory mount the Golden Record cover to Voyager 1 in 1977 prior to launch.'
  }
];

export const GREETINGS_LANGUAGES = [
  { lang: 'English', text: 'Hello from the children of planet Earth.', family: 'Indo-European / Germanic', speaker: 'Nick Sagan (age 9)' },
  { lang: 'Mandarin Chinese', text: '各位都好吗？祝你们平安、健康与快乐。 (Best wishes to you all.)', family: 'Sino-Tibetan', speaker: 'Y.R. Chao' },
  { lang: 'Hindi', text: 'धरती के वासियों की ओर से नमस्कार (Greetings from the inhabitants of Earth)', family: 'Indo-European / Indo-Aryan', speaker: 'Amarendra K. Singh' },
  { lang: 'Spanish', text: 'Hola y saludos a todos. (Hello and greetings to everyone.)', family: 'Indo-European / Romance', speaker: 'Janet Sternberg' },
  { lang: 'French', text: 'Bonjour tout le monde. (Hello everyone.)', family: 'Indo-European / Romance', speaker: 'F. Camara' },
  { lang: 'Arabic', text: 'تحياتنا للأصدقاء في النجوم (Our greetings to friends in the stars)', family: 'Afroasiatic / Semitic', speaker: 'A. Al-Hamdani' },
  { lang: 'Bengali', text: 'নমস্কার, বিশ্বের শান্তি হোক (Greetings! Let there be peace in the universe)', family: 'Indo-European / Indo-Aryan', speaker: 'Subrata Mukherjee' },
  { lang: 'Russian', text: 'Здравствуйте! Приветствую вас! (Greetings! I welcome you!)', family: 'Indo-European / Slavic', speaker: 'Natasha Sagan' },
  { lang: 'Japanese', text: 'こんにちは。お元気ですか？ (Hello. How are you?)', family: 'Japonic', speaker: 'Mieko Kubota' },
  { lang: 'German', text: 'Herzliche Grüße an alle. (Warm greetings to everyone.)', family: 'Indo-European / Germanic', speaker: 'Renate Born' },
  { lang: 'Sumerian', text: 'Silim-ma! (May you be healthy!)', family: 'Language Isolate (Ancient)', speaker: 'Ferris J. Stephens' },
  { lang: 'Akkadian', text: 'Lu-ul-bi-ka! (May you prosper!)', family: 'Afroasiatic / Semitic (Ancient)', speaker: 'David I. Owen' },
  { lang: 'Latin', text: 'Salvete quicumque estis (Greetings to whoever you are)', family: 'Indo-European / Italic (Ancient)', speaker: 'R.M. Agard' },
  { lang: 'Ancient Greek', text: 'Χαίρετε, οἵτινες ποτ\' ἔστε (Rejoice, whoever you are)', family: 'Indo-European / Hellenic (Ancient)', speaker: 'Frederick M. Combellack' },
  { lang: 'Humpback Whale', text: '[Acoustic vocalization of humpback whale pod recorded by Roger Payne]', family: 'Cetacean bioacoustic communication', speaker: 'Megaptera novaeangliae' }
];

export const MUSIC_SELECTIONS = [
  { num: 1, title: 'Brandenburg Concerto No. 2 in F, First Movement', artist: 'Munich Bach Orchestra, Karl Richter', origin: 'Germany', duration: '4:40' },
  { num: 2, title: 'Kinds of Flowers (Puspawarna)', artist: 'Court gamelan of Paku Alaman, K.R.T. Wasitodipuro', origin: 'Java, Indonesia', duration: '4:43' },
  { num: 3, title: 'Senegalese Percussion', artist: 'Charles Duvelle recording', origin: 'Senegal', duration: '2:08' },
  { num: 4, title: 'Pygmy Girls\' Initiation Song', artist: 'Colin Turnbull recording', origin: 'Democratic Republic of Congo', duration: '0:56' },
  { num: 5, title: 'Aboriginal Morning Star & Barnumbirr Songs', artist: 'Sandra LeBrun Holmes recording', origin: 'Australia', duration: '1:26' },
  { num: 6, title: 'El Cascabel', artist: 'Lorenzo Barcelata & the Mariachi México', origin: 'Mexico', duration: '3:14' },
  { num: 7, title: 'Johnny B. Goode', artist: 'Chuck Berry', origin: 'United States', duration: '2:38' },
  { num: 8, title: 'Men\'s House Song', artist: 'Robert MacLennan recording', origin: 'Papua New Guinea', duration: '1:20' },
  { num: 9, title: 'Tsuru no Sugomori (Crane\'s Nest)', artist: 'Goro Yamaguchi (Shakuhachi flute)', origin: 'Japan', duration: '4:51' },
  { num: 10, title: 'Gavotte en rondeau from Partita No. 3 in E Major', artist: 'Arthur Grumiaux (Violin), J.S. Bach', origin: 'Belgium / Germany', duration: '2:55' },
  { num: 11, title: 'Queen of the Night Aria (The Magic Flute)', artist: 'Edda Moser (Soprano), W.A. Mozart', origin: 'Austria / Germany', duration: '2:55' },
  { num: 12, title: 'Tchakrulo (Choral Song)', artist: 'Georgian State Merited Ensemble', origin: 'Georgia (Caucasus)', duration: '2:21' },
  { num: 13, title: 'Panpipes and Drum', artist: 'Casa de la Cultura recording', origin: 'Peru', duration: '0:52' },
  { num: 14, title: 'Melancholy Blues', artist: 'Louis Armstrong and His Hot Seven', origin: 'United States', duration: '3:05' },
  { num: 15, title: 'Mugam (Bagpipe Solo)', artist: 'Kamil Jalilov (Balaban/Duduk)', origin: 'Azerbaijan', duration: '2:30' },
  { num: 16, title: 'Sacrificial Dance (The Rite of Spring)', artist: 'Columbia Symphony Orchestra, Igor Stravinsky', origin: 'Russia / France', duration: '4:35' },
  { num: 17, title: 'Prelude and Fugue in C, The Well-Tempered Clavier', artist: 'Glenn Gould (Piano), J.S. Bach', origin: 'Canada / Germany', duration: '4:48' },
  { num: 18, title: 'Fifth Symphony, First Movement', artist: 'Philharmonia Orchestra, Otto Klemperer, L.v. Beethoven', origin: 'Germany', duration: '7:20' },
  { num: 19, title: 'Izlel ye Delyo Haydutin', artist: 'Valya Balkanska (Bulgarian Folk)', origin: 'Bulgaria', duration: '4:59' },
  { num: 20, title: 'Navajo Night Chant', artist: 'Willard Rhodes recording', origin: 'Navajo Nation (Native American)', duration: '0:57' },
  { num: 21, title: 'The Fairie Round', artist: 'Early Music Consort of London, Anthony Holborne', origin: 'United Kingdom', duration: '1:17' },
  { num: 22, title: 'Solomon Islands Panpipe Suite', artist: 'Solomon Islands Broadcasting recording', origin: 'Solomon Islands', duration: '1:12' },
  { num: 23, title: 'Peruvian Wedding Song', artist: 'John Cohen recording', origin: 'Peru (Andean)', duration: '0:38' },
  { num: 24, title: 'Liu Shui (Flowing Streams)', artist: 'Guan Pinghu (Guqin 7-string zither)', origin: 'China', duration: '7:37' },
  { num: 25, title: 'Jaat Kahan Ho (Bhairavi Raga)', artist: 'Surshri Kesar Bai Kerkar', origin: 'India', duration: '3:30' },
  { num: 26, title: 'Dark Was the Night, Cold Was the Ground', artist: 'Blind Willie Johnson (Slide Guitar & Vocals)', origin: 'United States', duration: '3:15' },
  { num: 27, title: 'Cavatina from String Quartet No. 13 in B flat', artist: 'Budapest String Quartet, L.v. Beethoven', origin: 'Germany / Austria', duration: '6:37' }
];

export const SOUNDS_OF_EARTH = [
  'Music of the Spheres (Kepler harmonic frequencies)',
  'Volcanoes, Earthquake & Thunder',
  'Mud Pots & Geysers',
  'Wind, Rain & Coastal Surf',
  'Crickets, Frogs & Night Chorus',
  'Birds, Hyena & Elephant Trumpet',
  'Chimpanzee Call & Wild Dog',
  'Human Footsteps, Heartbeat & Laughter',
  'First Fire & Stone Flint Tools',
  'Tame Dog & Pastoral Herding',
  'Blacksmith\'s Anvil, Handsaw & Tractor',
  'Rivet Gun & Factory Automation',
  'Morse Code Telegraph ("Ad Astra Per Aspera")',
  'Ocean Liner Horn & Steam Locomotive',
  'Automobile, Jet Aircraft & Saturn V Moon Rocket Liftoff',
  'Human Kiss & Mother Whispering to Child',
  'EEG Brainwave Pattern of Ann Druyan thinking of love and science'
];

export const COVER_HOTSPOTS = [
  {
    id: 'hotspot-stylus',
    title: 'Phonograph Stylus & Cartridge',
    x: 27,
    y: 22,
    sub: 'Playback Orientation & Needle Position',
    desc: 'Shows the phonograph record and the aluminum needle and cartridge supplied with the spacecraft. The stylus is shown in position to play the record from the outside in.'
  },
  {
    id: 'hotspot-rpm',
    title: '16 2/3 RPM Playback Speed',
    x: 43,
    y: 16,
    sub: 'Binary Arithmetic Notation',
    desc: 'Written in binary arithmetic around the record perimeter (10011000110011011111111011010100000_2 = 5,113,380,864 hydrogen time units), indicating 3.59 seconds per revolution.'
  },
  {
    id: 'hotspot-raster',
    title: '512-Line Video Raster Scan',
    x: 74,
    y: 20,
    sub: 'Analog Video Signal Reconstruction',
    desc: 'Illustrates how video images are reconstructed by scanning 512 vertical lines per frame from the analog audio track.'
  },
  {
    id: 'hotspot-circle',
    title: 'Circle Calibration Picture',
    x: 78,
    y: 40,
    sub: 'Aspect Ratio Verification',
    desc: 'The first picture on the record is a circle. If extraterrestrial decoders construct the picture with the correct aspect ratio, it will appear circular.'
  },
  {
    id: 'hotspot-pulsar',
    title: '14-Pulsar Galactic Triangulation Map',
    x: 38,
    y: 62,
    sub: 'Solar Coordinates in the Milky Way',
    desc: 'Designed by Frank Drake, 14 lines radiate from our Sun to 14 pulsars. Binary digits give their rotation periods at launch in 1977.'
  },
  {
    id: 'hotspot-uranium',
    title: 'Uranium-238 Radiometric Clock',
    x: 48,
    y: 85,
    sub: 'Decay Ratio Epoch Dating',
    desc: 'An electroplated spot of pure Uranium-238 allows measuring remaining daughter products to determine elapsed cosmic time since launch.'
  },
  {
    id: 'hotspot-hydrogen',
    title: 'Hyperfine Hydrogen Transition',
    x: 82,
    y: 76,
    sub: 'Universal Metric of Distance & Time',
    desc: 'Two neutral hydrogen atoms undergoing spin flip, establishing fundamental distance (21.1 cm) and time (0.704 ns) units.'
  }
];

export function renderGoldenRecordExplorer(containerEl) {
  if (!containerEl) return;

  let activeViewId = 'cover';
  let activeChapterId = 'chapter-1';
  let activeHotspotId = null;
  let audioContext = null;
  let activeAudioTrack = null;
  let activeAudioState = 'idle'; // 'idle' | 'buffering' | 'playing' | 'paused' | 'error'
  let activeAudioTimeout = null;
  let activeOscillator = null;
  let activeGainNode = null;

  function stopCurrentAudio() {
    if (activeAudioTimeout) {
      clearTimeout(activeAudioTimeout);
      activeAudioTimeout = null;
    }
    if (activeOscillator) {
      try {
        activeOscillator.stop();
        activeOscillator.disconnect();
      } catch (e) {
        // already stopped
      }
      activeOscillator = null;
    }
    activeGainNode = null;
    activeAudioState = 'idle';
  }

  function playTone(freq = 440, duration = 0.8, type = 'sine') {
    stopCurrentAudio();
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);

      gain.gain.setValueAtTime(0.01, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2, audioContext.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.warn('[Audio] Web Audio playTone unavailable:', e);
    }
  }

  function playTrackBuffered(title, freq = 320, duration = 4.0) {
    stopCurrentAudio();
    activeAudioTrack = title;
    activeAudioState = 'buffering';
    renderAudioPlayerBar();

    // Buffer state demonstration: 400ms buffer delay then start synthesized playback
    activeAudioTimeout = setTimeout(() => {
      try {
        if (!audioContext) {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);

        gain.gain.setValueAtTime(0.01, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.15, audioContext.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start();
        activeOscillator = osc;
        activeGainNode = gain;
        activeAudioState = 'playing';
        renderAudioPlayerBar();

        activeAudioTimeout = setTimeout(() => {
          stopCurrentAudio();
          renderAudioPlayerBar();
        }, duration * 1000);
      } catch (e) {
        console.warn('[Audio] Synthesis fallback failed:', e);
        activeAudioState = 'error';
        renderAudioPlayerBar();
      }
    }, 450);
  }

  function renderAudioPlayerBar() {
    const barEl = containerEl.querySelector('#gr-audio-player-mount');
    if (!barEl) return;

    if (activeAudioState === 'idle' && !activeAudioTrack) {
      barEl.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0.75rem; background: rgba(8, 12, 22, 0.75); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 4px; font-family: var(--font-mono); font-size: 0.7rem; color: #94a3b8;">
          <span style="display: inline-flex; align-items: center; gap: 0.4rem;">
            <span class="view-tab-dot" style="background: #94a3b8;"></span>
            <span>GOLDEN RECORD AUDIO SYNTHESIZER // READY</span>
          </span>
          <span>SELECT ANY TRACK TO PLAY</span>
        </div>
      `;
      return;
    }

    const isPlaying = (activeAudioState === 'playing');
    const isBuffering = (activeAudioState === 'buffering');

    barEl.innerHTML = `
      <div style="padding: 0.65rem 0.85rem; background: rgba(8, 14, 28, 0.95); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 4px; font-family: var(--font-mono); margin-bottom: 0.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; flex-wrap: wrap; gap: 0.4rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="phase-led" style="background: ${isPlaying ? '#10b981' : isBuffering ? '#fbbf24' : '#ef4444'}; box-shadow: 0 0 6px ${isPlaying ? '#10b981' : isBuffering ? '#fbbf24' : '#ef4444'};"></span>
            <span style="font-size: 0.75rem; color: #fbbf24; font-weight: 700;">
              ${isBuffering ? '[BUFFERING AUDIO Grooves...]' : isPlaying ? '[PLAYING HARMONIC RECONSTRUCTION]' : '[AUDIO STOPPED]'}
            </span>
          </div>
          <span style="font-size: 0.7rem; color: #cbd5e1; max-width: 320px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            ${activeAudioTrack || 'Voyager 1 Phonograph Signal'}
          </span>
          <button id="btn-stop-gr-audio" type="button" style="padding: 0.25rem 0.5rem; font-family: var(--font-mono); font-size: 0.675rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #fca5a5; border-radius: 2px; cursor: pointer;">
            STOP &#x25A0;
          </button>
        </div>
        <!-- Progress / Waveform Bar -->
        <div style="height: 4px; background: rgba(255, 255, 255, 0.1); border-radius: 2px; overflow: hidden;">
          <div style="height: 100%; background: ${isPlaying ? '#10b981' : '#fbbf24'}; width: ${isPlaying ? '100%' : '40%'}; transition: width ${isPlaying ? '4s' : '0.4s'} linear;"></div>
        </div>
      </div>
    `;

    barEl.querySelector('#btn-stop-gr-audio')?.addEventListener('click', () => {
      stopCurrentAudio();
      activeAudioTrack = null;
      renderAudioPlayerBar();
    });
  }

  function renderView() {
    const currentView = GOLDEN_RECORD_VIEWS.find(v => v.id === activeViewId) || GOLDEN_RECORD_VIEWS[0];
    const activeHotspot = COVER_HOTSPOTS.find(h => h.id === activeHotspotId) || null;

    containerEl.innerHTML = `
      <div class="golden-record-explorer-wrapper">
        <!-- Main Explorer Header -->
        <header class="gr-intro-header">
          <div class="gr-badge-row">
            <span class="phase-led" aria-hidden="true" style="background: #fbbf24; box-shadow: 0 0 8px #fbbf24;"></span>
            <span class="gr-badge-text">VOYAGER INTERSTELLAR MESSAGE // NASA JPL 1977 CULTURAL ARCHIVE</span>
          </div>
          <h3 class="gr-headline">THE GOLDEN RECORD — A MESSAGE FROM EARTH</h3>
          <p class="gr-subheadline">
            &ldquo;This is a present from a small, distant world, a token of our sounds, our science, our images, our music, our thoughts and our feelings.&rdquo;
            <span style="display: block; font-size: 0.8rem; color: #fbbf24; margin-top: 0.25rem;">— President Jimmy Carter, Official Message placed aboard Voyager 1 (1977)</span>
          </p>
        </header>

        <!-- View Mode Switcher Strip -->
        <div class="gr-view-switcher" role="tablist" aria-label="Golden Record Views">
          ${GOLDEN_RECORD_VIEWS.map(v => `
            <button 
              type="button" 
              class="btn-gr-view ${v.id === activeViewId ? 'active' : ''}" 
              data-view-id="${v.id}"
              role="tab"
              aria-selected="${v.id === activeViewId}"
            >
              <span class="view-tab-dot"></span>
              <span>${v.title}</span>
            </button>
          `).join('')}
        </div>

        <!-- Master Two-Column Explorer Layout -->
        <div class="gr-stage-grid">
          
          <!-- Left Column: Visual Asset Display Frame -->
          <div class="gr-visual-column">
            <div class="gr-visual-frame">
              <img 
                src="${currentView.image}" 
                alt="${currentView.title}" 
                class="gr-active-image" 
              />
              <div class="gr-image-overlay-badge font-mono">
                ${currentView.badge}
              </div>

              <!-- Hotspots Layer (UI-03 & Phase 4: clear, vibrant blue dots with subtle cyan-blue glow) -->
              ${activeViewId === 'cover' ? `
                <div class="gr-hotspots-layer" style="position: absolute; inset: 0; pointer-events: none;">
                  ${COVER_HOTSPOTS.map((h, idx) => `
                    <button 
                      type="button" 
                      class="gr-hotspot-pin ${activeHotspotId === h.id ? 'active' : ''}" 
                      data-hotspot-id="${h.id}"
                      style="position: absolute; left: ${h.x}%; top: ${h.y}%; pointer-events: auto; width: 14px; height: 14px; margin-left: -7px; margin-top: -7px; border-radius: 50%; background: ${activeHotspotId === h.id ? '#0284c7' : '#38bdf8'}; border: 1.5px solid #ffffff; box-shadow: 0 0 8px rgba(56, 189, 248, 0.9), 0 0 16px rgba(14, 165, 233, 0.5); cursor: pointer; padding: 0; z-index: 5; transition: transform 0.2s ease, background 0.2s ease;"
                      title="Item ${idx + 1}: ${h.title}"
                      aria-label="Inspect Item ${idx + 1}: ${h.title}"
                    >
                      <span class="gr-hotspot-pulse" style="position: absolute; inset: -4px; border-radius: 50%; border: 1px solid #38bdf8; opacity: 0.75;"></span>
                    </button>
                  `).join('')}
                </div>
              ` : ''}

              <!-- Active Hotspot Modal Overlay -->
              ${activeHotspot && activeViewId === 'cover' ? `
                <div class="gr-hotspot-overlay" style="position: absolute; bottom: 10px; left: 10px; right: 10px; background: rgba(4, 7, 16, 0.96); border: 1px solid #38bdf8; border-radius: 4px; padding: 0.75rem 1rem; z-index: 10; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.9), 0 0 15px rgba(56, 189, 248, 0.25); backdrop-filter: blur(8px);">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
                    <div>
                      <div style="font-family: var(--font-heading); font-size: 0.95rem; color: #38bdf8; font-weight: 700;">
                        ${activeHotspot.title}
                      </div>
                      <div style="font-family: var(--font-mono); font-size: 0.675rem; color: #94a3b8;">
                        ${activeHotspot.sub}
                      </div>
                    </div>
                    <button id="btn-close-hotspot" type="button" style="background: none; border: none; color: #cbd5e1; font-size: 1.1rem; cursor: pointer; padding: 0 4px; line-height: 1;">&times;</button>
                  </div>
                  <div style="font-size: 0.775rem; color: #f8fafc; line-height: 1.5;">
                    ${activeHotspot.desc}
                  </div>
                </div>
              ` : ''}

              <div class="crt-corner crt-corner-tl"></div>
              <div class="crt-corner crt-corner-tr"></div>
              <div class="crt-corner crt-corner-bl"></div>
              <div class="crt-corner crt-corner-br"></div>
            </div>
            <div class="gr-image-caption font-mono">
              ${currentView.caption}
            </div>
          </div>

          <!-- Right Column: Interactive Chapters & Scientific Breakdown -->
          <div class="gr-chapters-column">
            <!-- Chapter Selector Tab Strip -->
            <div class="gr-chapter-tabs font-mono" role="tablist">
              <button class="btn-gr-tab ${activeChapterId === 'chapter-1' ? 'active' : ''}" data-chapter-id="chapter-1">1. COVER DIAGRAM</button>
              <button class="btn-gr-tab ${activeChapterId === 'chapter-2' ? 'active' : ''}" data-chapter-id="chapter-2">2. GREETINGS (55)</button>
              <button class="btn-gr-tab ${activeChapterId === 'chapter-3' ? 'active' : ''}" data-chapter-id="chapter-3">3. SOUNDS</button>
              <button class="btn-gr-tab ${activeChapterId === 'chapter-4' ? 'active' : ''}" data-chapter-id="chapter-4">4. MUSIC (27)</button>
              <button class="btn-gr-tab ${activeChapterId === 'chapter-5' ? 'active' : ''}" data-chapter-id="chapter-5">5. IMAGES (115)</button>
              <button class="btn-gr-tab ${activeChapterId === 'chapter-6' ? 'active' : ''}" data-chapter-id="chapter-6">6. PULSAR MAP</button>
              <button class="btn-gr-tab ${activeChapterId === 'chapter-7' ? 'active' : ''}" data-chapter-id="chapter-7">7. HYDROGEN ATOM</button>
            </div>

            <!-- Audio Player Bar Mount (WP-16 Buffer Handling) -->
            <div id="gr-audio-player-mount"></div>

            <!-- Chapter Content Terminal -->
            <div class="gr-chapter-content-box">
              ${renderChapterContent(activeChapterId)}
            </div>
          </div>

        </div>
      </div>
    `;

    renderAudioPlayerBar();

    // Hotspot click handlers
    containerEl.querySelectorAll('.gr-hotspot-pin').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const hid = btn.getAttribute('data-hotspot-id');
        activeHotspotId = (activeHotspotId === hid ? null : hid);
        renderView();
      });
    });

    containerEl.querySelector('#btn-close-hotspot')?.addEventListener('click', () => {
      activeHotspotId = null;
      renderView();
    });

    // Attach View Switcher Handlers
    containerEl.querySelectorAll('[data-view-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const vid = btn.getAttribute('data-view-id');
        if (vid && vid !== activeViewId) {
          activeViewId = vid;
          activeHotspotId = null;
          renderView();
        }
      });
    });

    // Attach Chapter Switcher Handlers
    containerEl.querySelectorAll('[data-chapter-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cid = btn.getAttribute('data-chapter-id');
        if (cid && cid !== activeChapterId) {
          activeChapterId = cid;
          renderView();
        }
      });
    });

    // Audio Play Track Handlers (Music, Greetings, Sounds)
    containerEl.querySelectorAll('.btn-play-tone').forEach(btn => {
      btn.addEventListener('click', () => {
        const f = Number(btn.getAttribute('data-freq') || 440);
        const trackTitle = btn.getAttribute('data-track') || 'Harmonic Reference Tone';
        playTrackBuffered(trackTitle, f, 3.5);
      });
    });
  }

  function renderChapterContent(chapterId) {
    switch (chapterId) {
      case 'chapter-1':
        return `
          <div class="chapter-deck">
            <div class="chapter-meta-tag font-mono">CHAPTER 01 // HOW TO PLAY THE RECORD</div>
            <h4 class="chapter-title">The Engraved Cover & Binary Playback Instructions</h4>
            <p class="chapter-desc">
              Mounted in the upper left of the cover is a drawing of the phonograph record and the needle and stylus cartridge packed with it. The stylus is in the correct position to play the record from the outside in.
            </p>
            <div class="chapter-specs-grid">
              <div class="spec-card">
                <div class="spec-card-label font-mono">ROTATION SPEED</div>
                <div class="spec-card-value">16 2/3 RPM</div>
                <div class="spec-card-desc">Written around the disc in binary arithmetic ($10011000110011011111111011010100000_2$ or 5,113,380,864 in base 10), expressing the time for one rotation as $3.59$ seconds in fundamental hydrogen time units.</div>
              </div>
              <div class="spec-card">
                <div class="spec-card-label font-mono">RECORD PLAY TIME</div>
                <div class="spec-card-value">~90 MINUTES</div>
                <div class="spec-card-desc">Total capacity of the copper phonograph record, cut with a micro-groove pitch of ~400 grooves per inch.</div>
              </div>
              <div class="spec-card">
                <div class="spec-card-label font-mono">VIDEO DECODER</div>
                <div class="spec-card-value">512 VERTICAL LINES</div>
                <div class="spec-card-desc">Diagram shows how raster video images are formed line-by-line from the analog audio grooves, yielding a circle as the first calibration picture.</div>
              </div>
              <div class="spec-card">
                <div class="spec-card-label font-mono">RADIOACTIVE DATING</div>
                <div class="spec-card-value">URANIUM-238 SPOT</div>
                <div class="spec-card-desc">An electroplated spot of ultra-pure ²³⁸U ($t_{1/2} = 4.468 \times 10^9\text{ yrs}$) allows finders to calculate how many billions of years have elapsed since launch by measuring remaining daughter isotopes.</div>
              </div>
            </div>
          </div>
        `;

      case 'chapter-2':
        return `
          <div class="chapter-deck">
            <div class="chapter-meta-tag font-mono">CHAPTER 02 // VOICES OF THE HUMAN FAMILY</div>
            <h4 class="chapter-title">Spoken Greetings in 55 Human Languages + Humpback Whale</h4>
            <p class="chapter-desc">
              Short spoken greetings were recorded at the United Nations in New York and Cornell University in 55 human languages spanning 6,000 years of civilization, accompanied by bioacoustic songs of humpback whales.
            </p>
            <div class="greetings-directory-list">
              ${GREETINGS_LANGUAGES.map((g, idx) => `
                <div class="greeting-row">
                  <div class="greeting-header">
                    <span class="greeting-num font-mono">#${idx + 1}</span>
                    <span class="greeting-lang">${g.lang}</span>
                    <span class="greeting-family font-mono">${g.family}</span>
                    <button type="button" class="btn-play-tone font-mono" data-freq="${300 + idx * 25}" data-track="${g.lang} Greeting (${g.speaker})" title="Synthesize phonetic resonance tone">
                      <span>&#x25B6; PLAY</span>
                    </button>
                  </div>
                  <div class="greeting-text">&ldquo;${g.text}&rdquo;</div>
                  <div class="greeting-speaker font-mono">Speaker: ${g.speaker}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      case 'chapter-3':
        return `
          <div class="chapter-deck">
            <div class="chapter-meta-tag font-mono">CHAPTER 03 // ACOUSTIC ENVIRONMENT OF EARTH</div>
            <h4 class="chapter-title">Sounds of Earth (21 Audio Soundscapes)</h4>
            <p class="chapter-desc">
              Curated by Ann Druyan and Carl Sagan, this 12-minute audio essay captures the evolutionary history of Earth: from primordial geology and wind to animal life, human culture, and the roar of rocket propulsion.
            </p>
            <div class="sounds-grid">
              ${SOUNDS_OF_EARTH.map((s, idx) => `
                <div class="sound-chip font-mono" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <span class="sound-idx">${idx + 1 < 10 ? '0' + (idx + 1) : idx + 1}.</span>
                    <span class="sound-name">${s}</span>
                  </div>
                  <button type="button" class="btn-play-tone font-mono" data-freq="${180 + idx * 35}" data-track="Sound of Earth: ${s}" style="background: none; border: 1px solid rgba(245, 158, 11, 0.3); color: #fbbf24; border-radius: 2px; font-size: 0.65rem; padding: 2px 6px; cursor: pointer;">
                    &#x25B6;
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      case 'chapter-4':
        return `
          <div class="chapter-deck">
            <div class="chapter-meta-tag font-mono">CHAPTER 04 // 90 MINUTES OF WORLDWIDE MUSIC</div>
            <h4 class="chapter-title">Music of Earth (27 Masterpieces Across Continents)</h4>
            <p class="chapter-desc">
              A diverse anthology of human musical expression across continents and centuries—from Bach and Beethoven to Chuck Berry's rock & roll, Indian ragas, Javanese gamelan, and African polyrhythms.
            </p>
            <div class="music-tracklist">
              ${MUSIC_SELECTIONS.map(m => `
                <div class="music-track-row">
                  <div class="track-left">
                    <span class="track-num font-mono">${m.num < 10 ? '0' + m.num : m.num}</span>
                    <div class="track-meta">
                      <div class="track-title">${m.title}</div>
                      <div class="track-artist">${m.artist} &bull; <strong style="color: #fbbf24;">${m.origin}</strong></div>
                    </div>
                  </div>
                  <div class="track-right font-mono">
                    <span class="track-dur">${m.duration}</span>
                    <button type="button" class="btn-play-tone" data-freq="${220 + m.num * 20}" data-track="${m.title} (${m.origin})" title="Play harmonic tuning reference" style="cursor: pointer; background: rgba(245, 158, 11, 0.15); border: 1px solid #fbbf24; color: #fbbf24; border-radius: 3px; padding: 4px 8px; font-size: 0.75rem;">
                      &#x25B6; PLAY
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      case 'chapter-5':
        return `
          <div class="chapter-deck">
            <div class="chapter-meta-tag font-mono">CHAPTER 05 // 115 ANALOG PHOTOGRAPHS</div>
            <h4 class="chapter-title">Images of Earth Encoded in Video Signals</h4>
            <p class="chapter-desc">
              115 black-and-white and color images were converted into analog audio waveforms. They contain scientific information about the solar system, cellular biology, human physiology, culture, agriculture, and architecture.
            </p>
            <div class="chapter-specs-grid">
              <div class="spec-card">
                <div class="spec-card-label font-mono">1. SCIENCE & MATHEMATICS</div>
                <div class="spec-card-desc">Solar spectrum, chemical elements, units of measure, DNA double-helix structure, cellular mitosis, and continental drift.</div>
              </div>
              <div class="spec-card">
                <div class="spec-card-label font-mono">2. ANATOMY & BIOLOGY</div>
                <div class="spec-card-desc">Conception, human embryo, family diagrams, human anatomy, organ systems, and animals (fish, birds, reptiles, mammals).</div>
              </div>
              <div class="spec-card">
                <div class="spec-card-label font-mono">3. HUMAN SOCIETY & CIVILIZATION</div>
                <div class="spec-card-desc">Farming, harvesting, eating, drinking, architecture (Great Wall, Taj Mahal, Golden Gate), school classrooms, and Olympic sprinters.</div>
              </div>
              <div class="spec-card">
                <div class="spec-card-label font-mono">4. TECHNOLOGY & ENGINEERING</div>
                <div class="spec-card-desc">Railroads, highways, modern bridges, jet aircraft, radio telescopes (Arecibo), and the Saturn V Apollo moon launch.</div>
              </div>
            </div>
          </div>
        `;

      case 'chapter-6':
        return `
          <div class="chapter-deck">
            <div class="chapter-meta-tag font-mono">CHAPTER 06 // GALACTIC TRIANGULATION</div>
            <h4 class="chapter-title">The 14-Pulsar Map: Pinpointing Earth in the Milky Way</h4>
            <p class="chapter-desc">
              Designed by astronomer Frank Drake, the pulsar map consists of 14 lines radiating outward from a common central origin representing our Sun.
            </p>
            <div class="chapter-specs-grid">
              <div class="spec-card">
                <div class="spec-card-label font-mono">LINE LENGTH</div>
                <div class="spec-card-value">PROPORTIONAL DISTANCE</div>
                <div class="spec-card-desc">The length of each line represents the relative distance from the Sun to each of the 14 rapidly spinning neutron stars (pulsars).</div>
              </div>
              <div class="spec-card">
                <div class="spec-card-label font-mono">BINARY PERIODS</div>
                <div class="spec-card-value">ROTATION FREQUENCY</div>
                <div class="spec-card-desc">Along each line, binary numbers record the spin period of that pulsar in fundamental hydrogen time units ($0.704\text{ ns}$) at the epoch of launch in 1977.</div>
              </div>
              <div class="spec-card">
                <div class="spec-card-label font-mono">CHRONOLOGICAL CLOCK</div>
                <div class="spec-card-value">PULSAR SPIN-DOWN</div>
                <div class="spec-card-desc">Because pulsars slow their rotation at precise, predictable rates over millions of years, an extraterrestrial civilization can calculate both where the probe came from and when it was launched.</div>
              </div>
              <div class="spec-card">
                <div class="spec-card-label font-mono">TRIANGULATION CERTAINTY</div>
                <div class="spec-card-value">UNIQUE LOCATION</div>
                <div class="spec-card-desc">Even if thousands of light-years away, 14 simultaneous pulsar vector intersections exist at only one point in the entire Milky Way: our Sun.</div>
              </div>
            </div>
          </div>
        `;

      case 'chapter-7':
        return `
          <div class="chapter-deck">
            <div class="chapter-meta-tag font-mono">CHAPTER 07 // UNIVERSAL QUANTUM METRIC</div>
            <h4 class="chapter-title">Hyperfine Transition of Neutral Atomic Hydrogen</h4>
            <p class="chapter-desc">
              Located in the lower right of the cover is a drawing of two hydrogen atoms. This provides the universal key for all units of distance and time used throughout the record.
            </p>
            <div class="chapter-specs-grid">
              <div class="spec-card">
                <div class="spec-card-label font-mono">QUANTUM TRANSITION</div>
                <div class="spec-card-value">ELECTRON SPIN FLIP</div>
                <div class="spec-card-desc">Shows the electron and proton changing from parallel spin state (higher energy) to anti-parallel spin state (lower energy).</div>
              </div>
              <div class="spec-card">
                <div class="spec-card-label font-mono">FUNDAMENTAL WAVELENGTH (&lambda;)</div>
                <div class="spec-card-value">21.106 CENTIMETERS</div>
                <div class="spec-card-desc">The emitted microwave photon has a vacuum wavelength of $21.106\text{ cm}$ ($8.3\text{ inches}$), providing our universal metric unit of distance.</div>
              </div>
              <div class="spec-card">
                <div class="spec-card-label font-mono">FUNDAMENTAL TIME UNIT (&tau;)</div>
                <div class="spec-card-value">0.704024 NANOSECONDS</div>
                <div class="spec-card-desc">The transition time period corresponds to a frequency of $1420.405\text{ MHz}$, or $t = 1/f = 7.0402418 \times 10^{-10}\text{ seconds}$. This is the fundamental unit "1" for all binary numbers on the record.</div>
              </div>
              <div class="spec-card">
                <div class="spec-card-label font-mono">UNIVERSALITY</div>
                <div class="spec-card-value">COSMIC CONSTANT</div>
                <div class="spec-card-desc">Hydrogen is the most abundant element in the universe (~75% of baryonic mass). Any civilization capable of interstellar flight will immediately recognize this physical constant.</div>
              </div>
            </div>
          </div>
        `;

      default:
        return '';
    }
  }

  renderView();
}
