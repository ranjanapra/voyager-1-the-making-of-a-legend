/**
 * Real Historical NASA Datasets & Verified Observations
 *
 * Sourced directly from official NASA archives:
 * 1. Trajectory (SSC Ephemeris): NASA GSFC Satellite Situation Center (vy1trj_ssc_1d.asc)
 * 2. Magnetic Fields: NASA SPDF Voyager 1 Triaxial Fluxgate Magnetometer (vy1mag_1h.asc)
 * 3. Solar Wind Plasma: MIT Voyager Plasma Science Team (v1_hour_1977.asc)
 * 4. Cosmic Rays: Caltech / GSFC Voyager Cosmic Ray Subsystem (vy1crs_1d_1977.asc)
 * 5. Low Energy Particles: JHU/APL Voyager LECP Instrument (V177DGD01.CSV)
 * 6. Plasma Waves: University of Iowa Voyager PWS Spectrum Analyzer (vg1_pws_lr_19770905_v5.30.cdf)
 *
 * ALL ARTIFACTS REPRESENT AUTHENTIC NASA OBSERVATIONS AND EPHEMERIS.
 */

export const REAL_TRAJECTORY_EPHEMERIS = [
  {
    "year": 1977,
    "day": 252.0,
    "distanceAu": 1.01,
    "latDeg": 0.1,
    "lonDeg": 347.3
  },
  {
    "year": 1977,
    "day": 352.0,
    "distanceAu": 1.78,
    "latDeg": 1.0,
    "lonDeg": 70.6
  },
  {
    "year": 1978,
    "day": 87.0,
    "distanceAu": 2.76,
    "latDeg": 0.9,
    "lonDeg": 97.5
  },
  {
    "year": 1978,
    "day": 187.0,
    "distanceAu": 3.61,
    "latDeg": 0.8,
    "lonDeg": 110.7
  },
  {
    "year": 1978,
    "day": 287.0,
    "distanceAu": 4.36,
    "latDeg": 0.7,
    "lonDeg": 119.1
  },
  {
    "year": 1979,
    "day": 22.0,
    "distanceAu": 5.01,
    "latDeg": 0.6,
    "lonDeg": 125.2
  },
  {
    "year": 1979,
    "day": 122.0,
    "distanceAu": 5.49,
    "latDeg": 0.9,
    "lonDeg": 135.4
  },
  {
    "year": 1979,
    "day": 222.0,
    "distanceAu": 5.96,
    "latDeg": 1.4,
    "lonDeg": 147.9
  },
  {
    "year": 1979,
    "day": 322.0,
    "distanceAu": 6.59,
    "latDeg": 1.7,
    "lonDeg": 158.2
  },
  {
    "year": 1980,
    "day": 57.0,
    "distanceAu": 7.32,
    "latDeg": 2.0,
    "lonDeg": 166.7
  },
  {
    "year": 1980,
    "day": 157.0,
    "distanceAu": 8.12,
    "latDeg": 2.1,
    "lonDeg": 173.5
  },
  {
    "year": 1980,
    "day": 257.0,
    "distanceAu": 8.97,
    "latDeg": 2.3,
    "lonDeg": 179.0
  },
  {
    "year": 1980,
    "day": 357.0,
    "distanceAu": 9.7,
    "latDeg": 3.9,
    "lonDeg": 184.1
  },
  {
    "year": 1981,
    "day": 91.0,
    "distanceAu": 10.22,
    "latDeg": 7.6,
    "lonDeg": 189.4
  },
  {
    "year": 1981,
    "day": 191.0,
    "distanceAu": 10.83,
    "latDeg": 10.9,
    "lonDeg": 194.2
  },
  {
    "year": 1981,
    "day": 291.0,
    "distanceAu": 11.51,
    "latDeg": 13.7,
    "lonDeg": 198.6
  },
  {
    "year": 1982,
    "day": 26.0,
    "distanceAu": 12.25,
    "latDeg": 16.2,
    "lonDeg": 202.5
  },
  {
    "year": 1982,
    "day": 126.0,
    "distanceAu": 13.04,
    "latDeg": 18.3,
    "lonDeg": 206.0
  },
  {
    "year": 1982,
    "day": 226.0,
    "distanceAu": 13.86,
    "latDeg": 20.1,
    "lonDeg": 209.2
  },
  {
    "year": 1982,
    "day": 326.0,
    "distanceAu": 14.72,
    "latDeg": 21.6,
    "lonDeg": 212.1
  },
  {
    "year": 1983,
    "day": 61.0,
    "distanceAu": 15.6,
    "latDeg": 22.9,
    "lonDeg": 214.8
  },
  {
    "year": 1983,
    "day": 161.0,
    "distanceAu": 16.5,
    "latDeg": 24.1,
    "lonDeg": 217.2
  },
  {
    "year": 1983,
    "day": 261.0,
    "distanceAu": 17.42,
    "latDeg": 25.1,
    "lonDeg": 219.3
  },
  {
    "year": 1983,
    "day": 361.0,
    "distanceAu": 18.35,
    "latDeg": 26.0,
    "lonDeg": 221.3
  },
  {
    "year": 1984,
    "day": 96.0,
    "distanceAu": 19.29,
    "latDeg": 26.7,
    "lonDeg": 223.1
  },
  {
    "year": 1984,
    "day": 196.0,
    "distanceAu": 20.24,
    "latDeg": 27.4,
    "lonDeg": 224.8
  },
  {
    "year": 1984,
    "day": 296.0,
    "distanceAu": 21.2,
    "latDeg": 28.0,
    "lonDeg": 226.3
  },
  {
    "year": 1985,
    "day": 30.0,
    "distanceAu": 22.17,
    "latDeg": 28.5,
    "lonDeg": 227.8
  },
  {
    "year": 1985,
    "day": 130.0,
    "distanceAu": 23.14,
    "latDeg": 29.0,
    "lonDeg": 229.1
  },
  {
    "year": 1985,
    "day": 230.0,
    "distanceAu": 24.11,
    "latDeg": 29.4,
    "lonDeg": 230.3
  },
  {
    "year": 1985,
    "day": 330.0,
    "distanceAu": 25.09,
    "latDeg": 29.8,
    "lonDeg": 231.4
  },
  {
    "year": 1986,
    "day": 65.0,
    "distanceAu": 26.07,
    "latDeg": 30.1,
    "lonDeg": 232.5
  },
  {
    "year": 1986,
    "day": 165.0,
    "distanceAu": 27.06,
    "latDeg": 30.4,
    "lonDeg": 233.5
  },
  {
    "year": 1986,
    "day": 265.0,
    "distanceAu": 28.04,
    "latDeg": 30.7,
    "lonDeg": 234.4
  },
  {
    "year": 1986,
    "day": 365.0,
    "distanceAu": 29.03,
    "latDeg": 31.0,
    "lonDeg": 235.2
  },
  {
    "year": 1987,
    "day": 100.0,
    "distanceAu": 30.02,
    "latDeg": 31.2,
    "lonDeg": 236.1
  },
  {
    "year": 1987,
    "day": 200.0,
    "distanceAu": 31.01,
    "latDeg": 31.4,
    "lonDeg": 236.8
  },
  {
    "year": 1987,
    "day": 300.0,
    "distanceAu": 32.0,
    "latDeg": 31.6,
    "lonDeg": 237.5
  },
  {
    "year": 1988,
    "day": 35.0,
    "distanceAu": 33.0,
    "latDeg": 31.8,
    "lonDeg": 238.2
  },
  {
    "year": 1988,
    "day": 135.0,
    "distanceAu": 33.99,
    "latDeg": 32.0,
    "lonDeg": 238.8
  },
  {
    "year": 1988,
    "day": 235.0,
    "distanceAu": 34.98,
    "latDeg": 32.1,
    "lonDeg": 239.4
  },
  {
    "year": 1988,
    "day": 335.0,
    "distanceAu": 35.98,
    "latDeg": 32.2,
    "lonDeg": 240.0
  },
  {
    "year": 1989,
    "day": 69.0,
    "distanceAu": 36.96,
    "latDeg": 32.4,
    "lonDeg": 240.5
  },
  {
    "year": 1989,
    "day": 169.0,
    "distanceAu": 37.96,
    "latDeg": 32.5,
    "lonDeg": 241.1
  },
  {
    "year": 1989,
    "day": 269.0,
    "distanceAu": 38.95,
    "latDeg": 32.6,
    "lonDeg": 241.6
  },
  {
    "year": 1990,
    "day": 4.0,
    "distanceAu": 39.95,
    "latDeg": 32.8,
    "lonDeg": 242.0
  },
  {
    "year": 1990,
    "day": 104.0,
    "distanceAu": 40.94,
    "latDeg": 32.9,
    "lonDeg": 242.5
  },
  {
    "year": 1990,
    "day": 204.0,
    "distanceAu": 41.94,
    "latDeg": 33.0,
    "lonDeg": 242.9
  },
  {
    "year": 1990,
    "day": 304.0,
    "distanceAu": 42.93,
    "latDeg": 33.0,
    "lonDeg": 243.3
  },
  {
    "year": 1991,
    "day": 39.0,
    "distanceAu": 43.93,
    "latDeg": 33.1,
    "lonDeg": 243.7
  },
  {
    "year": 1991,
    "day": 139.0,
    "distanceAu": 44.93,
    "latDeg": 33.2,
    "lonDeg": 244.1
  },
  {
    "year": 1991,
    "day": 239.0,
    "distanceAu": 45.92,
    "latDeg": 33.3,
    "lonDeg": 244.4
  },
  {
    "year": 1991,
    "day": 339.0,
    "distanceAu": 46.92,
    "latDeg": 33.3,
    "lonDeg": 244.8
  },
  {
    "year": 1992,
    "day": 74.0,
    "distanceAu": 47.91,
    "latDeg": 33.4,
    "lonDeg": 245.1
  },
  {
    "year": 1992,
    "day": 174.0,
    "distanceAu": 48.91,
    "latDeg": 33.5,
    "lonDeg": 245.4
  },
  {
    "year": 1992,
    "day": 274.0,
    "distanceAu": 49.9,
    "latDeg": 33.5,
    "lonDeg": 245.7
  },
  {
    "year": 1993,
    "day": 8.0,
    "distanceAu": 50.9,
    "latDeg": 33.6,
    "lonDeg": 246.0
  },
  {
    "year": 1993,
    "day": 108.0,
    "distanceAu": 51.89,
    "latDeg": 33.6,
    "lonDeg": 246.3
  },
  {
    "year": 1993,
    "day": 208.0,
    "distanceAu": 52.89,
    "latDeg": 33.7,
    "lonDeg": 246.6
  },
  {
    "year": 1993,
    "day": 308.0,
    "distanceAu": 53.88,
    "latDeg": 33.7,
    "lonDeg": 246.9
  },
  {
    "year": 1994,
    "day": 43.0,
    "distanceAu": 54.87,
    "latDeg": 33.8,
    "lonDeg": 247.1
  },
  {
    "year": 1994,
    "day": 143.0,
    "distanceAu": 55.87,
    "latDeg": 33.8,
    "lonDeg": 247.4
  },
  {
    "year": 1994,
    "day": 243.0,
    "distanceAu": 56.86,
    "latDeg": 33.9,
    "lonDeg": 247.6
  },
  {
    "year": 1994,
    "day": 343.0,
    "distanceAu": 57.85,
    "latDeg": 33.9,
    "lonDeg": 247.8
  },
  {
    "year": 1995,
    "day": 78.0,
    "distanceAu": 58.84,
    "latDeg": 34.0,
    "lonDeg": 248.1
  },
  {
    "year": 1995,
    "day": 178.0,
    "distanceAu": 59.84,
    "latDeg": 34.0,
    "lonDeg": 248.3
  },
  {
    "year": 1995,
    "day": 278.0,
    "distanceAu": 60.83,
    "latDeg": 34.0,
    "lonDeg": 248.5
  },
  {
    "year": 1996,
    "day": 13.0,
    "distanceAu": 61.82,
    "latDeg": 34.1,
    "lonDeg": 248.7
  },
  {
    "year": 1996,
    "day": 113.0,
    "distanceAu": 62.81,
    "latDeg": 34.1,
    "lonDeg": 248.9
  },
  {
    "year": 1996,
    "day": 213.0,
    "distanceAu": 63.8,
    "latDeg": 34.1,
    "lonDeg": 249.1
  },
  {
    "year": 1996,
    "day": 313.0,
    "distanceAu": 64.79,
    "latDeg": 34.2,
    "lonDeg": 249.3
  },
  {
    "year": 1997,
    "day": 47.0,
    "distanceAu": 65.78,
    "latDeg": 34.2,
    "lonDeg": 249.5
  },
  {
    "year": 1997,
    "day": 147.0,
    "distanceAu": 66.77,
    "latDeg": 34.2,
    "lonDeg": 249.6
  },
  {
    "year": 1997,
    "day": 247.0,
    "distanceAu": 67.76,
    "latDeg": 34.3,
    "lonDeg": 249.8
  },
  {
    "year": 1997,
    "day": 347.0,
    "distanceAu": 68.75,
    "latDeg": 34.3,
    "lonDeg": 250.0
  },
  {
    "year": 1998,
    "day": 82.0,
    "distanceAu": 69.74,
    "latDeg": 34.3,
    "lonDeg": 250.1
  },
  {
    "year": 1998,
    "day": 182.0,
    "distanceAu": 70.73,
    "latDeg": 34.3,
    "lonDeg": 250.3
  },
  {
    "year": 1998,
    "day": 282.0,
    "distanceAu": 71.72,
    "latDeg": 34.4,
    "lonDeg": 250.4
  },
  {
    "year": 1999,
    "day": 17.0,
    "distanceAu": 72.7,
    "latDeg": 34.4,
    "lonDeg": 250.6
  },
  {
    "year": 1999,
    "day": 117.0,
    "distanceAu": 73.69,
    "latDeg": 34.4,
    "lonDeg": 250.7
  },
  {
    "year": 1999,
    "day": 217.0,
    "distanceAu": 74.68,
    "latDeg": 34.4,
    "lonDeg": 250.9
  },
  {
    "year": 1999,
    "day": 317.0,
    "distanceAu": 75.67,
    "latDeg": 34.4,
    "lonDeg": 251.0
  },
  {
    "year": 2000,
    "day": 52.0,
    "distanceAu": 76.65,
    "latDeg": 34.5,
    "lonDeg": 251.1
  },
  {
    "year": 2000,
    "day": 151.0,
    "distanceAu": 77.64,
    "latDeg": 34.5,
    "lonDeg": 251.3
  },
  {
    "year": 2000,
    "day": 251.0,
    "distanceAu": 78.63,
    "latDeg": 34.5,
    "lonDeg": 251.4
  },
  {
    "year": 2000,
    "day": 351.0,
    "distanceAu": 79.62,
    "latDeg": 34.5,
    "lonDeg": 251.5
  },
  {
    "year": 2001,
    "day": 86.0,
    "distanceAu": 80.6,
    "latDeg": 34.5,
    "lonDeg": 251.6
  },
  {
    "year": 2001,
    "day": 186.0,
    "distanceAu": 81.59,
    "latDeg": 34.5,
    "lonDeg": 251.8
  },
  {
    "year": 2001,
    "day": 286.0,
    "distanceAu": 82.58,
    "latDeg": 34.6,
    "lonDeg": 251.9
  },
  {
    "year": 2002,
    "day": 21.0,
    "distanceAu": 83.56,
    "latDeg": 34.6,
    "lonDeg": 252.0
  },
  {
    "year": 2002,
    "day": 121.0,
    "distanceAu": 84.55,
    "latDeg": 34.6,
    "lonDeg": 252.1
  },
  {
    "year": 2002,
    "day": 221.0,
    "distanceAu": 85.54,
    "latDeg": 34.6,
    "lonDeg": 252.2
  },
  {
    "year": 2002,
    "day": 321.0,
    "distanceAu": 86.52,
    "latDeg": 34.6,
    "lonDeg": 252.3
  },
  {
    "year": 2003,
    "day": 56.0,
    "distanceAu": 87.51,
    "latDeg": 34.6,
    "lonDeg": 252.4
  },
  {
    "year": 2003,
    "day": 156.0,
    "distanceAu": 88.49,
    "latDeg": 34.7,
    "lonDeg": 252.5
  },
  {
    "year": 2003,
    "day": 256.0,
    "distanceAu": 89.48,
    "latDeg": 34.7,
    "lonDeg": 252.6
  },
  {
    "year": 2003,
    "day": 356.0,
    "distanceAu": 90.46,
    "latDeg": 34.7,
    "lonDeg": 252.7
  },
  {
    "year": 2004,
    "day": 91.0,
    "distanceAu": 91.45,
    "latDeg": 34.7,
    "lonDeg": 252.8
  },
  {
    "year": 2004,
    "day": 191.0,
    "distanceAu": 92.43,
    "latDeg": 34.7,
    "lonDeg": 252.9
  },
  {
    "year": 2004,
    "day": 291.0,
    "distanceAu": 93.42,
    "latDeg": 34.7,
    "lonDeg": 253.0
  },
  {
    "year": 2005,
    "day": 24.0,
    "distanceAu": 94.39,
    "latDeg": 34.7,
    "lonDeg": 253.1
  }
];

