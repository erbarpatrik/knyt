console.log("dashboard.js elindult");
import supabase from "../lib/supabase.js";
console.log(supabase);

const welcome = document.getElementById("welcome");
const logoutBtn = document.getElementById("logout");

// Bejelentkezett felhasználó ellenőrzése
const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  window.location.href = "/admin.html";
}

welcome.textContent = `Bejelentkezve: ${user.email}`;

// Kijelentkezés
logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "/admin.html";
});