const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("sidebarToggle");

function toggleSidebar() {
  if (!sidebar) return;
  sidebar.classList.toggle("show");
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", toggleSidebar);
}

document.querySelectorAll('#sidebar a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      sidebar.classList.remove("show");
    }
  });
});
document.addEventListener("click", (e) => {
  if (window.innerWidth >= 768) return;

  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebarToggle");
  if (!sidebar || !toggleBtn) return;

  const clickedInsideSidebar = sidebar.contains(e.target);
  const clickedToggle = toggleBtn.contains(e.target);

  if (!clickedInsideSidebar && !clickedToggle) {
    sidebar.classList.remove("show");
  }
});