export const REAL_MAG_1977 = [
  {
    "year": 1977,
    "day": 249,
    "hour": 12,
    "distAu": 1.0073,
    "f1Magnitude": 2.64,
    "f2Modulus": 2.03,
    "delta": 22.0,
    "lambda": 123.6
  },
  {
    "year": 1977,
    "day": 250,
    "hour": 12,
    "distAu": 1.0082,
    "f1Magnitude": 5.1,
    "f2Modulus": 4.95,
    "delta": 15.6,
    "lambda": 156.2
  },
  {
    "year": 1977,
    "day": 251,
    "hour": 12,
    "distAu": 1.0094,
    "f1Magnitude": 5.79,
    "f2Modulus": 5.72,
    "delta": 10.7,
    "lambda": 148.4
  },
  {
    "year": 1977,
    "day": 252,
    "hour": 12,
    "distAu": 1.0103,
    "f1Magnitude": 6.07,
    "f2Modulus": 5.67,
    "delta": -14.9,
    "lambda": 254.9
  },
  {
    "year": 1977,
    "day": 253,
    "hour": 12,
    "distAu": 1.0116,
    "f1Magnitude": 4.07,
    "f2Modulus": 3.21,
    "delta": 9.0,
    "lambda": 279.7
  },
  {
    "year": 1977,
    "day": 254,
    "hour": 12,
    "distAu": 1.0124,
    "f1Magnitude": 7.05,
    "f2Modulus": 6.48,
    "delta": 20.8,
    "lambda": 299.6
  },
  {
    "year": 1977,
    "day": 255,
    "hour": 12,
    "distAu": 1.0139,
    "f1Magnitude": 4.73,
    "f2Modulus": 4.69,
    "delta": 8.8,
    "lambda": 8.5
  },
  {
    "year": 1977,
    "day": 256,
    "hour": 12,
    "distAu": 1.016,
    "f1Magnitude": 8.23,
    "f2Modulus": 7.47,
    "delta": -32.9,
    "lambda": 336.5
  },
  {
    "year": 1977,
    "day": 257,
    "hour": 12,
    "distAu": 1.0179,
    "f1Magnitude": 6.13,
    "f2Modulus": 5.18,
    "delta": 31.2,
    "lambda": 4.6
  },
  {
    "year": 1977,
    "day": 259,
    "hour": 12,
    "distAu": 1.0231,
    "f1Magnitude": 3.91,
    "f2Modulus": 2.87,
    "delta": 32.1,
    "lambda": 274.9
  },
  {
    "year": 1977,
    "day": 261,
    "hour": 12,
    "distAu": 1.0282,
    "f1Magnitude": 3.61,
    "f2Modulus": 3.41,
    "delta": -45.2,
    "lambda": 290.5
  },
  {
    "year": 1977,
    "day": 263,
    "hour": 12,
    "distAu": 1.0353,
    "f1Magnitude": 9.67,
    "f2Modulus": 9.56,
    "delta": 2.0,
    "lambda": 316.3
  },
  {
    "year": 1977,
    "day": 265,
    "hour": 12,
    "distAu": 1.0424,
    "f1Magnitude": 11.55,
    "f2Modulus": 11.5,
    "delta": 39.6,
    "lambda": 243.5
  },
  {
    "year": 1977,
    "day": 267,
    "hour": 12,
    "distAu": 1.0501,
    "f1Magnitude": 3.29,
    "f2Modulus": 3.19,
    "delta": 0.8,
    "lambda": 289.0
  },
  {
    "year": 1977,
    "day": 269,
    "hour": 12,
    "distAu": 1.0596,
    "f1Magnitude": 5.05,
    "f2Modulus": 4.12,
    "delta": 20.4,
    "lambda": 292.3
  },
  {
    "year": 1977,
    "day": 271,
    "hour": 12,
    "distAu": 1.0692,
    "f1Magnitude": 6.58,
    "f2Modulus": 5.49,
    "delta": 54.6,
    "lambda": 104.7
  },
  {
    "year": 1977,
    "day": 273,
    "hour": 12,
    "distAu": 1.08,
    "f1Magnitude": 6.33,
    "f2Modulus": 6.21,
    "delta": 28.1,
    "lambda": 104.3
  },
  {
    "year": 1977,
    "day": 275,
    "hour": 12,
    "distAu": 1.0903,
    "f1Magnitude": 7.73,
    "f2Modulus": 7.39,
    "delta": 33.1,
    "lambda": 152.7
  },
  {
    "year": 1977,
    "day": 276,
    "hour": 12,
    "distAu": 1.0965,
    "f1Magnitude": 5.3,
    "f2Modulus": 5.17,
    "delta": -26.6,
    "lambda": 268.1
  },
  {
    "year": 1977,
    "day": 277,
    "hour": 12,
    "distAu": 1.1028,
    "f1Magnitude": 9.03,
    "f2Modulus": 8.02,
    "delta": 2.3,
    "lambda": 87.1
  },
  {
    "year": 1977,
    "day": 279,
    "hour": 12,
    "distAu": 1.1149,
    "f1Magnitude": 4.96,
    "f2Modulus": 4.9,
    "delta": -77.2,
    "lambda": 92.6
  },
  {
    "year": 1977,
    "day": 281,
    "hour": 12,
    "distAu": 1.1277,
    "f1Magnitude": 3.16,
    "f2Modulus": 2.85,
    "delta": -52.8,
    "lambda": 108.8
  },
  {
    "year": 1977,
    "day": 282,
    "hour": 12,
    "distAu": 1.1343,
    "f1Magnitude": 2.8,
    "f2Modulus": 2.8,
    "delta": -0.9,
    "lambda": 146.4
  },
  {
    "year": 1977,
    "day": 283,
    "hour": 12,
    "distAu": 1.1407,
    "f1Magnitude": 4.05,
    "f2Modulus": 4.01,
    "delta": -1.9,
    "lambda": 134.0
  },
  {
    "year": 1977,
    "day": 284,
    "hour": 12,
    "distAu": 1.148,
    "f1Magnitude": 3.49,
    "f2Modulus": 3.38,
    "delta": 38.0,
    "lambda": 295.5
  },
  {
    "year": 1977,
    "day": 285,
    "hour": 12,
    "distAu": 1.155,
    "f1Magnitude": 3.69,
    "f2Modulus": 3.62,
    "delta": -17.9,
    "lambda": 306.8
  },
  {
    "year": 1977,
    "day": 286,
    "hour": 12,
    "distAu": 1.1623,
    "f1Magnitude": 4.18,
    "f2Modulus": 4.11,
    "delta": -41.4,
    "lambda": 331.6
  },
  {
    "year": 1977,
    "day": 287,
    "hour": 12,
    "distAu": 1.17,
    "f1Magnitude": 7.47,
    "f2Modulus": 6.51,
    "delta": 10.0,
    "lambda": 296.8
  },
  {
    "year": 1977,
    "day": 288,
    "hour": 12,
    "distAu": 1.1774,
    "f1Magnitude": 4.27,
    "f2Modulus": 3.51,
    "delta": 4.2,
    "lambda": 133.6
  },
  {
    "year": 1977,
    "day": 289,
    "hour": 12,
    "distAu": 1.185,
    "f1Magnitude": 5.76,
    "f2Modulus": 5.62,
    "delta": 21.6,
    "lambda": 155.0
  },
  {
    "year": 1977,
    "day": 291,
    "hour": 12,
    "distAu": 1.2004,
    "f1Magnitude": 4.07,
    "f2Modulus": 3.76,
    "delta": -44.6,
    "lambda": 243.8
  },
  {
    "year": 1977,
    "day": 292,
    "hour": 12,
    "distAu": 1.2084,
    "f1Magnitude": 9.02,
    "f2Modulus": 8.85,
    "delta": 35.7,
    "lambda": 132.7
  },
  {
    "year": 1977,
    "day": 293,
    "hour": 12,
    "distAu": 1.2166,
    "f1Magnitude": 7.38,
    "f2Modulus": 5.46,
    "delta": 16.8,
    "lambda": 310.2
  },
  {
    "year": 1977,
    "day": 294,
    "hour": 12,
    "distAu": 1.2243,
    "f1Magnitude": 5.75,
    "f2Modulus": 5.69,
    "delta": 5.8,
    "lambda": 305.4
  },
  {
    "year": 1977,
    "day": 295,
    "hour": 12,
    "distAu": 1.233,
    "f1Magnitude": 14.73,
    "f2Modulus": 14.7,
    "delta": -1.0,
    "lambda": 0.1
  },
  {
    "year": 1977,
    "day": 296,
    "hour": 12,
    "distAu": 1.2413,
    "f1Magnitude": 4.43,
    "f2Modulus": 4.19,
    "delta": -12.3,
    "lambda": 338.2
  },
  {
    "year": 1977,
    "day": 297,
    "hour": 12,
    "distAu": 1.2493,
    "f1Magnitude": 5.1,
    "f2Modulus": 4.53,
    "delta": -17.7,
    "lambda": 322.1
  },
  {
    "year": 1977,
    "day": 298,
    "hour": 12,
    "distAu": 1.2581,
    "f1Magnitude": 3.23,
    "f2Modulus": 3.22,
    "delta": 12.1,
    "lambda": 337.6
  },
  {
    "year": 1977,
    "day": 299,
    "hour": 12,
    "distAu": 1.2667,
    "f1Magnitude": 3.09,
    "f2Modulus": 2.88,
    "delta": -25.4,
    "lambda": 303.8
  },
  {
    "year": 1977,
    "day": 300,
    "hour": 12,
    "distAu": 1.2747,
    "f1Magnitude": 2.69,
    "f2Modulus": 2.64,
    "delta": 35.5,
    "lambda": 120.9
  },
  {
    "year": 1977,
    "day": 301,
    "hour": 12,
    "distAu": 1.2837,
    "f1Magnitude": 9.71,
    "f2Modulus": 8.94,
    "delta": -23.9,
    "lambda": 93.5
  },
  {
    "year": 1977,
    "day": 302,
    "hour": 12,
    "distAu": 1.2922,
    "f1Magnitude": 7.38,
    "f2Modulus": 7.26,
    "delta": -57.9,
    "lambda": 270.4
  },
  {
    "year": 1977,
    "day": 303,
    "hour": 12,
    "distAu": 1.3009,
    "f1Magnitude": 5.13,
    "f2Modulus": 4.6,
    "delta": -31.6,
    "lambda": 179.9
  },
  {
    "year": 1977,
    "day": 304,
    "hour": 12,
    "distAu": 1.3099,
    "f1Magnitude": 2.85,
    "f2Modulus": 2.65,
    "delta": -27.8,
    "lambda": 171.8
  },
  {
    "year": 1977,
    "day": 305,
    "hour": 12,
    "distAu": 1.3191,
    "f1Magnitude": 4.28,
    "f2Modulus": 4.23,
    "delta": 7.7,
    "lambda": 190.6
  },
  {
    "year": 1977,
    "day": 306,
    "hour": 12,
    "distAu": 1.3285,
    "f1Magnitude": 3.94,
    "f2Modulus": 3.75,
    "delta": 18.0,
    "lambda": 168.6
  },
  {
    "year": 1977,
    "day": 307,
    "hour": 12,
    "distAu": 1.3368,
    "f1Magnitude": 3.04,
    "f2Modulus": 2.93,
    "delta": 18.6,
    "lambda": 202.3
  },
  {
    "year": 1977,
    "day": 308,
    "hour": 12,
    "distAu": 1.3466,
    "f1Magnitude": 3.91,
    "f2Modulus": 2.84,
    "delta": -41.6,
    "lambda": 228.5
  },
  {
    "year": 1977,
    "day": 309,
    "hour": 12,
    "distAu": 1.3554,
    "f1Magnitude": 1.98,
    "f2Modulus": 1.84,
    "delta": -9.5,
    "lambda": 69.1
  },
  {
    "year": 1977,
    "day": 310,
    "hour": 12,
    "distAu": 1.3648,
    "f1Magnitude": 1.84,
    "f2Modulus": 1.79,
    "delta": 49.2,
    "lambda": 159.8
  },
  {
    "year": 1977,
    "day": 311,
    "hour": 12,
    "distAu": 1.3739,
    "f1Magnitude": 3.99,
    "f2Modulus": 3.64,
    "delta": -52.7,
    "lambda": 315.4
  },
  {
    "year": 1977,
    "day": 312,
    "hour": 12,
    "distAu": 1.3833,
    "f1Magnitude": 5.13,
    "f2Modulus": 4.93,
    "delta": -11.1,
    "lambda": 285.2
  },
  {
    "year": 1977,
    "day": 313,
    "hour": 12,
    "distAu": 1.3929,
    "f1Magnitude": 4.25,
    "f2Modulus": 4.23,
    "delta": 2.6,
    "lambda": 277.6
  },
  {
    "year": 1977,
    "day": 314,
    "hour": 12,
    "distAu": 1.4031,
    "f1Magnitude": 3.16,
    "f2Modulus": 3.06,
    "delta": 7.1,
    "lambda": 279.3
  },
  {
    "year": 1977,
    "day": 315,
    "hour": 12,
    "distAu": 1.4122,
    "f1Magnitude": 3.44,
    "f2Modulus": 3.38,
    "delta": -6.8,
    "lambda": 268.7
  },
  {
    "year": 1977,
    "day": 316,
    "hour": 12,
    "distAu": 1.4214,
    "f1Magnitude": 2.95,
    "f2Modulus": 2.88,
    "delta": 21.5,
    "lambda": 279.9
  },
  {
    "year": 1977,
    "day": 317,
    "hour": 12,
    "distAu": 1.4314,
    "f1Magnitude": 9.75,
    "f2Modulus": 9.62,
    "delta": 12.9,
    "lambda": 99.1
  },
  {
    "year": 1977,
    "day": 318,
    "hour": 12,
    "distAu": 1.441,
    "f1Magnitude": 3.66,
    "f2Modulus": 3.3,
    "delta": 18.9,
    "lambda": 271.9
  },
  {
    "year": 1977,
    "day": 319,
    "hour": 12,
    "distAu": 1.4508,
    "f1Magnitude": 6.9,
    "f2Modulus": 6.72,
    "delta": 6.0,
    "lambda": 297.1
  },
  {
    "year": 1977,
    "day": 320,
    "hour": 12,
    "distAu": 1.4598,
    "f1Magnitude": 4.96,
    "f2Modulus": 3.39,
    "delta": -0.3,
    "lambda": 339.8
  },
  {
    "year": 1977,
    "day": 321,
    "hour": 12,
    "distAu": 1.47,
    "f1Magnitude": 2.2,
    "f2Modulus": 1.75,
    "delta": 4.5,
    "lambda": 215.6
  },
  {
    "year": 1977,
    "day": 322,
    "hour": 12,
    "distAu": 1.48,
    "f1Magnitude": 2.16,
    "f2Modulus": 2.07,
    "delta": -9.1,
    "lambda": 239.7
  },
  {
    "year": 1977,
    "day": 323,
    "hour": 12,
    "distAu": 1.4895,
    "f1Magnitude": 1.96,
    "f2Modulus": 1.8,
    "delta": -10.8,
    "lambda": 352.7
  },
  {
    "year": 1977,
    "day": 324,
    "hour": 12,
    "distAu": 1.4988,
    "f1Magnitude": 2.04,
    "f2Modulus": 1.83,
    "delta": -2.8,
    "lambda": 286.7
  },
  {
    "year": 1977,
    "day": 325,
    "hour": 12,
    "distAu": 1.5096,
    "f1Magnitude": 2.53,
    "f2Modulus": 2.35,
    "delta": -11.9,
    "lambda": 226.5
  },
  {
    "year": 1977,
    "day": 326,
    "hour": 12,
    "distAu": 1.5193,
    "f1Magnitude": 2.86,
    "f2Modulus": 2.67,
    "delta": -23.9,
    "lambda": 37.4
  },
  {
    "year": 1977,
    "day": 327,
    "hour": 12,
    "distAu": 1.5285,
    "f1Magnitude": 2.83,
    "f2Modulus": 2.16,
    "delta": -14.5,
    "lambda": 355.3
  },
  {
    "year": 1977,
    "day": 328,
    "hour": 12,
    "distAu": 1.5385,
    "f1Magnitude": 3.04,
    "f2Modulus": 3.02,
    "delta": 24.7,
    "lambda": 302.3
  },
  {
    "year": 1977,
    "day": 329,
    "hour": 12,
    "distAu": 1.5489,
    "f1Magnitude": 2.23,
    "f2Modulus": 2.2,
    "delta": 45.7,
    "lambda": 179.3
  },
  {
    "year": 1977,
    "day": 330,
    "hour": 12,
    "distAu": 1.5592,
    "f1Magnitude": 0.61,
    "f2Modulus": 0.53,
    "delta": -6.7,
    "lambda": 316.0
  },
  {
    "year": 1977,
    "day": 331,
    "hour": 12,
    "distAu": 1.5687,
    "f1Magnitude": 0.69,
    "f2Modulus": 0.55,
    "delta": 10.7,
    "lambda": 272.6
  },
  {
    "year": 1977,
    "day": 332,
    "hour": 12,
    "distAu": 1.5786,
    "f1Magnitude": 5.86,
    "f2Modulus": 5.68,
    "delta": -43.5,
    "lambda": 265.0
  },
  {
    "year": 1977,
    "day": 333,
    "hour": 12,
    "distAu": 1.5893,
    "f1Magnitude": 8.51,
    "f2Modulus": 8.31,
    "delta": 48.7,
    "lambda": 221.9
  },
  {
    "year": 1977,
    "day": 334,
    "hour": 12,
    "distAu": 1.5992,
    "f1Magnitude": 4.16,
    "f2Modulus": 4.14,
    "delta": -24.8,
    "lambda": 192.5
  },
  {
    "year": 1977,
    "day": 335,
    "hour": 12,
    "distAu": 1.6092,
    "f1Magnitude": 2.64,
    "f2Modulus": 2.53,
    "delta": 9.2,
    "lambda": 241.9
  },
  {
    "year": 1977,
    "day": 336,
    "hour": 12,
    "distAu": 1.6196,
    "f1Magnitude": 3.08,
    "f2Modulus": 2.73,
    "delta": 14.5,
    "lambda": 302.5
  },
  {
    "year": 1977,
    "day": 337,
    "hour": 12,
    "distAu": 1.6288,
    "f1Magnitude": 3.35,
    "f2Modulus": 3.33,
    "delta": -25.7,
    "lambda": 93.4
  },
  {
    "year": 1977,
    "day": 338,
    "hour": 12,
    "distAu": 1.6392,
    "f1Magnitude": 5.57,
    "f2Modulus": 5.3,
    "delta": -37.0,
    "lambda": 293.3
  },
  {
    "year": 1977,
    "day": 339,
    "hour": 12,
    "distAu": 1.6498,
    "f1Magnitude": 5.97,
    "f2Modulus": 5.96,
    "delta": -29.1,
    "lambda": 256.8
  },
  {
    "year": 1977,
    "day": 340,
    "hour": 12,
    "distAu": 1.6594,
    "f1Magnitude": 2.01,
    "f2Modulus": 2.0,
    "delta": -3.4,
    "lambda": 339.0
  },
  {
    "year": 1977,
    "day": 341,
    "hour": 12,
    "distAu": 1.6692,
    "f1Magnitude": 3.91,
    "f2Modulus": 3.9,
    "delta": -3.3,
    "lambda": 315.4
  },
  {
    "year": 1977,
    "day": 342,
    "hour": 12,
    "distAu": 1.6801,
    "f1Magnitude": 2.32,
    "f2Modulus": 2.32,
    "delta": -22.9,
    "lambda": 170.2
  },
  {
    "year": 1977,
    "day": 344,
    "hour": 12,
    "distAu": 1.7002,
    "f1Magnitude": 2.1,
    "f2Modulus": 1.81,
    "delta": 3.6,
    "lambda": 113.6
  },
  {
    "year": 1977,
    "day": 347,
    "hour": 12,
    "distAu": 1.7303,
    "f1Magnitude": 2.87,
    "f2Modulus": 2.66,
    "delta": -13.9,
    "lambda": 134.2
  },
  {
    "year": 1977,
    "day": 348,
    "hour": 12,
    "distAu": 1.7408,
    "f1Magnitude": 8.8,
    "f2Modulus": 7.9,
    "delta": -7.7,
    "lambda": 284.4
  },
  {
    "year": 1977,
    "day": 349,
    "hour": 12,
    "distAu": 1.7505,
    "f1Magnitude": 3.36,
    "f2Modulus": 3.29,
    "delta": -27.2,
    "lambda": 287.1
  },
  {
    "year": 1977,
    "day": 351,
    "hour": 12,
    "distAu": 1.7711,
    "f1Magnitude": 1.19,
    "f2Modulus": 1.08,
    "delta": 5.8,
    "lambda": 289.5
  },
  {
    "year": 1977,
    "day": 354,
    "hour": 12,
    "distAu": 1.8022,
    "f1Magnitude": 2.68,
    "f2Modulus": 2.55,
    "delta": -61.6,
    "lambda": 259.8
  },
  {
    "year": 1977,
    "day": 356,
    "hour": 12,
    "distAu": 1.8218,
    "f1Magnitude": 3.56,
    "f2Modulus": 3.55,
    "delta": 28.0,
    "lambda": 71.5
  },
  {
    "year": 1977,
    "day": 358,
    "hour": 12,
    "distAu": 1.8426,
    "f1Magnitude": 4.26,
    "f2Modulus": 3.95,
    "delta": 23.8,
    "lambda": 308.5
  },
  {
    "year": 1977,
    "day": 361,
    "hour": 12,
    "distAu": 1.8736,
    "f1Magnitude": 5.65,
    "f2Modulus": 5.58,
    "delta": 14.5,
    "lambda": 145.4
  },
  {
    "year": 1977,
    "day": 362,
    "hour": 12,
    "distAu": 1.8834,
    "f1Magnitude": 2.44,
    "f2Modulus": 2.42,
    "delta": 29.0,
    "lambda": 216.2
  },
  {
    "year": 1977,
    "day": 363,
    "hour": 12,
    "distAu": 1.8933,
    "f1Magnitude": 1.98,
    "f2Modulus": 1.97,
    "delta": 11.7,
    "lambda": 184.9
  },
  {
    "year": 1977,
    "day": 365,
    "hour": 12,
    "distAu": 1.9134,
    "f1Magnitude": 2.57,
    "f2Modulus": 1.4,
    "delta": -37.9,
    "lambda": 311.8
  }
];

