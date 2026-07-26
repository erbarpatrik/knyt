import L from "leaflet";
import "leaflet/dist/leaflet.css";
import supabase from './lib/supabase.js';
import { getAddress } from "./geocoding.js";
export default function initMap(reports) {

console.log("A térkép inicializálása...");
const map = L.map('map').setView([47.1625, 19.5033], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap közreműködők'
}).addTo(map);

const STATUS = {
  pending: {
    text: "Hatósági ellenőrzés alatt",
    color: "#FBC02D",
    emoji: "🟡"
  },
  verified: {
    text: "NNH által megerősített",
    color: "#43A047",
    emoji: "🟢"
  },
  rejected: {
    text: "Elutasított",
    color: "#E53935",
    emoji: "🔴"
  },
  archived: {
    text: "Archív",
    color: "#757575",
    emoji: "⚫"
  }
};
const MARKER_ICONS = {
  pending: L.icon({
    iconUrl: 'markers/marker-yellow.svg',
    iconSize: [40, 52],
    iconAnchor: [20, 52],
    popupAnchor: [0, -48]
  }),

  verified: L.icon({
    iconUrl: 'markers/marker-green.svg',
    iconSize: [40, 52],
    iconAnchor: [20, 52],
    popupAnchor: [0, -48]
  }),

  rejected: L.icon({
    iconUrl: 'markers/marker-red.svg',
    iconSize: [40, 52],
    iconAnchor: [20, 52],
    popupAnchor: [0, -48]
  }),

  archived: L.icon({
    iconUrl: 'markers/marker-gray.svg',
    iconSize: [40, 52],
    iconAnchor: [20, 52],
    popupAnchor: [0, -48]
  })
};

function getMarkerIcon(status) {
  return MARKER_ICONS[status] || MARKER_ICONS.pending;
}
function addReportMarker(report) {
  const status = STATUS[report.status];

  const marker = L.marker(
    [report.lat, report.lng],
    { icon: getMarkerIcon(report.status) }
  ).addTo(map);

  marker.bindPopup(`
    <strong>${report.id}</strong><br>

    📍 ${report.city ?? "-"}<br>
    ${report.postcode ?? "-"} ${report.street ?? "-"}${report.houseNumber ? " " + report.houseNumber : ""}<br>
    ${report.county ?? "-"}<br><br>

    📅 ${report.date} ${report.time}<br>
    ${status.emoji} ${status.text}<br>
    📝 ${report.description ?? report.note}
  `);
}

async function loadReports() {
  const { data, error } = await supabase
    .from("reports")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  data.forEach(dbReport => {
    addReportMarker({
      id: dbReport.id,
  
      lat: dbReport.latitude,
      lng: dbReport.longitude,
  
      city: dbReport.city,
      street: dbReport.road,
      houseNumber: dbReport.house_number,
      postcode: dbReport.postcode,
      county: dbReport.county,
  
      date: dbReport.created_at,
      time: "",
  
      note: dbReport.description,
      status: dbReport.status
    });
  });
}

loadReports();

// Ideiglenes bejelentési marker
let temporaryMarker = null;
let selectedLat = null;
let selectedLng = null;
let selectedCity = "";
let selectedStreet = "";
let selectedHouseNumber = "";
let selectedPostcode = "";
let selectedCounty = "";
const reportPanel = document.getElementById("report-panel");
const selectedLocation = document.getElementById("selected-location");
const reportDate = document.getElementById("report-date");
const reportTime = document.getElementById("report-time");
const reportForm = document.getElementById("report-form");
const reportNote = document.getElementById("report-note");

const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

map.on("click", async (e) => {
const { lat, lng } = e.latlng;
console.log("Kattintás", lat, lng);
selectedLat = lat; selectedLng = lng; 
console.log("Geokódolás indul");
try {
  console.log("Geokódolás indul");

  const address = await getAddress(lat, lng);
  console.log(address);

  const addr = address.address || {};

  const city =
    addr.city ||
    addr.town ||
    addr.village ||
    addr.hamlet ||
    "";

  const street = addr.road || "";
  const houseNumber = addr.house_number || "";
  const postcode = addr.postcode || "";
  const county = addr.county || "";

  selectedCity = city;
selectedStreet = street;
selectedHouseNumber = houseNumber;
selectedPostcode = postcode;
selectedCounty = county;

  console.log({

    city,
    street,
    houseNumber,
    postcode,
    county,
  });

  document.getElementById("address-city").textContent =
  `Település: ${city || "-"}`;

document.getElementById("address-street").textContent =
  `Utca: ${street}${houseNumber ? " " + houseNumber : ""}`;

document.getElementById("address-postcode").textContent =
  `Irányítószám: ${postcode || "-"}`;

document.getElementById("address-county").textContent =
  `Vármegye: ${county || "-"}`;

} catch (error) {
  console.error(error);
}

  if (temporaryMarker) {
    map.removeLayer(temporaryMarker);
  }

  temporaryMarker = L.marker([lat, lng]).addTo(map);

  reportPanel.classList.add("open");

  selectedLocation.innerHTML = `
    <strong>Koordináták</strong><br>
    ${lat.toFixed(6)}, ${lng.toFixed(6)}
  `;
  const now = new Date();

  reportDate.value = now.toISOString().split("T")[0];
  reportTime.value = now.toTimeString().slice(0, 5);
  setTimeout(() => {
    map.invalidateSize();
  }, 320);

});
reportForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("Bejelentés beküldése");

  const report = {
    id: `KNYT-${Date.now()}`,
  
    lat: selectedLat,
    lng: selectedLng,
  
    city: selectedCity,
    street: selectedStreet,
    houseNumber: selectedHouseNumber,
    postcode: selectedPostcode,
    county: selectedCounty,
  
    date: reportDate.value,
    time: reportTime.value,
  
    type: document.querySelector('input[name="report-type"]:checked').value,
    note: reportNote.value,
  
    status: "pending"
  };
  const { error } = await supabase
  .from("reports")
  .insert([
    {
      report_type: report.type,
      status: report.status,

      latitude: report.lat,
      longitude: report.lng,

      city: report.city,
      postcode: report.postcode,
      county: report.county,
      road: report.street,
      house_number: report.houseNumber,

      description: report.note
    }
  ]);

if (error) {
  console.error(error);
  alert("Hiba történt a bejelentés mentése közben.");
  return;
}

  reports.push(report);

  addReportMarker(report);

  showToast(`✅ A bejelentés sikeresen rögzítve (${report.id})`);

  if (temporaryMarker) {
    map.removeLayer(temporaryMarker);
    temporaryMarker = null;
  }

  selectedLat = null;
  selectedLng = null;
  selectedCity = "";
  selectedStreet = "";
  selectedHouseNumber = "";
  selectedPostcode = "";
  selectedCounty = "";

  reportNote.value = "";

  document.querySelector('input[name="report-type"]').checked = true;

  reportPanel.classList.remove("open");

  const submitMessage = document.getElementById("submit-message");

submitMessage.textContent =
  `✅ A bejelentés sikeresen rögzítésre került. Azonosító: ${report.id}`;

submitMessage.classList.add("show");

setTimeout(() => {
  submitMessage.classList.remove("show");
}, 4000);

  console.log(report);
});

return map;
}