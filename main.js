import './style.css'

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

  <small>KNYT v0.1.0</small>

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