export const REAL_PLS_1977 = [
  {
    "year": 1977,
    "day": 250,
    "hour": 12,
    "speedKmS": 337.9,
    "densityCm3": 8.0824,
    "vThermalKmS": 37.2,
    "vr": 337.6
  },
  {
    "year": 1977,
    "day": 251,
    "hour": 12,
    "speedKmS": 343.4,
    "densityCm3": 13.62427,
    "vThermalKmS": 22.7,
    "vr": 343.1
  },
  {
    "year": 1977,
    "day": 252,
    "hour": 12,
    "speedKmS": 409.5,
    "densityCm3": 5.47736,
    "vThermalKmS": 35.3,
    "vr": 409.3
  },
  {
    "year": 1977,
    "day": 253,
    "hour": 12,
    "speedKmS": 395.5,
    "densityCm3": 5.89706,
    "vThermalKmS": 45.8,
    "vr": 394.6
  },
  {
    "year": 1977,
    "day": 254,
    "hour": 12,
    "speedKmS": 385.7,
    "densityCm3": 9.43708,
    "vThermalKmS": 48.7,
    "vr": 385.7
  },
  {
    "year": 1977,
    "day": 255,
    "hour": 12,
    "speedKmS": 327.2,
    "densityCm3": 5.15628,
    "vThermalKmS": 24.7,
    "vr": 327.1
  },
  {
    "year": 1977,
    "day": 256,
    "hour": 12,
    "speedKmS": 403.2,
    "densityCm3": 6.09918,
    "vThermalKmS": 49.6,
    "vr": 403.0
  },
  {
    "year": 1977,
    "day": 257,
    "hour": 12,
    "speedKmS": 449.4,
    "densityCm3": 5.0836,
    "vThermalKmS": 48.9,
    "vr": 449.0
  },
  {
    "year": 1977,
    "day": 259,
    "hour": 12,
    "speedKmS": 391.5,
    "densityCm3": 9.00913,
    "vThermalKmS": 44.6,
    "vr": 391.1
  },
  {
    "year": 1977,
    "day": 261,
    "hour": 12,
    "speedKmS": 344.8,
    "densityCm3": 11.56092,
    "vThermalKmS": 24.8,
    "vr": 344.6
  },
  {
    "year": 1977,
    "day": 263,
    "hour": 12,
    "speedKmS": 485.1,
    "densityCm3": 1.19928,
    "vThermalKmS": 27.3,
    "vr": 484.6
  },
  {
    "year": 1977,
    "day": 265,
    "hour": 12,
    "speedKmS": 640.0,
    "densityCm3": 2.82913,
    "vThermalKmS": 17.7,
    "vr": 638.8
  },
  {
    "year": 1977,
    "day": 267,
    "hour": 12,
    "speedKmS": 518.6,
    "densityCm3": 1.4766,
    "vThermalKmS": 33.4,
    "vr": 517.6
  },
  {
    "year": 1977,
    "day": 269,
    "hour": 12,
    "speedKmS": 419.1,
    "densityCm3": 5.17966,
    "vThermalKmS": 39.2,
    "vr": 417.8
  },
  {
    "year": 1977,
    "day": 271,
    "hour": 12,
    "speedKmS": 394.7,
    "densityCm3": 6.40295,
    "vThermalKmS": 47.3,
    "vr": 394.6
  },
  {
    "year": 1977,
    "day": 273,
    "hour": 12,
    "speedKmS": 358.6,
    "densityCm3": 34.68399,
    "vThermalKmS": 23.9,
    "vr": 357.7
  },
  {
    "year": 1977,
    "day": 277,
    "hour": 12,
    "speedKmS": 402.2,
    "densityCm3": 16.24771,
    "vThermalKmS": 32.3,
    "vr": 400.2
  },
  {
    "year": 1977,
    "day": 279,
    "hour": 12,
    "speedKmS": 350.2,
    "densityCm3": 10.46222,
    "vThermalKmS": 21.3,
    "vr": 350.0
  },
  {
    "year": 1977,
    "day": 281,
    "hour": 12,
    "speedKmS": 353.0,
    "densityCm3": 4.00087,
    "vThermalKmS": 24.5,
    "vr": 352.2
  },
  {
    "year": 1977,
    "day": 282,
    "hour": 12,
    "speedKmS": 325.9,
    "densityCm3": 3.76399,
    "vThermalKmS": 18.8,
    "vr": 325.9
  },
  {
    "year": 1977,
    "day": 283,
    "hour": 12,
    "speedKmS": 325.2,
    "densityCm3": 7.80945,
    "vThermalKmS": 11.1,
    "vr": 325.0
  },
  {
    "year": 1977,
    "day": 285,
    "hour": 12,
    "speedKmS": 311.3,
    "densityCm3": 8.08679,
    "vThermalKmS": 15.6,
    "vr": 310.9
  },
  {
    "year": 1977,
    "day": 287,
    "hour": 12,
    "speedKmS": 374.0,
    "densityCm3": 6.70919,
    "vThermalKmS": 28.5,
    "vr": 373.6
  },
  {
    "year": 1977,
    "day": 289,
    "hour": 12,
    "speedKmS": 358.5,
    "densityCm3": 3.82584,
    "vThermalKmS": 34.4,
    "vr": 357.3
  },
  {
    "year": 1977,
    "day": 291,
    "hour": 12,
    "speedKmS": 357.7,
    "densityCm3": 3.48235,
    "vThermalKmS": 19.4,
    "vr": 356.9
  },
  {
    "year": 1977,
    "day": 292,
    "hour": 12,
    "speedKmS": 344.0,
    "densityCm3": 6.34922,
    "vThermalKmS": 25.8,
    "vr": 341.5
  },
  {
    "year": 1977,
    "day": 293,
    "hour": 12,
    "speedKmS": 463.8,
    "densityCm3": 3.46453,
    "vThermalKmS": 69.9,
    "vr": 460.8
  },
  {
    "year": 1977,
    "day": 295,
    "hour": 12,
    "speedKmS": 496.7,
    "densityCm3": 0.7447,
    "vThermalKmS": 51.9,
    "vr": 495.7
  },
  {
    "year": 1977,
    "day": 296,
    "hour": 12,
    "speedKmS": 441.3,
    "densityCm3": 1.06,
    "vThermalKmS": 30.6,
    "vr": 440.9
  },
  {
    "year": 1977,
    "day": 297,
    "hour": 12,
    "speedKmS": 391.5,
    "densityCm3": 2.19353,
    "vThermalKmS": 26.3,
    "vr": 391.0
  },
  {
    "year": 1977,
    "day": 298,
    "hour": 12,
    "speedKmS": 339.5,
    "densityCm3": 1.44693,
    "vThermalKmS": 18.2,
    "vr": 339.0
  },
  {
    "year": 1977,
    "day": 299,
    "hour": 12,
    "speedKmS": 340.4,
    "densityCm3": 1.8067,
    "vThermalKmS": 17.6,
    "vr": 339.7
  },
  {
    "year": 1977,
    "day": 300,
    "hour": 12,
    "speedKmS": 316.0,
    "densityCm3": 5.57795,
    "vThermalKmS": 15.5,
    "vr": 313.9
  },
  {
    "year": 1977,
    "day": 301,
    "hour": 12,
    "speedKmS": 364.6,
    "densityCm3": 31.61215,
    "vThermalKmS": 23.6,
    "vr": 363.9
  },
  {
    "year": 1977,
    "day": 303,
    "hour": 12,
    "speedKmS": 473.4,
    "densityCm3": 3.82291,
    "vThermalKmS": 46.2,
    "vr": 472.7
  },
  {
    "year": 1977,
    "day": 304,
    "hour": 12,
    "speedKmS": 478.2,
    "densityCm3": 3.06137,
    "vThermalKmS": 32.8,
    "vr": 477.6
  },
  {
    "year": 1977,
    "day": 305,
    "hour": 12,
    "speedKmS": 392.6,
    "densityCm3": 2.81041,
    "vThermalKmS": 29.0,
    "vr": 392.2
  },
  {
    "year": 1977,
    "day": 306,
    "hour": 12,
    "speedKmS": 435.3,
    "densityCm3": 2.09238,
    "vThermalKmS": 30.4,
    "vr": 434.9
  },
  {
    "year": 1977,
    "day": 307,
    "hour": 12,
    "speedKmS": 399.4,
    "densityCm3": 2.65241,
    "vThermalKmS": 26.5,
    "vr": 399.3
  },
  {
    "year": 1977,
    "day": 308,
    "hour": 12,
    "speedKmS": 390.8,
    "densityCm3": 3.91729,
    "vThermalKmS": 27.7,
    "vr": 390.5
  },
  {
    "year": 1977,
    "day": 309,
    "hour": 12,
    "speedKmS": 387.8,
    "densityCm3": 2.24389,
    "vThermalKmS": 18.4,
    "vr": 387.5
  },
  {
    "year": 1977,
    "day": 310,
    "hour": 12,
    "speedKmS": 361.6,
    "densityCm3": 4.56094,
    "vThermalKmS": 21.6,
    "vr": 361.3
  },
  {
    "year": 1977,
    "day": 311,
    "hour": 12,
    "speedKmS": 341.1,
    "densityCm3": 3.014,
    "vThermalKmS": 12.2,
    "vr": 340.8
  },
  {
    "year": 1977,
    "day": 312,
    "hour": 12,
    "speedKmS": 321.8,
    "densityCm3": 3.13093,
    "vThermalKmS": 16.4,
    "vr": 321.6
  },
  {
    "year": 1977,
    "day": 313,
    "hour": 12,
    "speedKmS": 310.0,
    "densityCm3": 2.66118,
    "vThermalKmS": 8.0,
    "vr": 309.9
  },
  {
    "year": 1977,
    "day": 314,
    "hour": 12,
    "speedKmS": 292.7,
    "densityCm3": 4.63426,
    "vThermalKmS": 16.7,
    "vr": 292.5
  },
  {
    "year": 1977,
    "day": 315,
    "hour": 12,
    "speedKmS": 291.2,
    "densityCm3": 5.33172,
    "vThermalKmS": 17.1,
    "vr": 291.1
  },
  {
    "year": 1977,
    "day": 316,
    "hour": 12,
    "speedKmS": 280.1,
    "densityCm3": 3.4803,
    "vThermalKmS": 12.3,
    "vr": 280.1
  },
  {
    "year": 1977,
    "day": 317,
    "hour": 12,
    "speedKmS": 338.9,
    "densityCm3": 5.77552,
    "vThermalKmS": 30.7,
    "vr": 336.6
  },
  {
    "year": 1977,
    "day": 319,
    "hour": 12,
    "speedKmS": 495.5,
    "densityCm3": 3.4599,
    "vThermalKmS": 38.3,
    "vr": 495.4
  },
  {
    "year": 1977,
    "day": 320,
    "hour": 12,
    "speedKmS": 574.5,
    "densityCm3": 2.85444,
    "vThermalKmS": 61.0,
    "vr": 573.3
  },
  {
    "year": 1977,
    "day": 321,
    "hour": 12,
    "speedKmS": 615.0,
    "densityCm3": 0.76582,
    "vThermalKmS": 28.8,
    "vr": 614.1
  },
  {
    "year": 1977,
    "day": 322,
    "hour": 12,
    "speedKmS": 513.2,
    "densityCm3": 1.23046,
    "vThermalKmS": 30.2,
    "vr": 513.1
  },
  {
    "year": 1977,
    "day": 323,
    "hour": 12,
    "speedKmS": 445.9,
    "densityCm3": 0.81342,
    "vThermalKmS": 25.1,
    "vr": 445.7
  },
  {
    "year": 1977,
    "day": 324,
    "hour": 12,
    "speedKmS": 425.8,
    "densityCm3": 0.97582,
    "vThermalKmS": 24.2,
    "vr": 425.4
  },
  {
    "year": 1977,
    "day": 326,
    "hour": 12,
    "speedKmS": 376.8,
    "densityCm3": 2.33583,
    "vThermalKmS": 28.3,
    "vr": 376.1
  },
  {
    "year": 1977,
    "day": 327,
    "hour": 12,
    "speedKmS": 378.2,
    "densityCm3": 5.298,
    "vThermalKmS": 20.8,
    "vr": 377.7
  },
  {
    "year": 1977,
    "day": 328,
    "hour": 12,
    "speedKmS": 316.1,
    "densityCm3": 2.45551,
    "vThermalKmS": 18.6,
    "vr": 315.5
  },
  {
    "year": 1977,
    "day": 329,
    "hour": 12,
    "speedKmS": 312.0,
    "densityCm3": 4.41041,
    "vThermalKmS": 13.8,
    "vr": 311.9
  },
  {
    "year": 1977,
    "day": 330,
    "hour": 12,
    "speedKmS": 299.7,
    "densityCm3": 5.40236,
    "vThermalKmS": 10.7,
    "vr": 299.7
  },
  {
    "year": 1977,
    "day": 331,
    "hour": 12,
    "speedKmS": 286.4,
    "densityCm3": 6.55447,
    "vThermalKmS": 12.6,
    "vr": 286.4
  },
  {
    "year": 1977,
    "day": 332,
    "hour": 12,
    "speedKmS": 339.1,
    "densityCm3": 9.62263,
    "vThermalKmS": 23.7,
    "vr": 339.0
  },
  {
    "year": 1977,
    "day": 333,
    "hour": 12,
    "speedKmS": 374.1,
    "densityCm3": 13.27157,
    "vThermalKmS": 31.2,
    "vr": 371.7
  },
  {
    "year": 1977,
    "day": 334,
    "hour": 12,
    "speedKmS": 409.0,
    "densityCm3": 2.11146,
    "vThermalKmS": 13.3,
    "vr": 407.9
  },
  {
    "year": 1977,
    "day": 335,
    "hour": 12,
    "speedKmS": 338.6,
    "densityCm3": 2.1083,
    "vThermalKmS": 11.5,
    "vr": 338.2
  },
  {
    "year": 1977,
    "day": 337,
    "hour": 12,
    "speedKmS": 361.8,
    "densityCm3": 2.88686,
    "vThermalKmS": 11.9,
    "vr": 361.7
  },
  {
    "year": 1977,
    "day": 340,
    "hour": 12,
    "speedKmS": 404.6,
    "densityCm3": 1.32645,
    "vThermalKmS": 11.7,
    "vr": 404.5
  },
  {
    "year": 1977,
    "day": 344,
    "hour": 12,
    "speedKmS": 353.4,
    "densityCm3": 3.27286,
    "vThermalKmS": 18.0,
    "vr": 352.5
  },
  {
    "year": 1977,
    "day": 347,
    "hour": 12,
    "speedKmS": 349.9,
    "densityCm3": 2.96542,
    "vThermalKmS": 18.3,
    "vr": 348.4
  },
  {
    "year": 1977,
    "day": 348,
    "hour": 12,
    "speedKmS": 444.5,
    "densityCm3": 5.66135,
    "vThermalKmS": 60.8,
    "vr": 440.8
  },
  {
    "year": 1977,
    "day": 351,
    "hour": 12,
    "speedKmS": 422.1,
    "densityCm3": 0.4369,
    "vThermalKmS": 24.5,
    "vr": 421.4
  },
  {
    "year": 1977,
    "day": 354,
    "hour": 12,
    "speedKmS": 354.6,
    "densityCm3": 3.04231,
    "vThermalKmS": 15.6,
    "vr": 354.2
  },
  {
    "year": 1977,
    "day": 356,
    "hour": 12,
    "speedKmS": 315.1,
    "densityCm3": 3.04727,
    "vThermalKmS": 10.5,
    "vr": 314.8
  },
  {
    "year": 1977,
    "day": 358,
    "hour": 12,
    "speedKmS": 336.8,
    "densityCm3": 3.96685,
    "vThermalKmS": 21.7,
    "vr": 336.5
  },
  {
    "year": 1977,
    "day": 361,
    "hour": 12,
    "speedKmS": 409.1,
    "densityCm3": 3.93268,
    "vThermalKmS": 25.1,
    "vr": 408.5
  },
  {
    "year": 1977,
    "day": 362,
    "hour": 12,
    "speedKmS": 406.8,
    "densityCm3": 1.44477,
    "vThermalKmS": 26.7,
    "vr": 404.7
  },
  {
    "year": 1977,
    "day": 363,
    "hour": 12,
    "speedKmS": 374.8,
    "densityCm3": 1.04715,
    "vThermalKmS": 25.6,
    "vr": 374.8
  },
  {
    "year": 1977,
    "day": 365,
    "hour": 12,
    "speedKmS": 363.6,
    "densityCm3": 5.87563,
    "vThermalKmS": 21.0,
    "vr": 362.6
  }
];

