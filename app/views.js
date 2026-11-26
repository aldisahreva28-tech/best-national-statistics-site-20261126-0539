/* AngkaNusa — template setiap halaman, dibangun dari data.js.
   Setiap angka ditampilkan bersama sumber dan tahunnya. */

import { barChart, dataTable } from './charts.js';
import {
  BPS, penduduk, provinsi, provinsiSource, ekonomi,
  tenagaKerja, kemiskinan, kpiBeranda,
} from './data.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/* Keterangan sumber kecil di bawah sebuah angka atau bagian. */
function sumber(text) {
  return `<p class="sumber">Sumber: ${esc(text)}</p>`;
}

/* Satu kartu angka utama. */
function statCard(label, value, note, sourceText) {
  return `<article class="stat">
  <h3>${esc(label)}</h3>
  <p class="angka">${esc(value)}</p>
  <p class="catatan">${esc(note)}</p>
  <p class="sumber">${esc(sourceText)}</p>
</article>`;
}

function sectionIntro(title, text) {
  return `<p class="kicker">${esc(title)}</p>
<p class="intro">${esc(text)}</p>`;
}

/* ---------------- Beranda ---------------- */

export function home() {
  const cards = kpiBeranda
    .map(
      (k) => `<a class="kpi" href="${k.href}">
  <span class="kpi-label">${esc(k.label)}</span>
  <span class="kpi-value">${esc(k.value)}</span>
  <span class="kpi-note">${esc(k.note)}</span>
</a>`,
    )
    .join('\n    ');
  return `<section class="hero">
  <p class="kicker">Statistik resmi Indonesia</p>
  <h1>Indonesia dalam angka, jelas dan terkini.</h1>
  <p class="lede">AngkaNusa merangkum angka-angka pokok Indonesia — penduduk, ekonomi,
  tenaga kerja, dan kemiskinan — dari data Badan Pusat Statistik, lengkap dengan
  sumber dan tahun setiap angka.</p>
  <p class="hero-meta">Data terbaru: September 2025 · ${esc(BPS)}</p>
</section>

<section aria-labelledby="angka-pokok">
  <h2 id="angka-pokok">Angka pokok</h2>
  <div class="kpi-grid">
    ${cards}
  </div>
  ${sumber(`${BPS} — SUPAS 2025, rilis PDB 5 Februari 2026, Sakernas Agustus 2025, Maret & September 2025`)}
</section>

<section aria-labelledby="penduduk-judul">
  <h2 id="penduduk-judul">Penduduk terus bertambah</h2>
  <p>Dari 237,64 juta jiwa pada 2010 menjadi <strong>284,67 juta jiwa</strong> pada 2025.
  Laju pertumbuhan melambat dari 1,10% menjadi 1,08% per tahun.</p>
  <div class="chart-card">
    ${barChart(penduduk.history, { unit: ' jt' })}
    ${dataTable(penduduk.history, 'Tahun', 'Penduduk (juta jiwa)')}
  </div>
  ${sumber(penduduk.historySource)}
</section>

<section aria-labelledby="jelajahi">
  <h2 id="jelajahi">Jelajahi statistik</h2>
  <ul class="jelajahi">
    <li><a href="#/penduduk"><strong>Penduduk</strong><span>Struktur usia, sebaran pulau, provinsi terbesar</span></a></li>
    <li><a href="#/ekonomi"><strong>Ekonomi</strong><span>PDB, pertumbuhan, inflasi, perdagangan</span></a></li>
    <li><a href="#/tenaga-kerja"><strong>Tenaga Kerja</strong><span>Pengangguran, pekerja informal, upah</span></a></li>
    <li><a href="#/kemiskinan"><strong>Kemiskinan</strong><span>Tingkat kemiskinan, garis kemiskinan, ketimpangan</span></a></li>
    <li><a href="#/provinsi"><strong>Provinsi</strong><span>Tabel provinsi yang bisa diurutkan dan dicari</span></a></li>
    <li><a href="#/tentang"><strong>Tentang &amp; Sumber</strong><span>Dari mana setiap angka berasal</span></a></li>
  </ul>
</section>`;
}

