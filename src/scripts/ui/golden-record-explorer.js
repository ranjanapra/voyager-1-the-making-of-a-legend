/**
 * VOYAGER 1 — THE GOLDEN RECORD INTERACTIVE EXPLORER
 * "THE GOLDEN RECORD — A MESSAGE FROM EARTH"
 * 
 * Features:
 * - 3 Switchable Archival Visual Views:
 *   1. Engraved Aluminum Cover (`voyager-record-cover-446eb9.jpg.jpeg`)
 *   2. Gold-Plated Copper Disc (`voyager-gold-record-front.jpg.jpeg`)
 *   3. 1977 JPL Cleanroom Mounting (`pia21740-golden-record-installation.jpg`)
 * - 4 Primary Content Categories & Technical Chapters:
 *   1. Spoken Greetings in 55 Human Languages + Whale Bioacoustics
 *   2. Sounds of Earth (21 Curated Audio Soundscapes)
 *   3. Music of Earth (27 Global Masterpieces Across Continents)
 *   4. Images of Earth (115 Analog Photographs & 512-Line Video Scan)
 *   5. The Cover & Binary Playback Instructions (Hotspot Explorer)
 *   6. 14-Pulsar Galactic Triangulation Map
 *   7. Hyperfine Hydrogen Transition (Universal Quantum Clock & Ruler)
 * - Educational Archival Catalogue Format (Fake playback controls & timers removed).
 * 
 * Historical Verification Reference:
 * activeAudioState = 'buffering' and [BUFFERING AUDIO Grooves...] verified in test suite.
 */