export const REAL_CRS_1977 = [
  {
    "date": "1977-09-08",
    "hCh1_3to4MeV": 631.4,
    "hCh9_74to83MeV": 2.949,
    "heCh16_3to4MeV": 3.758
  },
  {
    "date": "1977-09-09",
    "hCh1_3to4MeV": 17540.0,
    "hCh9_74to83MeV": 5.491,
    "heCh16_3to4MeV": 125.1
  },
  {
    "date": "1977-09-10",
    "hCh1_3to4MeV": 39880.0,
    "hCh9_74to83MeV": 4.14,
    "heCh16_3to4MeV": 366.0
  },
  {
    "date": "1977-09-11",
    "hCh1_3to4MeV": 53040.0,
    "hCh9_74to83MeV": 3.239,
    "heCh16_3to4MeV": 512.0
  },
  {
    "date": "1977-09-12",
    "hCh1_3to4MeV": 40690.0,
    "hCh9_74to83MeV": 1.488,
    "heCh16_3to4MeV": 386.6
  },
  {
    "date": "1977-09-13",
    "hCh1_3to4MeV": 150700.0,
    "hCh9_74to83MeV": 1.276,
    "heCh16_3to4MeV": 2017.0
  },
  {
    "date": "1977-09-14",
    "hCh1_3to4MeV": 120000.0,
    "hCh9_74to83MeV": 1.009,
    "heCh16_3to4MeV": 1608.0
  },
  {
    "date": "1977-09-15",
    "hCh1_3to4MeV": 53940.0,
    "hCh9_74to83MeV": 1.032,
    "heCh16_3to4MeV": 625.6
  },
  {
    "date": "1977-09-16",
    "hCh1_3to4MeV": 24380.0,
    "hCh9_74to83MeV": 3.41,
    "heCh16_3to4MeV": 310.1
  },
  {
    "date": "1977-09-17",
    "hCh1_3to4MeV": 155800.0,
    "hCh9_74to83MeV": 59.31,
    "heCh16_3to4MeV": 453.0
  },
  {
    "date": "1977-10-03",
    "hCh1_3to4MeV": 398.1,
    "hCh9_74to83MeV": 0.0,
    "heCh16_3to4MeV": 4.423
  },
  {
    "date": "1977-10-04",
    "hCh1_3to4MeV": 420.5,
    "hCh9_74to83MeV": 0.0,
    "heCh16_3to4MeV": 4.888
  },
  {
    "date": "1977-10-05",
    "hCh1_3to4MeV": 408.9,
    "hCh9_74to83MeV": 0.0,
    "heCh16_3to4MeV": 7.936
  },
  {
    "date": "1977-10-06",
    "hCh1_3to4MeV": 1002.0,
    "hCh9_74to83MeV": 1.797,
    "heCh16_3to4MeV": 15.27
  },
  {
    "date": "1977-10-07",
    "hCh1_3to4MeV": 1475.0,
    "hCh9_74to83MeV": 0.0,
    "heCh16_3to4MeV": 46.85
  },
  {
    "date": "1977-10-08",
    "hCh1_3to4MeV": 298.7,
    "hCh9_74to83MeV": 0.9916,
    "heCh16_3to4MeV": 11.51
  },
  {
    "date": "1977-10-09",
    "hCh1_3to4MeV": 180.6,
    "hCh9_74to83MeV": 0.7593,
    "heCh16_3to4MeV": 3.287
  },
  {
    "date": "1977-10-10",
    "hCh1_3to4MeV": 87.52,
    "hCh9_74to83MeV": 1.54,
    "heCh16_3to4MeV": 2.248
  },
  {
    "date": "1977-10-11",
    "hCh1_3to4MeV": 72.92,
    "hCh9_74to83MeV": 0.6876,
    "heCh16_3to4MeV": 1.287
  },
  {
    "date": "1977-10-15",
    "hCh1_3to4MeV": 1913.0,
    "hCh9_74to83MeV": 3.031,
    "heCh16_3to4MeV": 27.47
  },
  {
    "date": "1977-10-16",
    "hCh1_3to4MeV": 630.0,
    "hCh9_74to83MeV": 1.015,
    "heCh16_3to4MeV": 5.246
  },
  {
    "date": "1977-10-17",
    "hCh1_3to4MeV": 312.0,
    "hCh9_74to83MeV": 0.0,
    "heCh16_3to4MeV": 3.252
  },
  {
    "date": "1977-10-18",
    "hCh1_3to4MeV": 108.7,
    "hCh9_74to83MeV": 2.892,
    "heCh16_3to4MeV": 0.8435
  },
  {
    "date": "1977-10-19",
    "hCh1_3to4MeV": 48.7,
    "hCh9_74to83MeV": 1.446,
    "heCh16_3to4MeV": 0.3932
  },
  {
    "date": "1977-10-20",
    "hCh1_3to4MeV": 306.9,
    "hCh9_74to83MeV": 1.246,
    "heCh16_3to4MeV": 3.121
  },
  {
    "date": "1977-10-21",
    "hCh1_3to4MeV": 18.87,
    "hCh9_74to83MeV": 1.862,
    "heCh16_3to4MeV": 92.47
  },
  {
    "date": "1977-10-26",
    "hCh1_3to4MeV": 2.877,
    "hCh9_74to83MeV": 1.757,
    "heCh16_3to4MeV": 0.7503
  },
  {
    "date": "1977-10-27",
    "hCh1_3to4MeV": 2.501,
    "hCh9_74to83MeV": 0.0,
    "heCh16_3to4MeV": 0.344
  },
  {
    "date": "1977-10-28",
    "hCh1_3to4MeV": 1.788,
    "hCh9_74to83MeV": 0.0,
    "heCh16_3to4MeV": 0.5079
  },
  {
    "date": "1977-10-29",
    "hCh1_3to4MeV": 0.7782,
    "hCh9_74to83MeV": 1.009,
    "heCh16_3to4MeV": 0.0
  },
  {
    "date": "1977-10-30",
    "hCh1_3to4MeV": 15.23,
    "hCh9_74to83MeV": 1.143,
    "heCh16_3to4MeV": 0.0
  },
  {
    "date": "1977-10-31",
    "hCh1_3to4MeV": 148.2,
    "hCh9_74to83MeV": 0.884,
    "heCh16_3to4MeV": 1.386
  },
  {
    "date": "1977-11-01",
    "hCh1_3to4MeV": 217.6,
    "hCh9_74to83MeV": 2.941,
    "heCh16_3to4MeV": 5.492
  },
  {
    "date": "1977-11-02",
    "hCh1_3to4MeV": 361.1,
    "hCh9_74to83MeV": 0.0,
    "heCh16_3to4MeV": 7.23
  },
  {
    "date": "1977-11-03",
    "hCh1_3to4MeV": 295.8,
    "hCh9_74to83MeV": 3.161,
    "heCh16_3to4MeV": 9.736
  },
  {
    "date": "1977-11-04",
    "hCh1_3to4MeV": 553.5,
    "hCh9_74to83MeV": 0.0,
    "heCh16_3to4MeV": 18.93
  },
  {
    "date": "1977-11-05",
    "hCh1_3to4MeV": 871.0,
    "hCh9_74to83MeV": 2.731,
    "heCh16_3to4MeV": 9.891
  },
  {
    "date": "1977-11-06",
    "hCh1_3to4MeV": 611.3,
    "hCh9_74to83MeV": 0.0,
    "heCh16_3to4MeV": 5.688
  },
  {
    "date": "1977-11-07",
    "hCh1_3to4MeV": 16.22,
    "hCh9_74to83MeV": 1.239,
    "heCh16_3to4MeV": 0.5679
  },
  {
    "date": "1977-11-08",
    "hCh1_3to4MeV": 57.61,
    "hCh9_74to83MeV": 0.0,
    "heCh16_3to4MeV": 1.217
  },
  {
    "date": "1977-11-09",
    "hCh1_3to4MeV": 187.2,
    "hCh9_74to83MeV": 0.0,
    "heCh16_3to4MeV": 1.687
  },
  {
    "date": "1977-12-02",
    "hCh1_3to4MeV": 620.1,
    "hCh9_74to83MeV": 1.218,
    "heCh16_3to4MeV": 11.66
  },
  {
    "date": "1977-12-03",
    "hCh1_3to4MeV": 922.8,
    "hCh9_74to83MeV": 1.322,
    "heCh16_3to4MeV": 17.43
  },
  {
    "date": "1977-12-04",
    "hCh1_3to4MeV": 332.8,
    "hCh9_74to83MeV": 1.163,
    "heCh16_3to4MeV": 6.855
  },
  {
    "date": "1977-12-05",
    "hCh1_3to4MeV": 27.62,
    "hCh9_74to83MeV": 1.56,
    "heCh16_3to4MeV": 0.5546
  },
  {
    "date": "1977-12-06",
    "hCh1_3to4MeV": 15.97,
    "hCh9_74to83MeV": 1.454,
    "heCh16_3to4MeV": 0.5905
  },
  {
    "date": "1977-12-07",
    "hCh1_3to4MeV": 27.74,
    "hCh9_74to83MeV": 0.5814,
    "heCh16_3to4MeV": 0.4709
  },
  {
    "date": "1977-12-08",
    "hCh1_3to4MeV": 45.25,
    "hCh9_74to83MeV": 1.027,
    "heCh16_3to4MeV": 1.309
  },
  {
    "date": "1977-12-09",
    "hCh1_3to4MeV": 22.79,
    "hCh9_74to83MeV": 0.8972,
    "heCh16_3to4MeV": 0.2505
  },
  {
    "date": "1977-12-10",
    "hCh1_3to4MeV": 17.46,
    "hCh9_74to83MeV": 1.105,
    "heCh16_3to4MeV": 0.0
  },
  {
    "date": "1977-12-11",
    "hCh1_3to4MeV": 21.45,
    "hCh9_74to83MeV": 0.9789,
    "heCh16_3to4MeV": 0.7993
  },
  {
    "date": "1977-12-12",
    "hCh1_3to4MeV": 16.97,
    "hCh9_74to83MeV": 0.9053,
    "heCh16_3to4MeV": 0.305
  },
  {
    "date": "1977-12-13",
    "hCh1_3to4MeV": 15.65,
    "hCh9_74to83MeV": 1.205,
    "heCh16_3to4MeV": 0.3632
  },
  {
    "date": "1977-12-14",
    "hCh1_3to4MeV": 28.93,
    "hCh9_74to83MeV": 1.031,
    "heCh16_3to4MeV": 0.3667
  },
  {
    "date": "1977-12-15",
    "hCh1_3to4MeV": 22.73,
    "hCh9_74to83MeV": 1.201,
    "heCh16_3to4MeV": 0.5237
  },
  {
    "date": "1977-12-16",
    "hCh1_3to4MeV": 11.95,
    "hCh9_74to83MeV": 1.157,
    "heCh16_3to4MeV": 0.5055
  },
  {
    "date": "1977-12-17",
    "hCh1_3to4MeV": 16.09,
    "hCh9_74to83MeV": 1.037,
    "heCh16_3to4MeV": 0.802
  },
  {
    "date": "1977-12-18",
    "hCh1_3to4MeV": 17.29,
    "hCh9_74to83MeV": 1.788,
    "heCh16_3to4MeV": 0.3269
  },
  {
    "date": "1977-12-19",
    "hCh1_3to4MeV": 29.08,
    "hCh9_74to83MeV": 1.544,
    "heCh16_3to4MeV": 0.4951
  },
  {
    "date": "1977-12-20",
    "hCh1_3to4MeV": 76.61,
    "hCh9_74to83MeV": 1.214,
    "heCh16_3to4MeV": 0.7058
  },
  {
    "date": "1977-12-21",
    "hCh1_3to4MeV": 45.52,
    "hCh9_74to83MeV": 0.804,
    "heCh16_3to4MeV": 0.7379
  },
  {
    "date": "1977-12-22",
    "hCh1_3to4MeV": 35.37,
    "hCh9_74to83MeV": 1.503,
    "heCh16_3to4MeV": 0.9068
  },
  {
    "date": "1977-12-23",
    "hCh1_3to4MeV": 24.78,
    "hCh9_74to83MeV": 1.262,
    "heCh16_3to4MeV": 0.669
  },
  {
    "date": "1977-12-24",
    "hCh1_3to4MeV": 28.4,
    "hCh9_74to83MeV": 1.393,
    "heCh16_3to4MeV": 0.2992
  },
  {
    "date": "1977-12-25",
    "hCh1_3to4MeV": 31.2,
    "hCh9_74to83MeV": 0.9702,
    "heCh16_3to4MeV": 0.6321
  },
  {
    "date": "1977-12-26",
    "hCh1_3to4MeV": 54.43,
    "hCh9_74to83MeV": 1.059,
    "heCh16_3to4MeV": 1.011
  },
  {
    "date": "1977-12-27",
    "hCh1_3to4MeV": 449.3,
    "hCh9_74to83MeV": 0.9968,
    "heCh16_3to4MeV": 9.029
  },
  {
    "date": "1977-12-30",
    "hCh1_3to4MeV": 1558.0,
    "hCh9_74to83MeV": 1.306,
    "heCh16_3to4MeV": 4.856
  },
  {
    "date": "1977-12-31",
    "hCh1_3to4MeV": 831.1,
    "hCh9_74to83MeV": 1.437,
    "heCh16_3to4MeV": 4.838
  }
];

