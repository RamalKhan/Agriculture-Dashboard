const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");

const pages = [
  { key: "Dashboard", title: "Dashboard", subtitle: "Agricultural Management Overview", show: ["pageDashboard"] },
  { key: "Farmers", title: "Farmers", subtitle: "Manage farmers and view their farms count", show: ["sectionFarmers"] },
  { key: "Farms", title: "Farms", subtitle: "Manage farms and link them to farmers", show: ["sectionFarms"] },
  { key: "Crops", title: "Crops", subtitle: "Manage crops and track yield and area", show: ["sectionCrops"] }
];

function hideAll() {
  ["pageDashboard", "sectionFarmers", "sectionFarms", "sectionCrops"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
}

function showPage(name) {
  const p = pages.find(x => x.key === name) || pages[0];

  hideAll();

  p.show.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "";
  });

  if (pageTitle) pageTitle.textContent = p.title;
  if (pageSubtitle) pageSubtitle.textContent = p.subtitle;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupNav() {
  document.querySelectorAll("#sidebar a.nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href") || "";

      if (href === "#pageDashboard") {
        e.preventDefault();
        showPage("Dashboard");
      }
      if (href === "#sectionFarmers") {
        e.preventDefault();
        showPage("Farmers");
      }
      if (href === "#sectionFarms") {
        e.preventDefault();
        showPage("Farms");
      }
      if (href === "#sectionCrops") {
        e.preventDefault();
        showPage("Crops");
      }
      if (href === "#sectionDashboardCharts") {
        e.preventDefault();
        showPage("Reports");
      }

      if (window.innerWidth < 768) {
        const sidebar = document.getElementById("sidebar");
        if (sidebar) sidebar.classList.remove("show");
      }
    });
  });
}

setupNav();
showPage("Dashboard");