/* ---------------- Penduduk ---------------- */

export function pendudukPage() {
  const topRows = [...provinsi]
    .sort((a, b) => b.penduduk - a.penduduk)
    .map(
      (p, i) => `<tr><td>${i + 1}</td><th scope="row">${esc(p.nama)}</th><td>${esc(p.pulau)}</td><td>${esc(p.display)}</td></tr>`,
    )
    .join('\n    ');
  return `${sectionIntro('Penduduk', 'Siapa tinggal di mana, berapa banyak, dan bagaimana komposisinya.')}
<h1>Penduduk Indonesia</h1>
<div class="stat-grid">
  ${statCard('Jumlah penduduk', penduduk.total2025.value, penduduk.total2025.note, `${penduduk.total2025.source} · ${penduduk.total2025.year}`)}
  ${statCard('Pertumbuhan', penduduk.growth.value, penduduk.growth.note, `${penduduk.growth.source} · ${penduduk.growth.year}`)}
  ${statCard('Tinggal di Jawa', penduduk.javaShare.value, penduduk.javaShare.note, `${penduduk.javaShare.source} · ${penduduk.javaShare.year}`)}
  ${statCard('Angka kelahiran total', penduduk.tfr.value, `turun dari ${penduduk.tfr2010.value} pada 2010`, `${penduduk.tfr.source} · ${penduduk.tfr.year}`)}
</div>

<section aria-labelledby="riwayat">
  <h2 id="riwayat">Jumlah penduduk 2010–2025</h2>
  <div class="chart-card">
    ${barChart(penduduk.history, { unit: ' jt' })}
    ${dataTable(penduduk.history, 'Tahun', 'Penduduk (juta jiwa)')}
  </div>
  ${sumber(penduduk.historySource)}
  <p>Proyeksi pertengahan 2025: ${penduduk.total2025Mid.value} jiwa (${penduduk.total2025Mid.source}, ${penduduk.total2025Mid.year}).
  Pertumbuhan 2010–2020 tercatat ${penduduk.growthPrev.value} per tahun (${penduduk.growthPrev.source}).</p>
</section>

<section aria-labelledby="struktur">
  <h2 id="struktur">Struktur usia</h2>
  <div class="stat-grid">
    ${statCard('Generasi Z', penduduk.genZ.value, penduduk.genZ.note, `${penduduk.genZ.source} · ${penduduk.genZ.year}`)}
    ${statCard('Milenial', penduduk.milenial.value, penduduk.milenial.note, `${penduduk.milenial.source} · ${penduduk.milenial.year}`)}
    ${statCard('Usia produktif', penduduk.produktif.value, penduduk.produktif.note, `${penduduk.produktif.source} · ${penduduk.produktif.year}`)}
    ${statCard('Lansia 60+', penduduk.lansia.value, penduduk.lansia.note, `${penduduk.lansia.source} · ${penduduk.lansia.year}`)}
  </div>
  <p>Mayoritas penduduk berada pada usia produktif — hampir 7 dari 10 orang —
  sementara Generasi Z dan Milenial bersama-sama membentuk hampir separuh penduduk.</p>
</section>

<section aria-labelledby="provinsi-besar">
  <h2 id="provinsi-besar">Lima provinsi terpadat</h2>
  <table class="tabel">
    <caption>Penduduk lima provinsi terbesar, 2024</caption>
    <thead><tr><th scope="col">#</th><th scope="col">Provinsi</th><th scope="col">Pulau</th><th scope="col">Penduduk</th></tr></thead>
    <tbody>
    ${topRows}
    </tbody>
  </table>
  ${sumber(provinsiSource)}
  <p><a href="#/provinsi">Lihat tabel provinsi lengkap dengan pengurutan dan pencarian &rarr;</a></p>
</section>`;
}

/* ---------------- Ekonomi ---------------- */

