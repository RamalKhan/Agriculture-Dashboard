const farmForm = document.getElementById("farmForm");
const farmsTableBody = document.getElementById("farmsTableBody");
const farmFarmerSelect = document.getElementById("farmFarmer");
farmFarmerSelect.addEventListener("focus", populateFarmersDropdown);


function saveFarms() {
  localStorage.setItem("farms", JSON.stringify(farms));
}

function populateFarmersDropdown() {
  farmFarmerSelect.innerHTML = '<option value="">Select Farmer</option>';
  farmers.forEach(f => {
    const opt = document.createElement("option");
    opt.value = f.id;
    opt.textContent = f.name;
    farmFarmerSelect.appendChild(opt);
  });
}

function renderFarmsTable() {
  farmsTableBody.innerHTML = "";

  farms.forEach((farm, index) => {
    const farmer = farmers.find(f => f.id === farm.farmerId);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${farm.id}</td>
      <td>${farm.name}</td>
      <td>${farmer ? farmer.name : "N/A"}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editFarm(${farm.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteFarm(${farm.id})">Delete</button>
      </td>
    `;
    farmsTableBody.appendChild(row);
  });
}

function editFarm(id) {
  const farm = farms.find(f => f.id === id);
  if (!farm) return;

  document.getElementById("farmId").value = farm.id;
  document.getElementById("farmName").value = farm.name;
  farmFarmerSelect.value = farm.farmerId;
}

function deleteFarm(id) {
  if (crops.some(c => c.farmId === id)) {
    alert("This farm has crops. Delete crops first.");
    return;
  }

  farms = farms.filter(f => f.id !== id);
  saveFarms();
  renderFarmsTable();
  renderFarmersTable();
  updateDashboard();
}

farmForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("farmId").value;
  const name = document.getElementById("farmName").value.trim();
  const farmerId = Number(farmFarmerSelect.value);

  if (!name || !farmerId) {
    alert("All fields required");
    return;
  }

  if (id) {
    const farm = farms.find(f => f.id == id);
    farm.name = name;
    farm.farmerId = farmerId;
  } else {
    farms.push({
      id: Date.now(),
      name,
      farmerId
    });
  }

  saveFarms();

  farmForm.reset();
  document.getElementById("farmId").value = "";

  renderFarmsTable();
  renderFarmersTable();
  updateDashboard();
});

populateFarmersDropdown();
renderFarmsTable();