export const REAL_LECP_1977 = [
  {
    "day": 250,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.29,
    "eb01_rs03": 1.88,
    "eb01_rs04": 1.96,
    "eb01_rs05": 2.01,
    "eb01_rs06": 1.99,
    "eb01_rs07": 2.11,
    "eb01_rs08": 2.06,
    "eb01_rs10_avg": 2.29
  },
  {
    "day": 252,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 6.97,
    "eb01_rs03": 6.89,
    "eb01_rs04": 6.47,
    "eb01_rs05": 5.83,
    "eb01_rs06": 5.62,
    "eb01_rs07": 4.65,
    "eb01_rs08": 2.96,
    "eb01_rs10_avg": 6.14
  },
  {
    "day": 254,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 19.9,
    "eb01_rs03": 19.4,
    "eb01_rs04": 18.1,
    "eb01_rs05": 18.2,
    "eb01_rs06": 17.8,
    "eb01_rs07": 17.3,
    "eb01_rs08": 3.14,
    "eb01_rs10_avg": 18.3
  },
  {
    "day": 256,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 23.4,
    "eb01_rs03": 23.9,
    "eb01_rs04": 23.7,
    "eb01_rs05": 23.7,
    "eb01_rs06": 22.3,
    "eb01_rs07": 21.1,
    "eb01_rs08": 3.3,
    "eb01_rs10_avg": 23.2
  },
  {
    "day": 258,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": -1.0,
    "eb01_rs03": -1.0,
    "eb01_rs04": -1.0,
    "eb01_rs05": -1.0,
    "eb01_rs06": -1.0,
    "eb01_rs07": -1.0,
    "eb01_rs08": 2.98,
    "eb01_rs10_avg": -1.0
  },
  {
    "day": 260,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 39.8,
    "eb01_rs03": 33.5,
    "eb01_rs04": 36.2,
    "eb01_rs05": 36.5,
    "eb01_rs06": 38.9,
    "eb01_rs07": 45.2,
    "eb01_rs08": 4.02,
    "eb01_rs10_avg": 37.9
  },
  {
    "day": 262,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 41.2,
    "eb01_rs03": 27.7,
    "eb01_rs04": 35.3,
    "eb01_rs05": 25.8,
    "eb01_rs06": 31.9,
    "eb01_rs07": 39.6,
    "eb01_rs08": 6.08,
    "eb01_rs10_avg": 35.3
  },
  {
    "day": 264,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 26.4,
    "eb01_rs03": 30.9,
    "eb01_rs04": 29.7,
    "eb01_rs05": 37.6,
    "eb01_rs06": 38.0,
    "eb01_rs07": 23.5,
    "eb01_rs08": 3.38,
    "eb01_rs10_avg": 28.3
  },
  {
    "day": 266,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 3.74,
    "eb01_rs03": 3.6,
    "eb01_rs04": 3.64,
    "eb01_rs05": 3.69,
    "eb01_rs06": 3.49,
    "eb01_rs07": 3.36,
    "eb01_rs08": 2.87,
    "eb01_rs10_avg": 3.61
  },
  {
    "day": 268,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 30.0,
    "eb01_rs03": 30.2,
    "eb01_rs04": 31.0,
    "eb01_rs05": 32.7,
    "eb01_rs06": 35.2,
    "eb01_rs07": 35.6,
    "eb01_rs08": 3.76,
    "eb01_rs10_avg": 32.6
  },
  {
    "day": 270,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 7.17,
    "eb01_rs03": 6.59,
    "eb01_rs04": 7.35,
    "eb01_rs05": 6.52,
    "eb01_rs06": 7.32,
    "eb01_rs07": 7.76,
    "eb01_rs08": 2.88,
    "eb01_rs10_avg": 7.17
  },
  {
    "day": 272,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 3.14,
    "eb01_rs03": 3.24,
    "eb01_rs04": 3.34,
    "eb01_rs05": 3.23,
    "eb01_rs06": 3.26,
    "eb01_rs07": 3.19,
    "eb01_rs08": 2.95,
    "eb01_rs10_avg": 3.22
  },
  {
    "day": 274,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.44,
    "eb01_rs03": 2.48,
    "eb01_rs04": 2.52,
    "eb01_rs05": 2.45,
    "eb01_rs06": 2.42,
    "eb01_rs07": 2.45,
    "eb01_rs08": 2.94,
    "eb01_rs10_avg": 2.46
  },
  {
    "day": 276,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.22,
    "eb01_rs03": 2.23,
    "eb01_rs04": 2.21,
    "eb01_rs05": 2.18,
    "eb01_rs06": 2.17,
    "eb01_rs07": 2.19,
    "eb01_rs08": 2.84,
    "eb01_rs10_avg": 2.2
  },
  {
    "day": 278,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.19,
    "eb01_rs03": 2.36,
    "eb01_rs04": 2.37,
    "eb01_rs05": 2.31,
    "eb01_rs06": 2.31,
    "eb01_rs07": 2.34,
    "eb01_rs08": 2.84,
    "eb01_rs10_avg": 2.31
  },
  {
    "day": 280,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 4.2,
    "eb01_rs03": 3.99,
    "eb01_rs04": 4.0,
    "eb01_rs05": 3.85,
    "eb01_rs06": 3.93,
    "eb01_rs07": 3.79,
    "eb01_rs08": 3.07,
    "eb01_rs10_avg": 3.92
  },
  {
    "day": 282,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.41,
    "eb01_rs03": 2.4,
    "eb01_rs04": 2.38,
    "eb01_rs05": 2.33,
    "eb01_rs06": 2.32,
    "eb01_rs07": 2.3,
    "eb01_rs08": 2.89,
    "eb01_rs10_avg": 2.36
  },
  {
    "day": 284,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.02,
    "eb01_rs03": 2.0,
    "eb01_rs04": 2.0,
    "eb01_rs05": 2.08,
    "eb01_rs06": 1.98,
    "eb01_rs07": 2.01,
    "eb01_rs08": 2.89,
    "eb01_rs10_avg": 2.01
  },
  {
    "day": 286,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.43,
    "eb01_rs03": 2.43,
    "eb01_rs04": 2.39,
    "eb01_rs05": 2.39,
    "eb01_rs06": 2.36,
    "eb01_rs07": 2.34,
    "eb01_rs08": 2.89,
    "eb01_rs10_avg": 2.38
  },
  {
    "day": 288,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.41,
    "eb01_rs03": 2.41,
    "eb01_rs04": 2.33,
    "eb01_rs05": 2.43,
    "eb01_rs06": 2.35,
    "eb01_rs07": 2.44,
    "eb01_rs08": 2.97,
    "eb01_rs10_avg": 2.42
  },
  {
    "day": 290,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 1.98,
    "eb01_rs03": 2.0,
    "eb01_rs04": 2.0,
    "eb01_rs05": 1.96,
    "eb01_rs06": 1.96,
    "eb01_rs07": 1.93,
    "eb01_rs08": 2.95,
    "eb01_rs10_avg": 1.99
  },
  {
    "day": 292,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.08,
    "eb01_rs03": 2.04,
    "eb01_rs04": 2.13,
    "eb01_rs05": 2.1,
    "eb01_rs06": 2.08,
    "eb01_rs07": 2.1,
    "eb01_rs08": 3.11,
    "eb01_rs10_avg": 2.1
  },
  {
    "day": 294,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.04,
    "eb01_rs03": 2.06,
    "eb01_rs04": 2.05,
    "eb01_rs05": 2.05,
    "eb01_rs06": 2.07,
    "eb01_rs07": 2.14,
    "eb01_rs08": 3.03,
    "eb01_rs10_avg": 2.07
  },
  {
    "day": 296,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.1,
    "eb01_rs03": 2.04,
    "eb01_rs04": 2.08,
    "eb01_rs05": 2.1,
    "eb01_rs06": 2.06,
    "eb01_rs07": 2.48,
    "eb01_rs08": 2.97,
    "eb01_rs10_avg": 2.2
  },
  {
    "day": 298,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.12,
    "eb01_rs03": 2.11,
    "eb01_rs04": 2.12,
    "eb01_rs05": 2.08,
    "eb01_rs06": 2.11,
    "eb01_rs07": 2.15,
    "eb01_rs08": 3.04,
    "eb01_rs10_avg": 2.1
  },
  {
    "day": 300,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 1.98,
    "eb01_rs03": 2.01,
    "eb01_rs04": 2.03,
    "eb01_rs05": 2.02,
    "eb01_rs06": 2.04,
    "eb01_rs07": 2.03,
    "eb01_rs08": 3.1,
    "eb01_rs10_avg": 2.02
  },
  {
    "day": 302,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.1,
    "eb01_rs03": 2.06,
    "eb01_rs04": 2.03,
    "eb01_rs05": 2.04,
    "eb01_rs06": 2.08,
    "eb01_rs07": 2.08,
    "eb01_rs08": 3.14,
    "eb01_rs10_avg": 2.07
  },
  {
    "day": 304,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.42,
    "eb01_rs03": 2.38,
    "eb01_rs04": 2.4,
    "eb01_rs05": 2.47,
    "eb01_rs06": 2.43,
    "eb01_rs07": 2.43,
    "eb01_rs08": 3.42,
    "eb01_rs10_avg": 2.4
  },
  {
    "day": 306,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.44,
    "eb01_rs03": 2.45,
    "eb01_rs04": 2.47,
    "eb01_rs05": 2.32,
    "eb01_rs06": 2.46,
    "eb01_rs07": 2.45,
    "eb01_rs08": 3.34,
    "eb01_rs10_avg": 2.45
  },
  {
    "day": 308,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.22,
    "eb01_rs03": 2.19,
    "eb01_rs04": 2.33,
    "eb01_rs05": 2.27,
    "eb01_rs06": 2.31,
    "eb01_rs07": 2.31,
    "eb01_rs08": 2.41,
    "eb01_rs10_avg": 2.29
  },
  {
    "day": 310,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.69,
    "eb01_rs03": 2.68,
    "eb01_rs04": 2.58,
    "eb01_rs05": 2.6,
    "eb01_rs06": 2.7,
    "eb01_rs07": 2.71,
    "eb01_rs08": 2.18,
    "eb01_rs10_avg": 2.65
  },
  {
    "day": 312,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 1.44,
    "eb01_rs03": 1.48,
    "eb01_rs04": 1.44,
    "eb01_rs05": 1.67,
    "eb01_rs06": 1.82,
    "eb01_rs07": 1.69,
    "eb01_rs08": 2.13,
    "eb01_rs10_avg": 1.59
  },
  {
    "day": 314,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.07,
    "eb01_rs03": 2.08,
    "eb01_rs04": 1.9,
    "eb01_rs05": 1.92,
    "eb01_rs06": 1.96,
    "eb01_rs07": 1.98,
    "eb01_rs08": 2.18,
    "eb01_rs10_avg": 1.99
  },
  {
    "day": 316,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.29,
    "eb01_rs03": 2.21,
    "eb01_rs04": 2.25,
    "eb01_rs05": 2.33,
    "eb01_rs06": 2.4,
    "eb01_rs07": 2.4,
    "eb01_rs08": 2.89,
    "eb01_rs10_avg": 2.33
  },
  {
    "day": 318,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 1.92,
    "eb01_rs03": 1.91,
    "eb01_rs04": 1.94,
    "eb01_rs05": 1.96,
    "eb01_rs06": 2.0,
    "eb01_rs07": 1.95,
    "eb01_rs08": 2.83,
    "eb01_rs10_avg": 1.96
  },
  {
    "day": 320,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.22,
    "eb01_rs03": 2.17,
    "eb01_rs04": 2.21,
    "eb01_rs05": 2.19,
    "eb01_rs06": 2.19,
    "eb01_rs07": 2.22,
    "eb01_rs08": 3.28,
    "eb01_rs10_avg": 2.2
  },
  {
    "day": 322,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.13,
    "eb01_rs03": 2.14,
    "eb01_rs04": 2.16,
    "eb01_rs05": 2.13,
    "eb01_rs06": 2.14,
    "eb01_rs07": 2.22,
    "eb01_rs08": 3.15,
    "eb01_rs10_avg": 2.17
  },
  {
    "day": 324,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.17,
    "eb01_rs03": 2.21,
    "eb01_rs04": 2.17,
    "eb01_rs05": 2.19,
    "eb01_rs06": 2.18,
    "eb01_rs07": 2.25,
    "eb01_rs08": 3.15,
    "eb01_rs10_avg": 2.2
  },
  {
    "day": 326,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 18.3,
    "eb01_rs03": 10.4,
    "eb01_rs04": 7.3,
    "eb01_rs05": 7.86,
    "eb01_rs06": 7.88,
    "eb01_rs07": 11.1,
    "eb01_rs08": 3.6,
    "eb01_rs10_avg": 8.96
  },
  {
    "day": 328,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 7.42,
    "eb01_rs03": 7.29,
    "eb01_rs04": 6.89,
    "eb01_rs05": 7.12,
    "eb01_rs06": 7.47,
    "eb01_rs07": 7.33,
    "eb01_rs08": 3.11,
    "eb01_rs10_avg": 7.26
  },
  {
    "day": 330,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 4.49,
    "eb01_rs03": 4.55,
    "eb01_rs04": 4.5,
    "eb01_rs05": 4.5,
    "eb01_rs06": 4.53,
    "eb01_rs07": 4.45,
    "eb01_rs08": 3.19,
    "eb01_rs10_avg": 4.49
  },
  {
    "day": 332,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.63,
    "eb01_rs03": 2.71,
    "eb01_rs04": 2.6,
    "eb01_rs05": 2.71,
    "eb01_rs06": 2.53,
    "eb01_rs07": 2.67,
    "eb01_rs08": 2.76,
    "eb01_rs10_avg": 2.66
  },
  {
    "day": 334,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.22,
    "eb01_rs03": 2.25,
    "eb01_rs04": 2.2,
    "eb01_rs05": 2.22,
    "eb01_rs06": 2.25,
    "eb01_rs07": 2.25,
    "eb01_rs08": 3.08,
    "eb01_rs10_avg": 2.23
  },
  {
    "day": 336,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.34,
    "eb01_rs03": 2.48,
    "eb01_rs04": 2.35,
    "eb01_rs05": 2.34,
    "eb01_rs06": 2.34,
    "eb01_rs07": 2.32,
    "eb01_rs08": 2.96,
    "eb01_rs10_avg": 2.33
  },
  {
    "day": 338,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.4,
    "eb01_rs03": 2.35,
    "eb01_rs04": 2.35,
    "eb01_rs05": 2.34,
    "eb01_rs06": 2.35,
    "eb01_rs07": 2.38,
    "eb01_rs08": 3.11,
    "eb01_rs10_avg": 2.37
  },
  {
    "day": 340,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.01,
    "eb01_rs03": 1.98,
    "eb01_rs04": 2.0,
    "eb01_rs05": 2.01,
    "eb01_rs06": 2.01,
    "eb01_rs07": 2.01,
    "eb01_rs08": 3.04,
    "eb01_rs10_avg": 2.01
  },
  {
    "day": 342,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.14,
    "eb01_rs03": 2.11,
    "eb01_rs04": 2.13,
    "eb01_rs05": 2.11,
    "eb01_rs06": 2.18,
    "eb01_rs07": 2.11,
    "eb01_rs08": 3.11,
    "eb01_rs10_avg": 2.12
  },
  {
    "day": 344,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 1.99,
    "eb01_rs03": 2.01,
    "eb01_rs04": 2.03,
    "eb01_rs05": 1.99,
    "eb01_rs06": 2.02,
    "eb01_rs07": 2.04,
    "eb01_rs08": 3.02,
    "eb01_rs10_avg": 2.02
  },
  {
    "day": 346,
    "eb01_rs01_shield": 1.5,
    "eb01_rs02": 1.91,
    "eb01_rs03": 1.97,
    "eb01_rs04": 1.9,
    "eb01_rs05": 1.91,
    "eb01_rs06": 2.05,
    "eb01_rs07": 1.92,
    "eb01_rs08": 2.98,
    "eb01_rs10_avg": 2.05
  },
  {
    "day": 348,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.03,
    "eb01_rs03": 2.06,
    "eb01_rs04": 2.07,
    "eb01_rs05": 2.26,
    "eb01_rs06": 2.29,
    "eb01_rs07": 2.22,
    "eb01_rs08": 3.03,
    "eb01_rs10_avg": 2.22
  },
  {
    "day": 350,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.07,
    "eb01_rs03": 1.98,
    "eb01_rs04": 2.0,
    "eb01_rs05": 2.01,
    "eb01_rs06": 1.99,
    "eb01_rs07": 1.91,
    "eb01_rs08": 3.0,
    "eb01_rs10_avg": 2.0
  },
  {
    "day": 352,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.29,
    "eb01_rs03": 2.27,
    "eb01_rs04": 2.27,
    "eb01_rs05": 2.25,
    "eb01_rs06": 2.3,
    "eb01_rs07": 2.29,
    "eb01_rs08": 3.27,
    "eb01_rs10_avg": 2.27
  },
  {
    "day": 354,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.63,
    "eb01_rs03": 2.26,
    "eb01_rs04": 2.21,
    "eb01_rs05": 2.26,
    "eb01_rs06": 2.26,
    "eb01_rs07": 2.24,
    "eb01_rs08": 3.27,
    "eb01_rs10_avg": 2.29
  },
  {
    "day": 356,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.84,
    "eb01_rs03": 2.15,
    "eb01_rs04": 2.18,
    "eb01_rs05": 2.18,
    "eb01_rs06": 2.14,
    "eb01_rs07": 2.12,
    "eb01_rs08": 3.12,
    "eb01_rs10_avg": 2.28
  },
  {
    "day": 358,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 2.83,
    "eb01_rs03": 2.16,
    "eb01_rs04": 2.13,
    "eb01_rs05": 2.11,
    "eb01_rs06": 2.14,
    "eb01_rs07": 2.17,
    "eb01_rs08": 3.18,
    "eb01_rs10_avg": 2.27
  },
  {
    "day": 360,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 3.31,
    "eb01_rs03": 2.64,
    "eb01_rs04": 2.65,
    "eb01_rs05": 2.63,
    "eb01_rs06": 2.63,
    "eb01_rs07": 2.67,
    "eb01_rs08": 3.22,
    "eb01_rs10_avg": 2.74
  },
  {
    "day": 362,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 4.68,
    "eb01_rs03": 3.83,
    "eb01_rs04": 3.81,
    "eb01_rs05": 3.77,
    "eb01_rs06": 3.88,
    "eb01_rs07": 3.91,
    "eb01_rs08": 3.35,
    "eb01_rs10_avg": 4.03
  },
  {
    "day": 364,
    "eb01_rs01_shield": -1.0,
    "eb01_rs02": 3.24,
    "eb01_rs03": 2.54,
    "eb01_rs04": 2.57,
    "eb01_rs05": 2.55,
    "eb01_rs06": 2.55,
    "eb01_rs07": 2.56,
    "eb01_rs08": 3.27,
    "eb01_rs10_avg": 2.69
  }
];

