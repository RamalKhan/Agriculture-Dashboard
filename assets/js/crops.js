// crops.js
// CRUD + Search + Dashboard sync + localStorage persistence

const cropsTableBody = document.getElementById("cropsTableBody");
const cropForm = document.getElementById("cropForm");
const searchInput = document.getElementById("searchInput");

function saveCrops() {
  localStorage.setItem("crops", JSON.stringify(crops));
}

function renderCropsTable(list = crops) {
  cropsTableBody.innerHTML = "";

  list.forEach((crop, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${crop.name}</td>
      <td>${crop.season}</td>
      <td>${crop.area}</td>
      <td>${crop.yield}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editCrop(${crop.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteCrop(${crop.id})">Delete</button>
      </td>
    `;

    cropsTableBody.appendChild(row);
  });
}

searchInput.addEventListener("input", function () {
  const q = this.value.trim().toLowerCase();
  const filtered = crops.filter(c => c.name.toLowerCase().includes(q));
  renderCropsTable(filtered);
});

function deleteCrop(id) {
  const index = crops.findIndex(c => c.id === id);

  if (index !== -1) {
    crops.splice(index, 1);
    saveCrops();

    searchInput.value = "";
    renderCropsTable();
    updateDashboard();
  }
}

function editCrop(id) {
  const crop = crops.find(c => c.id === id);
  if (!crop) return;

  document.getElementById("cropId").value = crop.id;
  document.getElementById("cropName").value = crop.name;
  document.getElementById("cropSeason").value = crop.season;
  document.getElementById("cropArea").value = crop.area;
  document.getElementById("cropYield").value = crop.yield;
}

cropForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("cropId").value;
  const name = document.getElementById("cropName").value.trim();
  const season = document.getElementById("cropSeason").value.trim();
  const area = document.getElementById("cropArea").value;
  const yieldValue = document.getElementById("cropYield").value;

  if (!name || !season || !area || !yieldValue) {
    alert("All fields are required");
    return;
  }

  if (id) {
    const crop = crops.find(c => c.id == id);
    if (!crop) return;

    crop.name = name;
    crop.season = season;
    crop.area = Number(area);
    crop.yield = Number(yieldValue);
  } else {
    crops.push({
      id: Date.now(),
      name,
      season,
      area: Number(area),
      yield: Number(yieldValue),
      farmId: 1
    });
  }

  saveCrops();

  cropForm.reset();
  document.getElementById("cropId").value = "";

  searchInput.value = "";
  renderCropsTable();
  updateDashboard();
});

function updateDashboard() {
  document.getElementById("totalCrops").textContent = crops.length;
  document.getElementById("totalFarms").textContent = farms.length;
  document.getElementById("totalFarmers").textContent = farmers.length;

  let totalYield = 0;
  crops.forEach(c => (totalYield += Number(c.yield)));
  document.getElementById("totalYield").textContent = totalYield;

  if (typeof updateCharts === "function") {
  updateCharts();
}

}

renderCropsTable();
updateDashboard();
