// ============================================================
// CAMPUS LOCATION DATA
// ------------------------------------------------------------
// Coordinates below are APPROXIMATE placeholders centered near
// LPU Phagwara's actual campus (31.2540° N, 75.7042° E).
// Replace lat/lng with exact values before submitting:
//   1. Open openstreetmap.org, search "LPU Phagwara"
//   2. Right-click each real building -> "Show address"
//   3. Copy the lat/lng shown into the entries below
// ============================================================

const CAMPUS_CENTER = [31.2540, 75.7042];
const CAMPUS_ZOOM = 16;

const CATEGORIES = {
  academic:  { label: "Academic Block",  color: "#7A1F2B" },
  hostel:    { label: "Hostel",          color: "#C08A3E" },
  food:      { label: "Food & Dining",   color: "#3E7A4C" },
  sports:    { label: "Sports",          color: "#2C5F8A" },
  admin:     { label: "Admin / Gate",    color: "#5A5044" },
  other:     { label: "Other",           color: "#8A5FA6" }
};

const LOCATIONS = [
  { name: "Main Gate",              category: "admin",   lat: 31.2555, lng: 75.7035, info: "Primary entrance off GT Road." },
  { name: "Block 32 (CSE/CA)",      category: "academic", lat: 31.2542, lng: 75.7051, info: "Computer Science & Applications." },
  { name: "Block 34",               category: "academic", lat: 31.2538, lng: 75.7047, info: "Engineering labs." },
  { name: "Block 38",               category: "academic", lat: 31.2534, lng: 75.7055, info: "Lecture theatres." },
  { name: "Central Library",        category: "academic", lat: 31.2547, lng: 75.7044, info: "24-hour reading halls." },
  { name: "Boys Hostel BH-1",       category: "hostel",   lat: 31.2520, lng: 75.7020, info: "First-year boys hostel." },
  { name: "Girls Hostel GH-1",      category: "hostel",   lat: 31.2515, lng: 75.7060, info: "First-year girls hostel." },
  { name: "Uni Mall / Food Court",  category: "food",     lat: 31.2530, lng: 75.7040, info: "Cafes, food stalls, ATMs." },
  { name: "Domino's Corner",        category: "food",     lat: 31.2532, lng: 75.7038, info: "Popular late-night spot." },
  { name: "Cricket Ground",         category: "sports",   lat: 31.2500, lng: 75.7070, info: "Main sports complex." },
  { name: "Indoor Sports Complex",  category: "sports",   lat: 31.2505, lng: 75.7065, info: "Badminton, table tennis, gym." },
  { name: "Admin Block",            category: "admin",    lat: 31.2549, lng: 75.7040, info: "Registrar & administration." },
  { name: "Open Air Theatre (OAT)", category: "other",    lat: 31.2528, lng: 75.7048, info: "Hackathons & events held here." }
];