export function ekonomiPage(tahun) {
  const y = ekonomi.years[tahun] || ekonomi.years[2025];
  const other = tahun === 2025 ? 2024 : 2025;
  const hl = ekonomi.growthSeries.findIndex((g) => g.label === String(tahun));
  return `${sectionIntro('Ekonomi', 'Seberapa besar ekonomi Indonesia, seberapa cepat tumbuh, dan bagaimana harganya bergerak.')}
<h1>Ekonomi Indonesia</h1>

<div class="kontrol" role="group" aria-label="Pilih tahun">
  <span class="kontrol-label">Tahun data:</span>
  <button type="button" data-tahun="2025" class="${tahun === 2025 ? 'aktif' : ''}" aria-pressed="${tahun === 2025}">2025</button>
  <button type="button" data-tahun="2024" class="${tahun === 2024 ? 'aktif' : ''}" aria-pressed="${tahun === 2024}">2024</button>
</div>

<div class="stat-grid empat">
  ${statCard(`PDB ${tahun}`, y.pdb.value, 'produk domestik bruto atas dasar harga berlaku', `${y.pdb.source} · ${y.pdb.year}`)}
  ${statCard(`Pertumbuhan ${tahun}`, y.growth.value, 'pertumbuhan PDB year-on-year', `${y.growth.source} · ${y.growth.year}`)}
  ${statCard(`PDB per kapita ${tahun}`, y.perKapita.value, `≈ ${y.perKapitaUsd.value}`, `${y.perKapita.source} · ${y.perKapita.year}`)}
  ${statCard('Inflasi 2024', ekonomi.inflasi.value, ekonomi.inflasi.note, `${ekonomi.inflasi.source} · ${ekonomi.inflasi.year}`)}
</div>
<p class="catatan">Bandingkan dengan ${other}: PDB ${ekonomi.years[other].pdb.value}, tumbuh ${ekonomi.years[other].growth.value}, PDB per kapita ${ekonomi.years[other].perKapita.value} (≈ ${ekonomi.years[other].perKapitaUsd.value}). Gunakan tombol tahun di atas untuk beralih.</p>

<section aria-labelledby="tumbuh">
  <h2 id="tumbuh">Pertumbuhan ekonomi 2023–2025</h2>
  <div class="chart-card">
    ${barChart(ekonomi.growthSeries, { highlightIndex: hl, height: 280 })}
    ${dataTable(ekonomi.growthSeries, 'Tahun', 'Pertumbuhan PDB')}
  </div>
  ${sumber(ekonomi.growthSource)}
  <p>Pertumbuhan 2025 sebesar 5,11% — tertinggi dalam tiga tahun terakhir —
  dengan PDB mencapai Rp23.821,1 triliun.</p>
</section>

<section aria-labelledby="dagang">
  <h2 id="dagang">Perdagangan luar negeri 2024</h2>
  <div class="stat-grid">
    ${statCard('Ekspor', ekonomi.ekspor.value, ekonomi.ekspor.note, `${ekonomi.ekspor.source} · ${ekonomi.ekspor.year}`)}
    ${statCard('Impor', ekonomi.impor.value, 'nilai impor barang', `${ekonomi.impor.source} · ${ekonomi.impor.year}`)}
    ${statCard('Surplus neraca dagang', ekonomi.surplus.value, ekonomi.surplus.note, `${ekonomi.surplus.source} · ${ekonomi.surplus.year}`)}
  </div>
  <p>Surplus US$31,04 miliar pada 2024 menandai tahun kelima berturut-turut
  Indonesia mencatat surplus perdagangan.</p>
</section>`;
}

/* ---------------- Tenaga Kerja ---------------- */

