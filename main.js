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

  <small>KNYT v0.3.1</small>

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
const map = L.map('map').setView([46.0727, 18.2323], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap közreműködők'
}).addTo(map);
const reports = [
  {
    id: "KNYT-2026-000001",
    city: "Pécs",
    street: "Megyeri út",
    lat: 46.0727,
    lng: 18.2323,
    date: "2026.07.04. 14:30",
    status: "Hatósági ellenőrzés alatt",
    color: "yellow",
    description: "Padlástérből kaparás hallható."
  },{
    id: "KNYT-2026-000002",
    city: "Siklós",
    street: "Kossuth utca",
    lat: 45.854,
    lng: 18.297,
    date: "2026.07.05. 09:15",
    status: "NNH által megerősített",
    color:"green",
    description: "Nyestet észleltek a tetőtérben."
  }
];

reports.forEach(report => {

  const marker = L.marker([report.lat, report.lng]).addTo(map);

  marker.bindPopup(`
    <strong>${report.id}</strong><br>
    📍 ${report.city}, ${report.street}<br>
    📅 ${report.date}<br>
    ${report.color === "green" ? "🟢" : "🟡"} ${report.status}
    📝 ${report.description}
  `);

});