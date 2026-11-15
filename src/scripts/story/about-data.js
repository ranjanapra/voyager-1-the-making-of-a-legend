/**
 * Content Data for Section 04 — About Us & Credits
 * Includes configurable project placeholders, team cards, project vision, and archival references.
 */

export const ABOUT_DATA = {
  header: {
    badge: "ARCHIVAL INITIATIVE // MISSION RECONSTRUCTION",
    title: "ABOUT THE VOYAGER 1 ARCHIVE",
    tagline: "Preserving the Human Ingenuity That Reached the Stars",
    intro: "Inspired by the Pale Blue Dot perspective—looking back across billions of kilometers at our fragile home—this project was created to immerse students, educators, and space enthusiasts in the untold engineering decisions of 1977."
  },

  placeholders: {
    websiteTitle: "VOYAGER 1 — THE MAKING OF A LEGEND",
    teamName: "[PROJECT TEAM / INSTITUTION PLACEHOLDER]",
    makerName: "[PROJECT CREATORS / DEVELOPER PLACEHOLDER]"
  },

  vision: {
    title: "PROJECT VISION",
    whyVoyager: "In an era of rapid digital computing, Voyager 1 remains a monumental testament to what humanity achieved with mechanical relays, tape recorders, translinear semiconductors, and sheer human precision. We chose Voyager 1 because it represents the pinnacle of robotic space exploration: an engineering marvel originally built for a five-year mission that continues transmitting data across the interstellar void nearly five decades later.",
    experienceGoal: "We want visitors to experience more than just a dry timeline. We want them to step inside the Spacecraft Assembly Facility in 1977, understand the physical trade-offs of mass, electrical power, and radio bandwidth, and feel the weight of humanity's legacy carried on the Golden Record.",
    missionDignity: "Voyager 1 is not an abandoned or discarded spacecraft. It remains an operating interstellar mission. Some of its scientific instruments have been switched off to conserve power, but its engineering core and fields-and-particles payload continue returning valuable scientific data from the interstellar medium beyond the heliosphere."
  },

  // Editable Team Profile Placeholders (Exactly 2 Team Members)
  teamMembers: [
    {
      id: "member-1",
      name: "[TEAM MEMBER 01]",
      role: "Lead Systems Architect & 3D Visualization",
      callsign: "SYSTEMS-01",
      bio: "[Editable Profile] Directs overall web application architecture, Three.js WebGL spacecraft engine, and historical engineering pipeline fidelity.",
      responsibilities: ["Three.js Graphics Engine", "Spacecraft Model Integration", "Project Architecture"]
    },
    {
      id: "member-2",
      name: "[TEAM MEMBER 02]",
      role: "Historical Research Lead & Archival Specialist",
      callsign: "ARCHIVE-02",
      bio: "[Editable Profile] Curates and cross-references verified NASA technical publications, JPL mission logs, and historical specifications.",
      responsibilities: ["Technical Fact Verification", "Historical Chronology", "Citation Management"]
    }
  ],

  // Verified Archival Credits & Documentation References
  credits: [
    {
      organization: "NASA Jet Propulsion Laboratory (JPL-Caltech)",
      description: "Spacecraft design documentation, technical blueprints, and public domain historical photography."
    },
    {
      organization: "NASA Science Mission Directorate (SMD)",
      description: "Official 3D Voyager 1 spacecraft geometry and mission telemetry archives."
    },
    {
      organization: "NASA History Division (NASA SP-445)",
      description: "'Voyages to Saturn' & 'Voyages to Jupiter' comprehensive mission histories."
    },
    {
      organization: "The Voyager Golden Record Committee",
      description: "Carl Sagan, Frank Drake, Ann Druyan, Timothy Ferris, Jon Lomberg, and Linda Salzman Sagan for the interstellar message."
    }
  ],

  disclaimer: "This website is an independent educational historical simulation. It is not affiliated with, sponsored by, or endorsed by NASA or the Jet Propulsion Laboratory. All NASA historical imagery and 3D geometries are utilized under NASA Media Usage Guidelines."
};