export function tenagaKerjaPage() {
  return `${sectionIntro('Tenaga Kerja', 'Siapa bekerja, siapa menganggur, dan berapa upahnya.')}
<h1>Tenaga Kerja Indonesia</h1>
<div class="stat-grid">
  ${statCard('Pengangguran (TPT)', tenagaKerja.tptAgu.value, tenagaKerja.tptAgu.note, `${tenagaKerja.tptAgu.source} · ${tenagaKerja.tptAgu.year}`)}
  ${statCard('Pengangguran (TPT)', tenagaKerja.tptNov.value, tenagaKerja.tptNov.note, `${tenagaKerja.tptNov.source} · ${tenagaKerja.tptNov.year}`)}
  ${statCard('Pekerja informal', tenagaKerja.informal.value, tenagaKerja.informal.note, `${tenagaKerja.informal.source} · ${tenagaKerja.informal.year}`)}
  ${statCard('Setengah menganggur', tenagaKerja.setengahMenganggur.value, tenagaKerja.setengahMenganggur.note, `${tenagaKerja.setengahMenganggur.source} · ${tenagaKerja.setengahMenganggur.year}`)}
  ${statCard('Pekerja paruh waktu', tenagaKerja.paruhWaktu.value, tenagaKerja.paruhWaktu.note, `${tenagaKerja.paruhWaktu.source} · ${tenagaKerja.paruhWaktu.year}`)}
  ${statCard('Pekerja penuh waktu', tenagaKerja.penuhWaktu.value, tenagaKerja.penuhWaktu.note, `${tenagaKerja.penuhWaktu.source} · ${tenagaKerja.penuhWaktu.year}`)}
  ${statCard('Upah rata-rata karyawan', tenagaKerja.upah.value, tenagaKerja.upah.note, `${tenagaKerja.upah.source} · ${tenagaKerja.upah.year}`)}
</div>
<p>Tingkat pengangguran terbuka (TPT) turun dari 4,85% pada Agustus 2025 menjadi
4,74% pada November 2025. Namun lebih dari separuh pekerja — 57,80% — masih
bekerja di sektor informal, dan 7,91% tergolong setengah menganggur.</p>
${sumber(`${BPS} — Survei Angkatan Kerja Nasional (Sakernas), Agustus & November 2025`)}`;
}

/* ---------------- Kemiskinan ---------------- */

export function kemiskinanPage() {
  const wbRows = kemiskinan.bankDunia
    .map((b) => `<tr><th scope="row">Di bawah ${esc(b.garis)}</th><td>${esc(b.value)}</td></tr>`)
    .join('\n    ');
  return `${sectionIntro('Kemiskinan', 'Berapa banyak penduduk miskin, di mana garisnya, dan seberapa timpang pembagiannya.')}
<h1>Kemiskinan &amp; Ketimpangan</h1>
<div class="stat-grid">
  ${statCard('Tingkat kemiskinan', kemiskinan.sep2025.value, kemiskinan.sep2025.note, `${kemiskinan.sep2025.source} · ${kemiskinan.sep2025.year}`)}
  ${statCard('Tingkat kemiskinan', kemiskinan.mar2025.value, kemiskinan.mar2025.note, `${kemiskinan.mar2025.source} · ${kemiskinan.mar2025.year}`)}
  ${statCard('Garis kemiskinan', kemiskinan.garis.value, kemiskinan.garis.note, `${kemiskinan.garis.source} · ${kemiskinan.garis.year}`)}
  ${statCard('Rasio Gini', kemiskinan.gini.value, kemiskinan.gini.note, `${kemiskinan.gini.source} · ${kemiskinan.gini.year}`)}
</div>

<section aria-labelledby="tren-miskin">
  <h2 id="tren-miskin">Penurunan sepanjang 2025</h2>
  <div class="chart-card">
    ${barChart(kemiskinan.trend, { height: 260 })}
    ${dataTable(kemiskinan.trend, 'Periode', 'Tingkat kemiskinan')}
  </div>
  ${sumber(`${BPS} — Maret & September 2025`)}
  <p>Dari Maret ke September 2025, jumlah penduduk miskin berkurang dari 23,85 juta
  menjadi 23,36 juta orang. Tingkat 8,25% pada September 2025 adalah yang
  terendah dalam dua dekade.</p>
</section>

<section aria-labelledby="ipm">
  <h2 id="ipm">Pembangunan manusia</h2>
  <div class="stat-grid">
    ${statCard('Indeks Pembangunan Manusia', kemiskinan.ipm.value, kemiskinan.ipm.note, `${kemiskinan.ipm.source} · ${kemiskinan.ipm.year}`)}
    ${statCard('Angka harapan hidup', kemiskinan.harapanHidup.value, kemiskinan.harapanHidup.note, `${kemiskinan.harapanHidup.source} · ${kemiskinan.harapanHidup.year}`)}
    ${statCard('Rata-rata lama sekolah', kemiskinan.lamaSekolah.value, kemiskinan.lamaSekolah.note, `${kemiskinan.lamaSekolah.source} · ${kemiskinan.lamaSekolah.year}`)}
  </div>
</section>

<section aria-labelledby="banding">
  <h2 id="banding">Catatan: garis kemiskinan yang berbeda</h2>
  <p>Angka kemiskinan resmi Indonesia memakai garis kemiskinan BPS
  (Rp609.160 per kapita per bulan, Maret 2025). Bank Dunia memakai garis
  internasional yang berbeda, sehingga hasilnya tidak bisa dibandingkan
  langsung dengan angka BPS:</p>
  <table class="tabel">
    <caption>Penduduk di bawah garis kemiskinan Bank Dunia</caption>
    <thead><tr><th scope="col">Garis Bank Dunia</th><th scope="col">Penduduk di bawahnya</th></tr></thead>
    <tbody>
    ${wbRows}
    </tbody>
  </table>
  ${sumber(kemiskinan.bankDuniaSource)}
</section>`;
}

