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
    teamName: "Selected NASA Space Apps Challenge: \"Abandoned but Not Forgotten: Storytelling About AI\"",
    makerName: "Ranjana Prajapati & Vidhi Patidar (AI tools were used during project development)"
  },

  vision: {
    title: "PROJECT VISION",
    whyVoyager: "In an era of rapid digital computing, Voyager 1 remains a monumental testament to what humanity achieved with mechanical relays, tape recorders, translinear semiconductors, and sheer human precision. We chose Voyager 1 because it represents the pinnacle of robotic space exploration: an engineering marvel originally built for a five-year mission that continues transmitting data across the interstellar void nearly five decades later.",
    experienceGoal: "We want visitors to experience more than just a dry timeline. We want them to step inside the Spacecraft Assembly Facility in 1977, understand the physical trade-offs of mass, electrical power, and radio bandwidth, and feel the weight of humanity's legacy carried on the Golden Record.",
    missionDignity: "Voyager 1 is not an abandoned or discarded spacecraft. It remains an operating interstellar mission. Some of its scientific instruments have been switched off to conserve power, but its engineering core and fields-and-particles payload continue returning valuable scientific data from the interstellar medium beyond the heliosphere."
  },

  // Project Team Members
  teamMembers: [
    {
      id: "member-1",
      name: "Ranjana Prajapati",
      role: "Project Lead & Web Development",
      callsign: "LEAD-01",
      bio: "Led website planning, UI/UX design, storytelling and complete website development. Conducted Voyager 1 research and collected NASA resources, research materials and scientific datasets. Managed technical implementation, data integration and overall project execution.",
      responsibilities: [
        "Led website planning, UI/UX design, storytelling and complete website development.",
        "Conducted Voyager 1 research and collected NASA resources, research materials and scientific datasets.",
        "Managed technical implementation, data integration and overall project execution."
      ]
    },
    {
      id: "member-2",
      name: "Vidhi Patidar",
      role: "Visual Design & Research Verification",
      callsign: "DESIGN-02",
      bio: "Generated and prepared project-related images and visual resources. Assisted in preparing supporting visual documentation. Verified research information, scientific references and visual assets.",
      responsibilities: [
        "Generated and prepared project-related images and visual resources.",
        "Assisted in preparing supporting visual documentation.",
        "Verified research information, scientific references and visual assets."
      ]
    }
  ],

  // Verified Archival Credits & Documentation References
  credits: [
    {
      organization: "NASA Space Apps Challenge",
      description: "Selected NASA Space Apps Challenge: \"Abandoned but Not Forgotten: Storytelling About AI\". AI tools were used during project development."
    },
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

  disclaimer: "This website is an independent educational historical simulation developed for the NASA Space Apps Challenge (Selected Challenge: \"Abandoned but Not Forgotten: Storytelling About AI\"). AI tools were used during project development. It is not affiliated with, sponsored by, or endorsed by NASA or the Jet Propulsion Laboratory. All NASA historical imagery and 3D geometries are utilized under NASA Media Usage Guidelines."
};
