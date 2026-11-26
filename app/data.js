/* AngkaNusa — semua angka di situs ini.
   Hanya angka yang terverifikasi dari Badan Pusat Statistik (BPS) yang dipakai,
   kecuali catatan Bank Dunia yang diberi label jelas. Setiap angka membawa
   sumber dan tahunnya; halaman menampilkan keduanya di samping angka. */

export const BPS = 'Badan Pusat Statistik (BPS)';

export const penduduk = {
  total2025: { value: '284,67 juta', note: 'jiwa', year: 2025, source: `${BPS} — SUPAS 2025` },
  total2025Mid: { value: '284,44 juta', note: 'proyeksi pertengahan 2025', year: 2025, source: BPS },
  growth: { value: '1,08%', note: 'per tahun, 2020–2025', year: 2025, source: `${BPS} — SP2020 & SUPAS 2025` },
  growthPrev: { value: '1,10%', note: 'per tahun, 2010–2020', year: 2020, source: `${BPS} — SP2020` },
  javaShare: { value: '55,65%', note: 'penduduk tinggal di Pulau Jawa', year: 2025, source: `${BPS} — SUPAS 2025` },
  genZ: { value: '24,93%', note: 'Generasi Z dari penduduk', year: 2025, source: `${BPS} — SUPAS 2025` },
  milenial: { value: '24,34%', note: 'Milenial dari penduduk', year: 2025, source: `${BPS} — SUPAS 2025` },
  produktif: { value: '68,94%', note: 'penduduk usia produktif', year: 2025, source: `${BPS} — SUPAS 2025` },
  lansia: { value: '11,97%', note: 'penduduk berusia 60 tahun ke atas', year: 2025, source: `${BPS} — SUPAS 2025` },
  tfr: { value: '2,13', note: 'angka kelahiran total (TFR)', year: 2025, source: `${BPS} — SUPAS 2025` },
  tfr2010: { value: '2,41', note: 'TFR tahun 2010', year: 2010, source: `${BPS} — SP2010` },
  history: [
    { label: '2010', value: 237.64, display: '237,64 jt' },
    { label: '2015', value: 255.18, display: '255,18 jt' },
    { label: '2020', value: 270.2, display: '270,20 jt' },
    { label: '2025', value: 284.67, display: '284,67 jt' },
  ],
  historySource: `${BPS} — SP2010, SUPAS 2015, SP2020, SUPAS 2025`,
};

export const provinsi = [
  { nama: 'Jawa Barat', pulau: 'Jawa', penduduk: 50.35, display: '50,35 jt' },
  { nama: 'Jawa Timur', pulau: 'Jawa', penduduk: 41.92, display: '41,92 jt' },
  { nama: 'Jawa Tengah', pulau: 'Jawa', penduduk: 37.89, display: '37,89 jt' },
  { nama: 'Sumatera Utara', pulau: 'Sumatera', penduduk: 15.59, display: '15,59 jt' },
  { nama: 'Banten', pulau: 'Jawa', penduduk: 12.43, display: '12,43 jt' },
];
export const provinsiSource = `${BPS} — 2024`;

export const ekonomi = {
  years: {
    2024: {
      pdb: { value: 'Rp22.139,0 triliun', year: 2024, source: BPS },
      growth: { value: '5,03%', year: 2024, source: BPS },
      perKapita: { value: 'Rp78,6 juta', year: 2024, source: BPS },
      perKapitaUsd: { value: 'US$4.960,3', year: 2024, source: BPS },
    },
    2025: {
      pdb: { value: 'Rp23.821,1 triliun', year: 2025, source: BPS },
      growth: { value: '5,11%', year: 2025, source: BPS },
      perKapita: { value: 'Rp83,7 juta', year: 2025, source: BPS },
      perKapitaUsd: { value: 'US$5.083,4', year: 2025, source: BPS },
    },
  },
  growthSeries: [
    { label: '2023', value: 5.05, display: '5,05%' },
    { label: '2024', value: 5.03, display: '5,03%' },
    { label: '2025', value: 5.11, display: '5,11%' },
  ],
  growthSource: `${BPS} — rilis 5 Februari 2026 (angka 2025)`,
  inflasi: { value: '1,57%', note: 'year-on-year, tahun kalender', year: 2024, source: BPS },
  ekspor: { value: 'US$264,70 miliar', note: 'naik 2,29% dari tahun sebelumnya', year: 2024, source: `${BPS} — Kementerian Keuangan` },
  impor: { value: 'US$233,66 miliar', year: 2024, source: `${BPS} — Kementerian Keuangan` },
  surplus: { value: 'US$31,04 miliar', note: 'surplus 5 tahun berturut-turut', year: 2024, source: `${BPS} — Kementerian Keuangan` },
};

