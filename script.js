// ============================================================
// MAP INITIALIZATION
// ============================================================
const map = L.map('map').setView(CAMPUS_CENTER, CAMPUS_ZOOM);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// ============================================================
// CUSTOM MARKER ICON (colored dot per category)
// ============================================================
function makeIcon(color) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:18px; height:18px; border-radius:50%;
      background:${color}; border:2.5px solid #FAF7F2;
      box-shadow:0 2px 6px rgba(0,0,0,0.35);
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10]
  });
}

// ============================================================
// STATE
// ============================================================
let activeCategory = null;   // null = show all
const markerByName = {};     // name -> Leaflet marker, for search/select

// ============================================================
// BUILD MARKERS
// ============================================================
LOCATIONS.forEach(loc => {
  const cat = CATEGORIES[loc.category];
  const marker = L.marker([loc.lat, loc.lng], { icon: makeIcon(cat.color) })
    .addTo(map)
    .bindPopup(`
      <div class="popup-title">${loc.name}</div>
      <div class="popup-info">${loc.info}</div>
    `);
  markerByName[loc.name] = marker;
});

// ============================================================
// SIDEBAR: CATEGORY FILTER CHIPS
// ============================================================
const filtersEl = document.getElementById('filters');

function renderChips() {
  filtersEl.innerHTML = '';

  const allChip = document.createElement('button');
  allChip.className = 'chip' + (activeCategory === null ? ' active' : '');
  allChip.textContent = 'All';
  allChip.onclick = () => { activeCategory = null; renderChips(); renderList(); };
  filtersEl.appendChild(allChip);

  Object.entries(CATEGORIES).forEach(([key, cat]) => {
    const chip = document.createElement('button');
    chip.className = 'chip' + (activeCategory === key ? ' active' : '');
    chip.style.color = activeCategory === key ? cat.color : '';
    chip.innerHTML = `<span class="dot" style="background:${cat.color}"></span>${cat.label}`;
    chip.onclick = () => { activeCategory = key; renderChips(); renderList(); };
    filtersEl.appendChild(chip);
  });
}

// ============================================================
// SIDEBAR: LOCATION LIST
// ============================================================
const listEl = document.getElementById('locationList');
const countEl = document.getElementById('resultCount');

function renderList() {
  const visible = LOCATIONS.filter(l => !activeCategory || l.category === activeCategory);
  listEl.innerHTML = '';

  visible.forEach(loc => {
    const cat = CATEGORIES[loc.category];
    const card = document.createElement('div');
    card.className = 'loc-card';
    card.innerHTML = `
      <div class="loc-name"><span class="dot" style="background:${cat.color}"></span>${loc.name}</div>
      <div class="loc-info">${loc.info}</div>
    `;
    card.onclick = () => flyToLocation(loc.name);
    listEl.appendChild(card);
  });

  countEl.textContent = visible.length;

  // toggle marker visibility on the map to match the filter
  LOCATIONS.forEach(loc => {
    const m = markerByName[loc.name];
    const show = !activeCategory || loc.category === activeCategory;
    if (show) { if (!map.hasLayer(m)) m.addTo(map); }
    else { if (map.hasLayer(m)) map.removeLayer(m); }
  });
}

function flyToLocation(name) {
  const loc = LOCATIONS.find(l => l.name === name);
  if (!loc) return;
  map.flyTo([loc.lat, loc.lng], 18, { duration: 0.8 });
  markerByName[name].openPopup();
}

// ============================================================
// SEARCH BOX
// ============================================================
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchResults.classList.add('hidden'); return; }

  const matches = LOCATIONS.filter(l => l.name.toLowerCase().includes(q)).slice(0, 6);
  searchResults.innerHTML = '';

  if (matches.length === 0) {
    searchResults.classList.add('hidden');
    return;
  }

  matches.forEach(loc => {
    const li = document.createElement('li');
    li.textContent = loc.name;
    li.onclick = () => {
      flyToLocation(loc.name);
      searchInput.value = loc.name;
      searchResults.classList.add('hidden');
    };
    searchResults.appendChild(li);
  });

  searchResults.classList.remove('hidden');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-wrap')) searchResults.classList.add('hidden');
});

// ============================================================
// LEGEND
// ============================================================
const legendEl = document.getElementById('legend');
Object.values(CATEGORIES).forEach(cat => {
  const row = document.createElement('div');
  row.className = 'legend-row';
  row.innerHTML = `<span class="dot" style="background:${cat.color}"></span>${cat.label}`;
  legendEl.appendChild(row);
});

// ============================================================
// INITIAL RENDER
// ============================================================
renderChips();
renderList();
