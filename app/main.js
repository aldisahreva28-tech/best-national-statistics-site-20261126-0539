/* AngkaNusa — router rute hash dan pengendali halaman.
   Rute: #/ Beranda, #/penduduk, #/ekonomi, #/tenaga-kerja, #/kemiskinan,
   #/provinsi, #/tentang. Kontrol halaman (pemilih tahun, urut dan cari
   provinsi) dihubungkan di sini dan me-render ulang halaman yang sama.
   window.__shotReady bernilai false saat halaman dirender dan true setelah
   tampil, supaya skrip screenshot tahu kapan menangkap layar. */

import {
  home, pendudukPage, ekonomiPage, tenagaKerjaPage,
  kemiskinanPage, provinsiPage, tentangPage, missingPage,
} from './views.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('.nav a')];

const provinsiState = { sort: 'penduduk', dir: 'desc', query: '' };
let tahunEkonomi = 2025;

const titles = {
  '': 'AngkaNusa — Statistik Indonesia',
  penduduk: 'Penduduk | AngkaNusa',
  ekonomi: 'Ekonomi | AngkaNusa',
  'tenaga-kerja': 'Tenaga Kerja | AngkaNusa',
  kemiskinan: 'Kemiskinan | AngkaNusa',
  provinsi: 'Provinsi | AngkaNusa',
  tentang: 'Tentang & Sumber | AngkaNusa',
};

function render() {
  window.__shotReady = false;
  const route = location.hash.replace(/^#\/?/, '').split('?')[0];
  let html;
  if (route === '' || route === '/') html = home();
  else if (route === 'penduduk') html = pendudukPage();
  else if (route === 'ekonomi') html = ekonomiPage(tahunEkonomi);
  else if (route === 'tenaga-kerja') html = tenagaKerjaPage();
  else if (route === 'kemiskinan') html = kemiskinanPage();
  else if (route === 'provinsi') html = provinsiPage(provinsiState);
  else if (route === 'tentang') html = tentangPage();
  else html = missingPage();
  document.title = titles[route] || 'Tidak ditemukan | AngkaNusa';
  app.innerHTML = html;
  for (const link of navLinks) {
    const target = link.getAttribute('href').replace(/^#\/?/, '');
    link.setAttribute('aria-current', target === route ? 'page' : 'false');
  }
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

/* Delegasi klik: tombol pemilih tahun di halaman ekonomi dan tombol urut
   di tabel provinsi. */
app.addEventListener('click', (event) => {
  const yearButton = event.target.closest('[data-tahun]');
  if (yearButton) {
    tahunEkonomi = Number(yearButton.dataset.tahun);
    render();
    return;
  }
  const sortButton = event.target.closest('[data-sort]');
  if (sortButton) {
    const key = sortButton.dataset.sort;
    if (provinsiState.sort === key) {
      provinsiState.dir = provinsiState.dir === 'asc' ? 'desc' : 'asc';
    } else {
      provinsiState.sort = key;
      provinsiState.dir = key === 'nama' ? 'asc' : 'desc';
    }
    render();
    const input = document.getElementById('cari-provinsi');
    if (input) input.focus();
  }
});

/* Delegasi ketik: kotak cari provinsi menyaring tabel sambil mengetik. */
app.addEventListener('input', (event) => {
  if (event.target.id === 'cari-provinsi') {
    provinsiState.query = event.target.value;
    const pos = event.target.selectionStart;
    render();
    const input = document.getElementById('cari-provinsi');
    if (input) {
      input.focus();
      input.setSelectionRange(pos, pos);
    }
  }
});

window.addEventListener('hashchange', render);
render();