/* ---------------- Provinsi ---------------- */

export function provinsiPage(state) {
  const query = (state.query || '').trim().toLowerCase();
  let rows = [...provinsi];
  if (query) {
    rows = rows.filter(
      (p) => p.nama.toLowerCase().includes(query) || p.pulau.toLowerCase().includes(query),
    );
  }
  const dir = state.dir === 'desc' ? -1 : 1;
  if (state.sort === 'nama') {
    rows.sort((a, b) => dir * a.nama.localeCompare(b.nama, 'id'));
  } else {
    rows.sort((a, b) => dir * (a.penduduk - b.penduduk));
  }
  const body = rows.length
    ? rows
        .map(
          (p, i) => `<tr><td>${i + 1}</td><th scope="row">${esc(p.nama)}</th><td>${esc(p.pulau)}</td><td>${esc(p.display)}</td></tr>`,
        )
        .join('\n    ')
    : `<tr><td colspan="4">Tidak ada provinsi yang cocok dengan “${esc(state.query)}”. Coba kata kunci lain.</td></tr>`;
  const arrow = (key) => (state.sort === key ? (state.dir === 'asc' ? ' ▲' : ' ▼') : '');
  return `${sectionIntro('Provinsi', 'Provinsi dengan penduduk terbanyak, bisa diurutkan dan dicari.')}
<h1>Provinsi Terpadat</h1>
<p>Lima provinsi dengan penduduk terbanyak menurut ${esc(BPS)}, 2024.
Klik judul kolom untuk mengurutkan, atau ketik di kotak cari untuk menyaring.</p>

<div class="kontrol" role="search">
  <label for="cari-provinsi">Cari provinsi atau pulau</label>
  <input id="cari-provinsi" type="search" placeholder="Misalnya: Jawa" value="${esc(state.query || '')}" autocomplete="off">
</div>

<table class="tabel">
  <caption>Penduduk provinsi, 2024 — ${rows.length} dari ${provinsi.length} provinsi ditampilkan</caption>
  <thead><tr>
    <th scope="col">#</th>
    <th scope="col"><button type="button" class="sort" data-sort="nama">Provinsi${arrow('nama')}</button></th>
    <th scope="col">Pulau</th>
    <th scope="col"><button type="button" class="sort" data-sort="penduduk">Penduduk${arrow('penduduk')}</button></th>
  </tr></thead>
  <tbody>
    ${body}
  </tbody>
</table>
${sumber(provinsiSource)}
<p>Empat dari lima provinsi terpadat berada di Pulau Jawa — sejalan dengan
55,65% penduduk Indonesia yang tinggal di Jawa (SUPAS 2025).</p>`;
}

