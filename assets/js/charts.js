// charts.js
const barCanvas = document.getElementById("barChart");
const pieCanvas = document.getElementById("pieChart");
const lineCanvas = document.getElementById("lineChart");

const THEME = {
  green: "#2e7d32",
  lightGreen: "#a5d6a7",
  orange: "#f6b26b",
  brown: "#5d4037",
  text: "#263238",
  axis: "#455a64"
};


function clearCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function fitCanvasToParent(canvas) {
  const parent = canvas.parentElement;
  if (!parent) return;

  const rect = parent.getBoundingClientRect();
  canvas.width = Math.max(280, rect.width);
  canvas.height = Math.max(200, rect.height);
}


function getCropStats() {
  const labels = crops.map(c => c.name);
  const yields = crops.map(c => Number(c.yield) || 0);
  const areas = crops.map(c => Number(c.area) || 0);
  return { labels, yields, areas };
}

function drawBarChart(canvas, labels, values) {
  fitCanvasToParent(canvas);
  const ctx = canvas.getContext("2d");

  const w = canvas.width;
  const h = canvas.height;
  const padding = 40;

  ctx.clearRect(0, 0, w, h);

  const maxVal = Math.max(1, ...values);
  const barCount = values.length || 1;
  const gap = 10;
  const barWidth = Math.max(20, (w - padding * 2 - gap * (barCount - 1)) / barCount);

  ctx.font = "12px Arial";
  ctx.fillStyle = "#111";

  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, h - padding);
  ctx.lineTo(w - padding, h - padding);
  ctx.strokeStyle = "#444";
  ctx.stroke();

  values.forEach((val, i) => {
    const x = padding + i * (barWidth + gap);
    const barHeight = ((h - padding * 2) * val) / maxVal;
    const y = (h - padding) - barHeight;

    ctx.fillStyle = "#2b78e4";
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = "#111";
    const label = labels[i] || "";
    ctx.fillText(label, x, h - padding + 15);

    ctx.fillStyle = "#111";
    ctx.fillText(String(val), x, y - 6);
  });
}

function drawPieChart(canvas, labels, values) {
  fitCanvasToParent(canvas);
  const ctx = canvas.getContext("2d");

  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const total = values.reduce((a, b) => a + b, 0);
  if (total <= 0) {
    ctx.font = "14px Arial";
    ctx.fillStyle = "#111";
    ctx.fillText("No data", 10, 30);
    return;
  }

  const cx = w / 3;
  const cy = h / 2;
  const r = Math.min(w, h) / 3;

  const colors = [THEME.green, THEME.lightGreen, THEME.orange, THEME.brown];


  let start = 0;
  values.forEach((val, i) => {
    const slice = (val / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, start + slice);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    start += slice;
  });

  ctx.font = "12px Arial";
  ctx.fillStyle = THEME.green;
  let y = 20;
  labels.forEach((lab, i) => {
    const pct = ((values[i] / total) * 100).toFixed(1) + "%";
    ctx.fillText(lab + " " + pct, w / 1.7, y);
    y += 16;
  });
}

function drawLineChart(canvas, labels, values) {
  fitCanvasToParent(canvas);
  const ctx = canvas.getContext("2d");

  const w = canvas.width;
  const h = canvas.height;
  const padding = 40;

  ctx.clearRect(0, 0, w, h);

  const maxVal = Math.max(1, ...values);
  const n = values.length;

  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, h - padding);
  ctx.lineTo(w - padding, h - padding);
  ctx.strokeStyle = THEME.green;
ctx.fillStyle = THEME.green;

  ctx.stroke();

  if (n === 0) return;

  const stepX = (w - padding * 2) / Math.max(1, n - 1);

  ctx.beginPath();
  values.forEach((val, i) => {
    const x = padding + i * stepX;
    const y = (h - padding) - ((h - padding * 2) * val) / maxVal;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.strokeStyle = "#2b78e4";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#2b78e4";
  values.forEach((val, i) => {
    const x = padding + i * stepX;
    const y = (h - padding) - ((h - padding * 2) * val) / maxVal;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.font = "12px Arial";
  ctx.fillStyle = "#111";
  labels.forEach((lab, i) => {
    const x = padding + i * stepX;
    ctx.fillText(lab, x - 10, h - padding + 15);
  });
}

function updateCharts() {
  if (!barCanvas || !pieCanvas || !lineCanvas) return;

  const s = getCropStats();

  drawBarChart(barCanvas, s.labels, s.yields);
  drawPieChart(pieCanvas, s.labels, s.areas);
  drawLineChart(lineCanvas, s.labels, s.yields);
}

window.addEventListener("resize", updateCharts);
updateCharts();
