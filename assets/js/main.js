// main.js
// Connect data to UI on page load

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("totalCrops").textContent = crops.length;
  document.getElementById("totalFarms").textContent = farms.length;
  document.getElementById("totalFarmers").textContent = farmers.length;

  let totalYield = 0;
  crops.forEach(c => (totalYield += Number(c.yield)));
  document.getElementById("totalYield").textContent = totalYield;
});
