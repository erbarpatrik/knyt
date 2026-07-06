import './style.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

document.querySelector('#app').innerHTML = `
<header class="top-header">

  <div class="logo-area">

    <img
      src="/nnh-logo.png"
      alt="NNH logó"
      class="logo"
    >

    <div>

      <h1>NNH</h1>

      <p class="system">
        Központi Nyestészlelési Térkép
      </p>

    </div>

  </div>

</header>

<main class="container">

<section class="hero">

<div class="status-card">

  <p class="status-title">
    Rendszer állapota
  </p>

  <div class="status">
    <span class="status-dot"></span>
    <span>Fejlesztés alatt</span>
  </div>

  <div id="countdown"></div>

  <small>KNYT v0.3.3</small>

</div>

</section>
<section class="services">

  <article class="service-card">
    <h3>🗺️ Nyestészlelési térkép</h3>

    <p>
      Országos nyestészlelések megtekintése.
    </p>
  </article>

  <article class="service-card">
    <h3>📝 Bejelentés</h3>

    <p>
      Új nyestészlelés vagy káresemény bejelentése.
    </p>
  </article>

  <article class="service-card">
    <h3>📢 NNH közlemények</h3>

    <p>
      Hivatalos közlemények és tájékoztatások.
    </p>
  </article>

</section>

<section class="map-section">

  <h2>Nyestészlelési térkép</h2>

  <div id="map"></div>

</section>
</main>
`
const countdown = document.getElementById("countdown");

// KNYT indulása
const launchDate = new Date("2026-08-01T00:00:00");

function updateCountdown() {

  const now = new Date();
  const difference = launchDate - now;

  if (difference <= 0) {
    countdown.innerHTML = "<strong>A KNYT elindult!</strong>";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  countdown.innerHTML = `
    <p><strong>A rendszer élesítéséig:</strong></p>
    <p>${days} nap ${hours} óra ${minutes} perc ${seconds} mp</p>
`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
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
const reports = [
  {
    id: "KNYT-2026-000001",
    city: "Pécs",
    street: "Megyeri út",
    lat: 46.0727,
    lng: 18.2323,
    date: "2026.07.04. 14:30",
    status: "pending",
    description: "Padlástérből kaparás hallható."
  },{
    id: "KNYT-2026-000002",
    city: "Siklós",
    street: "Kossuth utca",
    lat: 45.854,
    lng: 18.297,
    date: "2026.07.05. 09:15",
    status: "verified",
    description: "Nyestet észleltek a tetőtérben."
  }
];

reports.forEach(report => {
  const status = STATUS[report.status];

  const marker = L.marker(
    [report.lat, report.lng],
    { icon: getMarkerIcon(report.status) }
  ).addTo(map);

  marker.bindPopup(`
 <strong>${report.id}</strong><br>
📍 ${report.city}, ${report.street}<br>
📅 ${report.date}<br>
${status.emoji} ${status.text}<br>
📝 ${report.description}
  `);
});