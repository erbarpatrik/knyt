# KNYT Changelog

## v0.6.1

- Supabase Realtime integráció
- Valós idejű marker megjelenítés új bejelentéseknél
- Automatikus KNYT azonosító (`report_number`) generálása adatbázis oldalon
- KNYT azonosító megjelenítése a marker popupban
- Magyar dátum- és időformátum a bejelentéseknél
- Bejelentés visszajelzés átalakítása `showToast()` használatára
- Kisebb hibajavítások és kódtisztítás

# V0.6.0 Beta

- Supabase integráció.
- `@supabase/supabase-js` kliens konfigurálása.
- `.env` támogatás Supabase URL és anon kulcs számára.
- Központi `lib/supabase.js` kliens létrehozása.
- PostgreSQL `reports` tábla létrehozása.
- Row Level Security (RLS) engedélyezése.
- Anonymous `INSERT` policy.
- Anonymous `SELECT` policy.
- `loadReports()` függvény a bejelentések adatbázisból történő betöltéséhez.

- A bejelentések mentése statikus tömb helyett Supabase adatbázisba történik.
- A térkép induláskor már a Supabase adatbázisból tölti be a bejelentéseket.
- Adatbázis rekordok konvertálása a frontend által használt `report` objektummá marker létrehozás előtt.
- A `reportForm` submit esemény aszinkron (`async`) működésre lett átállítva.
- Supabase kapcsolat ellenőrzése.
- INSERT hibakezelés hozzáadása.
- SELECT jogosultság hiánya miatti üres lekérdezés javítása.
- A `reports.js` statikus adatforrás kiváltásra került.
- A `reports.forEach(addReportMarker);` hívás eltávolítva.


## v0.5.5 Beta

- Toast értesítési rendszer bevezetése
- Sikeres bejelentés visszajelzése lebegő értesítéssel
- Újrafelhasználható `showToast()` függvény létrehozása
- Értesítési rendszer előkészítése további funkciókhoz

## v0.5.4 Beta

- Automatikus címfelismerés térképkattintáskor
- Címadatok megjelenítése a bejelentőpanelen
- Címadatok mentése a bejelentésekhez
- Reverse geokódolás integrálása
- Marker popupok kibővítése részletes címadatokkal

## v0.5.3 Beta

- OpenStreetMap Nominatim reverse geokódolás integrálása
- Automatikus címfelismerés térképkattintáskor
- Felismert cím megjelenítése a bejelentőpanelen
- A térképkattintás kezelése `async/await` alapokra került
- Geokódolási hibakezelés javítása

## v0.5.2 Beta

- Új bejelentések létrehozása a térképen
- Egységes addReportMarker() függvény
- Ideiglenes marker automatikus törlése
- Bejelentő panel automatikus bezárása
- Űrlap alaphelyzetbe állítása beküldés után
- Béta verzióra figyelmezető blokk bejelentéskor
- Moduláris markerkezelés
- Egyszeres submit eseménykezelő

## v0.5.0 Beta (2026.07.17.)

- Elkészült a bejelentő panel.
- Térképre kattintással kijelölhető a bejelentés helye.
- Automatikus dátum- és időkitöltés.
- Új bejelentési kategóriák.
- Megjegyzés mező hozzáadása.


- A HTML külön `ui.js` fájlba került.
- A mintaadatok külön `reports.js` fájlba kerültek.
- Előkészítés a `map.js` modulhoz.

- A panel megnyitásának és a térkép átméretezésének javítása.
- Több kisebb JavaScript hiba javítása.

---
# v0.4.0
- Egyedi NNH marker ikonok státusznak megfelőlen
- Státusz riport létrehozva 
- Marker státusz automatizálva
---
## v0.3.3 Hibajavítások, domain bekötés
- Mobil felület javítása
- nyestterkep.hu beköktése az oldalhoz
- Megszűnt a vizszintes görgetés mobilnézet esetében
---
# v0.3.2 – Állapotkezelés

- Bejelentésenkénti státusz támogatása
- Dinamikus státuszjelző (🟡 / 🟢)
- Több bejelentés egyidejű megjelenítése a térképen
- Térkép kezdőfelülete visszaállítv alap Mo. közép nézetre

## v0.3.1 – Adatvezérelt bejelentések

- `reports` adatszerkezet bevezetése
- Több bejelentés támogatása
- Markerek automatikus létrehozása a bejelentésekből
- Popupok dinamikus adatfeltöltése

---
## v0.3.0 – Interaktív térkép

- Leaflet térkép integrálása
- Első nyestészlelési marker megjelenítése
- Kattintható információs ablak (popup)
- Leaflet marker ikonok javítása production környezetben (Vercel)

---

## v0.2.0
- Projekt kitakarítása
- Vite maradványok eltávolítása
- Frissített index.html
- Saját favicon
- Frissített style.css
- Logo png hiba javítása
- Logo létrehozása átlátszó háttéren

---
## v0.1.0
- Első publikus verzió
- Kezdőlap
- Visszaszámláló
- Funkciókártyák