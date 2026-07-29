export default function createUI() {
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

  <small>KNYT v0.6.1 Beta</small>

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

  <div class="workspace">

    <div id="map"></div>

    <aside id="report-panel">

    <form id="report-form">

      <h3>📝 Új bejelentés</h3>
      <div class="beta-notice">
 <strong>🟢 Béta verzió</strong><br>
A bejelentési funkció jelenleg tesztelés alatt áll.
A beküldött bejelentések a KNYT központi adatbázisába kerülnek mentésre, és a térképen azonnal megjelennek.

</div>

      <p>Kattints a térképre a hely kijelöléséhez.</p>

      <div id="selected-location">
        Nincs kijelölt hely.
      </div>

      <div id="selected-address" class="address-box">

  <strong>📍 Cím</strong>

  <p id="address-city">Település: -</p>
  <p id="address-street">Utca: -</p>
  <p id="address-postcode">Irányítószám: -</p>
  <p id="address-county">Vármegye: -</p>

</div>

      <label for="report-date">📅 Dátum</label>
      <input type="date" id="report-date">

      <label for="report-time">⏰ Idő</label>
      <input type="time" id="report-time">

      <h4>Az észlelés jellege</h4>

      <div class="report-types">

        <label>
          <input type="radio" name="report-type" value="eszleles" checked>
          👀 Nyest észlelése
        </label>

        <label>
          <input type="radio" name="report-type" value="motor">
          🚗 Motortérben észlelve
        </label>

        <label>
          <input type="radio" name="report-type" value="padlas">
          🏠 Padlástérben észlelve
        </label>

        <label>
          <input type="radio" name="report-type" value="hang">
          🔊 Nyestre utaló hangok
        </label>

        <label>
          <input type="radio" name="report-type" value="nyom">
          🐾 Nyomok vagy ürülék
        </label>

        <label>
          <input type="radio" name="report-type" value="egyeb">
          ✏️ Egyéb
        </label>

      </div>

      <label for="report-note">📝 Megjegyzés</label>

      <textarea
        id="report-note"
        rows="5"
        placeholder="Írja le röviden az észlelés körülményeit..."
      ></textarea>

      <button type="submit" id="submit-report">
  Bejelentés beküldése
</button>

      </form>

    </aside>

  </div>

</section>
</main>

</section>
</main>

<div id="toast" class="toast"></div>

`;

}