export const tenagaKerja = {
  tptAgu: { value: '4,85%', note: '7,46 juta orang menganggur', year: 2025, source: `${BPS} — Sakernas Agustus 2025` },
  tptNov: { value: '4,74%', note: '7,35 juta orang menganggur', year: 2025, source: `${BPS} — Sakernas November 2025` },
  informal: { value: '57,80%', note: '84,58 juta pekerja informal', year: 2025, source: `${BPS} — Sakernas Agustus 2025` },
  setengahMenganggur: { value: '7,91%', note: '11,6 juta orang setengah menganggur', year: 2025, source: `${BPS} — Sakernas Agustus 2025` },
  paruhWaktu: { value: '24,77%', note: 'pekerja paruh waktu', year: 2025, source: `${BPS} — Sakernas Agustus 2025` },
  penuhWaktu: { value: '67,32%', note: 'pekerja penuh waktu', year: 2025, source: `${BPS} — Sakernas Agustus 2025` },
  upah: { value: 'Rp3,33 juta', note: 'upah rata-rata karyawan per bulan', year: 2025, source: `${BPS} — Sakernas Agustus 2025` },
};

export const kemiskinan = {
  mar2025: { value: '8,47%', note: '23,85 juta orang', year: 2025, source: `${BPS} — Maret 2025` },
  sep2025: { value: '8,25%', note: '23,36 juta orang — terendah dua dekade', year: 2025, source: `${BPS} — September 2025` },
  garis: { value: 'Rp609.160', note: 'garis kemiskinan per kapita per bulan', year: 2025, source: `${BPS} — Maret 2025` },
  gini: { value: '0,375', note: 'rasio Gini', year: 2025, source: `${BPS} — Maret 2025` },
  ipm: { value: '75,02', note: 'Indeks Pembangunan Manusia', year: 2024, source: BPS },
  harapanHidup: { value: '74,15 tahun', note: 'angka harapan hidup', year: 2024, source: BPS },
  lamaSekolah: { value: '9,22 tahun', note: 'rata-rata lama sekolah', year: 2024, source: BPS },
  trend: [
    { label: 'Mar 2025', value: 8.47, display: '8,47%' },
    { label: 'Sep 2025', value: 8.25, display: '8,25%' },
  ],
  bankDunia: [
    { garis: 'US$3,00 per hari', value: '3,7%' },
    { garis: 'US$4,20 per hari', value: '15,5%' },
    { garis: 'US$8,30 per hari', value: '64,1%' },
  ],
  bankDuniaSource: 'Bank Dunia — survei 2025, paritas daya beli 2021',
};

export const kpiBeranda = [
  { label: 'Penduduk', value: penduduk.total2025.value, note: 'jiwa · 2025', href: '#/penduduk' },
  { label: 'PDB', value: 'Rp23.821,1 triliun', note: '2025', href: '#/ekonomi' },
  { label: 'Pertumbuhan ekonomi', value: '5,11%', note: '2025', href: '#/ekonomi' },
  { label: 'Pengangguran (TPT)', value: '4,85%', note: 'Agustus 2025', href: '#/tenaga-kerja' },
  { label: 'Kemiskinan', value: '8,25%', note: 'September 2025', href: '#/kemiskinan' },
  { label: 'IPM', value: '75,02', note: '2024', href: '#/kemiskinan' },
];