/* ---------------- Tentang ---------------- */

export function tentangPage() {
  return `${sectionIntro('Tentang & Sumber', 'Dari mana setiap angka di situs ini berasal, dan apa artinya.')}
<h1>Tentang AngkaNusa</h1>
<p>AngkaNusa adalah situs ringkasan statistik Indonesia yang dibuat untuk
pengunjung yang ingin cepat menemukan angka pokok negara ini — tanpa harus
membuka puluhan tabel. Semua angka berasal dari <strong>Badan Pusat Statistik
(BPS)</strong>, kecuali satu catatan perbandingan yang diberi label jelas
sebagai data Bank Dunia.</p>

<h2>Apa arti angka-angka ini?</h2>
<dl class="istilah">
  <dt>SUPAS</dt><dd>Survei Penduduk Antar Sensus — survei besar BPS di antara dua sensus penduduk.</dd>
  <dt>TPT</dt><dd>Tingkat Pengangguran Terbuka — persentase angkatan kerja yang menganggur dan sedang mencari pekerjaan.</dd>
  <dt>PDB</dt><dd>Produk Domestik Bruto — nilai seluruh barang dan jasa yang dihasilkan di Indonesia dalam setahun.</dd>
  <dt>Garis kemiskinan</dt><dd>Batas pengeluaran per kapita per bulan di bawah mana seseorang digolongkan miskin oleh BPS.</dd>
  <dt>Rasio Gini</dt><dd>Ukuran ketimpangan: 0 berarti pembagian sempurna merata, 1 berarti satu orang menguasai segalanya.</dd>
  <dt>IPM</dt><dd>Indeks Pembangunan Manusia — gabungan kesehatan, pendidikan, dan standar hidup layak.</dd>
  <dt>TFR</dt><dd>Angka kelahiran total — rata-rata jumlah anak yang dilahirkan seorang perempuan sepanjang hidupnya.</dd>
</dl>

<h2>Daftar sumber lengkap</h2>
<ul class="sumber-list">
  <li>${esc(BPS)} — SUPAS 2025 (rilis 5 Mei 2026): jumlah penduduk, pertumbuhan, sebaran Jawa, struktur usia, TFR.</li>
  <li>${esc(BPS)} — Sensus Penduduk 2010 &amp; 2020: riwayat jumlah penduduk dan pertumbuhan 2010–2020.</li>
  <li>${esc(BPS)} — rilis PDB 5 Februari 2026: PDB 2024 &amp; 2025, pertumbuhan 2023–2025, PDB per kapita.</li>
  <li>${esc(BPS)} — 2024: inflasi tahun kalender, perdagangan luar negeri, penduduk provinsi.</li>
  <li>${esc(BPS)} — Sakernas Agustus &amp; November 2025: TPT, pekerja informal, setengah menganggur, paruh waktu, upah.</li>
  <li>${esc(BPS)} — Maret &amp; September 2025: tingkat kemiskinan, garis kemiskinan, rasio Gini.</li>
  <li>${esc(BPS)} — 2024: Indeks Pembangunan Manusia, angka harapan hidup, rata-rata lama sekolah.</li>
  <li>Bank Dunia — survei 2025, paritas daya beli 2021: penduduk di bawah garis US$3,00 / US$4,20 / US$8,30 per hari (hanya sebagai catatan perbandingan).</li>
</ul>
<p>Angka-angka di situs ini adalah angka resmi yang diterbitkan sumber di atas.
AngkaNusa bukan situs resmi BPS dan tidak berafiliasi dengan BPS.</p>
<p><a href="#/">Kembali ke Beranda</a></p>`;
}

export function missingPage() {
  return `<h1>Halaman tidak ditemukan</h1>
<p>Alamat ini tidak ada di AngkaNusa. Mungkin tautannya salah ketik.</p>
<p><a href="#/">Kembali ke Beranda</a></p>`;
}
