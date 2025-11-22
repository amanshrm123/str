const input = document.getElementById('numberInput');
const out5  = document.getElementById('win5');
const out2a = document.getElementById('win2a');
const out2b = document.getElementById('win2b');
const out1  = document.getElementById('win1');
const out10 = document.getElementById('win10');
const out15 = document.getElementById('win15');
const out3_10 = document.getElementById('win3_10');
const out2_10 = document.getElementById('win2_10');

const input2 = document.getElementById('numberInput2');
const qty5  = document.getElementById('qty5');
const qty10 = document.getElementById('qty10');
const qty15 = document.getElementById('qty15');

function formatNum(n) {
  if (!Number.isFinite(n)) return '-';
  return (Math.round(n * 100) / 100).toString();
}

input.addEventListener("input", function (e) {
  let value = e.target.value;

  if (!/^\d*(\.\d{0,2})?$/.test(value)) {
    e.target.value = value.slice(0, -1);
    value = e.target.value;
  }

  if (value === '' || value === '.' ) {
    out5.textContent = out2a.textContent = out2b.textContent = out1.textContent = out10.textContent = out15.textContent = '-';
    return;
  }

  const num = parseFloat(value);
  if (!Number.isFinite(num)) {
    out5.textContent = out2a.textContent = out2b.textContent = out1.textContent = out10.textContent = out15.textContent = '-';
    return;
  }

  // main 5% window (base for subdivision)
  const base5 = num * (1 - 0.05);
  out5.textContent = formatNum(base5);

  // chained subdivision:
  // part1 is computed from the original input (subtract 2% of input)
  // part2 is computed from part1 (subtract 2% of part1)
  // part3 is computed from part2 (subtract 1% of part2)
  const part1 = num * (1 - 0.02);
  const part2 = part1 * (1 - 0.02);
  const part3 = part2 * (1 - 0.01);

  out2a.textContent = formatNum(part1);
  out2b.textContent = formatNum(part2);
  out1.textContent  = formatNum(part3);

  // other windows remain based on original input
  const base10 = num * (1 - 0.10);
  out10.textContent = formatNum(base10);
  out15.textContent = formatNum(num * (1 - 0.15));

  // subdivisions for 10%: compute relative to the 5% window value (`win5`)
  // Part A is 3% reduction of the 5% window, Part B is then 2% of Part A
  const sub10_a = base5 * (1 - 0.03);
  const sub10_b = sub10_a * (1 - 0.02);
  if (out3_10) out3_10.textContent = formatNum(sub10_a);
  if (out2_10) out2_10.textContent = formatNum(sub10_b);
});

function updateQuantityWindows() {
  if (!input2) return;
  const v = input2.value;
  if (v === '' || v === '.') {
    qty5.textContent = qty10.textContent = qty15.textContent = '-';
    return;
  }
  const n = parseFloat(v);
  if (!Number.isFinite(n)) {
    qty5.textContent = qty10.textContent = qty15.textContent = '-';
    return;
  }
    const qty2a = document.getElementById('qty2a');
    const qty3_10 = document.getElementById('qty3_10');
    const qty2_10 = document.getElementById('qty2_10');
    // set qty5 to 40% of the provided quantity (numberInput2)
    const qty5Val = n * 0.40;
    qty5.textContent  = formatNum(qty5Val);
      // qty2a = floor(40% split of qty5)
    if (qty2a) qty2a.textContent = String(Math.floor(qty5Val * 0.4));
    if (qty2b) qty2b.textContent = String(Math.floor(qty5Val * 0.4));
    if (qty1) qty1.textContent = String(Math.floor(qty5Val * 0.2));
    const qty10Val = n * 0.40;
    qty10.textContent = formatNum(qty10Val);
    qty15.textContent = formatNum(n * 0.20);
    // compute quantities for 10% subdivisions based on the remaining quantity
    // remainder = total input quantity - qty5
    const remainder = Math.max(0, n - qty5Val);
    if (qty3_10) qty3_10.textContent = String(Math.floor(remainder * 0.3));
    if (qty2_10) qty2_10.textContent = String(Math.floor(remainder * 0.2));
}

// attach listener for the quantity input
if (input2) {
  input2.addEventListener('input', updateQuantityWindows);
}

// call once to initialize (in case of prefilled values)
updateQuantityWindows();

// --- Theme toggle (dark / light) ---
const themeToggle = document.getElementById('themeToggle');
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    if (themeToggle) themeToggle.checked = true;
  } else {
    root.classList.remove('dark');
    if (themeToggle) themeToggle.checked = false;
  }
}

// read saved preference or system preference
const savedTheme = (function () {
  try { return localStorage.getItem('theme'); } catch (e) { return null; }
})();
if (savedTheme) {
  applyTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  applyTheme('dark');
} else {
  applyTheme('light');
}

if (themeToggle) {
  themeToggle.addEventListener('change', function (e) {
    const t = e.target.checked ? 'dark' : 'light';
    applyTheme(t);
    try { localStorage.setItem('theme', t); } catch (err) { /* ignore */ }
  });
}

// --- Card slider navigation ---
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelector('.cards');
  const leftArrow = document.querySelector('.arrow-left');
  const rightArrow = document.querySelector('.arrow-right');
  let cardIndex = 0;
  function showCard(idx) {
    cardIndex = Math.max(0, Math.min(2, idx));
    cards.classList.remove('card-2', 'card-3');
    if (cardIndex === 1) cards.classList.add('card-2');
    if (cardIndex === 2) cards.classList.add('card-3');
    leftArrow.disabled = cardIndex === 0;
    rightArrow.disabled = cardIndex === 2;
  }
  leftArrow.addEventListener('click', function () { showCard(cardIndex - 1); });
  rightArrow.addEventListener('click', function () { showCard(cardIndex + 1); });
  // Touch swipe support for mobile
  let startX = null;
  cards.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) startX = e.touches[0].clientX;
  });
  cards.addEventListener('touchend', function(e) {
    if (startX !== null && e.changedTouches.length === 1) {
      const endX = e.changedTouches[0].clientX;
      const dx = endX - startX;
      if (dx > 50) showCard(cardIndex - 1); // swipe right
      else if (dx < -50) showCard(cardIndex + 1); // swipe left
    }
    startX = null;
  });
  showCard(0);
});
