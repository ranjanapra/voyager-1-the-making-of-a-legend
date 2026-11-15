/**
 * THE SILENT HARDWARE ARCHIVE — Dormant Instruments of Voyager 1
 * 
 * Historical & Scientific Flight Hardware Reconstruction
 * Master Catalog Resource: NASA National Space Science Data Center (NSSDCA)
 * Spacecraft ID: 1977-084A
 * 
 * CRUCIAL MISSION DISTINCTION:
 * "Voyager 1 is not an abandoned or discarded spacecraft. It remains an operating interstellar mission.
 * Some of its scientific instruments have been switched off."
 */

export const CHALLENGE_ALIGNMENT_INFO = {
  challengeName: "The Silent Hardware Archive // Dormant Instruments of Voyager 1",
  challengeUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1977-084A",
  catalogResource: "NASA National Space Science Data Center (NSSDCA)",
  catalogUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1977-084A",
  coreThesis: "While lunar landers and Martian rovers rest on planetary surfaces, Voyager 1 carries its own dormant hardware across interstellar space. To survive on declining nuclear power, NASA has selectively switched off scientific instruments over nearly five decades. These dormant sensors glide in perpetual silence—preserved forever among the stars.",
  distinction: "Voyager 1 is not an abandoned or discarded spacecraft. It remains an operating interstellar mission. Some of its scientific instruments have been switched off."
};

export const SILENT_INSTRUMENTS = [
  {
    id: "inst-iss",
    name: "Imaging Science Subsystem (ISS)",
    acronym: "ISS",
    type: "Optical Remote Sensing (Narrow & Wide Angle Vidicon Cameras)",
    pi: "Dr. Bradford A. Smith, University of Arizona",
    nssdcaId: "1977-084A-01",
    nssdcaUrl: "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1977-084A-01",
    deactivationDate: "February 14, 1990",
    status: "Permanently Switched Off",
    powerSavedWatts: 42.0,
    discoveries: "Returned over 67,000 images of Jupiter, Saturn, and their moons. Discovered active sulfur volcanism on Io, complex spoke structures in Saturn's rings, and captured the immortal 'Pale Blue Dot' portrait of Earth from 6 billion kilometers.",
    shutdownReason: "Power conservation and lack of scientific targets. In the black void of the outer solar system and interstellar space, there are no close planetary bodies to photograph. Shutting down the camera electronics and optical heaters saved ~42 Watts of precious electrical power.",
    legacyContribution: "Transformed our visual understanding of the outer solar system from blurry telescopic discs into dynamic, living worlds. The cameras remain physically intact on the scan platform, coasting forever into the constellation Ophiuchus."
  },
  {
    id: "inst-iris",
    name: "Infrared Interferometer Spectrometer & Radiometer (IRIS)",
    acronym: "IRIS",
    type: "Infrared Spectroscopy (4 to 50 micrometers)",
    pi: "Dr. Rudolf A. Hanel, NASA Goddard Space Flight Center",
    nssdcaId: "1977-084A-02",
    nssdcaUrl: "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1977-084A-02",
    deactivationDate: "1998",
    status: "Permanently Switched Off",
    powerSavedWatts: 38.0,
    discoveries: "Measured vertical atmospheric temperatures, helium/hydrogen abundance ratios on Jupiter and Saturn, and confirmed the dense nitrogen/methane organic atmosphere of Saturn's giant moon Titan.",
    shutdownReason: "RTG nuclear decay. By 1998, declining thermocouple output mandated shutting down power-hungry optical spectrometers to protect primary bus voltage.",
    legacyContribution: "Provided the first definitive thermal and chemical profiles of giant planet atmospheres. Its potassium bromide beam-splitter and Michelson mirror assembly now sleep in deep freeze."
  },
  {
    id: "inst-pps",
    name: "Photopolarimeter Subsystem (PPS)",
    acronym: "PPS",
    type: "Optical Polarimetry & Stellar Occultation (8 Filters)",
    pi: "Dr. Arthur L. Lane, Jet Propulsion Laboratory",
    nssdcaId: "1977-084A-04",
    nssdcaUrl: "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1977-084A-04",
    deactivationDate: "November 1980 (Post-Saturn)",
    status: "Permanently Inactive (Component Failure)",
    powerSavedWatts: 7.5,
    discoveries: "Measured methane absorption band scattering and investigated aerosol particle sizes in the cloud tops of Jupiter and Saturn.",
    shutdownReason: "Radiation-induced component failure. While flying through the intense radiation belts of Jupiter in March 1979, high-energy ionizing electrons damaged the filter wheel drive circuit. After limited stellar occultation science at Saturn, the sensor became inoperable.",
    legacyContribution: "Demonstrated the vulnerability of early electro-optical mechanisms to intense Jovian radiation, driving future radiation-hardening standards for Galileo and Cassini."
  },
  {
    id: "inst-uvs",
    name: "Ultraviolet Spectrometer (UVS)",
    acronym: "UVS",
    type: "Far-Ultraviolet Spectroscopy (40 to 180 nm)",
    pi: "Dr. A. Lyle Broadfoot, Kitt Peak National Observatory",
    nssdcaId: "1977-084A-03",
    nssdcaUrl: "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1977-084A-03",
    deactivationDate: "2016",
    status: "Switched Off (Dormant)",
    powerSavedWatts: 14.0,
    discoveries: "Discovered the Io plasma torus glowing in sulfur and oxygen ultraviolet emissions; mapped hydrogen Lyman-alpha emission across the outer heliosphere.",
    shutdownReason: "Planned power management protocol. Operated for nearly 40 years until April 2016, when JPL mission controllers powered it down to guarantee electrical reserves for interstellar fields and particle sensors.",
    legacyContribution: "Anchored ultraviolet astrophysics across four decades, discovering intense auroral curtains on Jupiter and Saturn."
  },
  {
    id: "inst-pra",
    name: "Planetary Radio Astronomy (PRA)",
    acronym: "PRA",
    type: "Radio Receiver (20.4 kHz to 40.5 MHz)",
    pi: "Dr. James W. Warwick, Radiophysics Inc. / Univ. of Colorado",
    nssdcaId: "1977-084A-09",
    nssdcaUrl: "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1977-084A-09",
    deactivationDate: "January 2008",
    status: "Switched Off (Dormant)",
    powerSavedWatts: 7.0,
    discoveries: "Detected kilometer-wavelength radio bursts from Jupiter's magnetosphere, clocked Saturn's exact internal rotation rate (10 hours 39 minutes) from radio emissions, and recorded lightning discharges in Saturn's rings.",
    shutdownReason: "Interstellar mission power conservation. With planetary radio sources tens of billions of kilometers behind the spacecraft, the receiver was turned off in 2008.",
    legacyContribution: "Proved that gas giant magnetospheres generate continuous, pulsed radio emissions that can be heard across the solar system."
  },
  {
    id: "inst-pls",
    name: "Plasma Spectrometer (PLS)",
    acronym: "PLS",
    type: "Faraday Cup Solar Wind Plasma Detector",
    pi: "Dr. Herbert S. Bridge & Dr. John Richardson, MIT",
    nssdcaId: "1977-084A-06",
    nssdcaUrl: "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1977-084A-06",
    deactivationDate: "2007 (Low-Rate Powered Down)",
    status: "Switched Off (Degraded Sensitivity)",
    powerSavedWatts: 8.5,
    discoveries: "Characterized the velocity, density, and temperature of the supersonic solar wind from Earth to beyond Saturn; discovered the co-rotating plasma sheet in Jupiter's magnetosphere.",
    shutdownReason: "Detector degradation and temperature sensitivity. In 1980, the primary sensor lost sensitivity to low-energy ions. Because it could no longer measure cold interstellar plasma ions, the remaining circuitry was powered down in 2007.",
    legacyContribution: "Established the fundamental baseline of interplanetary solar wind physics. (Its twin on Voyager 2 continues to operate)."
  },
  {
    id: "inst-dtr",
    name: "Digital Magnetic Tape Recorder (DTR)",
    acronym: "DTR",
    type: "8-Track Reel-to-Reel Digital Magnetic Tape Buffer",
    pi: "JPL Telecommunications & Data Acquisition Division",
    nssdcaId: "1977-084A",
    nssdcaUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1977-084A",
    deactivationDate: "1990 (Post-Family Portrait)",
    status: "Permanently Retired",
    powerSavedWatts: 14.0,
    discoveries: "Buffered high-speed 115.2 kbps television images and plasma wave waveforms during fast flybys when Earth was below the horizon or when transmission rates exceeded real-time DSN link limits.",
    shutdownReason: "Mechanical retirement. The 328-meter magnetic tape unit completed its mission once planetary encounters concluded. With data now transmitted in real-time at low bitrates (~160 bps), the motor and transport mechanism were permanently powered down to prevent power drain and mechanical wear.",
    legacyContribution: "Stored the highest-resolution planetary pictures of the 20th century, enabling the return of historical treasures that otherwise would have been lost."
  }
];

