import L from "leaflet";
import "leaflet/dist/leaflet.css";
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
    📍 ${report.city ?? "-"}, ${report.street ?? "-"}<br>
    📅 ${report.date}<br>
    ${status.emoji} ${status.text}<br>
    📝 ${report.description ?? report.note}
  `);
}
reports.forEach(addReportMarker);

// Ideiglenes bejelentési marker
let temporaryMarker = null;
let selectedLat = null;
let selectedLng = null;
const reportPanel = document.getElementById("report-panel");
const selectedLocation = document.getElementById("selected-location");
const reportDate = document.getElementById("report-date");
const reportTime = document.getElementById("report-time");
const reportForm = document.getElementById("report-form");
const reportNote = document.getElementById("report-note");
map.on("click", async (e) => {

  const { lat, lng } = e.latlng;
  console.log("Kattintás", lat, lng);
  selectedLat = lat;
selectedLng = lng;

console.log("Geokódolás indul");

try {
  const address = await getAddress(lat, lng);
  console.log(address);
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
reportForm.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("Bejelentés beküldése");

  const report = {
    id: `KNYT-${Date.now()}`,
    lat: selectedLat,
    lng: selectedLng,
    date: reportDate.value,
    time: reportTime.value,
    type: document.querySelector('input[name="report-type"]:checked').value,
    note: reportNote.value,
    status: "pending"
  };

  reports.push(report);

  addReportMarker(report);

  if (temporaryMarker) {
    map.removeLayer(temporaryMarker);
    temporaryMarker = null;
  }

  selectedLat = null;
  selectedLng = null;

  reportNote.value = "";

  document.querySelector('input[name="report-type"]').checked = true;

  reportPanel.classList.remove("open");

  console.log(report);
});
return map;
}