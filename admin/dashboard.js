import supabase from "../lib/supabase.js";

const welcome = document.getElementById("welcome");
const logoutBtn = document.getElementById("logout");

const STATUS_LABELS = {
  pending: "Új",
  investigating: "Ellenőrzés alatt",
  approved: "Jóváhagyva",
  rejected: "Elutasítva",
  closed: "Lezárva",
};

// Bejelentkezett felhasználó ellenőrzése
const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  window.location.href = "/admin.html";
}

welcome.textContent = `Bejelentkezve: ${user.email}`;

await loadReports();
supabase
  .channel("admin-reports")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "reports",
    },
    () => {
      console.log("Realtime frissítés");
      loadReports();
    }
  )
  .subscribe();

async function loadReports() {
  const { data: reports, error } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const tbody = document.querySelector("#reports-table tbody");

  // Régi sorok törlése
  tbody.innerHTML = "";

  reports.forEach((report) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${new Date(report.created_at).toLocaleDateString("hu-HU")}</td>
      <td>${report.city ?? "-"}</td>
      <td>${report.report_type}</td>
      <td>
        <select class="status-select" data-id="${report.id}">
          <option value="pending" ${report.status === "pending" ? "selected" : ""}>Új</option>
          <option value="investigating" ${report.status === "investigating" ? "selected" : ""}>Ellenőrzés alatt</option>
          <option value="approved" ${report.status === "approved" ? "selected" : ""}>Jóváhagyva</option>
          <option value="rejected" ${report.status === "rejected" ? "selected" : ""}>Elutasítva</option>
          <option value="closed" ${report.status === "closed" ? "selected" : ""}>Lezárva</option>
        </select>
      </td>
      <td>
        <button>Megnyitás</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  attachStatusEvents();
}

function attachStatusEvents() {
  document.querySelectorAll(".status-select").forEach((select) => {
    select.addEventListener("change", async (e) => {
      const reportId = e.target.dataset.id;
      const newStatus = e.target.value;

      const { error } = await supabase
        .from("reports")
        .update({ status: newStatus })
        .eq("id", reportId);

      if (error) {
        console.error("Hiba:", error);
        return;
      }

      console.log("Státusz frissítve");
    });
  });
}

// Kijelentkezés
logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "/admin.html";
});