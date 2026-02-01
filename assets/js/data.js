// data.js
// Static data with localStorage persistence (no APIs)

const DEFAULT_FARMERS = [
  { id: 1, name: "Ali", phone: "0300-1111111", farm: 1, city: "Lahore" },
  { id: 2, name: "Sara", phone: "0300-2222222", farm: 2, city: "Islamabad" }
];

const DEFAULT_FARMS = [
  { id: 1, name: "Farm A", farmerId: 1 },
  { id: 2, name: "Farm B", farmerId: 2 }
];

const DEFAULT_CROPS = [
  { id: 1, name: "Wheat", season: "Summer", area: 120, yield: 300, farmId: 1 },
  { id: 2, name: "Rice", season: "Kharif", area: 200, yield: 500, farmId: 1 },
  { id: 3, name: "Maize", season: "Kharif", area: 150, yield: 350, farmId: 2 }
];

function safeGetArray(key) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return Array.isArray(v) ? v : null;
  } catch (e) {
    return null;
  }
}

let farmers = safeGetArray("farmers") || DEFAULT_FARMERS;
let farms = safeGetArray("farms") || DEFAULT_FARMS;
let crops = safeGetArray("crops") || DEFAULT_CROPS;

if (!localStorage.getItem("farmers")) {
  localStorage.setItem("farmers", JSON.stringify(farmers));
}
if (!localStorage.getItem("farms")) {
  localStorage.setItem("farms", JSON.stringify(farms));
}
if (!localStorage.getItem("crops")) {
  localStorage.setItem("crops", JSON.stringify(crops));
}
