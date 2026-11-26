/* AngkaNusa — grafik batang SVG buatan tangan, tanpa library.
   Setiap grafik mencetak nilainya di samping batang dan disertai tabel data
   sebagai alternatif teks, supaya tetap terbaca tanpa gambar. */

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/* Grafik batang vertikal. items: [{label, value, display}].
   Mengembalikan string SVG lengkap dengan sumbu, nilai, dan judul aksesibel. */
export function barChart(items, options = {}) {
  const width = options.width || 960;
  const height = options.height || 300;
  const barColor = options.barColor || '#0f5257';
  const highlight = options.highlightIndex ?? -1;
  const highlightColor = options.highlightColor || '#e8a33d';
  const unit = options.unit || '';
  const max = Math.max(...items.map((i) => i.value));
  const top = 34;
  const bottom = 34;
  const left = 8;
  const right = 8;
  const plotH = height - top - bottom;
  const slot = (width - left - right) / items.length;
  const barW = Math.min(110, slot * 0.5);
  const bars = items
    .map((item, i) => {
      const h = Math.max(2, (item.value / max) * plotH);
      const x = left + slot * i + (slot - barW) / 2;
      const y = top + (plotH - h);
      const color = i === highlight ? highlightColor : barColor;
      return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW}" height="${h.toFixed(1)}" rx="4" fill="${color}"><title>${esc(item.label)}: ${esc(item.display)}${unit}</title></rect>
  <text x="${(x + barW / 2).toFixed(1)}" y="${(y - 8).toFixed(1)}" text-anchor="middle" font-size="15" font-weight="700" fill="#1e2a28">${esc(item.display)}${unit}</text>
  <text x="${(x + barW / 2).toFixed(1)}" y="${(height - 12).toFixed(1)}" text-anchor="middle" font-size="14" fill="#4a5a57">${esc(item.label)}</text>`;
    })
    .join('\n  ');
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Grafik batang: ${items.map((i) => `${i.label} ${i.display}`).join(', ')}">
  <line x1="${left}" y1="${top + plotH}" x2="${width - right}" y2="${top + plotH}" stroke="#c9cfc9" stroke-width="1"/>
  ${bars}
</svg>`;
}

/* Tabel data pendamping grafik: alternatif teks untuk pembaca layar dan
   untuk pengunjung yang ingin menyalin angkanya. */
export function dataTable(items, labelCol, valueCol) {
  const rows = items
    .map((i) => `<tr><th scope="row">${esc(i.label)}</th><td>${esc(i.display)}</td></tr>`)
    .join('\n    ');
  return `<table class="data-table">
  <caption>Data grafik</caption>
  <thead><tr><th scope="col">${esc(labelCol)}</th><th scope="col">${esc(valueCol)}</th></tr></thead>
  <tbody>
    ${rows}
  </tbody>
</table>`;
}