export const OPERATING_INTERSTELLAR_INSTRUMENTS = [
  {
    id: "inst-mag",
    name: "Triaxial Fluxgate Magnetometers (MAG)",
    acronym: "MAG",
    status: "OPERATING IN INTERSTELLAR SPACE",
    pi: "Dr. Norman F. Ness / Dr. Adam Szabo (NASA GSFC)",
    nssdcaId: "1977-084A-05",
    nssdcaUrl: "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1977-084A-05",
    currentFunction: "Measures the strength and direction of the local interstellar magnetic field outside the heliosphere (~0.5 nT)."
  },
  {
    id: "inst-lecp",
    name: "Low Energy Charged Particle (LECP)",
    acronym: "LECP",
    status: "OPERATING IN INTERSTELLAR SPACE",
    pi: "Dr. Stamatios M. Krimigis (JHU/APL)",
    nssdcaId: "1977-084A-07",
    nssdcaUrl: "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1977-084A-07",
    currentFunction: "Measures low-energy cosmic rays, shock-accelerated particles, and galactic electrons traversing the interstellar boundary."
  },
  {
    id: "inst-crs",
    name: "Cosmic Ray Subsystem (CRS)",
    acronym: "CRS",
    status: "OPERATING IN INTERSTELLAR SPACE",
    pi: "Dr. Alan C. Cummings (Caltech)",
    nssdcaId: "1977-084A-08",
    nssdcaUrl: "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1977-084A-08",
    currentFunction: "Detects pristine galactic cosmic ray nuclei unshielded by the Sun's heliospheric bubble."
  },
  {
    id: "inst-pws",
    name: "Plasma Wave Subsystem (PWS)",
    acronym: "PWS",
    status: "OPERATING IN INTERSTELLAR SPACE",
    pi: "Dr. Donald A. Gurnett / Dr. William S. Kurth (Univ. of Iowa)",
    nssdcaId: "1977-084A-10",
    nssdcaUrl: "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1977-084A-10",
    currentFunction: "Detects electron plasma oscillations caused by solar coronal mass ejections propagating into interstellar gas, confirming local electron density (~0.08 cm^-3)."
  }
];