export const REAL_PWS_LAUNCH_SPECTRUM = [
  {
    "channel": 1,
    "freqHz": 10.0,
    "label": "10.0 Hz",
    "eFieldV_m": 0.000142
  },
  {
    "channel": 2,
    "freqHz": 17.8,
    "label": "17.8 Hz",
    "eFieldV_m": 8.75e-05
  },
  {
    "channel": 3,
    "freqHz": 31.1,
    "label": "31.1 Hz",
    "eFieldV_m": 4.12e-05
  },
  {
    "channel": 4,
    "freqHz": 56.2,
    "label": "56.2 Hz",
    "eFieldV_m": 2.3e-05
  },
  {
    "channel": 5,
    "freqHz": 100.0,
    "label": "100.0 Hz",
    "eFieldV_m": 1.15e-05
  },
  {
    "channel": 6,
    "freqHz": 178.0,
    "label": "178.0 Hz",
    "eFieldV_m": 6.8e-06
  },
  {
    "channel": 7,
    "freqHz": 311.0,
    "label": "311.0 Hz",
    "eFieldV_m": 3.9e-06
  },
  {
    "channel": 8,
    "freqHz": 562.0,
    "label": "562.0 Hz",
    "eFieldV_m": 2.1e-06
  },
  {
    "channel": 9,
    "freqHz": 1000.0,
    "label": "1.00 kHz",
    "eFieldV_m": 1.25e-06
  },
  {
    "channel": 10,
    "freqHz": 1780.0,
    "label": "1.78 kHz",
    "eFieldV_m": 8.4e-07
  },
  {
    "channel": 11,
    "freqHz": 3110.0,
    "label": "3.11 kHz",
    "eFieldV_m": 5.1e-07
  },
  {
    "channel": 12,
    "freqHz": 5620.0,
    "label": "5.62 kHz",
    "eFieldV_m": 3.2e-07
  },
  {
    "channel": 13,
    "freqHz": 10000.0,
    "label": "10.0 kHz",
    "eFieldV_m": 2.1e-07
  },
  {
    "channel": 14,
    "freqHz": 17800.0,
    "label": "17.8 kHz",
    "eFieldV_m": 1.45e-07
  },
  {
    "channel": 15,
    "freqHz": 31100.0,
    "label": "31.1 kHz",
    "eFieldV_m": 9.8e-08
  },
  {
    "channel": 16,
    "freqHz": 56200.0,
    "label": "56.2 kHz",
    "eFieldV_m": 6.2e-08
  }
];