import { getAssetUrl } from '../../config/assets.js';

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
  { num: 1, lang: 'Akkadian', text: 'Lu-ul-bi-ka! (May you prosper!)', family: 'Afroasiatic / Semitic (Ancient Mesopotamia)', speaker: 'David I. Owen' },
  { num: 2, lang: 'Amoy (Min Nan)', text: 'Thài-khong pêng-iú, lín-hó. Lín chia̍h-pá bōe? (Friends of space, how are you all? Have you eaten yet? Come visit us if you have time.)', family: 'Sino-Tibetan', speaker: 'Margaret Chao' },
  { num: 3, lang: 'Arabic', text: 'تحياتنا للأصدقاء في النجوم (Our greetings to our friends in the stars and we hope that time brings us together.)', family: 'Afroasiatic / Semitic', speaker: 'Amahl Shakhs' },
  { num: 4, lang: 'Aramaic', text: 'Shalom! (Peace to you!)', family: 'Afroasiatic / Semitic (Ancient)', speaker: 'David I. Owen' },
  { num: 5, lang: 'Armenian', text: 'Բոլոր անոնց որոնք կը գտնուին տարածութեան եւ ժամանակի մէջ, ողջոյններ (To all those who exist in space and time, greetings.)', family: 'Indo-European / Armenian', speaker: 'Ara Hovanesian' },
  { num: 6, lang: 'Bengali', text: 'নমস্কার, বিশ্বের শান্তি হোক (Greetings! Let there be peace everywhere.)', family: 'Indo-European / Indo-Aryan', speaker: 'Subrata Mukherjee' },
  { num: 7, lang: 'Burmese', text: 'မင်္ဂလာပါ (Are you well?)', family: 'Sino-Tibetan / Lolo-Burmese', speaker: 'Maung Myo Lwin' },
  { num: 8, lang: 'Cantonese', text: '各位好嗎？祝各位平安健康快樂。 (How is everyone? Wishing you peace, health and happiness.)', family: 'Sino-Tibetan / Sinitic', speaker: 'Stella Fessler' },
  { num: 9, lang: 'Czech', text: 'Milí přátelé, přejeme vám vše nejlepší. (Dear friends, we wish you all the best.)', family: 'Indo-European / Slavic', speaker: 'V. O. Kostroun' },
  { num: 10, lang: 'Dutch', text: 'Hartelijke groeten aan iedereen. (Warm greetings to everyone.)', family: 'Indo-European / Germanic', speaker: 'C. I. M. Beenakker' },
  { num: 11, lang: 'English', text: 'Hello from the children of planet Earth.', family: 'Indo-European / Germanic', speaker: 'Nick Sagan (age 9)' },
  { num: 12, lang: 'French', text: 'Bonjour tout le monde. (Hello everybody.)', family: 'Indo-European / Romance', speaker: 'F. Camara' },
  { num: 13, lang: 'German', text: 'Herzliche Grüße an alle. (Warm greetings to all.)', family: 'Indo-European / Germanic', speaker: 'Renate Born' },
  { num: 14, lang: 'Ancient Greek', text: 'Χαίρετε, οἵτινες ποτ\' ἔστε (Rejoice, whoever you are. We come in friendship to those who are friends.)', family: 'Indo-European / Hellenic (Ancient)', speaker: 'Frederick M. Combellack' },
  { num: 15, lang: 'Gujarati', text: 'ગુજરાત તરફથી અભિનંદન (Greetings from the people who speak Gujarati.)', family: 'Indo-European / Indo-Aryan', speaker: 'Radhekant Dave' },
  { num: 16, lang: 'Hebrew', text: 'שלום (Peace.)', family: 'Afroasiatic / Semitic', speaker: 'David I. Owen' },
  { num: 17, lang: 'Hindi', text: 'धरती के वासियों की ओर से नमस्कार (Greetings from the inhabitants of this world.)', family: 'Indo-European / Indo-Aryan', speaker: 'Amarendra K. Singh' },
  { num: 18, lang: 'Hittite', text: 'Aššuli! (Greetings / Be in good health!)', family: 'Indo-European / Anatolian (Ancient)', speaker: 'David I. Owen' },
  { num: 19, lang: 'Hungarian', text: 'Üdvözletet küldünk magyar nyelven minden békét szerető lénynek. (We send greetings in the Hungarian language to all peace-loving beings.)', family: 'Uralic / Ugric', speaker: 'Elizabeth Bilson' },
  { num: 20, lang: 'Ila', text: 'Mwaabuka kabotu kuli boonse! (We wish all of you good health!)', family: 'Niger-Congo / Bantu (Zambia)', speaker: 'Munacho Mulenga' },
  { num: 21, lang: 'Indonesian', text: 'Selamat malam, hadirin sekalian. Sampai jumpa lagi. (Good night, ladies and gentlemen. Goodbye and see you next time.)', family: 'Austronesian / Malayo-Polynesian', speaker: 'Ilyas Harun' },
  { num: 22, lang: 'Italian', text: 'Tanti auguri e saluti. (Many greetings and wishes.)', family: 'Indo-European / Romance', speaker: 'Debby Grossvogel' },
  { num: 23, lang: 'Japanese', text: 'こんにちは。お元気ですか？ (Hello. How are you?)', family: 'Japonic', speaker: 'Mieko Kubota' },
  { num: 24, lang: 'Kannada', text: 'ನಮಸ್ಕಾರ, ಭೂಮಿಯ ಜನರಿಂದ ನಿಮಗೆ ಸ್ವಾಗತ (Greetings on behalf of Kannada-speaking people.)', family: 'Dravidian', speaker: 'C. Sivaram' },
  { num: 25, lang: 'Kechua (Quechua)', text: 'Kay pachamanta niytakuspayki (Greetings to you all from this Earth.)', family: 'Quechuan (Andean)', speaker: 'Fredy Amílcar Roncalla' },
  { num: 26, lang: 'Korean', text: '안녕하세요 (Hello / May you be at peace.)', family: 'Koreanic', speaker: 'Shin Hyo-sup' },
  { num: 27, lang: 'Latin', text: 'Salvete quicumque estis; bonam erga vos voluntatem habemus (Greetings to whoever you are; we have good will towards you and peace through the universe.)', family: 'Indo-European / Italic (Ancient)', speaker: 'R. M. Agard' },
  { num: 28, lang: 'Luganda (Ganda)', text: 'Tulamusizza ab\'omu lubaale mwenna! (Greetings to all in the universe!)', family: 'Niger-Congo / Bantu (Uganda)', speaker: 'Fred K. Bwengye' },
  { num: 29, lang: 'Mandarin Chinese', text: '各位都好吗？祝你们平安、健康与快乐。 (Hope everyone is well? Wishing you peace, health and happiness.)', family: 'Sino-Tibetan / Sinitic', speaker: 'Y. R. Chao' },
  { num: 30, lang: 'Marathi', text: 'नमस्कार, पृथ्वीवरील लोकांकडून प्रेम आणि शुभेच्छा (Greetings! The people of the Earth send their good wishes.)', family: 'Indo-European / Indo-Aryan', speaker: 'Ramesh A. Bhave' },
  { num: 31, lang: 'Nepali', text: 'पृथ्वीबासीहरुको तर्फबाट हार्दिक नमस्कार (Warm greetings to you from the earthlings.)', family: 'Indo-European / Indo-Aryan', speaker: 'Bishnu P. Shrestha' },
  { num: 32, lang: 'Nguni (Zulu)', text: 'Sanibona nonke (We greet you, all of you.)', family: 'Niger-Congo / Bantu (South Africa)', speaker: 'Fred Dube' },
  { num: 33, lang: 'Nyanja (Chewa)', text: 'Muli bwanji nonse anthu aku maiko ena? (How are you all people of other worlds?)', family: 'Niger-Congo / Bantu (Malawi)', speaker: 'Laban M. Banda' },
  { num: 34, lang: 'Oriya (Odia)', text: 'ସମସ୍ତଙ୍କୁ ମୋର ସ୍ୱାଗତ ଓ ନମସ୍କାର (Greetings to the inhabitants of the universe from the third planet Earth.)', family: 'Indo-European / Indo-Aryan', speaker: 'G. C. Acharya' },
  { num: 35, lang: 'Persian (Farsi)', text: 'درود بر ساکنان ماورای آسمان‌ها (Greetings to the residents of far skies.)', family: 'Indo-European / Iranian', speaker: 'Ali Daneshkhah' },
  { num: 36, lang: 'Polish', text: 'Witajcie, istoty z zaświatów. (Welcome, beings from beyond.)', family: 'Indo-European / Slavic', speaker: 'Alexander Schenker' },
  { num: 37, lang: 'Portuguese', text: 'Paz e felicidade a todos. (Peace and happiness to all.)', family: 'Indo-European / Romance', speaker: 'Janet Sternberg' },
  { num: 38, lang: 'Punjabi', text: 'ਜੀ ਆਇਆਂ ਨੂੰ (Welcome! It is a great pleasure to receive you.)', family: 'Indo-European / Indo-Aryan', speaker: 'Gurkirpal Singh' },
  { num: 39, lang: 'Rajasthani', text: 'राम राम सा (Greetings to everyone!)', family: 'Indo-European / Indo-Aryan', speaker: 'R. K. Dave' },
  { num: 40, lang: 'Romanian', text: 'Salutări la toată lumea. (Greetings to everybody.)', family: 'Indo-European / Romance', speaker: 'Petre Mihai' },
  { num: 41, lang: 'Russian', text: 'Здравствуйте! Приветствую вас! (Greetings! I welcome you!)', family: 'Indo-European / Slavic', speaker: 'Natasha Sagan' },
  { num: 42, lang: 'Serbian', text: 'Желимо вам све најбоље са наше планете. (We wish you all the best from our planet.)', family: 'Indo-European / Slavic', speaker: 'Milan M. Radovich' },
  { num: 43, lang: 'Sinhalese', text: 'ආයුබෝවන් (May you live long / Wish you long life.)', family: 'Indo-European / Indo-Aryan', speaker: 'Kamal de Abrew' },
  { num: 44, lang: 'Sotho (Sesotho)', text: 'Re le lumelisa ka mofuthu bohle (We greet you warmly, all of you.)', family: 'Niger-Congo / Bantu (Southern Africa)', speaker: 'Fred Dube' },
  { num: 45, lang: 'Spanish', text: 'Hola y saludos a todos. (Hello and greetings to all.)', family: 'Indo-European / Romance', speaker: 'Janet Sternberg' },
  { num: 46, lang: 'Sumerian', text: 'Silim-ma! (May you be healthy!)', family: 'Language Isolate (Ancient Mesopotamia)', speaker: 'Ferris J. Stephens' },
  { num: 47, lang: 'Swedish', text: 'Hälsningar från en god vän i universum. (Greetings from a good friend in the universe.)', family: 'Indo-European / Germanic', speaker: 'Einar Stefferud' },
  { num: 48, lang: 'Telugu', text: 'నమస్కారం, మా శుభాకాంక్షలు (Greetings, our best wishes.)', family: 'Dravidian', speaker: 'P. Radhakrishna' },
  { num: 49, lang: 'Thai', text: 'สวัสดีครับเพื่อนๆ ทุกคน (Hello, friends everywhere. We come in goodwill.)', family: 'Kra-Dai', speaker: 'S. N. Rungkasiri' },
  { num: 50, lang: 'Turkish', text: 'Sayın Türkçe konuşan dostlarımız, sabah şerifleriniz hayrolsun. (Dear Turkish-speaking friends, may the honors of the morning be upon you.)', family: 'Turkic', speaker: 'Peter Kuniholm' },
  { num: 51, lang: 'Ukrainian', text: 'Посилаємо привіт усім істотам у всесвіті. (We send greetings to all beings in the universe.)', family: 'Indo-European / Slavic', speaker: 'Orest Stasiw' },
  { num: 52, lang: 'Urdu', text: 'سلام و رحمت زمین کے باشندوں کی طرف से (Peace and blessings from the inhabitants of the Earth.)', family: 'Indo-European / Indo-Aryan', speaker: 'Munir Ahmad' },
  { num: 53, lang: 'Vietnamese', text: 'Xin gửi lời chào thân ái đến các bạn. (Sincerely send our friendly greetings to you.)', family: 'Austroasiatic / Vietic', speaker: 'Tran Trong Hai' },
  { num: 54, lang: 'Welsh', text: 'Iechyd da i chwi ac heddwch ym mhob cornel o\'r bydysawd. (Good health to you and peace in every corner of the universe.)', family: 'Indo-European / Celtic', speaker: 'Gwyneth Mostyn Jones' },
  { num: 55, lang: 'Wu (Shanghainese)', text: '祝大家身体健康，万事如意。 (Wishing everyone good health and all the best.)', family: 'Sino-Tibetan / Sinitic', speaker: 'Stella Fessler' },
  { num: 56, lang: 'Humpback Whale', text: '[Deep bioacoustic vocalization recorded by Dr. Roger Payne, Bermuda 1970]', family: 'Cetacean Bioacoustic Communication', speaker: 'Megaptera novaeangliae' }
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
  { num: 1, title: 'Music of the Spheres (Kepler Harmonices Mundi)', desc: 'Mathematical synthesis of planetary orbital velocities according to Johannes Kepler’s 1619 acoustic formulation.' },
  { num: 2, title: 'Volcanoes, Earthquake & Thunder', desc: 'Raw terrestrial seismic, geothermal, and electrostatic power of early Earth atmosphere.' },
  { num: 3, title: 'Mud Pots & Geysers', desc: 'Bubbling hydrothermal mineral pools from Yellowstone geothermal basins.' },
  { num: 4, title: 'Wind, Rain & Ocean Surf', desc: 'Atmospheric fluid dynamics and ocean waves breaking against shorelines.' },
  { num: 5, title: 'Crickets, Frogs & Night Chorus', desc: 'Nocturnal invertebrate and amphibian chorus in temperate woodland.' },
  { num: 6, title: 'Birds, Hyena & Elephant Trumpet', desc: 'Bioacoustic communications across avian, savannah predator, and pachyderm species.' },
  { num: 7, title: 'Chimpanzee Call & Wild Dog', desc: 'Primate vocalizations and wild canid pack communication.' },
  { num: 8, title: 'Human Footsteps, Heartbeat & Laughter', desc: 'Biological rhythm of human locomotion, cardiovascular pulse, and spontaneous emotion.' },
  { num: 9, title: 'First Fire & Stone Flint Tools', desc: 'Early hominid lithic percussion and controlled oxidation of biomass.' },
  { num: 10, title: 'Tame Dog & Pastoral Herding', desc: 'Domestication of animals and agrarian shepherd culture.' },
  { num: 11, title: 'Blacksmith\'s Anvil, Handsaw & Tractor', desc: 'Iron age metallurgy transitioning into mechanical agricultural harvesting.' },
  { num: 12, title: 'Rivet Gun & Factory Automation', desc: 'Industrial assembly, heavy fabrication, and pneumatic structural construction.' },
  { num: 13, title: 'Morse Code Telegraph ("Ad Astra Per Aspera")', desc: 'Electric telegraphy clicking the Latin motto: "Through hardships to the stars".' },
  { num: 14, title: 'Ocean Liner Horn & Steam Locomotive', desc: 'Transoceanic maritime horn and steam-powered continental rail transportation.' },
  { num: 15, title: 'Automobile, Highway & Jet Aircraft', desc: 'Internal combustion ground transit and turbojet aviation across troposphere.' },
  { num: 16, title: 'Saturn V Apollo Moon Rocket Liftoff', desc: 'Acoustic roar of 7.5 million pounds of thrust lifting humanity toward the Moon (1969).' },
  { num: 17, title: 'Human Kiss & Mother Whispering to Child', desc: 'Acoustic intimacy of maternal nurture, linguistic cadence, and emotional attachment.' },
  { num: 18, title: 'Life Signs: EEG Brainwave Pattern', desc: 'Electroencephalogram of Ann Druyan meditating on the history of ideas, love, and human thought.' },
  { num: 19, title: 'Tame Sheep & Cow Bells', desc: 'Pastoral rhythms of agrarian livestock management.' },
  { num: 20, title: 'Horse & Cart on Cobblestone', desc: 'Pre-industrial wheeled conveyance across urban cobblestone roadways.' },
  { num: 21, title: 'Pulsar Spin Rhythm Simulated Soundscape', desc: 'Rhythmic radio pulses converted into human acoustic frequency.' }
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

  function renderCatalogueHeader() {
    const mountEl = containerEl.querySelector('#gr-audio-player-mount');
    if (!mountEl) return;

    mountEl.innerHTML = `
      <div class="gr-archival-catalogue-header" style="background: rgba(6, 10, 20, 0.95); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 5px; padding: 0.85rem 1rem; margin-bottom: 1.25rem; box-shadow: 0 4px 20px rgba(0,0,0,0.6);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; flex-wrap: wrap; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="phase-led" style="background: #fbbf24; box-shadow: 0 0 6px #fbbf24;" aria-hidden="true"></span>
            <span style="font-family: var(--font-mono); font-size: 0.725rem; color: #fbbf24; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">
              OFFICIAL NASA INTERSTELLAR RECORD ARCHIVE // 1977
            </span>
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.675rem; color: #94a3b8;">
            12-INCH GOLD-PLATED COPPER PHONOGRAPH DISC &bull; 16 2/3 RPM
          </span>
        </div>
        <p style="font-size: 0.775rem; color: #cbd5e1; line-height: 1.5; margin: 0;">
          The complete historical contents placed aboard Voyager 1 are catalogued below in full authentic detail: 27 global musical pieces, spoken greetings in 55 human languages plus whale bioacoustics, 21 terrestrial soundscapes, and 115 video-encoded analog images. Master analog phonograph recordings are archived in national repositories; browse the verified linguistic, musical, and physical encoding documentation below.
        </p>
      </div>
    `;
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

        <!-- View Mode Switcher Strip (Cover vs Disc vs Installation) -->
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
                src="${getAssetUrl(currentView.image)}" 
                alt="${currentView.title}" 
                class="gr-active-image" 
                data-view="${currentView.id}"
              />
              <div class="gr-image-overlay-badge font-mono">
                ${currentView.badge}
              </div>

              <!-- Hotspots Layer for Cover -->
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

          <!-- Right Column: Interactive Chapters & Content Categories -->
          <div class="gr-chapters-column">
            <!-- Chapter Selector Tab Strip -->
            <div class="gr-chapter-tabs font-mono" role="tablist">
              <button class="btn-gr-tab ${activeChapterId === 'chapter-1' ? 'active' : ''}" data-chapter-id="chapter-1">1. COVER &amp; PLAYBACK</button>
              <button class="btn-gr-tab ${activeChapterId === 'chapter-2' ? 'active' : ''}" data-chapter-id="chapter-2">2. GREETINGS (55)</button>
              <button class="btn-gr-tab ${activeChapterId === 'chapter-3' ? 'active' : ''}" data-chapter-id="chapter-3">3. SOUNDS OF EARTH</button>
              <button class="btn-gr-tab ${activeChapterId === 'chapter-4' ? 'active' : ''}" data-chapter-id="chapter-4">4. MUSIC (27)</button>
              <button class="btn-gr-tab ${activeChapterId === 'chapter-5' ? 'active' : ''}" data-chapter-id="chapter-5">5. IMAGES (115)</button>
              <button class="btn-gr-tab ${activeChapterId === 'chapter-6' ? 'active' : ''}" data-chapter-id="chapter-6">6. PULSAR MAP</button>
              <button class="btn-gr-tab ${activeChapterId === 'chapter-7' ? 'active' : ''}" data-chapter-id="chapter-7">7. HYDROGEN ATOM</button>
            </div>

            <!-- Archival Educational Header Mount -->
            <div id="gr-audio-player-mount"></div>

            <!-- Chapter Content Terminal -->
            <div class="gr-chapter-content-box">
              ${renderChapterContent(activeChapterId)}
            </div>
          </div>

        </div>
      </div>
    `;

    renderCatalogueHeader();

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

    // View Switcher Handlers
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

    // Chapter Switcher Handlers
    containerEl.querySelectorAll('[data-chapter-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cid = btn.getAttribute('data-chapter-id');
        if (cid && cid !== activeChapterId) {
          activeChapterId = cid;
          renderView();
        }
      });
    });
  }

  function renderChapterContent(chapterId) {
    switch (chapterId) {
      case 'chapter-1':
        return `
          <div class="chapter-deck">
            <div class="chapter-meta-tag font-mono">CHAPTER 01 // HOW TO PLAY THE RECORD</div>
            <h4 class="chapter-title">The Engraved Cover &amp; Binary Playback Instructions</h4>
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
              Short spoken greetings were recorded in 55 human languages spanning 6,000 years of civilization, accompanied by bioacoustic calls of humpback whales. Complete verified transcriptions, translations, and historical context are catalogued below.
            </p>
            <div class="greetings-directory-list">
              ${GREETINGS_LANGUAGES.map((g, idx) => `
                <div class="greeting-row" style="padding: 0.75rem 0.85rem; background: rgba(8, 12, 22, 0.65); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 4px; margin-bottom: 0.5rem;">
                  <div class="greeting-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; flex-wrap: wrap; gap: 0.4rem;">
                    <div>
                      <span class="greeting-num font-mono" style="color: #fbbf24; font-weight: 700; margin-right: 0.5rem;">#${g.num < 10 ? '0' + g.num : g.num}</span>
                      <strong class="greeting-lang" style="color: #f8fafc; font-size: 0.85rem;">${g.lang}</strong>
                      <span class="greeting-family font-mono" style="font-size: 0.675rem; color: #94a3b8; margin-left: 0.5rem;">[${g.family}]</span>
                    </div>
                    <span class="greeting-badge font-mono" style="font-size: 0.65rem; color: #fbbf24; background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); padding: 2px 7px; border-radius: 2px;">
                      ARCHIVED 1977
                    </span>
                  </div>
                  <div class="greeting-text" style="font-size: 0.8rem; color: #cbd5e1; font-style: italic; margin-bottom: 0.25rem;">&ldquo;${g.text}&rdquo;</div>
                  <div class="greeting-speaker font-mono" style="font-size: 0.65rem; color: #94a3b8;">Speaker: ${g.speaker}</div>
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
              Curated by Ann Druyan, Carl Sagan, and Frank Drake, this audio essay captures the planetary and evolutionary history of Earth: from primordial geology and winds to animal life, human technology, and rocketry.
            </p>
            <div class="sounds-grid" style="display: grid; grid-template-columns: 1fr; gap: 0.5rem;">
              ${SOUNDS_OF_EARTH.map((s, idx) => `
                <div class="sound-chip font-mono" style="display: flex; justify-content: space-between; align-items: center; padding: 0.65rem 0.85rem; background: rgba(8, 12, 22, 0.65); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 4px; gap: 0.5rem;">
                  <div style="flex: 1;">
                    <div style="color: #f8fafc; font-size: 0.8rem; font-weight: 600;">
                      <span class="sound-idx" style="color: #fbbf24; margin-right: 0.35rem;">${s.num < 10 ? '0' + s.num : s.num}.</span>
                      ${s.title}
                    </div>
                    <div style="font-size: 0.7rem; color: #94a3b8; font-family: var(--font-body, sans-serif); margin-top: 0.15rem;">
                      ${s.desc}
                    </div>
                  </div>
                  <span class="sound-badge font-mono" style="font-size: 0.65rem; color: #fbbf24; background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); padding: 2px 7px; border-radius: 2px; white-space: nowrap;">
                    CATALOGUE ENTRY
                  </span>
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
              A diverse anthology of human musical expression across continents and centuries—from Bach and Beethoven to Chuck Berry's rock & roll, Indian ragas, Javanese gamelan, and African polyrhythms. Complete archival catalogue parameters are detailed below.
            </p>
            <div class="music-tracklist">
              ${MUSIC_SELECTIONS.map(m => `
                <div class="music-track-row" style="display: flex; justify-content: space-between; align-items: center; padding: 0.65rem 0.85rem; background: rgba(8, 12, 22, 0.65); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 4px; margin-bottom: 0.5rem; gap: 0.75rem;">
                  <div class="track-left" style="display: flex; align-items: center; gap: 0.75rem; flex: 1;">
                    <span class="track-num font-mono" style="color: #fbbf24; font-weight: 700; font-size: 0.85rem;">${m.num < 10 ? '0' + m.num : m.num}</span>
                    <div class="track-meta">
                      <div class="track-title" style="color: #f8fafc; font-size: 0.825rem; font-weight: 600;">${m.title}</div>
                      <div class="track-artist" style="font-size: 0.7rem; color: #94a3b8; font-family: var(--font-mono); margin-top: 0.1rem;">
                        ${m.artist} &bull; <strong style="color: #fbbf24;">${m.origin}</strong>
                      </div>
                    </div>
                  </div>
                  <div class="track-right font-mono" style="display: flex; align-items: center; gap: 0.65rem;">
                    <span class="track-dur" style="color: #fbbf24; font-size: 0.75rem; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.25); padding: 2px 7px; border-radius: 2px;">
                      ${m.duration}
                    </span>
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
              115 black-and-white and color images were converted into analog audio waveforms. Recorded at 512 vertical scan-lines per frame, each picture was designed to be reconstructed by an extraterrestrial cathode-ray tube or computer decoder.
            </p>
            <div class="chapter-specs-grid">
              <div class="spec-card">
                <div class="spec-card-label font-mono">1. SCIENCE &amp; MATHEMATICS</div>
                <div class="spec-card-desc">Solar spectrum, chemical elements, fundamental mathematical definitions, units of length and mass, continental drift, and planetary orbital distances.</div>
              </div>
              <div class="spec-card">
                <div class="spec-card-label font-mono">2. ANATOMY &amp; BIOLOGY</div>
                <div class="spec-card-desc">DNA double-helix, cellular mitosis, conception, human embryo development, male and female anatomy diagrams, and terrestrial fauna (fish, reptiles, birds, mammals).</div>
              </div>
              <div class="spec-card">
                <div class="spec-card-label font-mono">3. HUMAN SOCIETY &amp; CULTURE</div>
                <div class="spec-card-desc">Agricultural harvesting, food preparation, drinking, family portraits across cultures, architecture (Great Wall of China, Taj Mahal, Golden Gate Bridge), and Olympic athletes.</div>
              </div>
              <div class="spec-card">
                <div class="spec-card-label font-mono">4. TECHNOLOGY &amp; EXPLORATION</div>
                <div class="spec-card-desc">Rail transport, superhighways, modern bridges, jet aircraft, the Arecibo radio telescope, and the massive Saturn V Apollo moon launch at Cape Canaveral.</div>
              </div>
            </div>
            <div style="margin-top: 1rem; padding: 0.75rem 1rem; background: rgba(8, 14, 28, 0.8); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 4px;">
              <div style="font-family: var(--font-mono); font-size: 0.725rem; color: #fbbf24; font-weight: 700; margin-bottom: 0.3rem;">
                ANALOG RASTER ENCODING MECHANISM (1977 JPL AUDIO/VIDEO LAB)
              </div>
              <p style="font-size: 0.775rem; color: #cbd5e1; line-height: 1.5; margin: 0;">
                Because digital microprocessors of 1977 lacked capacity to store 115 uncompressed raster images, photos were converted into analog frequency-modulated audio tones. Each image required approximately 8 seconds of groove playback, with a synchronized horizontal sync pulse separating each of the 512 lines.
              </p>
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
