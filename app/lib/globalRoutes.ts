export type GlobalRoute = {
  id: string;

  // Display (derived codes only for public UI)
  fromCode: string;
  toCode: string;

  // Full city & region details (internal / expandable)
  fromCity: string;
  fromCountry: string;
  toCity: string;
  toCountry: string;

  // Geographic coordinates (for globe & map)
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;

  // Conceptual performance
  estimatedTimeMin: number;
  trajectoryType: "SUBORBITAL";
  altitudeClass: "LOW_SUBORBITAL" | "HIGH_SUBORBITAL";

  // Status flags
  maturity: "CONCEPT" | "STUDY" | "FUTURE";
  notes: string;
};

export const GLOBAL_ROUTES: GlobalRoute[] = [
  {
    id: "NYC-LDN",
    fromCode: "NYC",
    toCode: "LDN",
    fromCity: "New York",
    fromCountry: "United States",
    toCity: "London",
    toCountry: "United Kingdom",
    startLat: 40.7,
    startLng: -74.0,
    endLat: 51.5,
    endLng: -0.1,
    estimatedTimeMin: 29,
    trajectoryType: "SUBORBITAL",
    altitudeClass: "HIGH_SUBORBITAL",
    maturity: "CONCEPT",
    notes: "Transatlantic great-circle suborbital profile",
  },
  {
    id: "TYO-LAX",
    fromCode: "TYO",
    toCode: "LAX",
    fromCity: "Tokyo",
    fromCountry: "Japan",
    toCity: "Los Angeles",
    toCountry: "United States",
    startLat: 35.6,
    startLng: 139.7,
    endLat: 34.0,
    endLng: -118.2,
    estimatedTimeMin: 35,
    trajectoryType: "SUBORBITAL",
    altitudeClass: "HIGH_SUBORBITAL",
    maturity: "CONCEPT",
    notes: "Pacific crossing with long coast phase",
  },
  {
    id: "DXB-SYD",
    fromCode: "DXB",
    toCode: "SYD",
    fromCity: "Dubai",
    fromCountry: "United Arab Emirates",
    toCity: "Sydney",
    toCountry: "Australia",
    startLat: 25.2,
    startLng: 55.3,
    endLat: -33.9,
    endLng: 151.2,
    estimatedTimeMin: 41,
    trajectoryType: "SUBORBITAL",
    altitudeClass: "HIGH_SUBORBITAL",
    maturity: "CONCEPT",
    notes: "Southern hemisphere intercontinental profile",
  },
  {
    id: "BLR-PAR",
    fromCode: "BLR",
    toCode: "PAR",
    fromCity: "Bengaluru",
    fromCountry: "India",
    toCity: "Paris",
    toCountry: "France",
    startLat: 12.9,
    startLng: 77.6,
    endLat: 48.8,
    endLng: 2.3,
    estimatedTimeMin: 32,
    trajectoryType: "SUBORBITAL",
    altitudeClass: "HIGH_SUBORBITAL",
    maturity: "CONCEPT",
    notes: "Eurasian suborbital corridor",
  },


  {
    id: "SFO-SIN",
    fromCode: "SFO",
    toCode: "SIN",
    fromCity: "San Francisco",
    fromCountry: "United States",
    toCity: "Singapore",
    toCountry: "Singapore",
    startLat: 37.6,
    startLng: -122.4,
    endLat: 1.35,
    endLng: 103.8,
    estimatedTimeMin: 44,
    trajectoryType: "SUBORBITAL",
    altitudeClass: "HIGH_SUBORBITAL",
    maturity: "CONCEPT",
    notes: "Ultra-long-haul transpacific route",
  },
  {
    id: "JNB-FRA",
    fromCode: "JNB",
    toCode: "FRA",
    fromCity: "Johannesburg",
    fromCountry: "South Africa",
    toCity: "Frankfurt",
    toCountry: "Germany",
    startLat: -26.2,
    startLng: 28.0,
    endLat: 50.1,
    endLng: 8.7,
    estimatedTimeMin: 34,
    trajectoryType: "SUBORBITAL",
    altitudeClass: "HIGH_SUBORBITAL",
    maturity: "CONCEPT",
    notes: "Africa–Europe corridor",
  },
];