export const DATASET_METADATA = {
  trajectory: {
    name: "Voyager 1 Interplanetary Cruise Trajectory Ephemeris",
    instrument: "Satellite Situation Center (SSC) / GTDS Orbit Code",
    pi: "R. P. Parthasarathy / NASA GSFC",
    coverage: "1977-09-09 to 2005-01-24 (10,000 Daily Records)",
    units: "Radial Distance in Astronomical Units (AU), Heliographic Latitude/Longitude (degrees)",
    sourceUrl: "https://spdf.gsfc.nasa.gov/pub/data/voyager/voyager1/trajectory/ssc/",
    processingNotes: "Computed numerical ephemeris initialized on Day 252 (post Earth-escape injection). Excludes near-Earth ascent. NOT raw Doppler tracking points."
  },
  mag: {
    name: "Voyager 1 Triaxial Fluxgate Magnetometer Hourly Interplanetary IMF",
    instrument: "Dual Triaxial Fluxgate Magnetometers (MAG)",
    pi: "Dr. Norman F. Ness, Bartol Research Institute / NASA GSFC",
    coverage: "1977-09-05 to 1989-12-31 (107,982 Hourly Records)",
    units: "nanoTesla (nT)",
    sourceUrl: "https://spdf.gsfc.nasa.gov/pub/data/voyager/voyager1/magnetic_fields/hourly/",
    processingNotes: "F1 is 48-second field magnitude average. F2 is vector modulus. RTN components: BR = F2*cos(lambda)*cos(delta), BT = F2*sin(lambda)*cos(delta), BN = F2*sin(delta). Missing/fill data is 0.0."
  },
  pls: {
    name: "Voyager 1 MIT Hourly Solar Wind Plasma Observations",
    instrument: "Plasma Science Experiment (PLS)",
    pi: "Dr. Herbert S. Bridge & Dr. John Richardson, MIT",
    coverage: "1977-09-07 to 1977-12-31 (Day 250 Hr 11 to Day 365 Hr 14)",
    units: "Proton speed in km/s, number density in cm^-3, thermal speed in km/s",
    sourceUrl: "https://spdf.gsfc.nasa.gov/pub/data/voyager/voyager1/plasma/hour/",
    processingNotes: "Convected isotropic Maxwellian distribution fit. One-sigma speed errors <0.5%, density errors <5%. Gaps reflect periods without telemetry coverage."
  },
  crs: {
    name: "Voyager 1 Cosmic Ray Subsystem Daily Particle Fluxes",
    instrument: "Cosmic Ray Subsystem (CRS)",
    pi: "Dr. Rochus E. Vogt, California Institute of Technology",
    coverage: "1977-09-08 to 1977-12-31 (69 Daily Records)",
    units: "Particles / (cm^2 * s * sr * MeV/n)",
    sourceUrl: "https://spdf.gsfc.nasa.gov/pub/data/voyager/voyager1/cosmic_rays/ascii/daily/",
    processingNotes: "Self-describing embedded header with 31 channels (15 Hydrogen channels 3.0 to 346 MeV/n, 16 Helium channels 3.0 to 661 MeV/n)."
  },
  lecp: {
    name: "Voyager 1 Low Energy Charged Particle Daily Angular Sector Rates",
    instrument: "Low Energy Charged Particle (LECP) Stepping Detector",
    pi: "Dr. Stamatios M. Krimigis, Johns Hopkins University Applied Physics Laboratory (JHU/APL)",
    coverage: "1977-09-07 to 1977-12-30 (Day 250 to 364)",
    units: "Counts / second per angular viewing sector",
    sourceUrl: "https://pds-ppi.igpp.ucla.edu/mission/Voyager%201/V1/LECP",
    processingNotes: "EB01 is Electron Band 01 (22-35 keV). RS01-RS08 are eight 45-degree angular viewing sectors. Sector 1 is blocked by an internal RTG shield on Voyager 1 (designated fill value -1.00). RS09 is background, RS10 is open sector average."
  },
  pws: {
    name: "Voyager 1 Plasma Wave Subsystem 16-Channel Spectrum Analyzer Launch Data",
    instrument: "Plasma Wave Subsystem (PWS)",
    pi: "Dr. Frederick L. Scarf (TRW) & Dr. Donald A. Gurnett (Univ. of Iowa)",
    coverage: "1977-09-05T14:20:23 to 1977-09-05T23:59:43 (8,523 Records)",
    units: "Calibrated root-mean-square Electric Field in Volts per meter (V/m)",
    sourceUrl: "https://spdf.gsfc.nasa.gov/pub/data/voyager/voyager1/plasma_waves/low_rate/cdf/1977/",
    processingNotes: "Stored in NASA CDF format. Units are explicitly V/m (NOT spectral power density V^2/(m^2*Hz)). 16 channels logarithmically spaced from 10.0 Hz to 56.2 kHz."
  }
};
