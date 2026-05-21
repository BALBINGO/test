// Hämta elevens unika ID från URL
const params = new URLSearchParams(window.location.search);
const studentID = params.get("id") || "default";

// LocalStorage-nyckel
const STORAGE_KEY = "balbingo2026_" + studentID;

// Skapa 1–81 lista
let numbers = Array.from({ length: 81 }, (_, i) => i + 1);

// Slumpa ordningen baserat på elevens ID
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function shuffleWithSeed(array, seed) {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const seed = parseInt(studentID.replace(/\D/g, "")) || 12345;
const shuffled = shuffleWithSeed(numbers, seed);

// Skapa grid
const grid = document.getElementById("bingo-grid");

// Ladda sparad data
let saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

shuffled.forEach((num, index) => {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.textContent = num;

  if (saved[num]) cell.classList.add("marked");

  cell.addEventListener("click", () => {
    cell.classList.toggle("marked");
    saved[num] = cell.classList.contains("marked");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  });

  grid.appendChild(cell);
});
