const input = document.getElementById('numberInput');
const out5  = document.getElementById('win5');
const out2a = document.getElementById('win2a');
const out2b = document.getElementById('win2b');
const out1  = document.getElementById('win1');
const out10 = document.getElementById('win10');
const out15 = document.getElementById('win15');

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
  out10.textContent = formatNum(num * (1 - 0.10));
  out15.textContent = formatNum(num * (1 - 0.15));
});