import reports from "./reports";
import createUI from "./ui";
import initMap from "./map";


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

createUI();

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
updateCountdown();
setInterval(updateCountdown, 1000);

initMap(reports);