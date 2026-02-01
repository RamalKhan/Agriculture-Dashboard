const farmersTableBody = document.getElementById("farmersTableBody");
const farmerForm = document.getElementById("farmerForm");
const farmerSearchInput = document.getElementById("farmerSearchInput");

function saveFarmers() {
  localStorage.setItem("farmers", JSON.stringify(farmers));
}

function refreshFarmDropdownIfExists() {
  if (typeof populateFarmersDropdown === "function") {
    populateFarmersDropdown();
  }
}

function getFarmsCountByFarmer(farmerId) {
  return farms.filter(f => f.farmerId === farmerId).length;
}

function renderFarmersTable(list = farmers) {
  farmersTableBody.innerHTML = "";

  list.forEach((farmer, index) => {
    const farmsCount = getFarmsCountByFarmer(farmer.id);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${farmer.id}</td>
      <td>${farmer.name}</td>
      <td>${farmer.phone || ""}</td>
      <td>${farmer.city || ""}</td>
      <td>${farmsCount}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editFarmer(${farmer.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteFarmer(${farmer.id})">Delete</button>
      </td>
    `;
    farmersTableBody.appendChild(row);
  });
}

farmerSearchInput.addEventListener("input", function () {
  const q = this.value.trim().toLowerCase();
  renderFarmersTable(farmers.filter(f => f.name.toLowerCase().includes(q)));
});

function editFarmer(id) {
  const farmer = farmers.find(f => f.id === id);
  if (!farmer) return;

  document.getElementById("farmerId").value = farmer.id;
  document.getElementById("farmerName").value = farmer.name;
  document.getElementById("farmerPhone").value = farmer.phone || "";
  document.getElementById("farmerCity").value = farmer.city || "";
}

function deleteFarmer(id) {
  if (farms.some(f => f.farmerId === id)) {
    alert("This farmer still has farms. Delete farms first.");
    return;
  }

  farmers = farmers.filter(f => f.id !== id);
  saveFarmers();

  refreshFarmDropdownIfExists();
  renderFarmersTable();
  updateDashboard();
}

farmerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("farmerId").value;
  const name = document.getElementById("farmerName").value.trim();
  const phone = document.getElementById("farmerPhone").value.trim();
  const city = document.getElementById("farmerCity").value.trim();

  if (!name) {
    alert("Name is required");
    return;
  }

  if (id) {
    const farmer = farmers.find(f => f.id == id);
    if (!farmer) return;

    farmer.name = name;
    farmer.phone = phone;
    farmer.city = city;
  } else {
    farmers.push({
      id: Date.now(),
      name,
      phone,
      city
    });
  }

  saveFarmers();

  farmerForm.reset();
  document.getElementById("farmerId").value = "";

  refreshFarmDropdownIfExists();
  renderFarmersTable();
  updateDashboard();
});

refreshFarmDropdownIfExists();
renderFarmersTable();
